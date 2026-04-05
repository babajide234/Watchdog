export default function ConfigurationPage() {
  return (
    <div>
      <h1>SDK Configuration</h1>
      <p>
        The <code>initMonitor</code> function accepts a configuration object with the
        following options:
      </p>

      <h2>Options</h2>

      <h3>endpoint (required)</h3>
      <p>The URL of your React Watchdog API server.</p>
      <pre><code>endpoint: "https://watchdog-api-pvq7.onrender.com/errors"</code></pre>

      <h3>projectId (required)</h3>
      <p>A unique identifier for your project. Used to group errors in the dashboard.</p>
      <pre><code>projectId: "my-react-app"</code></pre>

      <h3>disabled (optional)</h3>
      <p>
        Set to <code>true</code> to disable monitoring. Useful for local development
        when you don't want to send errors.
      </p>
      <pre><code>{`initMonitor({
  endpoint: "https://watchdog-api-pvq7.onrender.com/errors",
  projectId: "my-app",
  disabled: process.env.NODE_ENV === "development",
});`}</code></pre>

      <h3>headers (optional)</h3>
      <p>Custom headers to include with every error event request.</p>
      <pre><code>{`initMonitor({
  endpoint: "https://monitor.example.com/errors",
  projectId: "my-app",
  headers: {
    "X-API-Key": "your-secret-key",
  },
});`}</code></pre>

      <h2>Manual Error Capture</h2>
      <p>
        In addition to automatic capture, you can use <code>captureError</code> to
        manually send errors:
      </p>
      <pre><code>{`import { captureError } from "react-watchdog";

try {
  // some risky operation
  await fetchData();
} catch (err) {
  captureError(err as Error);
  // also handle the error in UI
}`}</code></pre>

      <h2>Cleanup</h2>
      <p>To remove the monitor (e.g., in tests), call <code>destroyMonitor</code>:</p>
      <pre><code>{`import { destroyMonitor } from "react-watchdog";

// In your cleanup logic
destroyMonitor();`}</code></pre>
    </div>
  );
}
