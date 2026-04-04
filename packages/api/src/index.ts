import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDb } from "./db";
import errorsRouter from "./routes/errors";

const app: express.Application = express();
const PORT = process.env.PORT ?? 4000;

// Middleware
app.use((req, res, next) => {
  // Always allow private network access for development
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/errors", errorsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[Watchdog API Error]", err);
  res.status(500).json({ error: "Internal server error" });
});

// Bootstrap — init DB schema then start server
async function bootstrap(): Promise<void> {
  try {
    await initDb();
    console.log("✅ Database schema ready");
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
    console.error("   Make sure PostgreSQL is running and DATABASE_URL is set correctly.");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`\n🐕 React Watchdog API running on http://localhost:${PORT}`);
    console.log(`   POST /errors  — Ingest error events`);
    console.log(`   GET  /errors  — List errors`);
    console.log(`   GET  /health  — Health check\n`);
  });
}

void bootstrap();

export default app;
