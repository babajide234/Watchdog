export interface ErrorRecord {
  id: number;
  project_id: string;
  type: string;
  message: string;
  stack: string | null;
  url: string | null;
  user_agent: string | null;
  created_at: string;
}

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
  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch errors");
  return res.json() as Promise<ErrorsResponse>;
}

export async function fetchError(id: number): Promise<ErrorRecord> {
  const res = await fetch(`${API_BASE}/errors/${id}`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch error");
  return res.json() as Promise<ErrorRecord>;
}

export async function deleteError(id: number): Promise<void> {
  await fetch(`${API_BASE}/errors/${id}`, { method: "DELETE" });
}
