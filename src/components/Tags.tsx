/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";

export function Tags({ tags }: { tags?: string[] }) {
  return tags && tags.length > 0
    ? (
      <section class="flex gap-x-2 flex-wrap">
        {tags?.map((tag) => (
          <a
            class="text-primary font-bold hover:text-gray-500"
            href={`/?tag=${tag}`}
          >
            #{tag}
          </a>
        ))}
      </section>
    )
    : null;
}
