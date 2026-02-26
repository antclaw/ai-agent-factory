#!/bin/bash

# 创建 GitHub 仓库脚本

GITHUB_TOKEN="${GITHUB_TOKEN}"
REPO_NAME="ai-agent-factory"
REPO_DESC="一个图形化 AI Agent 管理和部署平台，支持 Agent 配置、工作流编排和多平台发布"
REPO_PRIVATE=false

if [ -z "$GITHUB_TOKEN" ]; then
    echo "错误: 未设置 GITHUB_TOKEN 环境变量"
    echo "请先运行: export GITHUB_TOKEN=your_token"
    exit 1
fi

# 创建仓库
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"$REPO_DESC\",
    \"private\": $REPO_PRIVATE,
    \"auto_init\": false
  }"

echo ""
echo "仓库创建成功！"
echo "仓库地址: https://github.com/antclaw/$REPO_NAME"
