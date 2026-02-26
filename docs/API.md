# API 文档

## 基础信息

- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`

## 端点列表

### 1. 健康检查

检查服务器状态。

**请求**

```
GET /api/health
```

**响应**

```json
{
  "status": "ok",
  "timestamp": "2024-02-26T10:00:00.000Z"
}
```

### 2. 获取所有 Agent

获取所有可用的 Agent 列表。

**请求**

```
GET /api/agents
```

**响应**

```json
[
  {
    "id": "planner",
    "name": "Planner Agent",
    "description": "Task breakdown and planning",
    "icon": "📋",
    "version": "1.0.0",
    "author": "AI Agent Factory"
  },
  {
    "id": "coder",
    "name": "Coder Agent",
    "description": "Code implementation with TDD",
    "icon": "💻",
    "version": "1.0.0",
    "author": "AI Agent Factory"
  },
  {
    "id": "reviewer",
    "name": "Reviewer Agent",
    "description": "Code quality and security review",
    "icon": "🔍",
    "version": "1.0.0",
    "author": "AI Agent Factory"
  },
  {
    "id": "researcher",
    "name": "Researcher Agent",
    "description": "Information gathering and research",
    "icon": "🔬",
    "version": "1.0.0",
    "author": "AI Agent Factory"
  }
]
```

### 3. 获取单个 Agent

获取指定 Agent 的详细信息。

**请求**

```
GET /api/agents/:id
```

**参数**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| id | string | 是 | Agent ID (planner, coder, reviewer, researcher) |

**响应**

```json
{
  "id": "planner",
  "name": "Planner Agent",
  "description": "Task breakdown and planning",
  "icon": "📋",
  "version": "1.0.0",
  "author": "AI Agent Factory",
  "skills": ["Task Analysis", "Implementation Planning", "Dependency Identification", "Priority Assessment"],
  "config": {
    "defaultModel": "gpt-4",
    "maxSteps": 10,
    "autoSave": true
  }
}
```

### 4. 保存 Agent 配置

保存 Agent 的配置。

**请求**

```
POST /api/agents/:id/config
```

**参数**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| id | string | 是 | Agent ID |
| config | object | 是 | Agent 配置 |

**请求体示例**

```json
{
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 2000,
  "autoSave": true,
  "systemPrompt": "You are a helpful assistant.",
  "customParams": {}
}
```

**响应**

```json
{
  "success": true,
  "message": "Configuration saved",
  "agentId": "planner",
  "config": {
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 2000,
    "autoSave": true,
    "systemPrompt": "You are a helpful assistant.",
    "customParams": {}
  }
}
```

### 5. 获取构建记录

获取所有构建记录（开发中）。

**请求**

```
GET /api/builds
```

**响应**

```json
[
  {
    "id": "1",
    "platform": "windows",
    "version": "1.0.0",
    "status": "ready",
    "size": 52428800,
    "uploadTime": "2024-02-26T10:00:00.000Z"
  }
]
```

## 错误处理

### 404 Not Found

Agent 不存在。

```json
{
  "error": "Agent not found"
}
```

### 400 Bad Request

请求参数错误。

```json
{
  "error": "Invalid request parameters"
}
```

## 状态码

| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 使用示例

### JavaScript

```javascript
// 获取所有 Agent
const response = await fetch('/api/agents');
const agents = await response.json();

// 获取单个 Agent
const agentResponse = await fetch('/api/agents/planner');
const agent = await agentResponse.json();

// 保存配置
const configResponse = await fetch('/api/agents/planner/config', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    temperature: 0.7
  }),
});
const result = await configResponse.json();
```

### cURL

```bash
# 获取所有 Agent
curl http://localhost:3001/api/agents

# 获取单个 Agent
curl http://localhost:3001/api/agents/planner

# 保存配置
curl -X POST http://localhost:3001/api/agents/planner/config \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "temperature": 0.7}'
```

## 更新日志

### v1.0.0 (2024-02-26)

- 初始版本
- 支持 4 个 Agent: planner, coder, reviewer, researcher
- 提供 Agent 配置接口
- 支持多平台部署
