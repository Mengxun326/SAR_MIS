@echo off
echo 启动学生学籍管理系统后端...
echo.

cd springboot-init-master

echo 启动后端服务器...
echo 请确保已配置好数据库连接信息
echo.

mvnw.cmd spring-boot:run

pause 