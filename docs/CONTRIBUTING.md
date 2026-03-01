# 贡献指南

## 如何贡献

我们欢迎任何形式的贡献！

### 1. 报告 Bug

- 在 [Issues](https://github.com/antclaw/ai-agent-factory/issues) 中搜索是否有类似问题
- 如果没有，创建新 Issue，包含：
  - 问题描述
  - 复现步骤
  - 预期行为
  - 实际行为
  - 系统信息（Node.js 版本、操作系统等）

### 2. 提交改进

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 代码规范

### 命名规范

- **变量和函数**: camelCase
- **类和组件**: PascalCase
- **常量**: UPPER_SNAKE_CASE
- **文件名**: kebab-case 或 PascalCase

### 代码风格

```javascript
// ✅ 推荐
function calculateTotal(price, quantity) {
  return price * quantity;
}

const App = () => {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
};

// ❌ 不推荐
function calculate_total(price, quantity) {
  return price * quantity;
}

const app = () => {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
};
```

### 注释规范

```javascript
/**
 * 计算总价
 * @param {number} price - 商品价格
 * @param {number} quantity - 数量
 * @returns {number} 总价
 */
function calculateTotal(price, quantity) {
  return price * quantity;
}

// 单行注释
// 这是一个重要的配置项
const importantConfig = {
  value: 100
};
```

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例

```
feat(client): 添加 Agent 配置界面

- 新增配置表单组件
- 支持自定义 Agent 提示词
- 添加保存功能

Closes #123
```

## Pull Request 流程

1. **Fork 并克隆**
   ```bash
   git clone https://github.com/your-username/ai-agent-factory.git
   cd ai-agent-factory
   git remote add upstream https://github.com/antclaw/ai-agent-factory.git
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发功能**
   - 遵循代码规范
   - 添加必要的测试
   - 更新文档

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   # 在 GitHub 上创建 Pull Request
   ```

6. **代码审查**
   - 等待审查
   - 根据反馈修改
   - 通过审查后合并

## 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm test -- --coverage
```

### 测试规范

- 新功能必须添加测试
- 修复 Bug 必须添加对应的测试用例
- 测试覆盖率至少 70%

## 文档

### 文档要求

- 所有公开 API 必须有文档
- 新功能必须更新 README
- 代码注释清晰易懂
- 提供使用示例

### 文档格式

使用 Markdown 格式，包含：

```markdown
# 标题

## 描述
简要描述功能

## 用法
\`\`\`bash
命令示例
\`\`\`

## 示例
代码示例

## 参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 名称 |
```

## 行为准则

- 尊重所有贡献者
- 保持建设性反馈
- 接受审查意见
- 关注共同目标

## 许可证

通过贡献代码，你同意你的代码将在 MIT 许可证下发布。

## 联系方式

如有问题，请：
- 提交 Issue
- 发送邮件至 your-email@example.com
- 在 Discord 社区讨论
