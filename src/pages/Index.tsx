/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import type { BlogState, Post } from "../types.d.ts";

import { Footer } from "../components/Footer.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { Header } from "../components/Header.tsx";

interface IndexProps {
  req: Request;
  state: BlogState;
  posts: Map<string, Post>;
}

export function Index({ req, state, posts }: IndexProps) {
  const postIndex = [];
  for (const [_key, post] of posts.entries()) {
    postIndex.push(post);
  }
  postIndex.sort(
    (a, b) => (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0),
  );

  const url = new URL(req.url);
  const tag = new URLSearchParams(url.searchParams).get("tag") || null;

  return (
    <div class="home">
      {state.header || <Header req={req} state={state} />}

      <div class="max-w-screen-sm px-6 mx-auto">
        <div class="pt-16 lt-sm:pt-12">
          {tag && (
            <span class="text-2xl font-bold text-white-500">
              #{tag}
            </span>
          )}
          {postIndex.length === 0 && (
            <div class="text-center">
              <h1 class="text-3xl font-bold">Nada por aquí</h1>
              <p class="mt-2 text-gray-600">
                No se encontraron resultados para la búsqueda.
              </p>
            </div>
          )}
          {postIndex.map((post) => (
            <PostCard
              post={post}
              key={post.pathname}
              dateFormat={state.dateFormat}
              lang={state.lang}
            />
          ))}
        </div>

        {state.footer || <Footer author={state.author} />}
      </div>
    </div>
  );
}
