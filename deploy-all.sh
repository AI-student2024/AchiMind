#!/bin/bash

# 提交到GitHub
echo "正在提交到GitHub..."
git add .
git commit -m "update: $1"
git push origin main

# 部署到ECS
echo "正在部署到ECS..."
ssh -i "D:/AgentsDEV/aliyun-ecskey/archimind-beian.pem" root@8.141.95.87 "cd /var/www/archimind && git pull origin main && npm install && npm run build"

echo "部署完成！"
echo "GitHub Pages将自动部署"
echo "ECS部署已完成"
echo ""
echo "请检查以下地址："
echo "1. GitHub Pages: https://ai-student2024.github.io/AchiMind/"
echo "2. ECS服务器: http://8.141.95.87/AchiMind/" 