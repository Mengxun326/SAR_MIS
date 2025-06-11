#!/bin/bash

echo "开始部署后端应用..."

# 设置变量
JAR_NAME="springboot-init-0.0.1-SNAPSHOT.jar"
APP_NAME="student-management-backend"
PROFILE="prod"
PORT=8101

# 进入后端目录
cd springboot-init-master

# 检查JAR文件是否存在
if [ ! -f "target/$JAR_NAME" ]; then
    echo "❌ JAR文件不存在，请先执行打包: mvn clean package -DskipTests"
    exit 1
fi

echo "✅ 找到JAR文件: target/$JAR_NAME"

# 停止现有进程
echo "停止现有后端服务..."
PID=$(ps -ef | grep "$JAR_NAME" | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
    echo "找到现有进程: $PID"
    kill -15 $PID
    sleep 5
    
    # 强制杀死进程（如果还在运行）
    if ps -p $PID > /dev/null; then
        echo "强制停止进程..."
        kill -9 $PID
    fi
    echo "✅ 服务已停止"
else
    echo "✅ 没有找到运行中的服务"
fi

# 创建日志目录
mkdir -p logs

# 启动新的服务
echo "启动后端服务..."
echo "配置环境: $PROFILE"
echo "服务端口: $PORT"
echo "日志文件: logs/application.log"

nohup java -jar \
    -Dspring.profiles.active=$PROFILE \
    -Dserver.port=$PORT \
    -Dfile.encoding=UTF-8 \
    -Djava.awt.headless=true \
    -Xms512m \
    -Xmx1024m \
    target/$JAR_NAME \
    > logs/application.log 2>&1 &

# 获取新进程ID
NEW_PID=$!
echo "✅ 后端服务已启动"
echo "进程ID: $NEW_PID"
echo "配置文件: application-$PROFILE.yml"

# 等待服务启动
echo "等待服务启动..."
sleep 10

# 检查服务状态
if ps -p $NEW_PID > /dev/null; then
    echo "✅ 服务启动成功！"
    echo ""
    echo "=== 部署信息 ==="
    echo "应用名称: $APP_NAME"
    echo "JAR文件: $JAR_NAME"
    echo "进程ID: $NEW_PID"
    echo "端口: $PORT"
    echo "环境: $PROFILE"
    echo "访问地址: http://47.121.180.250:$PORT"
    echo "API文档: http://47.121.180.250:$PORT/doc.html"
    echo ""
    echo "=== 常用命令 ==="
    echo "查看日志: tail -f logs/application.log"
    echo "停止服务: kill $NEW_PID"
    echo "检查进程: ps -ef | grep $JAR_NAME"
    echo "检查端口: netstat -tlnp | grep $PORT"
    echo ""
    
    # 测试健康检查
    echo "测试服务连接..."
    sleep 5
    if curl -s http://localhost:$PORT/api/user/get/login > /dev/null; then
        echo "✅ API接口测试成功"
    else
        echo "⚠️  API接口暂时无法访问，请稍后再试或查看日志"
    fi
else
    echo "❌ 服务启动失败，请查看日志："
    echo "tail -f logs/application.log"
    exit 1
fi 