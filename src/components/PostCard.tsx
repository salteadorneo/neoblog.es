/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import type { DateFormat, Post } from "../types.d.ts";
import { Tags } from "./Tags.tsx";
import { Time } from "./Time.tsx";

export function PostCard(
  { post, dateFormat, lang }: {
    post: Post;
    dateFormat?: DateFormat;
    lang?: string;
  },
) {
  return (
    <article class="pt-12 first:pt-0 flex flex-col sm:flex-row gap-8">
      <a href={post.pathname}>
        {post.coverHtml && (
          <div
            class="h-24 aspect-square up"
            dangerouslySetInnerHTML={{ __html: post.coverHtml }}
          />
        )}
      </a>
      <div>
        <h3 class="text-2xl font-bold hover:text-gray-500">
          <a href={post.pathname}>
            {post.title}
          </a>
        </h3>
        <Tags tags={post.tags} />
        <p class="text-gray-500/80 text-sm">
          {post.author && <span>{post.author} {" "}</span>}
          <Time
            date={post.publishDate}
            dateFormat={dateFormat}
          />
        </p>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{post.snippet}</p>
      </div>
    </article>
  );
}
