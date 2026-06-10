import { createContext, useContext, useEffect, useMemo, useState } from "react";
import defaultContent from "../data/defaultContent";

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/content", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.content) {
          setContent(data.content);
        }
      })
      .catch(() => setContent(defaultContent))
      .finally(() => setReady(true));
  }, []);

  const updatePage = async (pageKey, updates) => {
    const response = await fetch(`/api/content/${pageKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Update failed");
    }

    setContent(data.content);
    return data.content;
  };

  const resetContent = async () => {
    const response = await fetch("/api/content/reset", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Reset failed");
    }

    setContent(data.content);
    return data.content;
  };

  const value = useMemo(
    () => ({
      content,
      ready,
      updatePage,
      resetContent,
    }),
    [content, ready]
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
