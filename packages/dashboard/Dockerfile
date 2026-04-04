# ─── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace metadata
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/dashboard/package.json ./packages/dashboard/

# Install dependencies
RUN pnpm install --no-frozen-lockfile --filter dashboard

# Copy source
COPY packages/dashboard/ ./packages/dashboard/

# Build Next.js
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

RUN pnpm --filter dashboard build

# ─── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Replicate the workspace structure for standalone to work
# COPY --from=builder /app/packages/dashboard/public ./packages/dashboard/public # Removed: folder doesn't exist
COPY --from=builder /app/packages/dashboard/.next/standalone ./
COPY --from=builder /app/packages/dashboard/.next/static ./packages/dashboard/.next/static

EXPOSE 3001

# Next.js standalone server entry
CMD ["node", "packages/dashboard/server.js"]
