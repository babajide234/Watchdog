/**
 * Configuration for the Watchdog SDK
 */
export interface WatchdogConfig {
  endpoint: string;
  projectId: string;
  disabled?: boolean;
  headers?: Record<string, string>;
}

/**
 * Event payload sent from the SDK to the API
 */
export interface WatchdogEvent {
  projectId: string;
  type: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  sessionId?: string;
  breadcrumbs?: Breadcrumb[];
  extra?: Record<string, unknown>;
}

export interface Breadcrumb {
  timestamp: string;
  category: string;
  message: string;
  level: "debug" | "info" | "warning" | "error";
}

/**
 * Database record for an error event
 */
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

/**
 * Data Transfer Object for creating a new error event
 */
export type CreateErrorDto = WatchdogEvent;
