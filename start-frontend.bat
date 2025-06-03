@echo off
echo 启动学生学籍管理系统前端...
echo.

cd yupi-antd-frontend-init-master

echo 检查依赖...
if not exist node_modules (
    echo 安装依赖中...
    npm install
)

echo 启动前端开发服务器...
npm run start:dev

pause 