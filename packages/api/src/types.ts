export interface ErrorRecord {
  id: string;           // UUID
  project_id: string;
  type: string;
  message: string;
  stack: string | null;
  url: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface CreateErrorDto {
  projectId: string;
  type: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
}
