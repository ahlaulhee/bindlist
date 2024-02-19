import { Bind } from "../vite-env";

export const formatBind = (bind: Bind) => {
  return `${bind.ctrl ? "<ctrl>" : ""}${bind.super ? "<supr>" : ""}${
    bind.alt ? "<alt>" : ""
  }${bind.shift ? "<shift>" : ""}+${bind.key}`;
};
