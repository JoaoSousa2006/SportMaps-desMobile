import express from "express";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SESSION_COOKIE = "sportmaps_session";
const SESSION_LIFETIME = 30 * 24 * 60 * 60 * 1000;
const DATA_DIRECTORY = fileURLToPath(new URL("../data/", import.meta.url));
const DATA_FILE = `${DATA_DIRECTORY}store.json`;
function loadStore() {
    mkdirSync(DATA_DIRECTORY, { recursive: true });
    if (!existsSync(DATA_FILE))
        return { users: [], sessions: [] };
    return JSON.parse(readFileSync(DATA_FILE, "utf8"));
}
let store = loadStore();
function saveStore() {
    writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), { mode: 0o600 });
}
function publicUser(user) {
    return { id: user.id, name: user.name, email: user.email };
}
function sessionToken(req) {
    const cookie = req.headers.cookie?.split(";").map((part) => part.trim())
        .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
    if (!cookie)
        return null;
    try {
        return decodeURIComponent(cookie.slice(SESSION_COOKIE.length + 1));
    }
    catch {
        return null;
    }
}
function currentUser(req) {
    const token = sessionToken(req);
    if (!token)
        return null;
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const session = store.sessions.find((item) => item.tokenHash === tokenHash && item.expiresAt > Date.now());
    return session ? store.users.find((user) => user.id === session.userId) ?? null : null;
}
function setSessionCookie(res, token) {
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_LIFETIME / 1000}${secure}`);
}
function createSession(user, res) {
    const token = randomBytes(32).toString("base64url");
    store.sessions = store.sessions.filter((session) => session.expiresAt > Date.now());
    store.sessions.push({
        tokenHash: createHash("sha256").update(token).digest("hex"),
        userId: user.id,
        expiresAt: Date.now() + SESSION_LIFETIME,
    });
    saveStore();
    setSessionCookie(res, token);
    return { user: publicUser(user), cart: user.cart };
}
function hashPassword(password, salt) {
    return scryptSync(password, salt, 64).toString("hex");
}
function passwordsMatch(password, user) {
    const actual = Buffer.from(hashPassword(password, user.passwordSalt), "hex");
    const expected = Buffer.from(user.passwordHash, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}
function validCart(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return null;
    const cart = {};
    for (const [id, quantity] of Object.entries(value)) {
        if (!/^\d+$/.test(id) || !Number.isInteger(quantity) || quantity < 0 || quantity > 99) {
            return null;
        }
        if (quantity)
            cart[id] = quantity;
    }
    return cart;
}
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "online", app: "SPORT-MAPS", timestamp: new Date().toISOString() }));
app.get("/api/auth/session", (req, res) => {
    const user = currentUser(req);
    res.json(user ? { user: publicUser(user), cart: user.cart } : { user: null, cart: {} });
});
app.post("/api/auth/register", (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!name || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
        return res.status(400).json({ error: "Informe nome, e-mail válido e senha com pelo menos 6 caracteres." });
    }
    if (store.users.some((user) => user.email === email)) {
        return res.status(409).json({ error: "Este e-mail já possui uma conta." });
    }
    const passwordSalt = randomBytes(16).toString("hex");
    const user = {
        id: randomUUID(), name, email, passwordSalt,
        passwordHash: hashPassword(password, passwordSalt), cart: {},
    };
    store.users.push(user);
    return res.status(201).json(createSession(user, res));
});
app.post("/api/auth/login", (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    const user = store.users.find((item) => item.email === email);
    if (!user || !passwordsMatch(password, user)) {
        return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
    return res.json(createSession(user, res));
});
app.post("/api/auth/logout", (req, res) => {
    const token = sessionToken(req);
    if (token) {
        const tokenHash = createHash("sha256").update(token).digest("hex");
        store.sessions = store.sessions.filter((session) => session.tokenHash !== tokenHash);
        saveStore();
    }
    res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    return res.json({ ok: true });
});
app.put("/api/cart", (req, res) => {
    const user = currentUser(req);
    if (!user)
        return res.status(401).json({ error: "Entre na sua conta para salvar o carrinho." });
    const cart = validCart(req.body?.cart);
    if (!cart)
        return res.status(400).json({ error: "Carrinho inválido." });
    user.cart = cart;
    saveStore();
    return res.json({ cart: user.cart });
});
app.listen(PORT, () => console.log(`SPORT-MAPS API: http://localhost:${PORT}`));
