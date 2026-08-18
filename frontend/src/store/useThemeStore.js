import { create } from "zustand";

const getSavedTheme = () => {
  if (typeof window === "undefined") return "cupcake";
  return localStorage.getItem("chat-theme") || document.documentElement.dataset.theme || "cupcake";
};

export const useThemeStore = create((set) => ({
  theme: getSavedTheme(),
  setTheme: (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
