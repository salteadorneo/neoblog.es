/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import {
  callsites,
  Canvas,
  ConnInfo,
  dirname,
  encodeUrl,
  Feed,
  FeedItem,
  Fragment,
  fromFileUrl,
  frontMatter,
  gfm,
  h,
  html,
  HtmlOptions,
  join,
  loadImage,
  relative,
  removeMarkdown,
  serve,
  serveDir,
  UnoCSS,
  walk,
} from "./src/deps.ts";
import type {
  BlogContext,
  BlogMiddleware,
  BlogSettings,
  BlogState,
  Post,
} from "./src/types.d.ts";

import { Index } from "./src/pages/Index.tsx";
import { PostPage } from "./src/pages/PostPage.tsx";

export { Fragment, h };

const IS_DEV = Deno.args.includes("--dev") && "watchFs" in Deno;
const POSTS = new Map<string, Post>();
const HMR_SOCKETS: Set<WebSocket> = new Set();

const HMR_CLIENT = `let socket;
let reconnectTimer;

const wsOrigin = window.location.origin
  .replace("http", "ws")
  .replace("https", "wss");
const hmrUrl = wsOrigin + "/hmr";

hmrSocket();

function hmrSocket(callback) {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(hmrUrl);
  socket.addEventListener("open", callback);
  socket.addEventListener("message", (event) => {
    if (event.data === "refresh") {
      console.log("refreshings");
      window.location.reload();
    }
  });

  socket.addEventListener("close", () => {
    console.log("reconnecting...");
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      hmrSocket(() => {
        window.location.reload();
      });
    }, 1000);
  });
}
`;

function errorHandler(err: unknown) {
  return new Response(`Internal server error: ${(err as Error)?.message}`, {
    status: 500,
  });
}

export default async function blog(settings?: BlogSettings) {
  html.use(UnoCSS(settings?.unocss)); // Load custom unocss module if provided

  const url = callsites()[1].getFileName()!;
  const blogState = await configureBlog(url, IS_DEV, settings);

  const blogHandler = createBlogHandler(blogState);
  serve(blogHandler, {
    port: blogState.port,
    hostname: blogState.hostname,
    onError: errorHandler,
  });
}

export function createBlogHandler(state: BlogState) {
  const inner = handler;
  const withMiddlewares = composeMiddlewares(state);
  return function handler(req: Request, connInfo: ConnInfo) {
    // Redirect requests that end with a trailing slash
    // to their non-trailing slash counterpart.
    // Ex: /about/ -> /about
    const url = new URL(req.url);
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
      return Response.redirect(url.href, 307);
    }
    return withMiddlewares(req, connInfo, inner);
  };
}

function composeMiddlewares(state: BlogState) {
  return (
    req: Request,
    connInfo: ConnInfo,
    inner: (req: Request, ctx: BlogContext) => Promise<Response>,
  ) => {
    const mws = state.middlewares?.reverse();

    const handlers: (() => Response | Promise<Response>)[] = [];

    const ctx = {
      next() {
        const handler = handlers.shift()!;
        return Promise.resolve(handler());
      },
      connInfo,
      state,
    };

    if (mws) {
      for (const mw of mws) {
        handlers.push(() => mw(req, ctx));
      }
    }

    handlers.push(() => inner(req, ctx));

    const handler = handlers.shift()!;
    return handler();
  };
}

export async function configureBlog(
  url: string,
  isDev: boolean,
  settings?: BlogSettings,
): Promise<BlogState> {
  let directory;

  try {
    const blogPath = fromFileUrl(url);
    directory = dirname(blogPath);
  } catch (e) {
    console.error(e);
    throw new Error("Cannot run blog from a remote URL.");
  }

  const state: BlogState = {
    directory,
    ...settings,
  };

  await loadContent(directory, isDev);

  return state;
}

async function loadContent(blogDirectory: string, isDev: boolean) {
  // Read posts from the current directory and store them in memory.
  const postsDirectory = join(blogDirectory, "posts");

  // TODO(@satyarohith): not efficient for large number of posts.
  for await (const entry of walk(postsDirectory)) {
    if (entry.isFile && entry.path.endsWith(".md")) {
      await loadPost(postsDirectory, entry.path);
    }
  }

  if (isDev) {
    watchForChanges(postsDirectory).catch(() => {});
  }
}

// Watcher watches for .md file changes and updates the posts.
async function watchForChanges(postsDirectory: string) {
  const watcher = Deno.watchFs(postsDirectory);
  for await (const event of watcher) {
    if (event.kind === "modify" || event.kind === "create") {
      for (const path of event.paths) {
        if (path.endsWith(".md")) {
          try {
            await loadPost(postsDirectory, path);
            HMR_SOCKETS.forEach((socket) => {
              socket.send("refresh");
            });
          } catch (err) {
            console.error(`loadPost ${path} error:`, err.message);
          }
        }
      }
    }
  }
}

