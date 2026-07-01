import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "devtrack-theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    // Enable smooth transitions only after first hydration
    document.documentElement.classList.add("theme-ready");
  }, []);

  const setTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setThemeState(next);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe fallback so components don't crash if provider is missing.
    return {
      theme: "dark" as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    } satisfies ThemeContextValue;
  }
  return ctx;
}

/** Inlined into <head> before hydration to prevent FOUC and set the correct class. */
export const themeBootstrapScript = `(function(){try{var k="${STORAGE_KEY}";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches;var light=s?s==="light":m;var r=document.documentElement;if(light){r.classList.add("light");}else{r.classList.remove("light");}}catch(e){}})();`;
