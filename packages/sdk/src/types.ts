export interface WatchdogConfig {
  /** The endpoint URL of your React Watchdog API */
  endpoint: string;
  /** Your project identifier */
  projectId: string;
  /** Optional: Disable error capturing (useful in development) */
  disabled?: boolean;
  /** Optional: Custom headers to include with each request */
  headers?: Record<string, string>;
}

export interface WatchdogEvent {
  projectId: string;
  type: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  // Future-ready fields
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
