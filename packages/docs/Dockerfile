# ─── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace metadata
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/docs/package.json ./apps/docs/

# Install dependencies
RUN pnpm install --no-frozen-lockfile --filter docs

# Copy source
COPY apps/docs/ ./apps/docs/

# Build Next.js
ENV NODE_ENV=production
RUN pnpm --filter docs build

# ─── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Replicate the workspace structure for standalone to work
# COPY --from=builder /app/apps/docs/public ./apps/docs/public # Removed: folder doesn't exist
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static

EXPOSE 3002

# Next.js standalone server entry
CMD ["node", "apps/docs/server.js"]
