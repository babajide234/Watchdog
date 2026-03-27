import type { WatchdogConfig, WatchdogEvent } from "./types";

let config: WatchdogConfig | null = null;

function sendEvent(event: WatchdogEvent): void {
  if (!config || config.disabled) return;

  const body = JSON.stringify(event);

  // Prefer sendBeacon for reliability during page unloads
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(config.endpoint, blob);
  } else {
    fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.headers ?? {}),
      },
      body,
      keepalive: true,
    }).catch(() => {
      // Silently fail — monitoring must never break the host app
    });
  }
}

function buildEvent(
  type: WatchdogEvent["type"],
  message: string,
  stack?: string
): WatchdogEvent {
  return {
    projectId: config!.projectId,
    type,
    message,
    stack,
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
  };
}

function handleGlobalError(
  _event: Event | string,
  _source?: string,
  _lineno?: number,
  _colno?: number,
  error?: Error
): void {
  const message =
    error?.message ??
    (typeof _event === "string" ? _event : "Unknown error");
  const stack = error?.stack;
  sendEvent(buildEvent("error", message, stack));
}

function handleUnhandledRejection(event: PromiseRejectionEvent): void {
  const reason = event.reason;
  const message =
    reason instanceof Error
      ? reason.message
      : typeof reason === "string"
      ? reason
      : "Unhandled promise rejection";
  const stack = reason instanceof Error ? reason.stack : undefined;
  sendEvent(buildEvent("unhandledrejection", message, stack));
}

/**
 * Initialize the React Watchdog error monitoring SDK.
 *
 * @example
 * import { initMonitor } from "react-watchdog";
 *
 * initMonitor({
 *   endpoint: "http://localhost:4000/errors",
 *   projectId: "my-project",
 * });
 */
export function initMonitor(userConfig: WatchdogConfig): void {
  if (typeof window === "undefined") return; // SSR guard

  config = userConfig;

  if (config.disabled) return;

  window.onerror = handleGlobalError;
  window.addEventListener("unhandledrejection", handleUnhandledRejection);
}

/**
 * Manually capture an error or message.
 */
export function captureError(error: Error | string): void {
  if (!config || config.disabled) return;

  const isError = error instanceof Error;
  const message = isError ? error.message : error;
  const stack = isError ? error.stack : undefined;
  sendEvent(buildEvent("error", message, stack));
}

/**
 * Destroy the monitor and remove all event listeners.
 */
export function destroyMonitor(): void {
  if (typeof window === "undefined") return;
  window.onerror = null;
  window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  config = null;
}

export type { WatchdogConfig, WatchdogEvent } from "./types";
