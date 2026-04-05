# 🐕 React Watchdog

**React Watchdog** is a production-ready, lightweight, self-hosted frontend monitoring tool. It captures runtime JavaScript errors and unhandled promise rejections from React applications and provides a sleek dashboard for visualization and debugging.

---

## 🛠 Features

- **Runtime Error Tracking**: Automatic capture of `onerror` and `unhandledrejection` events.
- **Rich Metadata**: Captures stack traces, URLs, timestamps, and user-agent info.
- **Modern Dashboard**: Built with Next.js, shadcn/ui, and TanStack Query.
- **Scalable Backend**: Express API powered by PostgreSQL.
- **Developer First**: Fully typed TypeScript SDK and comprehensive documentation.
- **Docker Ready**: One-command deployment with Docker Compose.

---

## 📂 Project Structure

This is a monorepo managed by `pnpm`.

```bash
Watchdog/
├── apps/
│   ├── docs/          # Documentation site (Next.js + MDX)
│   └── landing/       # Marketing landing page (Next.js)
├── packages/
│   ├── api/           # Error ingestion service (Express + PostgreSQL)
│   ├── dashboard/     # Monitoring dashboard (Next.js + shadcn/ui)
│   └── sdk/           # JavaScript/TypeScript SDK for React apps
└── docker-compose.yml # Full-stack orchestration
```

---

## 🚀 Quick Start (Docker)

The fastest way to get React Watchdog running locally or in production:

```bash
docker compose up --build
```

- **API**: [http://localhost:4000](http://localhost:4000)
- **Dashboard**: [http://localhost:3001](http://localhost:3001)
- **Docs**: [http://localhost:3002](http://localhost:3002)
- **pgAdmin**: [http://localhost:5050](http://localhost:5050) (Login: `admin@watchdog.com` / `admin`)
- **PostgreSQL**: `localhost:5445`

---

## 🌐 Production Deployment

- **Landing Page**: [https://watchdog-landing-hazel.vercel.app/](https://watchdog-landing-hazel.vercel.app/)
- **Dashboard**: [https://watchdog-dashboard.vercel.app/](https://watchdog-dashboard.vercel.app/)
- **Docs**: [https://watchdog-docs-nu.vercel.app/docs](https://watchdog-docs-nu.vercel.app/docs)
- **API (Ingestion)**: [https://watchdog-api-pvq7.onrender.com](https://watchdog-api-pvq7.onrender.com)

> [!NOTE]
> **API Keep-Alive**: To prevent the Render free tier from spinning down, a [GitHub Action](.github/workflows/keep-alive.yml) is configured to ping the `/health` endpoint every 15 minutes.

---

## 💻 Local Development

### Prerequisites
- Node.js 22+
- pnpm 9+
- Docker (for PostgreSQL)

### Setup
1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start the database**:
   ```bash
   docker compose up postgres -d
   ```

3. **Start all services**:
   ```bash
   pnpm dev
   ```

---

## 📦 SDK Installation

To start monitoring your React app:

```bash
# In your React project
npm install @watchdog/sdk
```

**Initialization**:
```tsx
import { initMonitor } from '@watchdog/sdk';

initMonitor({
  projectId: 'my-awesome-app',
  endpoint: 'https://watchdog-api-pvq7.onrender.com/errors',
});
```

---

## 🛡 Tech Stack

- **Frontend**: React, Next.js, TypeScript, TailwindCSS, shadcn/ui, TanStack Query.
- **Backend**: Node.js, Express, PostgreSQL, Docker.
- **Tooling**: pnpm Workspaces, tsup (SDK bundling).

---

## 🗺 Roadmap

- [ ] Source Map Support (resolve minified stack traces)
- [ ] User Session Tracking & Breadcrumbs
- [ ] Email & Slack Notifications
- [ ] Issue Assignment & Status (Resolved/Ignore)
- [ ] Performance Metrics (LCP, FID, CLS)

License: MIT
