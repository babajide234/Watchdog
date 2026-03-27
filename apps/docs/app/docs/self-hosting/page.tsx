export default function SelfHostingPage() {
  return (
    <div>
      <h1>Self Hosting</h1>
      <p>
        React Watchdog is designed to be self-hosted. All data stays on your own
        infrastructure — no third-party services required.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 18+</li>
        <li>pnpm 9+</li>
        <li>A server or VM to run the API and dashboard</li>
      </ul>

      <h2>Running Locally</h2>
      <p>Clone the repository and start all services:</p>
      <pre><code>git clone https://github.com/your-org/react-watchdog
cd react-watchdog
pnpm install
pnpm dev</code></pre>
      <p>Services will start on:</p>
      <ul>
        <li>Landing: <code>http://localhost:3000</code></li>
        <li>Dashboard: <code>http://localhost:3001</code></li>
        <li>Docs: <code>http://localhost:3002</code></li>
        <li>API: <code>http://localhost:4000</code></li>
      </ul>

      <h2>Production Deployment</h2>

      <h3>API Server</h3>
      <p>Build and start the Express API:</p>
      <pre><code>cd packages/api
npm run build
NODE_ENV=production PORT=4000 node dist/index.js</code></pre>

      <h3>Dashboard</h3>
      <p>Build and start the Next.js dashboard:</p>
      <pre><code>cd packages/dashboard
NEXT_PUBLIC_API_URL=https://api.yourdomain.com npm run build
npm start</code></pre>

      <h2>Database</h2>
      <p>
        The API uses SQLite stored in <code>packages/api/data/watchdog.db</code>.
        For production, this file should be on a persistent volume. A future version
        will support PostgreSQL.
      </p>

      <h2>Environment Variables</h2>
      <h3>API</h3>
      <pre><code>PORT=4000           # API server port (default: 4000)</code></pre>
      <h3>Dashboard</h3>
      <pre><code>NEXT_PUBLIC_API_URL=http://localhost:4000  # API base URL</code></pre>
    </div>
  );
}
