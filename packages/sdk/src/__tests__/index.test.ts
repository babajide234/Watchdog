import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureError,
  destroyMonitor,
  initMonitor,
} from "../index";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ENDPOINT = "http://localhost:4000/errors";
const PROJECT_ID = "test-project";

function makeConfig(overrides: Partial<Parameters<typeof initMonitor>[0]> = {}) {
  return { endpoint: ENDPOINT, projectId: PROJECT_ID, ...overrides };
}

/** Pull the last body sent via fetch as a parsed object. */
function lastFetchBody() {
  const calls = (fetch as ReturnType<typeof vi.fn>).mock.calls;
  const lastCall = calls[calls.length - 1];
  return JSON.parse(lastCall[1].body as string);
}

/** Pull the last body sent via sendBeacon as a parsed object. */
async function lastBeaconBody() {
  const calls = (navigator.sendBeacon as ReturnType<typeof vi.fn>).mock.calls;
  const lastCall = calls[calls.length - 1];
  const blob: Blob = lastCall[1];
  // jsdom doesn't implement Blob.text() — use FileReader instead
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(JSON.parse(reader.result as string));
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

// ---------------------------------------------------------------------------
// Setup / Teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  // Mock fetch so no real network requests are made
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response(null, { status: 200 }))
  );

  // Default: sendBeacon is NOT available (forces fetch path)
  Object.defineProperty(navigator, "sendBeacon", {
    value: undefined,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  destroyMonitor();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// initMonitor
// ---------------------------------------------------------------------------

describe("initMonitor", () => {
  it("registers window.onerror", () => {
    initMonitor(makeConfig());
    expect(window.onerror).toBeTypeOf("function");
  });

  it("registers unhandledrejection listener", () => {
    const spy = vi.spyOn(window, "addEventListener");
    initMonitor(makeConfig());
    const registered = spy.mock.calls.some(([event]) => event === "unhandledrejection");
    expect(registered).toBe(true);
  });

  it("does nothing when disabled: true", () => {
    initMonitor(makeConfig({ disabled: true }));
    expect(window.onerror).toBeNull();
  });

  it("is idempotent — calling twice does not throw", () => {
    expect(() => {
      initMonitor(makeConfig());
      initMonitor(makeConfig());
    }).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// captureError — fetch path (no sendBeacon)
// ---------------------------------------------------------------------------

describe("captureError (fetch path)", () => {
  beforeEach(() => initMonitor(makeConfig()));

  it("sends an event via fetch when sendBeacon is unavailable", async () => {
    captureError(new Error("boom"));
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("sends correct projectId and type", async () => {
    captureError(new Error("test error"));
    const body = lastFetchBody();
    expect(body.projectId).toBe(PROJECT_ID);
    expect(body.type).toBe("error");
  });

  it("includes the error message", async () => {
    captureError(new Error("something went wrong"));
    const body = lastFetchBody();
    expect(body.message).toBe("something went wrong");
  });

  it("includes the stack trace", async () => {
    const err = new Error("with stack");
    captureError(err);
    const body = lastFetchBody();
    expect(body.stack).toContain("with stack");
  });

  it("accepts a plain string", async () => {
    captureError("plain string error");
    const body = lastFetchBody();
    expect(body.message).toBe("plain string error");
    expect(body.stack).toBeUndefined();
  });

  it("includes a timestamp", async () => {
    captureError(new Error("ts check"));
    const body = lastFetchBody();
    expect(new Date(body.timestamp).toString()).not.toBe("Invalid Date");
  });

  it("includes the current URL", async () => {
    captureError(new Error("url check"));
    const body = lastFetchBody();
    expect(body.url).toBe(window.location.href);
  });

  it("does NOT send when disabled", async () => {
    destroyMonitor();
    initMonitor(makeConfig({ disabled: true }));
    captureError(new Error("should not send"));
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does NOT send before initMonitor is called", async () => {
    destroyMonitor(); // reset config to null
    captureError(new Error("no config"));
    expect(fetch).not.toHaveBeenCalled();
  });

  it("includes custom headers in fetch call", async () => {
    destroyMonitor();
    initMonitor(makeConfig({ headers: { "X-Auth": "secret" } }));
    captureError(new Error("headers test"));
    const [, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect((init as RequestInit).headers).toMatchObject({ "X-Auth": "secret" });
  });
});

// ---------------------------------------------------------------------------
// captureError — sendBeacon path
// ---------------------------------------------------------------------------

describe("captureError (sendBeacon path)", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "sendBeacon", {
      value: vi.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });
    initMonitor(makeConfig());
  });

  it("prefers sendBeacon over fetch", async () => {
    captureError(new Error("beacon test"));
    expect(navigator.sendBeacon).toHaveBeenCalledOnce();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("sends to the correct endpoint", async () => {
    captureError(new Error("endpoint check"));
    const [url] = (navigator.sendBeacon as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe(ENDPOINT);
  });

  it("sends a Blob with the right content", async () => {
    captureError(new Error("blob test"));
    const body = await lastBeaconBody();
    expect(body.message).toBe("blob test");
    expect(body.type).toBe("error");
  });
});

// ---------------------------------------------------------------------------
// Global onerror handler
// ---------------------------------------------------------------------------

describe("window.onerror handler", () => {
  beforeEach(() => initMonitor(makeConfig()));

  it("captures errors thrown via window.onerror", async () => {
    const err = new Error("global error");
    window.onerror("error", "file.js", 1, 1, err);
    const body = lastFetchBody();
    expect(body.message).toBe("global error");
    expect(body.type).toBe("error");
  });

  it("falls back to event string when no Error object is given", async () => {
    window.onerror("Script error", "file.js", 0, 0, undefined);
    const body = lastFetchBody();
    expect(body.message).toBe("Script error");
  });
});

// ---------------------------------------------------------------------------
// unhandledrejection handler
// ---------------------------------------------------------------------------

describe("unhandledrejection handler", () => {
  beforeEach(() => initMonitor(makeConfig()));

  it("captures promise rejections with an Error reason", async () => {
    const err = new Error("promise rejected");
    window.dispatchEvent(
      Object.assign(new Event("unhandledrejection"), { reason: err })
    );
    const body = lastFetchBody();
    expect(body.message).toBe("promise rejected");
    expect(body.type).toBe("unhandledrejection");
  });

  it("captures promise rejections with a string reason", async () => {
    window.dispatchEvent(
      Object.assign(new Event("unhandledrejection"), { reason: "string reason" })
    );
    const body = lastFetchBody();
    expect(body.message).toBe("string reason");
  });

  it("uses fallback message for unknown rejection reason", async () => {
    window.dispatchEvent(
      Object.assign(new Event("unhandledrejection"), { reason: { code: 42 } })
    );
    const body = lastFetchBody();
    expect(body.message).toBe("Unhandled promise rejection");
  });
});

// ---------------------------------------------------------------------------
// destroyMonitor
// ---------------------------------------------------------------------------

describe("destroyMonitor", () => {
  it("removes window.onerror", () => {
    initMonitor(makeConfig());
    destroyMonitor();
    expect(window.onerror).toBeNull();
  });

  it("stops sending events after destroy", async () => {
    initMonitor(makeConfig());
    destroyMonitor();
    captureError(new Error("after destroy"));
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not throw if called without a prior initMonitor", () => {
    expect(() => destroyMonitor()).not.toThrow();
  });
});
