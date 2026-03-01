# 部署指南

## 生产环境部署

### 1. 环境准备

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件
```

### 2. 构建应用

```bash
# 构建所有部分
npm run build

# 或分别构建
cd client && npm run build
cd server && npm run build
```

### 3. 配置 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### 4. 使用 PM2 管理

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "ai-agent-factory" -- run dev

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 重启
pm2 restart ai-agent-factory

# 停止
pm2 stop ai-agent-factory

# 开机自启
pm2 startup
pm2 save
```

### 5. Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server/dist ./server/dist

EXPOSE 3000 3001

CMD ["node", "server/dist/index.js"]
```

```bash
# 构建镜像
docker build -t ai-agent-factory:latest .

# 运行容器
docker run -p 3000:3000 -p 3001:3001 ai-agent-factory:latest
```

## CI/CD 配置

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          SOURCE: "client/dist/, server/dist/"
          TARGET: "/var/www/ai-agent-factory"
```

## 监控和日志

### 日志管理

```bash
# 查看实时日志
pm2 logs ai-agent-factory

# 查看错误日志
pm2 logs ai-agent-factory --err

# 保存日志
pm2 save
```

### 性能监控

```bash
# 安装 pm2-plus
npm install -g pm2-plus

# 注册账号
pm2-plus link YOUR_TOKEN

# 查看实时监控
# 访问 https://app.pm2.io
```

## 备份和恢复

### 数据备份

```bash
# 备份数据库（如果有）
pg_dump your_database > backup.sql

# 备份配置文件
cp .env .env.backup
```

### 数据恢复

```bash
# 恢复数据库
psql your_database < backup.sql

# 恢复配置
cp .env.backup .env
```

## 故障排查

### 常见问题

1. **端口被占用**
   ```bash
   # 查找占用端口的进程
   lsof -i :3000
   # 杀死进程
   kill -9 <PID>
   ```

2. **依赖安装失败**
   ```bash
   # 清除缓存
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

3. **构建失败**
   ```bash
   # 检查 Node.js 版本
   node --version  # 应该 >= 18

   # 检查依赖版本
   npm outdated

   # 重新安装
   npm install
   ```

## 安全建议

1. **使用环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用 `.env` 文件管理配置
   - 不要提交 `.env` 到 Git

2. **HTTPS 配置**
   - 使用 Let's Encrypt 获取免费 SSL 证书
   - 配置 Nginx 支持 HTTPS

3. **防火墙配置**
   - 只开放必要的端口（80, 443）
   - 限制数据库访问

4. **定期更新**
   - 更新依赖包
   - 更新 Node.js 版本
   - 更新系统安全补丁
