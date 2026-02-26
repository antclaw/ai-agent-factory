# 多阶段构建 Dockerfile

# 阶段 1: 构建前端
FROM node:18-alpine AS builder

WORKDIR /app

# 复制前端依赖文件
COPY client/package*.json ./client/
RUN cd client && npm ci

# 复制前端源码
COPY client/ ./client/

# 构建前端
WORKDIR /app/client
RUN npm run build

# 阶段 2: 构建后端
FROM node:18-alpine AS backend-builder

WORKDIR /app

# 复制后端依赖文件
COPY server/package*.json ./server/
RUN cd server && npm ci

# 复制后端源码
COPY server/ ./server/

# 构建后端
WORKDIR /app/server
RUN npm run build

# 阶段 3: 生产镜像
FROM node:18-alpine AS production

# 安装 SQLite
RUN apk add --no-cache sqlite

WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=builder /app/client/dist ./client/dist
COPY --from=backend-builder /app/server/dist ./server/dist
COPY server/package.json ./server/
COPY server/src/services/databaseService.js ./server/src/services/
COPY agents/ ./agents/
COPY .env.example .env.example

# 创建数据目录
RUN mkdir -p data

# 暴露端口
EXPOSE 3001

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001

# 启动应用
CMD ["node", "server/dist/index.js"]
