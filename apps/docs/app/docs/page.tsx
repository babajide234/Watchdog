import Link from "next/link";

export default function DocsIndexPage() {
  return (
    <div>
      <h1>Getting Started with React Watchdog</h1>
      <p>
        React Watchdog is a lightweight, self-hosted error monitoring tool for React
        applications. It captures runtime JavaScript errors and displays them in a
        clean developer dashboard — similar to Sentry but completely open source and
        runs locally.
      </p>

      <h2>What It Captures</h2>
      <ul>
        <li>Global JavaScript errors (<code>window.onerror</code>)</li>
        <li>Unhandled promise rejections (<code>window.onunhandledrejection</code>)</li>
        <li>Stack traces, error messages, and types</li>
        <li>URL where the error occurred</li>
        <li>User agent string</li>
        <li>Timestamp</li>
      </ul>

      <h2>Architecture Overview</h2>
      <p>React Watchdog is structured as a monorepo:</p>
      <pre>{`repo/
├── packages/
│   ├── sdk/        ← TypeScript SDK (install in your app)
│   ├── api/        ← Express + SQLite backend
│   └── dashboard/  ← Next.js monitoring dashboard
└── apps/
    ├── landing/    ← Marketing landing page
    └── docs/       ← This documentation site`}</pre>

      <h2>Quick Start</h2>
      <p>
        Jump to the <Link href="/docs/installation">Installation</Link> guide to get started
        in under 2 minutes.
      </p>
    </div>
  );
}
