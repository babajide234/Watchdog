export default function InstallationPage() {
  return (
    <div>
      <h1>Installation</h1>
      <p>
        Install the React Watchdog SDK from npm into your React application.
      </p>

      <h2>Step 1 — Install the package</h2>
      <pre><code>npm install react-watchdog
# or
yarn add react-watchdog
# or
pnpm add react-watchdog</code></pre>

      <h2>Step 2 — Initialize the monitor</h2>
      <p>
        Call <code>initMonitor</code> as early as possible in your application —
        ideally in your entry point (<code>main.tsx</code> or <code>index.tsx</code>),
        before your app renders.
      </p>
      <pre><code>{`import { initMonitor } from "react-watchdog";

initMonitor({
  endpoint: "http://localhost:4000/errors",
  projectId: "my-project",
});`}</code></pre>

      <h2>Step 3 — Start the API server</h2>
      <p>The SDK sends errors to your local API. Start the Express backend:</p>
      <pre><code>cd packages/api
npm run dev</code></pre>
      <p>The API will start on <code>http://localhost:4000</code>.</p>

      <h2>Step 4 — Open the Dashboard</h2>
      <p>Start the monitoring dashboard to see errors in real-time:</p>
      <pre><code>cd packages/dashboard
npm run dev</code></pre>
      <p>Dashboard runs at <code>http://localhost:3001</code>.</p>

      <h2>Verifying It Works</h2>
      <p>Throw a test error in your browser console to verify everything is connected:</p>
      <pre><code>// In your browser console:
throw new Error("Test error from React Watchdog!");

// Or for promise rejections:
Promise.reject(new Error("Unhandled rejection test"));</code></pre>
      <p>You should see the error appear in your dashboard within seconds.</p>
    </div>
  );
}
