# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS build
WORKDIR /app

# Install deps with full lockfile resolution.
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copy source and generate Prisma client + compile TS.
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate
RUN npx tsc

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Carry over generated Prisma client + node_modules + compiled output.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

# Apply pending migrations on boot, then start. `|| true` keeps the container
# alive on the very first deploy when DATABASE_URL points nowhere yet.
CMD ["sh", "-c", "npx prisma migrate deploy || true; node dist/index.js"]
