FROM node:24-alpine AS builder

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json ./
COPY pnpm-*.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM builder AS production

WORKDIR /app

USER node

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/pnpm-*.yaml ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start:prod"]