async function loadPost(postsDirectory: string, path: string) {
  const contents = await Deno.readTextFile(path);
  let pathname = "/" + relative(postsDirectory, path);
  // Remove .md extension.
  pathname = pathname.slice(0, -3);

  const { body: content, attrs: _data } = frontMatter<Record<string, unknown>>(
    contents,
  );

  const data = recordGetter(_data);

  let snippet: string | undefined = data.get("snippet") ??
    data.get("abstract") ??
    data.get("summary") ??
    data.get("description");
  if (!snippet) {
    const maybeSnippet = content.split("\n\n")[0];
    if (maybeSnippet) {
      snippet = removeMarkdown(maybeSnippet.replace("\n", " "));
    } else {
      snippet = "";
    }
  }

  const post: Post = {
    title: data.get("title") ?? "Untitled",
    author: data.get("author"),
    // Note: users can override path of a blog post using
    // pathname in front matter.
    pathname: data.get("pathname") ?? pathname,
    // Note: no error when publish_date is wrong or missed
    publishDate: data.get("publish_date") instanceof Date
      ? data.get("publish_date")!
      : new Date(),
    snippet,
    markdown: content,
    coverHtml: data.get("cover_html"),
    ogImage: data.get("og:image"),
    tags: data.get("tags"),
    allowIframes: data.get("allow_iframes"),
    readTime: readingTime(content),
  };

  POSTS.set(pathname, post);
}

export async function handler(req: Request, ctx: BlogContext) {
  const { state: blogState } = ctx;
  const { pathname, searchParams } = new URL(req.url);
  const canonicalUrl = blogState.canonicalUrl || new URL(req.url).toString();
  const ogImage = typeof blogState.ogImage !== "string"
    ? blogState.ogImage?.url
    : blogState.ogImage;
  const twitterCard = typeof blogState.ogImage !== "string"
    ? blogState.ogImage?.twitterCard
    : "summary_large_image";

  if (pathname === "/feed") {
    return serveRSS(req, blogState, POSTS);
  }

  if (pathname === "/sitemap.xml") {
    return serveSitemap(req, blogState, POSTS);
  }

  if (IS_DEV) {
    if (pathname == "/hmr.js") {
      return new Response(HMR_CLIENT, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    }

    if (pathname == "/hmr") {
      const { response, socket } = Deno.upgradeWebSocket(req);
      HMR_SOCKETS.add(socket);
      socket.onclose = () => {
        HMR_SOCKETS.delete(socket);
      };

      return response;
    }
  }

  const sharedHtmlOptions: HtmlOptions = {
    colorScheme: blogState.theme ?? "auto",
    lang: blogState.lang ?? "en",
    scripts: IS_DEV ? [{ src: "/hmr.js" }] : undefined,
    links: [{ href: canonicalUrl, rel: "canonical" }],
  };

  if (typeof blogState.favicon === "string") {
    sharedHtmlOptions.links?.push({
      href: blogState.favicon,
      type: "image/x-icon",
      rel: "icon",
    });
  } else {
    if (blogState.favicon?.light) {
      sharedHtmlOptions.links?.push({
        href: blogState.favicon.light,
        type: "image/x-icon",
        media: "(prefers-color-scheme:light)",
        rel: "icon",
      });
    }

    if (blogState.favicon?.dark) {
      sharedHtmlOptions.links?.push({
        href: blogState.favicon.dark,
        type: "image/x-icon",
        media: "(prefers-color-scheme:dark)",
        rel: "icon",
      });
    }
  }

  const mainTitle = `${blogState.title} - ${blogState.description}` ?? "";

  if (pathname === "/") {
    return html({
      ...sharedHtmlOptions,
      title: mainTitle,
      meta: {
        description: blogState.description,
        "og:title": blogState.title,
        "og:description": blogState.description,
        "og:image": ogImage ?? blogState.cover,
        "twitter:title": blogState.title,
        "twitter:description": blogState.description,
        "twitter:image": ogImage ?? blogState.cover,
        "twitter:card": ogImage ? twitterCard : undefined,
      },
      styles: [...(blogState.style ? [blogState.style] : [])],
      body: (
        <Index
          req={req}
          state={blogState}
          posts={filterPosts(POSTS, searchParams)}
        />
      ),
    });
  }

  if (pathname === "/og-image") {
    const canvas = Canvas.MakeCanvas(1200, 628);
    const context = canvas.getContext("2d");
    context.fillStyle = "#24292f";
    context.fillRect(0, 0, 1200, 628);
    context.fillStyle = "white";
    context.font = "bold 40px sans-serif";
    context.textAlign = "center";
    context.fillText("neoblog.es", 50, 80);
    // get title from query param
    const title = searchParams.get("title") ?? "";
    context.fillText(title, 50, 570);
    const ogImage = canvas.toBuffer();
    return new Response(ogImage, {
      headers: {
        "content-type": "image/png",
      },
    });
  }

  const post = POSTS.get(pathname);
  if (post) {
    if (!post.ogImage) {
      post.ogImage = `${canonicalUrl}/og-image?title=${encodeUrl(post.title)}`;
    }
    return html({
      ...sharedHtmlOptions,
      title: `${post.title} - ${mainTitle}`,
      meta: {
        description: post.snippet,
        "og:title": post.title,
        "og:description": post.snippet,
        "og:image": post.ogImage,
        "twitter:title": post.title,
        "twitter:description": post.snippet,
        "twitter:image": post.ogImage,
        "twitter:card": post.ogImage ? twitterCard : undefined,
      },
      styles: [
        gfm.CSS,
        `.markdown-body { --color-canvas-default: transparent !important; --color-canvas-subtle: #edf0f2; --color-border-muted: rgba(128,128,128,0.2); } .markdown-body img + p { margin-top: 16px; }`,
        ...(blogState.style ? [blogState.style] : []),
      ],
      body: <PostPage req={req} post={post} state={blogState} />,
    });
  }

  let fsRoot = blogState.directory;
  try {
    await Deno.lstat(join(blogState.directory, "./posts", pathname));
    fsRoot = join(blogState.directory, "./posts");
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) {
      console.error(e);
      return new Response(e.message, { status: 500 });
    }
  }

  return serveDir(req, { fsRoot });
}

