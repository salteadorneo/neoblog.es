/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";

export function Tooltip({ children }: { children: string }) {
  return (
    <div
      className={"absolute top-10 px-3 h-8 !leading-8 bg-black/80 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"}
    >
      <span
        className="block absolute text-black/80"
        style={{ top: -4, left: "50%", marginLeft: -4.5, width: 9, height: 4 }}
      >
        <svg
          className="absolute"
          width="9"
          height="4"
          viewBox="0 0 9 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.83564 0.590546C4.21452 0.253758 4.78548 0.253758 5.16436 0.590546L9 4H0L3.83564 0.590546Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {children}
    </div>
  );
}
