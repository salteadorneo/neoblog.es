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
      background: #6a7c71;
    }

    .up {
      background: #6a7c71;
      box-shadow: -5px 5px 10px #536158,
                  5px -5px 10px #81978a;
    }

    header h1 {
      border-radius: 0;
      color: #b4b4b4;
      display: grid;
      align-items: center;
      justify-content: center;
      aspect-ratio: 3/2;
      padding: 0 20px;
    }

    .links a {
      border-radius: 50%;
      padding: 5px;
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
      border: none;
      color: #b4b4b4;
      padding: .5rem 1rem;
      border-radius: 30px;
      transition: all ease-in-out 3s;
      margin-right: -2rem;
      background-color: #6a7c71;
      box-shadow: inset -5px 5px 10px #536158,
                  inset 5px -5px 10px #81978a;
    }
    .search__input:focus {
      outline: none;
    }
    .search__input::-webkit-input-placeholder {
      color: #b4b4b4;
    }
    .search__button {
      border: none;
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

    article .aspect-square {
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
