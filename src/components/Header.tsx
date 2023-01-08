/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import type { BlogState } from "../types.d.ts";

import { Link } from "./Link.tsx";

interface IndexProps {
  state: BlogState;
}

export function Header({ state }: IndexProps) {
  return (
    <header
      class="w-full bg-cover bg-center bg-no-repeat pt-8"
      style={{
        backgroundImage: state.cover ? `url(${state.cover})` : undefined,
      }}
    >
      <div class="max-w-screen-sm h-full px-6 mx-auto flex flex-col">
        {state.avatar && (
          <a
            href="/"
            class={[
              "bg-cover bg-center bg-no-repeat w-25 h-25 border-4 border-white",
              state.avatarClass ?? "rounded-full",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ backgroundImage: `url(${state.avatar})` }}
          />
        )}
        <h1
          class="mt-3 text-4xl text-gray-900 dark:text-gray-100 font-bold"
          style={{ color: state.coverTextColor }}
        >
          <a href="/">
            {state.title ?? ""}
          </a>
        </h1>
        {state.description && (
          <p
            class="text-lg text-gray-600 dark:text-gray-400"
            style={{ color: state.coverTextColor }}
          >
            {state.description}
          </p>
        )}
        {state.links && (
          <nav class="mt-3 flex gap-2">
            {state.links.map((link) => <Link link={link} />)}
          </nav>
        )}
      </div>
    </header>
  );
}
