/// <reference types="vite/client" />
export interface Keybind {
  action: string;
  bind: Bind;
  category: string;
}

export interface Bind {
  super: boolean;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  key: string;
}
