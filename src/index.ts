import "./style.css";
import {
  defaultValueCtx,
  Editor,
  themeManagerCtx,
  ThemeIcon
} from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { commonmark, image, link } from "@milkdown/preset-commonmark";
import { emoji } from "@milkdown/plugin-emoji";
import {
  createDropdownItem,
  defaultActions,
  slash,
  slashPlugin,
  WrappedAction
} from "@milkdown/plugin-slash";
import { tooltip } from "@milkdown/plugin-tooltip";
import { menu, menuPlugin, defaultConfig } from "@milkdown/plugin-menu";
import { getIcon } from "./icon";

Editor.make()
  .config((ctx) => {
    ctx.set(defaultValueCtx, "# Milkdown i18n example");
  })
  .use(
    nord.override((emotion, manager) => {
      manager.set(ThemeIcon, (icon) => {
        if (!icon) return;

        return getIcon(icon);
      });
    })
  )
  .use(
    commonmark
      .configure(link, {
        input: {
          placeholder: "👻",
          buttonText: "✅"
        }
      })
      .configure(image, {
        input: {
          placeholder: "👻",
          buttonText: "✅"
        }
      })
  )
  .use(emoji)
  .use(
    slash.configure(slashPlugin, {
      config: (ctx) => {
        return ({ content, isTopLevel }) => {
          if (!isTopLevel) return null;

          if (!content) {
            return { placeholder: "👩🏻‍💻 ☞ /" };
          }

          const mapActions = (action: WrappedAction) => {
            const { id = "" } = action;
            switch (id) {
              case "h1":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "➡️1",
                  "h1"
                );
                return action;
              case "h2":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "➡️2",
                  "h2"
                );
                return action;
              case "h3":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "➡️3",
                  "h3"
                );
                return action;
              case "bulletList":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "✳️",
                  "bulletList"
                );
                return action;
              case "orderedList":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "🔯",
                  "orderedList"
                );
                return action;
              case "image":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "🖼️",
                  "image"
                );
                return action;
              case "blockquote":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "🔮",
                  "quote"
                );
                return action;
              case "code":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "📖",
                  "code"
                );
                return action;
              case "divider":
                action.dom = createDropdownItem(
                  ctx.get(themeManagerCtx),
                  "🦯",
                  "divider"
                );
                return action;
              default:
                return action;
            }
          };

          if (content.startsWith("/")) {
            return content === "/"
              ? {
                  placeholder: "🤔 ...",
                  actions: defaultActions(ctx).map(mapActions)
                }
              : {
                  actions: defaultActions(ctx, content).map(mapActions)
                };
          }

          return null;
        };
      }
    })
  )
  .use(tooltip)
  .use(
    menu.configure(menuPlugin, {
      config: defaultConfig.map((xs) => {
        return xs.map((x) => {
          if (x.type !== "select") return x;

          switch (x.text) {
            case "Heading": {
              return {
                ...x,
                text: "🏁",
                options: [
                  { id: "1", text: "H 1️⃣" },
                  { id: "2", text: "H 2️⃣" },
                  { id: "3", text: "H 3️⃣" },
                  { id: "0", text: "P 0️⃣" }
                ]
              };
            }
            default:
              return x;
          }
        });
      })
    })
  )
  .create();
