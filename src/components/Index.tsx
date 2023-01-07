/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import type { BlogState, Post } from "../types.d.ts";

import { Footer } from "./Footer.tsx";
import { PostCard } from "./PostCard.tsx";
import { Header } from "./Header.tsx";

interface IndexProps {
  state: BlogState;
  posts: Map<string, Post>;
}

export function Index({ state, posts }: IndexProps) {
  const postIndex = [];
  for (const [_key, post] of posts.entries()) {
    postIndex.push(post);
  }
  postIndex.sort(
    (a, b) => (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0),
  );

  return (
    <div class="home">
      {state.header || <Header state={state} />}

      <div class="max-w-screen-sm px-6 mx-auto">
        <div class="pt-16 lt-sm:pt-12 border-t-1 border-gray-300/80">
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
