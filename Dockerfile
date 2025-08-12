# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=10.14.0

# 락파일 기반 설치
COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && pnpm install --frozen-lockfile

# 소스 복사 및(필요시) env 주입
COPY . .

RUN pnpm build
RUN pnpm prune --prod

# ---------- runtime stage ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 산출물 + prod node_modules만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
