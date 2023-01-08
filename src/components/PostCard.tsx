/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import type { DateFormat, Post } from "../types.d.ts";
import { Tags } from "./Tags.tsx";

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
            class="pb-6 sm:w-36 sm:aspect-square"
            dangerouslySetInnerHTML={{ __html: post.coverHtml }}
          />
        )}
      </a>
      <div>
        <h3 class="text-2xl font-bold">
          <a href={post.pathname}>
            {post.title}
          </a>
        </h3>
        <Tags tags={post.tags} />
        <p class="text-gray-500/80">
          {post.author && <span>{post.author} {" "}</span>}
          <PrettyDate
            date={post.publishDate}
            dateFormat={dateFormat}
          />
        </p>
        <p class="mt-3 text-gray-600 dark:text-gray-400">{post.snippet}</p>
        <p class="mt-3">
          <a
            class="leading-tight text-gray-900 dark:text-gray-100 inline-block border-b-1 border-gray-600 hover:text-gray-500 hover:border-gray-500 transition-colors"
            href={post.pathname}
            title={`Read "${post.title}"`}
          >
            Leer más
          </a>
        </p>
      </div>
    </article>
  );
}

function PrettyDate(
  { date, dateFormat }: {
    date: Date;
    dateFormat?: DateFormat;
  },
) {
  let formatted;
  if (dateFormat) {
    formatted = dateFormat(date);
  } else {
    formatted = date.toISOString().split("T")[0];
  }
  return <time dateTime={date.toISOString()}>{formatted}</time>;
}
