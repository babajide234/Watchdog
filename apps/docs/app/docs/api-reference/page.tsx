export default function ApiReferencePage() {
  return (
    <div>
      <h1>API Reference</h1>
      <p>
        The React Watchdog API is a simple Express server that receives and stores
        error events. It runs on <code>http://localhost:4000</code> by default.
      </p>

      <h2>Base URL</h2>
      <pre><code>http://localhost:4000</code></pre>

      <h2>Endpoints</h2>

      <h3>GET /health</h3>
      <p>Health check endpoint. Returns server status.</p>
      <pre><code>{`// Response
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`}</code></pre>

      <h3>POST /errors</h3>
      <p>Ingest a new error event from the SDK.</p>
      <pre><code>{`// Request Body
{
  "projectId": "my-app",            // required
  "type": "error",                  // "error" | "unhandledrejection"
  "message": "Cannot read property 'foo' of undefined",
  "stack": "TypeError: ...",        // optional
  "url": "https://example.com/app", // optional
  "userAgent": "Mozilla/5.0 ...",   // optional
  "timestamp": "2024-01-01T..."     // optional, defaults to now
}

// Response — 201 Created
{
  "id": 42
}`}</code></pre>

      <h3>GET /errors</h3>
      <p>List error events with optional filtering.</p>
      <pre><code>{`// Query Parameters
?projectId=my-app   // filter by project (optional)
?limit=100          // number of results (max 500, default 100)
?offset=0           // pagination offset

// Response — 200 OK
{
  "errors": [
    {
      "id": 42,
      "project_id": "my-app",
      "type": "error",
      "message": "Cannot read property 'foo' of undefined",
      "stack": "TypeError: ...",
      "url": "https://example.com/app",
      "user_agent": "Mozilla/5.0 ...",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "limit": 100,
  "offset": 0
}`}</code></pre>

      <h3>GET /errors/:id</h3>
      <p>Get a single error event by ID.</p>
      <pre><code>{`// Response — 200 OK
{
  "id": 42,
  "project_id": "my-app",
  "message": "...",
  ...
}

// 404 Not Found
{ "error": "Not found" }`}</code></pre>

      <h3>DELETE /errors/:id</h3>
      <p>Delete an error event.</p>
      <pre><code>{`// Response — 204 No Content (success)
// Response — 404 Not Found (if id doesn't exist)`}</code></pre>

      <h2>Database Schema</h2>
      <pre><code>{`CREATE TABLE errors (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id  TEXT    NOT NULL,
  type        TEXT    NOT NULL DEFAULT 'error',
  message     TEXT    NOT NULL,
  stack       TEXT,
  url         TEXT,
  user_agent  TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);`}</code></pre>
    </div>
  );
}
