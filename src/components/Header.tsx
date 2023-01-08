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
  req: Request;
  state: BlogState;
}

export function Header({ req, state }: IndexProps) {
  const { pathname, searchParams } = new URL(req?.url ?? "/", import.meta.url);

  return (
    <header
      class="w-full bg-cover bg-center bg-no-repeat pt-8"
      style={{
        backgroundImage: state.cover ? `url(${state.cover})` : undefined,
      }}
    >
      <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between px-4 max-w-screen-sm mx-auto">
        <div class="flex flex-col">
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
            class="text-4xl text-gray-900 dark:text-gray-100 font-bold"
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
        <form action="/" class="mt-6 sm:mt-2">
          <input
            type="text"
            name="q"
            placeholder="Buscar"
            class="p-1 px-3"
            defaultValue={searchParams.get("q") ?? ""}
          />
        </form>
      </div>
    </header>
  );
}

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.487 3.538c-4.39 0-7.949 3.556-7.949 7.94 0 4.383 3.558 7.938 7.95 7.938 2.19 0 4.172-.884 5.61-2.316a7.906 7.906 0 0 0 2.338-5.623c0-4.383-3.558-7.939-7.949-7.939ZM2 11.478C2 6.241 6.248 2 11.487 2s9.487 4.242 9.487 9.477a9.436 9.436 0 0 1-2.266 6.147l3.066 3.063a.77.77 0 0 1-1.087 1.088l-3.069-3.065a9.458 9.458 0 0 1-6.13 2.244C6.247 20.954 2 16.712 2 11.477Z"
      fill="#030D45"
    />
  </svg>
);
