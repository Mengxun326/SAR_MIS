#!/bin/bash

echo "=========================================="
echo "🚀 学生学籍管理系统 - 一键部署脚本"
echo "=========================================="
echo ""

# 检查是否为root用户或有sudo权限
if [ "$EUID" -ne 0 ] && ! sudo -n true 2>/dev/null; then
    echo "❌ 请确保您有sudo权限来部署前端"
    exit 1
fi

# 记录开始时间
START_TIME=$(date)
echo "🕐 开始时间: $START_TIME"
echo ""

# 第一步：打包后端
echo "📦 步骤1: 打包后端应用..."
cd springboot-init-master

if ! mvn clean package -DskipTests; then
    echo "❌ 后端打包失败"
    exit 1
fi

echo "✅ 后端打包完成"
echo ""

# 第二步：构建前端
echo "📦 步骤2: 构建前端应用..."
cd ../yupi-antd-frontend-init-master

# 检查Node.js是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 请先安装Node.js和npm"
    exit 1
fi

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "安装前端依赖..."
    npm install
fi

# 构建前端
if ! npm run build; then
    echo "❌ 前端构建失败"
    exit 1
fi

echo "✅ 前端构建完成"
echo ""

# 第三步：部署前端
echo "🌐 步骤3: 部署前端应用..."
cd ..

# 创建部署目录
sudo mkdir -p /var/www/student-management

# 备份旧版本
if [ -d "/var/www/student-management/dist" ]; then
    echo "备份旧版本..."
    sudo mv /var/www/student-management/dist /var/www/student-management/dist.backup.$(date +%Y%m%d_%H%M%S)
fi

# 部署新版本
sudo cp -r yupi-antd-frontend-init-master/dist /var/www/student-management/
sudo chown -R www-data:www-data /var/www/student-management/dist
sudo chmod -R 755 /var/www/student-management/dist

# 配置nginx
sudo cp nginx.conf /etc/nginx/sites-available/student-management
sudo ln -sf /etc/nginx/sites-available/student-management /etc/nginx/sites-enabled/

# 测试nginx配置
if ! sudo nginx -t; then
    echo "❌ Nginx配置错误"
    exit 1
fi

# 重新加载nginx
sudo systemctl reload nginx

echo "✅ 前端部署完成"
echo ""

# 第四步：部署后端
echo "⚙️  步骤4: 部署后端应用..."

# 停止现有后端服务
echo "停止现有后端服务..."
PID=$(ps -ef | grep "springboot-init-0.0.1-SNAPSHOT.jar" | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
    echo "停止进程: $PID"
    kill -15 $PID
    sleep 5
    if ps -p $PID > /dev/null; then
        kill -9 $PID
    fi
fi

# 创建日志目录
mkdir -p springboot-init-master/logs

# 启动后端服务
echo "启动后端服务..."
cd springboot-init-master

nohup java -jar \
    -Dspring.profiles.active=prod \
    -Dserver.port=8101 \
    -Dfile.encoding=UTF-8 \
    -Djava.awt.headless=true \
    -Xms512m \
    -Xmx1024m \
    target/springboot-init-0.0.1-SNAPSHOT.jar \
    > logs/application.log 2>&1 &

BACKEND_PID=$!
echo "✅ 后端服务已启动，进程ID: $BACKEND_PID"
echo ""

# 等待服务启动
echo "⏳ 等待服务完全启动..."
sleep 15

# 验证部署
echo "🔍 验证部署状态..."
echo ""

# 检查后端服务
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ 后端服务运行正常"
    
    # 测试API接口
    if curl -s http://localhost:8101/api/user/get/login > /dev/null; then
        echo "✅ 后端API接口可访问"
    else
        echo "⚠️  后端API接口暂时无法访问"
    fi
else
    echo "❌ 后端服务启动失败"
fi

# 检查nginx服务
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx服务运行正常"
else
    echo "❌ Nginx服务异常"
fi

# 检查前端文件
if [ -f "/var/www/student-management/dist/index.html" ]; then
    echo "✅ 前端文件部署成功"
else
    echo "❌ 前端文件部署失败"
fi

echo ""
echo "=========================================="
echo "🎉 部署完成！"
echo "=========================================="
echo ""
echo "📊 部署摘要:"
echo "开始时间: $START_TIME"
echo "结束时间: $(date)"
echo ""
echo "🌐 访问地址:"
echo "前端应用: http://47.121.180.250:8000"
echo "后端API: http://47.121.180.250:8101"
echo "API文档: http://47.121.180.250:8101/doc.html"
echo ""
echo "📁 重要文件位置:"
echo "前端文件: /var/www/student-management/dist/"
echo "后端日志: $(pwd)/logs/application.log"
echo "Nginx配置: /etc/nginx/sites-available/student-management"
echo ""
echo "🔧 常用命令:"
echo "查看后端日志: tail -f $(pwd)/logs/application.log"
echo "停止后端服务: kill $BACKEND_PID"
echo "重启Nginx: sudo systemctl restart nginx"
echo "检查服务状态: ps -ef | grep springboot-init"
echo ""
echo "✨ 部署完成，请访问前端地址开始使用系统！" 