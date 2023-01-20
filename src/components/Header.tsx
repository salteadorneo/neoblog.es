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
      <div class="flex flex-col sm:flex-row items-center justify-between px-4 max-w-screen-md mx-auto">
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
          <a href="/" class="up">
            <h1>NEO</h1>
            <span>{state.description}</span>
          </a>
          {
            /* {state.description && (
            <p
              class="mt-2 text-lg text-gray-600 dark:text-gray-400"
              style={{ color: state.coverTextColor }}
            >
              {state.description}
            </p>
          )} */
          }
        </div>
        <div className="flex items-center gap-6">
          <form action="/">
            <div class="search">
              <input
                type="text"
                autocomplete="off"
                class="search__input"
                name="q"
                placeholder="Buscar"
                defaultValue={searchParams.get("q") ?? ""}
              />
              <button class="search__button">
                <svg
                  class="search__icon"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                    </path>
                  </g>
                </svg>
              </button>
            </div>
          </form>
          {state.links && (
            <nav class="flex gap-2 links">
              {state.links.map((link) => <Link link={link} />)}
            </nav>
          )}
        </div>
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
