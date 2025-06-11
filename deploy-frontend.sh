#!/bin/bash

echo "开始部署前端应用..."

# 进入前端目录
cd yupi-antd-frontend-init-master

# 安装依赖
echo "安装依赖..."
npm install

# 构建生产版本
echo "构建生产版本..."
npm run build

# 创建部署目录（如果不存在）
sudo mkdir -p /var/www/student-management

# 备份旧版本（如果存在）
if [ -d "/var/www/student-management/dist" ]; then
    echo "备份旧版本..."
    sudo mv /var/www/student-management/dist /var/www/student-management/dist.backup.$(date +%Y%m%d_%H%M%S)
fi

# 复制新版本
echo "部署新版本..."
sudo cp -r dist /var/www/student-management/

# 设置权限
sudo chown -R www-data:www-data /var/www/student-management/dist
sudo chmod -R 755 /var/www/student-management/dist

# 复制nginx配置
echo "更新nginx配置..."
sudo cp ../nginx.conf /etc/nginx/sites-available/student-management
sudo ln -sf /etc/nginx/sites-available/student-management /etc/nginx/sites-enabled/

# 测试nginx配置
echo "测试nginx配置..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "重新加载nginx..."
    sudo systemctl reload nginx
    echo "✅ 前端部署完成！"
    echo "访问地址: http://47.121.180.250:8000"
else
    echo "❌ Nginx配置错误，请检查配置文件"
    exit 1
fi 