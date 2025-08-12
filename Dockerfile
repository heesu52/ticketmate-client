# 빌드 단계
FROM node:22-slim AS builder
WORKDIR /app
COPY package.json pnpm-lock.json ./
COPY . .
RUN pnpm build

# 실행 단계
FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]