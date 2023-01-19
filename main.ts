import blog from "./blog.tsx";

blog({
  author: "salteadorneo",
  authorUrl: "https://salteadorneo.dev",
  title: "El blog de /salteadorneo/",
  description: "neoblog.es",
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
  ],
  theme: "light",
  dateFormat: (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
  showHeaderOnPostPage: true,
  style: `
    body {
      background: #bdbdbd;
    }
    header h1 {
      border-radius: 30px;
      background: #bdbdbd;
      box-shadow: -8px -8px 16px #acacac, 8px 8px 16px #cecece;
      display: grid;
      align-items: center;
      justify-content: center;
      padding: 8px 24px;
    }
    article .aspect-square {
      padding: 10px;
      border-radius: 0px;
      background: #bdbdbd;
      box-shadow: -8px -8px 16px #acacac, 8px 8px 16px #cecece;
    }

    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }
    .search__input {
      font-family: inherit;
      font-size: inherit;
      background-color: #f4f2f2;
      border: none;
      color: #646464;
      padding: .5rem 1rem;
      border-radius: 30px;
      transition: all ease-in-out .5s;
      margin-right: -2rem;
    }
    .search__input:hover, .search__input:focus {
      box-shadow: 0 0 1em #00000013;
    }
    .search__input:focus {
      outline: none;
      background-color: #f0eeee;
    }
    .search__input::-webkit-input-placeholder {
      font-weight: 100;
      color: #ccc;
    }
    .search__input:focus + .search__button {
      background-color: #f0eeee;
    }
    .search__button {
      border: none;
      background-color: #f4f2f2;
      margin-top: .1em;
    }
    .search__button:hover {
      cursor: pointer;
    }
    .search__icon {
      height: 1.3em;
      width: 1.3em;
      fill: #b4b4b4;
    }

    iframe {
      max-width: 100vw;
      width: calc(590px + 100px);
      margin-left: -50px;
    }
    @media (max-width: 690px) {
      iframe {
        width: 100%;
        margin-left: 0;
      }
    }
  `,
});
