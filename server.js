import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import defaultContent from "./src/data/defaultContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;
const distPath = path.join(__dirname, "dist");
const dataDir = path.join(__dirname, "data");
const uploadsDir = path.join(__dirname, "uploads");
const dbPath = path.join(dataDir, "site-db.json");
const cookieSecret = process.env.COOKIE_SECRET || "romantic-cookie-secret-change-me";
const adminPasswordSeed = process.env.ADMIN_PASSWORD || "Saptarsidas@2026";
const sessionCookieName = "romantic_admin_session";

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname || "") || ".png";
      callback(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${extension}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const sessionTtlMs = 7 * 24 * 60 * 60 * 1000;
let dbCache = null;
let writeQueue = Promise.resolve();

function normalizePage(page) {
  const positionX = Number(page.imagePositionX);
  const positionY = Number(page.imagePositionY);

  return {
    ...page,
    imageFit: page.imageFit || "cover",
    imagePositionX: Number.isFinite(positionX) ? Math.max(0, Math.min(100, positionX)) : 50,
    imagePositionY: Number.isFinite(positionY) ? Math.max(0, Math.min(100, positionY)) : 50,
  };
}

function createDefaultContent() {
  return Object.fromEntries(Object.entries(defaultContent).map(([key, value]) => [key, normalizePage(value)]));
}

function normalizeDb(db) {
  const content = db.content || createDefaultContent();
  const nextContent = {};

  for (const [key, fallback] of Object.entries(createDefaultContent())) {
    nextContent[key] = normalizePage({
      ...fallback,
      ...(content[key] || {}),
    });
  }

  return {
    admin: db.admin || {},
    sessions: db.sessions || {},
    content: nextContent,
  };
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function newSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function persistDb() {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(dataDir, { recursive: true });
    const tempPath = `${dbPath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(dbCache, null, 2), "utf8");
    await fs.rename(tempPath, dbPath);
  });
  return writeQueue;
}

async function ensureDb() {
  if (dbCache) return dbCache;

  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });

  try {
    const raw = await fs.readFile(dbPath, "utf8");
    dbCache = normalizeDb(JSON.parse(raw));
  } catch {
    dbCache = {
      admin: {
        passwordHash: bcrypt.hashSync(adminPasswordSeed, 12),
      },
      sessions: {},
      content: createDefaultContent(),
    };
    await persistDb();
  }

  if (!dbCache.admin.passwordHash) {
    dbCache.admin.passwordHash = bcrypt.hashSync(adminPasswordSeed, 12);
    await persistDb();
  }

  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  if (envPassword) {
    const matches = await bcrypt.compare(envPassword, dbCache.admin.passwordHash);
    if (!matches) {
      dbCache.admin.passwordHash = await bcrypt.hash(envPassword, 12);
      await persistDb();
    }
  }

  return dbCache;
}

function getSessionToken(req) {
  const value = req.signedCookies?.[sessionCookieName];
  return typeof value === "string" ? value : null;
}

async function cleanupSessions() {
  const db = await ensureDb();
  const now = Date.now();
  let dirty = false;

  for (const [tokenHash, session] of Object.entries(db.sessions)) {
    if (!session || session.expiresAt <= now) {
      delete db.sessions[tokenHash];
      dirty = true;
    }
  }

  if (dirty) {
    await persistDb();
  }
}

async function isAuthenticated(req) {
  const db = await ensureDb();
  await cleanupSessions();
  const token = getSessionToken(req);
  if (!token) return false;
  return Boolean(db.sessions[hashToken(token)]);
}

async function authMiddleware(req, res, next) {
  if (await isAuthenticated(req)) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

function setAuthCookie(res, token) {
  res.cookie(sessionCookieName, token, {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionTtlMs,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(sessionCookieName, {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function sanitizePageUpdate(pageKey, updates) {
  if (!createDefaultContent()[pageKey]) return null;

  const allowed = [
    "title",
    "subtitle",
    "imageSrc",
    "imageAlt",
    "imageLabel",
    "imageFit",
    "imagePositionX",
    "imagePositionY",
  ];

  const safe = {};
  for (const key of allowed) {
    if (updates[key] !== undefined) safe[key] = updates[key];
  }

  if (safe.imageFit && !["cover", "contain"].includes(safe.imageFit)) {
    safe.imageFit = "cover";
  }
  if (safe.imagePositionX !== undefined) {
    const positionX = Number(safe.imagePositionX);
    safe.imagePositionX = Number.isFinite(positionX) ? Math.max(0, Math.min(100, positionX)) : 50;
  }
  if (safe.imagePositionY !== undefined) {
    const positionY = Number(safe.imagePositionY);
    safe.imagePositionY = Number.isFinite(positionY) ? Math.max(0, Math.min(100, positionY)) : 50;
  }

  return safe;
}

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser(cookieSecret));
app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));
app.use(express.static(distPath));

app.get("/api/health", async (_req, res) => {
  await ensureDb();
  res.json({ ok: true });
});

app.get("/api/content", async (_req, res) => {
  const db = await ensureDb();
  res.json({ content: db.content });
});

app.put("/api/content/:pageKey", authMiddleware, async (req, res) => {
  const db = await ensureDb();
  const updates = sanitizePageUpdate(req.params.pageKey, req.body || {});
  if (!updates) {
    return res.status(400).json({ message: "Invalid page or fields." });
  }

  db.content[req.params.pageKey] = normalizePage({
    ...db.content[req.params.pageKey],
    ...updates,
  });
  await persistDb();
  return res.json({ content: db.content, page: db.content[req.params.pageKey] });
});

app.post("/api/content/reset", authMiddleware, async (_req, res) => {
  const db = await ensureDb();
  db.content = createDefaultContent();
  await persistDb();
  return res.json({ content: db.content });
});

app.get("/api/auth/status", async (req, res) => {
  res.json({ authenticated: await isAuthenticated(req) });
});

app.post("/api/auth/login", async (req, res) => {
  const db = await ensureDb();
  const { password } = req.body || {};

  if (typeof password !== "string" || !password.trim()) {
    return res.status(400).json({ message: "Password is required." });
  }

  const ok = await bcrypt.compare(password, db.admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Wrong password." });
  }

  const token = newSessionToken();
  db.sessions[hashToken(token)] = {
    createdAt: Date.now(),
    expiresAt: Date.now() + sessionTtlMs,
  };
  await persistDb();
  setAuthCookie(res, token);
  return res.json({ ok: true });
});

app.post("/api/auth/logout", async (req, res) => {
  const db = await ensureDb();
  const token = getSessionToken(req);
  if (token) {
    delete db.sessions[hashToken(token)];
    await persistDb();
  }
  clearAuthCookie(res);
  return res.json({ ok: true });
});

app.post("/api/auth/password", authMiddleware, async (req, res) => {
  const db = await ensureDb();
  const { currentPassword, newPassword } = req.body || {};

  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return res.status(400).json({ message: "Missing password fields." });
  }

  const ok = await bcrypt.compare(currentPassword, db.admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Current password is wrong." });
  }

  if (newPassword.trim().length < 10) {
    return res.status(400).json({ message: "New password must be at least 10 characters." });
  }

  db.admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await persistDb();
  return res.json({ ok: true });
});

app.post("/api/admin/upload/:pageKey", authMiddleware, upload.single("image"), async (req, res) => {
  const db = await ensureDb();
  const pageKey = req.params.pageKey;

  if (!createDefaultContent()[pageKey]) {
    return res.status(400).json({ message: "Invalid page." });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const imageSrc = `/uploads/${req.file.filename}`;
  db.content[pageKey] = normalizePage({
    ...db.content[pageKey],
    imageSrc,
    imageAlt: req.file.originalname,
  });
  await persistDb();
  return res.json({ imageSrc, content: db.content[pageKey] });
});

app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) return next();
  if (req.accepts("html")) {
    return res.sendFile(path.join(distPath, "index.html"));
  }
  return next();
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
