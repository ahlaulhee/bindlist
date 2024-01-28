import { Bind } from "../vite-env";

export const formatBind = (bind: Bind) => {
  return `${bind.ctrl ? "Ctrl+" : ""}${bind.super ? "Super+" : ""}${
    bind.alt ? "Alt+" : ""
  }${bind.shift ? "Shift+" : ""}${bind.key}`;
};
