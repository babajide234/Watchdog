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
  endpoint: "https://watchdog-api-pvq7.onrender.com/errors",
  projectId: "my-project",
});`}</code></pre>

      <h2>Step 3 — Start the API server</h2>
      <p>The SDK sends errors to the live API. You can also self-host the backend:</p>
      <pre><code>cd packages/api
npm run dev</code></pre>
      <p>The live API is at <code>https://watchdog-api-pvq7.onrender.com</code>.</p>

      <h2>Step 4 — Open the Dashboard</h2>
      <p>Start the monitoring dashboard to see errors in real-time:</p>
      <pre><code>cd packages/dashboard
npm run dev</code></pre>
      <p>Dashboard runs at <code>https://watchdog-dashboard.vercel.app/</code>.</p>

      <h2>Production Deployment</h2>
      <p>When you're ready for production, deploy the Express API and Dashboard. Point your SDK to the deployed API endpoint:</p>
      <pre><code>{`initMonitor({
  endpoint: "https://watchdog-api-pvq7.onrender.com/errors",
  projectId: "your-project-id",
});`}</code></pre>
      <p>
        For documentation on how to host for free using Neon, Render, and Vercel,
        see the <a href="/docs/self-hosting">Self-Hosting guide</a>.
      </p>

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
