/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { gfm, h } from "../deps.ts";
import type { BlogState, DateFormat, Post } from "../types.d.ts";

import { Header } from "../components/Header.tsx";
import { IconLinkedin, IconTwitter } from "../components/SocialAppIcons.tsx";
import { Tags } from "../components/Tags.tsx";
import { Footer } from "../components/Footer.tsx";
import { Time } from "../components/Time.tsx";

interface PostPageProps {
  req: Request;
  state: BlogState;
  post: Post;
}

export function PostPage({ req, post, state }: PostPageProps) {
  const html = gfm.render(post.markdown, {
    allowIframes: post.allowIframes,
  });
  return (
    <div className={`post ${post.pathname.substring(1)}`}>
      {state.showHeaderOnPostPage && <Header req={req} state={state} />}

      <div class="max-w-screen-sm px-6 pt-8 mx-auto">
        <div class="pb-16 hidden">
          <a
            href="/"
            class="inline-flex items-center gap-1 text-sm text-gray-500/80 hover:text-gray-700 transition-colors"
            title="Back to Index Page"
          >
            <svg
              className="inline-block w-5 h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.91675 14.4167L3.08341 10.5833C3.00008 10.5 2.94119 10.4097 2.90675 10.3125C2.87175 10.2153 2.85425 10.1111 2.85425 10C2.85425 9.88889 2.87175 9.78472 2.90675 9.6875C2.94119 9.59028 3.00008 9.5 3.08341 9.41667L6.93758 5.5625C7.09036 5.40972 7.27786 5.33334 7.50008 5.33334C7.7223 5.33334 7.91675 5.41667 8.08341 5.58334C8.23619 5.73611 8.31258 5.93056 8.31258 6.16667C8.31258 6.40278 8.23619 6.59722 8.08341 6.75L5.66675 9.16667H16.6667C16.9029 9.16667 17.1006 9.24639 17.2601 9.40584C17.4201 9.56584 17.5001 9.76389 17.5001 10C17.5001 10.2361 17.4201 10.4339 17.2601 10.5933C17.1006 10.7533 16.9029 10.8333 16.6667 10.8333H5.66675L8.10425 13.2708C8.25703 13.4236 8.33341 13.6111 8.33341 13.8333C8.33341 14.0556 8.25008 14.25 8.08341 14.4167C7.93064 14.5694 7.73619 14.6458 7.50008 14.6458C7.26397 14.6458 7.06953 14.5694 6.91675 14.4167Z"
                fill="currentColor"
              />
            </svg>
            Inicio
          </a>
        </div>

        <article>
          <div class="flex gap-4">
            {post.coverHtml && (
              <div
                class="h-24 aspect-square"
                dangerouslySetInnerHTML={{ __html: post.coverHtml }}
              />
            )}
            <div>
              <h1 class="text-4xl text-gray-900 dark:text-gray-100 font-bold">
                {post.title}
              </h1>
              {state.readtime &&
                <p>{post.readTime} min</p>}

              <Tags tags={post.tags} />

              <p class="mt-1 text-gray-500">
                {
                  /* {(post.author || state.author) && (
              <p>{post.author || state.author}</p>
            )} */
                }
                <Time
                  date={post.publishDate}
                  dateFormat={state.dateFormat}
                />
              </p>
            </div>
          </div>

          <div
            class="mt-8 markdown-body"
            data-color-mode={state.theme ?? "auto"}
            data-light-theme="light"
            data-dark-theme="dark"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <section class="flex items-center justify-between mt-8">
            <div class="flex items-center gap-2">
              Compartir
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${req.url}`}
                target="_blank"
                class="color-[#0e76a8]"
                title="Compartir en LinkedIn"
              >
                <IconLinkedin />
              </a>
              <a
                href={`https://twitter.com/share?url=${req.url}&text=${
                  encodeURIComponent(post.title)
                }&hashtags=${post.tags?.join(",")}`}
                target="_blank"
                class="color-[#00acee]"
                title="Compartir en Twitter"
              >
                <IconTwitter />
              </a>
            </div>
            <a
              href={`https://pr.new/github.com/salteadorneo/neoblog.es/edit/main/posts${post.pathname}.md`}
              target="_blank"
              class="text-sm text-gray-500/80 hover:text-gray-700 transition-colors"
            >
              Editar en StackBlitz
            </a>
          </section>
        </article>

        {state.section && state.section(post)}

        {state.footer || <Footer author={state.author} />}
      </div>
    </div>
  );
}
