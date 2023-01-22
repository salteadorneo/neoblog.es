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
      background: #efefef;
    }

    .up {
      background: #efefef;
      box-shadow: 12px 12px 24px #cbcbcb, 
                  -12px -12px 24px #ffffff;
    }

    header a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      aspect-ratio: 1;
      color: #b4b4b4;
      transition: all ease-in-out .3s;
      padding: 0 20px;
    }
    header a:hover {
      box-shadow: 6px 6px 12px #cbcbcb, 
                  -6px -6px 12px #ffffff;
    }
    header h1 {
      font-size: 38px;
      line-height: 38px;
    }
    header span {
      font-size: 14px;
      line-height: 14px;
    }

    .links a {
      border-radius: 50%;
      padding: 5px;
    }
    .links a:hover {
      color: black;
      box-shadow: 6px 6px 12px #cbcbcb, 
                  -6px -6px 12px #ffffff;
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
      transition: all ease-in-out 3s;
      margin-right: -2rem;
      border-radius: 24px;
      background: #efefef;
      box-shadow: inset 6px 6px 12px #cbcbcb, 
                  inset -6px -6px 12px #ffffff;
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
      border-radius: 4px;
      overflow: hidden;
      background: #efefef;
      display: grid;
      align-items: center;
      padding: 5px;
      filter: grayscale(100%);
    }

    article:hover .aspect-square {
      filter: grayscale(0);
    }

    iframe {
      max-width: 100vw;
      width: calc(720px + 100px);
      margin-left: -50px;
    }
    @media (max-width: 845px) {
      iframe {
        width: 100%;
        margin-left: 0;
      }
    }
  `,
});
