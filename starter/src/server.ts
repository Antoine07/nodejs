import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

import { pool } from "./db";

function sendJson<T>(res: ServerResponse, status: number, data: T): void {
  res.writeHead(status, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const method: string = req.method ?? "GET";
  const rawUrl: string = req.url ?? "/";
  const path: string = rawUrl.split("?", 2)[0] ?? "/";

  if (method === "GET" && path === "/") {
    return sendJson(res, 200, { ok: true, message: "Node 24 + TypeScript" });
  }

  if (method === "GET" && path === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (method === "GET" && path === "/db") {
    try {
      const result = await pool.query<{ now: string }>("SELECT NOW() AS now");
      return sendJson(res, 200, result.rows[0] ?? null);
    } catch (error) {
      return sendJson(res, 500, {
        error: "DB error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return sendJson(res, 404, { error: "Not Found" });
}

const server = createServer(handler);

server.listen(3001, "0.0.0.0", (): void => {
  console.log("Server running on http://localhost:3001");
});
