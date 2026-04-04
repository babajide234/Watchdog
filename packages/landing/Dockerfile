# ─── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace metadata
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/landing/package.json ./apps/landing/

# Install dependencies
RUN pnpm install --no-frozen-lockfile --filter landing

# Copy source
COPY apps/landing/ ./apps/landing/

# Build Next.js
ENV NODE_ENV=production
RUN pnpm --filter landing build

# ─── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Replicate the workspace structure for standalone to work
# COPY --from=builder /app/apps/landing/public ./apps/landing/public # Removed: folder doesn't exist
COPY --from=builder /app/apps/landing/.next/standalone ./
COPY --from=builder /app/apps/landing/.next/static ./apps/landing/.next/static

EXPOSE 3000

# The standalone output includes a server.js in the app folder
CMD ["node", "apps/landing/server.js"]
