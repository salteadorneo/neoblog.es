/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "../deps.ts";
import { DateFormat } from "../types.d.ts";

export function Time(
  { date, dateFormat }: {
    date: Date;
    dateFormat?: DateFormat;
  },
) {
  if (!date) return null;
  let formatted;
  if (dateFormat) {
    formatted = dateFormat(date);
  } else {
    formatted = date?.toISOString().split("T")[0];
  }
  return <time dateTime={date.toISOString()}>{formatted}</time>;
}
