import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const refresh = async () => {
    const response = await fetch("/api/auth/status", { credentials: "include" });
    const data = await response.json();
    setAuthenticated(Boolean(data.authenticated));
    setReady(true);
  };

  useEffect(() => {
    refresh().catch(() => setReady(true));
  }, []);

  const login = async (password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, message: data.message || "Login failed" };
    }

    setAuthenticated(true);
    return { ok: true };
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuthenticated(false);
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    const response = await fetch("/api/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, message: data.message || "Password update failed" };
    }

    return { ok: true };
  };

  const value = useMemo(
    () => ({ ready, authenticated, login, logout, changePassword, refresh }),
    [ready, authenticated]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return context;
}
