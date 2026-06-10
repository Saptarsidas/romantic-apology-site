const AUTH_STORAGE_KEY = "romantic-admin-auth-v1";
const PASS_HASH_KEY = "romantic-admin-pass-hash-v1";
const DEFAULT_ADMIN_PASSWORD = "Saptarsidas@2026";

async function sha256(text) {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const enc = new TextEncoder().encode(text);
    const digest = await window.crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Fallback hash-like value for environments without SubtleCrypto.
  return btoa(unescape(encodeURIComponent(text)));
}

async function ensurePasswordHash() {
  const existing = localStorage.getItem(PASS_HASH_KEY);
  if (existing) return existing;

  const defaultHash = await sha256(DEFAULT_ADMIN_PASSWORD);
  localStorage.setItem(PASS_HASH_KEY, defaultHash);
  return defaultHash;
}

export async function verifyPassword(password) {
  const storedHash = await ensurePasswordHash();
  const inputHash = await sha256(password);
  return storedHash === inputHash;
}

export async function loginAdmin(password) {
  const ok = await verifyPassword(password);
  if (ok) {
    localStorage.setItem(AUTH_STORAGE_KEY, "1");
  }
  return ok;
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAdminAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "1";
}

export async function changeAdminPassword(newPassword) {
  const nextHash = await sha256(newPassword);
  localStorage.setItem(PASS_HASH_KEY, nextHash);
}

export { DEFAULT_ADMIN_PASSWORD };
