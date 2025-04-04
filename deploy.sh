#!/bin/bash

# 安装必要的软件包
echo "安装必要的软件包..."
yum update -y
yum install -y nginx nodejs npm git unzip

# 清理旧目录
echo "清理旧目录..."
rm -rf /var/www/archimind

# 创建项目目录
echo "创建项目目录..."
mkdir -p /var/www/archimind

# 配置Git使用国内镜像
echo "配置Git使用国内镜像..."
git config --global url."https://github.com.cnpmjs.org/".insteadOf "https://github.com/"

# 克隆代码
echo "克隆代码..."
git clone https://github.com.cnpmjs.org/AI-student2024/AchiMind.git /var/www/archimind

# 进入项目目录
cd /var/www/archimind

# 安装依赖（使用淘宝镜像）
echo "安装依赖..."
npm install --registry=https://registry.npmmirror.com

# 构建项目
echo "构建项目..."
npm run build

# 配置Nginx
echo "配置Nginx..."
cat > /etc/nginx/conf.d/archimind.conf << EOF
server {
    listen 80;
    server_name archimind.cn www.archimind.cn;

    root /var/www/archimind/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# 启用站点配置
rm -f /etc/nginx/conf.d/default.conf

# 重启Nginx
echo "重启Nginx..."
systemctl restart nginx

echo "部署完成！" 