"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "blue";

const STORAGE_KEY = "tw-brand-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && ["light", "dark", "blue"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    if (newTheme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const order: Theme[] = ["light", "dark", "blue"];
    const currentIndex = order.indexOf(theme);
    const nextTheme = order[(currentIndex + 1) % order.length];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return { theme, setTheme, cycleTheme, mounted };
}
