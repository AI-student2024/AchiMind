#!/bin/bash

# 设置错误处理
set -e

# 检查参数
if [ -z "$1" ]; then
    echo "错误：请提供提交信息"
    echo "使用方法：./deploy-all.sh \"您的更新说明\""
    exit 1
fi

# 检查 Git 配置
echo "检查 Git 配置..."
if ! git remote -v | grep -q "github.com"; then
    echo "修正 Git 远程仓库地址..."
    git remote set-url origin https://github.com/AI-student2024/AchiMind.git
fi

# 提交到GitHub
echo "正在提交到GitHub..."
git add .
git commit -m "update: $1"
git push origin main || {
    echo "GitHub 推送失败，请检查网络连接和仓库权限"
    exit 1
}

# 部署到ECS
echo "正在部署到ECS..."
ssh -i "D:/AgentsDEV/aliyun-ecskey/archimind-beian.pem" root@8.141.95.87 "cd /var/www/archimind && \
    git pull origin main && \
    npm install && \
    npm audit fix && \
    npm run build" || {
    echo "ECS 部署失败，请检查服务器连接和权限"
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