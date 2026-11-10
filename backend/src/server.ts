import express from "express";
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "online", app: "SPORT-MAPS", timestamp: new Date().toISOString() }));
app.listen(PORT, () => console.log(`SPORT-MAPS API: http://localhost:${PORT}`));
