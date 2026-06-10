import { createContext, useContext, useEffect, useMemo, useState } from "react";
import defaultContent from "../data/defaultContent";

const STORAGE_KEY = "romantic-site-content-v1";
const SiteContentContext = createContext(null);

function mergeWithDefaults(saved) {
  if (!saved || typeof saved !== "object") return defaultContent;

  const merged = { ...defaultContent };

  Object.keys(defaultContent).forEach((pageKey) => {
    merged[pageKey] = {
      ...defaultContent[pageKey],
      ...(saved[pageKey] || {}),
    };
  });

  return merged;
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setContent(mergeWithDefaults(parsed));
    } catch {
      setContent(defaultContent);
    }
  }, []);

  const updatePage = (pageKey, field, value) => {
    setContent((prev) => {
      const next = {
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          [field]: value,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetContent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(defaultContent);
  };

  const value = useMemo(
    () => ({
      content,
      updatePage,
      resetContent,
    }),
    [content]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used inside SiteContentProvider");
  }
  return ctx;
}
