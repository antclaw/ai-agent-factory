# 开发指南

## 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0
- Git

## 安装

```bash
# 克隆项目
git clone https://github.com/antclaw/ai-agent-factory.git
cd ai-agent-factory

# 安装依赖
npm install
```

## 开发

### 启动开发服务器

```bash
# 使用脚本
./scripts/dev.sh

# 或手动启动
# 终端 1: 启动服务器
cd server && npm run dev

# 终端 2: 启动客户端
cd client && npm run dev
```

服务器地址：http://localhost:3001
客户端地址：http://localhost:3000

### 构建项目

```bash
# 构建所有部分
npm run build

# 只构建服务器
cd server && npm run build

# 只构建客户端
cd client && npm run build
```

### 代码检查

```bash
# 检查所有代码
npm run lint

# 检查服务器代码
cd server && npm run lint

# 检查客户端代码
cd client && npm run lint
```

## 项目结构

```
ai-agent-factory/
├── client/              # Electron + React 前端
│   ├── src/
│   │   ├── components/  # 可复用组件
│   │   ├── pages/       # 页面组件
│   │   ├── App.jsx      # 主应用
│   │   └── main.jsx     # 入口文件
│   └── package.json
├── server/              # Node.js 后端
│   ├── src/
│   │   └── index.js     # 服务器入口
│   └── package.json
├── agents/              # Agent 模板库
│   ├── planner/
│   ├── coder/
│   ├── reviewer/
│   └── researcher/
├── scripts/             # 构建和开发脚本
├── .github/workflows/   # CI/CD 配置
└── docs/                # 文档
```

## 开发规范

### 代码风格

- 使用 TypeScript 类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

### 分支管理

- `main` - 主分支（生产环境）
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - bug 修复分支
- `release/*` - 发布分支

## 调试

### 服务器调试

```bash
cd server
npm run dev
```

### 客户端调试

```bash
cd client
npm run dev
```

### 浏览器调试

打开浏览器开发者工具（F12）查看客户端日志。

## 环境变量

创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件配置环境变量：

```
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=your_api_key_here
```

## 测试

```bash
# 运行所有测试
npm test

# 运行测试并查看覆盖率
npm run test:coverage
```

## 发布

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# GitHub Actions 会自动构建和发布
```

## 常见问题

### 端口被占用

如果 3000 或 3001 端口被占用，可以修改 `.env` 文件中的端口配置。

### 依赖安装失败

尝试清理缓存后重新安装：

```bash
rm -rf node_modules package-lock.json
npm install
```

## 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request
