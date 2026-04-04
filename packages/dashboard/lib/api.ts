import type { ErrorRecord } from "@watchdog/types";

export interface ErrorsResponse {
  errors: ErrorRecord[];
  total: number;
  limit: number;
  offset: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchErrors(projectId?: string): Promise<ErrorsResponse> {
  const url = new URL(`${API_BASE}/errors`);
  if (projectId) url.searchParams.set("projectId", projectId);
  
  const res = await fetch(url.toString(), { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch errors");
  return res.json() as Promise<ErrorsResponse>;
}

export async function fetchError(id: string): Promise<ErrorRecord> {
  const res = await fetch(`${API_BASE}/errors/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch error");
  return res.json() as Promise<ErrorRecord>;
}

export async function deleteError(id: string): Promise<void> {
  await fetch(`${API_BASE}/errors/${id}`, { method: "DELETE" });
}
