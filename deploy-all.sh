#!/bin/bash

# 设置错误处理
set -e

# 默认配置
DEFAULT_BRANCH="main"
DEFAULT_ENV="production"

# 检查参数
if [ -z "$1" ]; then
    echo "错误：请提供提交信息"
    echo "使用方法：./deploy-all.sh \"您的更新说明\" [分支名] [环境]"
    echo "示例：./deploy-all.sh \"更新说明\" develop staging"
    exit 1
fi

# 设置分支和环境
BRANCH=${2:-$DEFAULT_BRANCH}
ENV=${3:-$DEFAULT_ENV}

# 检查分支是否合法
if [[ "$BRANCH" != "main" && "$BRANCH" != "develop" ]]; then
    echo "警告：非标准分支名称，请确认是否继续部署到分支 $BRANCH"
    read -p "是否继续？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 检查环境是否合法
if [[ "$ENV" != "production" && "$ENV" != "staging" ]]; then
    echo "错误：无效的环境名称，只支持 production 或 staging"
    exit 1
fi

# 检查 SSH 密钥文件权限
PEM_FILE="D:/AgentsDEV/aliyun-ecskey/archimind-beian.pem"
if [ -f "$PEM_FILE" ]; then
    PERM=$(stat -c "%a" "$PEM_FILE" 2>/dev/null || stat -f "%OLp" "$PEM_FILE")
    if [ "$PERM" != "600" ]; then
        echo "警告：SSH 密钥文件权限不正确，正在修复..."
        chmod 600 "$PEM_FILE"
        echo "SSH 密钥文件权限已修复为 600"
    fi
else
    echo "错误：找不到 SSH 密钥文件：$PEM_FILE"
    exit 1
fi

# 检查 Git 配置
echo "检查 Git 配置..."
if ! git remote -v | grep -q "github.com"; then
    echo "修正 Git 远程仓库地址..."
    git remote set-url origin https://github.com/AI-student2024/AchiMind.git
fi

# 提交到GitHub
echo "正在提交到GitHub分支 $BRANCH..."
git add .
git commit -m "update: $1"
git push origin $BRANCH || {
    echo "GitHub 推送失败，请检查网络连接和仓库权限"
    exit 1
}

# 部署到ECS
echo "正在部署到ECS环境 $ENV..."
echo "1. 连接到服务器并拉取代码..."
ssh -i "$PEM_FILE" root@8.141.95.87 "cd /var/www/archimind && git fetch origin && git checkout $BRANCH && git pull origin $BRANCH" || {
    echo "错误：拉取代码失败"
    exit 1
}

echo "2. 安装依赖..."
ssh -i "$PEM_FILE" root@8.141.95.87 "cd /var/www/archimind && npm install" || {
    echo "错误：安装依赖失败"
    exit 1
}

echo "3. 修复依赖安全问题..."
ssh -i "$PEM_FILE" root@8.141.95.87 "cd /var/www/archimind && npm audit fix" || {
    echo "警告：依赖安全问题修复失败，继续执行..."
}

echo "4. 构建项目..."
ssh -i "$PEM_FILE" root@8.141.95.87 "cd /var/www/archimind && npm run build" || {
    echo "错误：构建项目失败"
    echo "请检查："
    echo "1. 服务器上的 Node.js 版本"
    echo "2. 项目依赖是否正确安装"
    echo "3. 构建脚本是否有权限问题"
    exit 1
}

echo "部署完成！"
echo "GitHub Pages将自动部署"
echo "ECS部署已完成"
echo ""
echo "请检查以下地址："
echo "1. GitHub Pages: https://ai-student2024.github.io/AchiMind/"
echo "2. ECS服务器: http://8.141.95.87/AchiMind/"

# 等待并检查部署状态
echo "正在等待部署生效..."
sleep 30
echo "请手动验证以上两个地址是否可以正常访问" 