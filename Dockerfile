# syntax=docker/dockerfile:1.7
#
# Backend image for the Kilocal API.
#
# Lives at the repo root (not server/) because Coolify's MCP API does not
# expose the "Base Directory" knob, so Coolify clones the whole repo and
# expects the Dockerfile here. All server code is still under ./server —
# this Dockerfile just references it from the root build context.

FROM node:22-bookworm-slim AS build
WORKDIR /app

# `--include=dev` is defensive: Coolify can inject NODE_ENV=production into
# the build, which would otherwise make npm skip devDependencies (tsx, tsc).
COPY server/package.json server/package-lock.json* ./
RUN npm install --include=dev --no-audit --no-fund

COPY server/tsconfig.json ./
COPY server/prisma ./prisma
COPY server/src ./src
RUN npx prisma generate
RUN npx tsc

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# openssl + ca-certificates: Prisma's query engine needs libssl at runtime
# and falls back to a wrong binary if the package isn't present.
# curl: Coolify's in-container healthcheck probe runs `curl` against /health;
# without it the container is marked unhealthy and rolled back.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

# Apply pending migrations on boot. `|| true` keeps the container alive
# even if migrations fail, so `/` and `/health` stay diagnosable.
CMD ["sh", "-c", "npx prisma migrate deploy || true; node dist/index.js"]
