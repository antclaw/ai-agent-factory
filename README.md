# AI Agent 装配厂

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

一个图形化 AI Agent 管理和部署平台，支持 Agent 配置、工作流编排和多平台发布

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [文档](#-文档) • [贡献](#-贡献)

</div>

## 🌟 功能特性

- **Agent 配置器** - 可视化配置 AI Agent 的技能、模型、提示词
- **Agent 市场** - 社区分享和下载 Agent 模板
- **Agent 工作台** - 可视化编排 Agent 工作流
- **多平台部署** - 生成 Windows/Linux/macOS 可执行文件
- **版本管理** - 自动化 GitHub Releases 发布

## 🏗️ 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| Electron | Latest | 跨平台桌面应用框架 |
| React | 18.2+ | 前端 UI 框架 |
| TypeScript | 5.2+ | 类型安全 |
| Node.js | 18.0+ | 后端运行时 |
| Express | 4.18+ | 后端框架 |
| Ant Design | 5.12+ | UI 组件库 |

## 📦 安装

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0
- Git

### 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/antclaw/ai-agent-factory.git
cd ai-agent-factory

# 2. 安装依赖
npm install

# 3. 配置环境变量（可选）
cp .env.example .env
# 编辑 .env 文件

# 4. 启动开发服务器
./scripts/dev.sh
# 或
npm run dev
```

### 启动后

- **服务器**: http://localhost:3001
- **客户端**: http://localhost:3000

## 🚀 运行

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
# 构建所有部分
npm run build

# 只构建服务器
cd server && npm run build

# 只构建客户端
cd client && npm run build
```

### 发布

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# GitHub Actions 会自动构建和发布到 GitHub Releases
```

## 📁 项目结构

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
├── docs/                # 文档
│   ├── DEVELOPMENT.md   # 开发指南
│   └── API.md           # API 文档
├── package.json         # 根目录配置
├── electron-builder.yml # Electron 打包配置
└── README.md            # 本文件
```

## 🎯 使用指南

### 1. Agent 市场

浏览和下载社区分享的 AI Agent 模板。

### 2. Agent 工作台

- 配置 Agent 参数（模型、温度、Token 限制等）
- 运行 Agent
- 保存配置

### 3. 部署发布

- 上传构建文件
- 配置多平台发布
- 创建 GitHub Releases

## 📚 文档

- [开发指南](docs/DEVELOPMENT.md) - 环境配置、开发规范、调试方法
- [API 文档](docs/API.md) - 接口说明、使用示例
- [Agent Skills](agents/) - Agent 模板文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 开发规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- 代码使用 TypeScript
- 添加必要的注释和文档
- 通过所有测试

## 📊 功能状态

| 功能 | 状态 | 备注 |
|------|------|------|
| Agent 市场 | ✅ 完成 | 显示 Agent 列表和详情 |
| Agent 工作台 | ✅ 完成 | 配置和运行 Agent |
| 部署发布 | ⏳ 开发中 | 待实现 |
| 多平台打包 | ⏳ 开发中 | 待实现 |
| GitHub Actions | ✅ 完成 | 自动化构建和发布 |

## 🔄 更新日志

### v1.0.0 (2024-02-26)

- ✨ 初始版本发布
- 🎨 实现前端 UI
- 🔧 实现后端 API
- 📦 配置 GitHub Actions
- 📚 添加文档

## 📄 许可证

[MIT License](LICENSE)

## 👤 作者

**antclaw** - [GitHub](https://github.com/antclaw)

## 🙏 致谢

- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Express](https://expressjs.com/)

## 📮 联系方式

- 📧 Email: antclaw@example.com
- 🐦 Twitter: [@antclaw](https://twitter.com/antclaw)
- 💬 讨论: [GitHub Issues](https://github.com/antclaw/ai-agent-factory/issues)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star！**

Made with ❤️ by antclaw

</div>
