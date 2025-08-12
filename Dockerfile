# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=10.14.0

COPY package.json pnpm-lock.yaml ./

# pnpm 활성화 + 의존성 설치(락 고정)
RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && pnpm install --frozen-lockfile

# 앱 소스 및 배포 env 주입(있다면)
COPY . .

# Next 빌드
RUN pnpm build

# ---------- runtime stage ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=10.14.0

# 실행 산출물/리소스만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 프로덕션 의존성만 설치(가볍고 안전)
RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]
