import blog from "./blog.tsx";

blog({
  author: "salteadorneo",
  title: "neoblog.es",
  description: "The blog description.",
  avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",
  avatarClass: "rounded-full",
  links: [
    { title: "hola@salteadorneo.dev", url: "mailto:hola@salteadorneo.dev" },
    { title: "GitHub", url: "https://github.com/salteadorneo" },
    // { title: "Twitter", url: "https://twitter.com/denobot" },
  ],
});
