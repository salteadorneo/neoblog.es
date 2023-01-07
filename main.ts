import blog from "./blog.tsx";

blog({
  author: "salteadorneo",
  title: "neoblog.es",
  description: "el blog de salteadorneo",
  lang: "es",
  // avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",
  // avatarClass: "rounded-full",
  links: [
    { title: "hola@salteadorneo.dev", url: "mailto:hola@salteadorneo.dev" },
    { title: "GitHub", url: "https://github.com/salteadorneo" },
    // { title: "Twitter", url: "https://twitter.com/denobot" },
  ],
  // theme: "light",
  dateFormat: (date) =>
    new Date(date).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
});
