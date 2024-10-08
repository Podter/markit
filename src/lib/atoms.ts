import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const docAtom = atom<string | null>(null);
export const docContentAtom = atom("");
export const savedAtom = atom(true);

export const previewOpenAtom = atom(true);
export const syncScrollAtom = atomWithStorage("sync-scroll", true);

export const themeAtom = atomWithStorage("theme", "system");
export const resolvedThemeAtom = atom((get) => {
  const theme = get(themeAtom);
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
    return systemTheme;
  } else {
    root.classList.add(theme);
    return theme;
  }
});
