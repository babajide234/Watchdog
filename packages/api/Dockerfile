# ─── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
# Copy package manifests from the correct relative paths (assuming context is root)
COPY packages/api/package.json ./packages/api/

# Install dependencies (only api and its deps)
RUN pnpm install --no-frozen-lockfile --filter api

# Copy source
COPY packages/api/ ./packages/api/

# Build TypeScript
RUN pnpm --filter api build

# ─── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/api/package.json ./packages/api/

# Install prod dependencies only
RUN pnpm install --no-frozen-lockfile --filter api --prod

# Copy compiled output
COPY --from=builder /app/packages/api/dist ./packages/api/dist

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "packages/api/dist/index.js"]
