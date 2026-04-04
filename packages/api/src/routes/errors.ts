import { Router, Request, Response } from "express";
import pool from "../db";
import type { CreateErrorDto, ErrorRecord } from "@watchdog/types";

const router: Router = Router();

/**
 * POST /errors
 * Ingest a new error event from the SDK
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Partial<CreateErrorDto>;

  if (!body.projectId || !body.message) {
    res.status(400).json({ error: "projectId and message are required" });
    return;
  }

  try {
    const result = await pool.query<{ id: string }>(
      `INSERT INTO errors (project_id, type, message, stack, url, user_agent, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        body.projectId,
        body.type ?? "error",
        body.message,
        body.stack ?? null,
        body.url ?? null,
        body.userAgent ?? null,
        body.timestamp ? new Date(body.timestamp) : new Date(),
      ]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("[POST /errors]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /errors
 * Return latest errors, optionally filtered by projectId
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { projectId, limit = "100", offset = "0" } = req.query as Record<string, string>;

  const limitNum = Math.min(parseInt(limit, 10) || 100, 500);
  const offsetNum = parseInt(offset, 10) || 0;

  try {
    let dataQuery: string;
    let countQuery: string;
    let params: (string | number)[];

    if (projectId) {
      dataQuery = `
        SELECT * FROM errors
        WHERE project_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      `;
      countQuery = `SELECT COUNT(*)::int AS count FROM errors WHERE project_id = $1`;
      params = [projectId, limitNum, offsetNum];
    } else {
      dataQuery = `
        SELECT * FROM errors
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `;
      countQuery = `SELECT COUNT(*)::int AS count FROM errors`;
      params = [limitNum, offsetNum];
    }

    const [dataResult, countResult] = await Promise.all([
      pool.query<ErrorRecord>(dataQuery, params),
      pool.query<{ count: number }>(countQuery, projectId ? [projectId] : []),
    ]);

    res.json({
      errors: dataResult.rows,
      total: countResult.rows[0].count,
      limit: limitNum,
      offset: offsetNum,
    });
  } catch (err) {
    console.error("[GET /errors]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /errors/:id
 * Return a single error by UUID
 */
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query<ErrorRecord>(
      "SELECT * FROM errors WHERE id = $1",
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("[GET /errors/:id]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE /errors/:id
 * Delete a single error by UUID
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      "DELETE FROM errors WHERE id = $1",
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("[DELETE /errors/:id]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