/** Serves the rss/atom feed of the blog. */
function serveRSS(
  req: Request,
  state: BlogState,
  posts: Map<string, Post>,
): Response {
  const url = state.canonicalUrl
    ? new URL(state.canonicalUrl)
    : new URL(req.url);
  const origin = url.origin;
  const copyright = `Creative Commons Reconocimiento 4.0 Internacional`;
  const feed = new Feed({
    title: state.title ?? "Blog",
    description: state.description,
    id: `${origin}/blog`,
    link: `${origin}/blog`,
    language: state.lang ?? "en",
    favicon: `${origin}/favicon.ico`,
    copyright,
    generator: "Feed for Deno",
    feedLinks: {
      atom: `${origin}/feed`,
    },
    author: {
      name: state.author,
      link: state.authorUrl,
    },
  });

  for (const [_key, post] of posts.entries()) {
    const item: FeedItem = {
      id: `${origin}/${post.pathname}`,
      title: post.title,
      description: post.snippet,
      date: post.publishDate,
      link: `${origin}${post.pathname}`,
      author: post.author?.split(",").map((author: string) => ({
        name: author.trim() ?? state.author,
      })),
      image: post.ogImage,
      copyright,
      published: post.publishDate,
    };
    feed.addItem(item);
  }

  const atomFeed = feed.atom1();
  return new Response(atomFeed, {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
}

function serveSitemap(
  req: Request,
  state: BlogState,
  posts: Map<string, Post>,
): Response {
  const url = state.canonicalUrl
    ? new URL(state.canonicalUrl)
    : new URL(req.url);
  const origin = url.origin;

  let urls = "";
  for (const [_key, post] of posts.entries()) {
    urls += `<url>
    <loc>${origin}${post.pathname}</loc>
    <lastmod>${post.publishDate.toISOString().split("T")[0]}</lastmod>
    <priority>0.80</priority>
    </url>`;
    if (post.tags) {
      for (const tag of post.tags) {
        urls += `<url>
        <loc>${origin}/?tag=${tag}</loc>
        <lastmod>${post.publishDate.toISOString().split("T")[0]}</lastmod>
        <priority>0.70</priority>
        </url>`;
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${origin}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <priority>1.00</priority>
  </url>
  ${urls}
  </urlset>`;
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}

export function redirects(redirectMap: Record<string, string>): BlogMiddleware {
  return async function (req: Request, ctx: BlogContext): Promise<Response> {
    const { pathname } = new URL(req.url);

    let maybeRedirect = redirectMap[pathname];

    if (!maybeRedirect) {
      // trim leading slash
      maybeRedirect = redirectMap[pathname.slice(1)];
    }

    if (maybeRedirect) {
      if (!maybeRedirect.startsWith("/")) {
        maybeRedirect = "/" + maybeRedirect;
      }

      return new Response(null, {
        status: 307,
        headers: {
          location: maybeRedirect,
        },
      });
    }
    try {
      return await ctx.next();
    } catch (e) {
      console.error(e);
      return new Response(`Internal server error: ${e.message}`, {
        status: 500,
      });
    }
  };
}

function filterPosts(posts: Map<string, Post>, searchParams: URLSearchParams) {
  let postsDraft = Array.from(posts.entries());

  const tag = searchParams.get("tag") || "";
  if (tag) {
    postsDraft = postsDraft.filter(([, p]: [string, Post]) =>
      p.tags?.includes(tag)
    );
  }

  const q = searchParams.get("q") || "";
  if (q) {
    postsDraft = postsDraft.filter(
      ([, p]: [string, Post]) =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.markdown.toLowerCase().includes(q.toLowerCase()) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(q.toLowerCase())),
    );
  }

  postsDraft.sort(
    (a, b) => b[1].publishDate.getTime() - a[1].publishDate.getTime(),
  );

  return new Map(postsDraft);
}

function recordGetter(data: Record<string, unknown>) {
  return {
    get<T>(key: string): T | undefined {
      return data[key] as T;
    },
  };
}

function readingTime(text: string) {
  const wpm = 225;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wpm);
}
