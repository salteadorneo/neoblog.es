import blog from "./blog.tsx";

blog({
  author: "salteadorneo",
  title: "neoblog.es",
  description: "El blog de /salteadorneo/",
  lang: "es",
  links: [
    {
      title: "GitHub",
      url: "https://github.com/salteadorneo",
      target: "_blank",
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/cristianadan/",
      target: "_blank",
    },
    {
      title: "hola@salteadorneo.dev",
      url: "mailto:hola@salteadorneo.dev",
      target: "_blank",
    },
    { title: "Sobre mí", url: "https://salteadorneo.dev", target: "_blank" },
  ],
  dateFormat: (date) =>
    new Date(date).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  showHeaderOnPostPage: true,
});
