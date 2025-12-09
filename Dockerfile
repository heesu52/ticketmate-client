# ==============================
# 빌드 단계
# ==============================
FROM node:22-slim AS builder

RUN npm install -g pnpm
WORKDIR /app

# 패키지 파일 복사 후 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 전체 프로젝트 복사
COPY . .

# 빌드 실행
RUN pnpm run build

# ==============================
# 실행 단계
# ==============================
FROM node:22-slim

# 실행 단계에서 pnpm start를 위해 pnpm 설치 필수
RUN npm install -g pnpm 
WORKDIR /app

# 빌드 결과물만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]