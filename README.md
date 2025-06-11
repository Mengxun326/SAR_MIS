# 🎓 学生学籍管理信息系统 (SAR_MIS)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0-blue.svg)](https://ant.design/) [![GitHub stars](https://img.shields.io/github/stars/Mengxun326/SAR_MIS?style=social)]([Mengxun326/SAR_MIS](https://github.com/Mengxun326/SAR_MIS)) [![GitHub forks](https://img.shields.io/github/forks/Mengxun326/SAR_MIS?style=social)]([Mengxun326/SAR_MIS](https://github.com/Mengxun326/SAR_MIS))

> 🚀 智能化、现代化的学生学籍管理解决方案

一个功能完整的学生学籍管理系统，提供学生信息管理、成绩管理、课程管理、学籍异动、奖惩记录等全方位的学籍管理功能。采用前后端分离架构，为学校提供高效、安全、易用的数字化管理平台。

## 🎉 最新更新 (v2.1.0)

### ✅ 新增功能
- **权限控制优化**：完善了前端权限控制，根据用户角色动态显示功能
- **个人设置功能**：支持头像URL设置，实时预览，表单验证
- **首页权限适配**：基于用户角色展示不同的功能模块
- **生产环境配置**：完善了Nginx配置和一键部署脚本

### 🐛 问题修复
- **修复404错误**：解决了权限控制导致的页面访问问题
- **修复路由刷新**：采用Hash路由模式，避免生产环境刷新404
- **修复组件导入**：解决了ProForm组件使用问题
- **修复权限按钮**：只对有权限的用户显示操作按钮

### 🔧 技术优化
- **代码规范**：统一了代码风格和组件使用规范
- **性能优化**：优化了路由加载和权限检查机制
- **部署简化**：提供了一键部署脚本和详细部署文档

## ✨ 主要特性

### 🔐 权限管理
- **多角色权限体系**：管理员、教师、学生三级权限
- **安全认证**：Session + JWT双重认证机制
- **接口权限控制**：细粒度的API权限管理
- **前端权限控制**：基于角色的UI组件动态显示
- **权限继承**：管理员拥有所有权限，教师拥有教学相关权限

### 📊 核心功能模块

#### 👥 学生管理
- 学生基本信息的增删改查
- 批量导入导出学生数据
- 学籍状态管理（在读、休学、毕业等）
- 学生信息详情页面
- **权限控制**：教师和管理员可管理，学生只能查看

#### 📚 课程管理
- 课程信息维护（课程代码、名称、学分等）
- 课程开设管理
- 教师课程分配
- 课程时间安排
- **权限控制**：教师和管理员可管理，学生只能查看

#### 🎯 成绩管理
- 成绩录入与修改
- GPA自动计算
- 成绩统计分析
- 成绩分布图表
- 成绩排名功能
- **权限控制**：教师可录入和修改，学生只能查看自己的成绩

#### 📝 选课管理
- 在线选课系统
- 选课冲突检测
- 选课人数限制
- 退课功能
- **权限控制**：所有用户可用，教师可管理选课

#### 🏆 奖惩管理
- 奖励记录管理（奖学金、荣誉等）
- 处分记录管理
- 处分撤销功能
- 奖惩统计报表
- **权限控制**：教师和管理员可管理

#### 🔄 学籍异动
- 学籍变更申请（转专业、休学、复学、退学等）
- 异动审批流程
- 异动记录查询
- 审批状态跟踪
- **权限控制**：学生可申请，管理员可审批

#### 👨‍👩‍👧‍👦 扩展信息
- 家庭信息管理
- 健康档案管理
- 个人资料完善
- **权限控制**：所有登录用户可管理自己的信息

#### 👤 个人中心
- **个人信息查看**：显示用户基本信息和权限级别
- **个人设置**：支持修改昵称和头像URL
- **头像预览**：实时预览头像变更效果
- **表单验证**：支持图片URL格式验证

#### 📈 数据统计
- 首页数据大屏
- 实时统计图表
- 多维度数据分析
- 可视化报表
- **权限适配**：根据用户角色显示不同统计信息

### 🎨 界面特色
- **现代化UI设计**：基于Ant Design设计语言
- **响应式布局**：完美适配桌面端和移动端
- **权限适配界面**：根据用户角色动态调整界面
- **深色/浅色主题**：支持主题切换
- **国际化支持**：多语言界面
- **无障碍访问**：符合WCAG标准

## 🛠️ 技术栈

### 后端技术
- **框架**：Spring Boot 2.7.0
- **数据库**：MySQL 8.0
- **ORM**：MyBatis-Plus 3.5.1
- **缓存**：Redis 6.0
- **安全**：Spring Security
- **API文档**：Knife4j (Swagger)
- **工具类**：Hutool、Apache Commons

### 前端技术
- **框架**：React 18.0 + TypeScript 4.7
- **UI库**：Ant Design 5.0 + Ant Design Pro
- **状态管理**：Umi Max
- **构建工具**：Umi 4.0
- **路由模式**：Hash路由（避免刷新404）
- **样式**：Less + CSS Modules
- **图表**：ECharts、AntV

### 开发工具
- **代码管理**：Git
- **构建工具**：Maven + npm
- **代码规范**：ESLint + Prettier
- **IDE推荐**：IntelliJ IDEA + VS Code

## 📁 项目结构

```
SAR_MIS/
├── springboot-init-master/          # 后端项目
│   ├── src/main/java/com/yupi/project/
│   │   ├── annotation/              # 自定义注解
│   │   ├── common/                  # 通用类
│   │   ├── config/                  # 配置类
│   │   ├── constant/                # 常量定义
│   │   ├── controller/              # 控制器层
│   │   │   ├── StudentController.java
│   │   │   ├── CourseController.java
│   │   │   ├── ScoreController.java
│   │   │   ├── UserController.java
│   │   │   ├── StatisticsController.java
│   │   │   └── ...
│   │   ├── exception/               # 异常处理
│   │   ├── mapper/                  # 数据访问层
│   │   ├── model/                   # 数据模型
│   │   │   ├── dto/                 # 数据传输对象
│   │   │   ├── entity/              # 实体类
│   │   │   └── vo/                  # 视图对象
│   │   ├── service/                 # 业务逻辑层
│   │   │   ├── impl/                # 业务实现类
│   │   │   └── ...Service.java
│   │   └── utils/                   # 工具类
│   ├── src/main/resources/
│   │   ├── application.yml          # 配置文件
│   │   ├── application-prod.yml     # 生产环境配置
│   │   ├── mapper/                  # MyBatis映射文件
│   │   └── sql/                     # 数据库脚本
│   └── pom.xml                      # Maven配置
│
├── yupi-antd-frontend-init-master/  # 前端项目
│   ├── config/                      # 配置文件
│   │   ├── config.ts                # 全局配置（已优化路由）
│   │   ├── proxy.ts                 # 代理配置
│   │   └── routes.ts                # 路由配置（已完善权限）
│   ├── public/                      # 静态资源
│   ├── src/
│   │   ├── access.ts                # 权限配置
│   │   ├── components/              # 公共组件
│   │   ├── constants/               # 常量定义
│   │   ├── hooks/                   # 自定义Hooks
│   │   ├── pages/                   # 页面组件
│   │   │   ├── Welcome.tsx          # 首页（已优化权限）
│   │   │   ├── Account/             # 个人中心（已修复）
│   │   │   ├── Student/             # 学生管理（已优化权限）
│   │   │   ├── Course/              # 课程管理（已优化权限）
│   │   │   ├── Score/               # 成绩管理（已优化权限）
│   │   │   ├── StatusChange/        # 学籍异动（已优化权限）
│   │   │   └── ...
│   │   ├── services/                # API服务
│   │   ├── utils/                   # 工具函数
│   │   └── app.tsx                  # 应用入口
│   ├── package.json                 # 依赖配置
│   └── tsconfig.json                # TypeScript配置
│
├── docs/                            # 项目文档
│   ├── PERMISSION_FIXES.md          # 权限修复说明
│   ├── SPA_ROUTING_SOLUTIONS.md     # 路由问题解决方案
│   ├── HOMEPAGE_FIX.md              # 首页优化说明
│   └── AVATAR_MODIFICATION.md       # 头像功能说明
├── nginx.conf                       # Nginx配置文件
├── deploy-all.sh                    # 一键部署脚本
├── README.md                        # 项目说明
└── LICENSE                          # 许可证
```

## 🚀 快速开始

### 环境要求
- **Java**: JDK 8+
- **Node.js**: 16.0+
- **MySQL**: 8.0+
- **Redis**: 6.0+（可选）
- **Maven**: 3.6+

### 1. 克隆项目
```bash
git clone https://github.com/Mengxun326/SAR_MIS.git
cd SAR_MIS
```

### 2. 数据库初始化
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE student_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 导入数据表和测试数据
mysql -u root -p student_management < springboot-init-master/sql/create_table.sql
```

### 3. 后端启动
```bash
cd springboot-init-master

# 修改配置文件
vim src/main/resources/application.yml
# 配置数据库连接等

# 启动项目
mvn spring-boot:run
```

### 4. 前端启动
```bash
cd yupi-antd-frontend-init-master

# 安装依赖
npm install

# 启动开发服务器
npm start
```

**⚠️ 重要提醒**：如果修改了UmiJS配置文件，需要清除缓存：
```bash
# 停止服务器 (Ctrl+C)
# 清除缓存
rm -rf .umi node_modules/.cache
# 重新启动
npm start
```

### 5. 访问系统
- 前端地址：http://localhost:8000
- 后端接口：http://localhost:8101/api
- 接口文档：http://localhost:8101/api/doc.html

### 默认账号
```
管理员账号：admin / 12345678
教师账号：teacher / 12345678
学生账号：user / 12345678
```

## 📖 功能说明

### 权限控制说明

| 角色 | 权限范围 | 界面功能 |
|------|----------|----------|
| **管理员** | 全部功能的增删改查权限、用户管理、系统配置 | 显示所有功能模块（8个） |
| **教师** | 课程管理、成绩录入、学生信息管理、异动审批 | 显示教学相关模块（7个） |
| **学生** | 个人信息查看、选课、成绩查询、异动申请 | 显示学生相关模块（3个） |

### 页面权限控制
- **列表页面**：编辑、删除、新增按钮只对教师和管理员可见
- **详情页面**：编辑按钮根据权限动态显示
- **首页模块**：根据用户角色显示不同的功能卡片
- **个人中心**：所有用户可访问，支持个性化设置

### 核心业务流程

#### 1. 学生信息管理流程
```
学生注册 → 信息录入 → 学籍建立 → 信息维护 → 状态变更
```

#### 2. 成绩管理流程
```
课程开设 → 学生选课 → 成绩录入 → 成绩审核 → 成绩发布
```

#### 3. 学籍异动流程
```
异动申请 → 材料审核 → 审批处理 → 结果通知 → 状态更新
```

## 🚦 部署指南

### 开发环境
```bash
# 后端
mvn spring-boot:run

# 前端
npm start
```

### 生产环境部署

#### 方式一：一键部署（推荐）
```bash
# 使用提供的部署脚本
chmod +x deploy-all.sh
./deploy-all.sh
```

#### 方式二：手动部署
```bash
# 1. 后端打包
cd springboot-init-master
mvn clean package -DskipTests

# 2. 前端打包
cd yupi-antd-frontend-init-master
npm run build

# 3. 部署
# 将生成的JAR文件和dist文件夹部署到服务器
# 使用提供的nginx.conf配置Nginx
```

### Docker部署
```bash
# 构建并启动
docker-compose up -d
```

## 🔧 常见问题解决

### 1. 页面刷新出现404
- **原因**：SPA路由问题
- **解决**：已切换为Hash路由模式，URL会包含#号
- **详情**：查看 [SPA_ROUTING_SOLUTIONS.md](SPA_ROUTING_SOLUTIONS.md)

### 2. 权限按钮显示异常
- **原因**：权限控制不完善
- **解决**：已修复所有页面的权限控制
- **详情**：查看 [PERMISSION_FIXES.md](PERMISSION_FIXES.md)

### 3. 个人设置页面报错
- **原因**：组件导入问题
- **解决**：已修复ProForm组件使用
- **详情**：查看 [AVATAR_MODIFICATION.md](AVATAR_MODIFICATION.md)

### 4. 首页功能卡片权限问题
- **原因**：未根据用户角色控制显示
- **解决**：已实现权限适配的动态界面
- **详情**：查看 [HOMEPAGE_FIX.md](HOMEPAGE_FIX.md)

## 🎯 开发规范

### 前端权限控制模式
```typescript
// 获取用户权限
const { initialState } = useModel('@@initialState');
const { currentUser } = initialState || {};

// 权限控制渲染
{(currentUser?.userRole === 'teacher' || currentUser?.userRole === 'admin') && (
  <Button>只有教师和管理员可见</Button>
)}
```

### 路由配置规范
```typescript
// 路由权限配置
{
  path: '/student',
  access: 'canTeacher',  // 教师和管理员可访问
  routes: [
    {
      path: '/student/edit/:id',
      access: 'canTeacher',  // 确保子路由也有权限控制
    }
  ]
}
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码提交规范
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关

### 贡献者
- [@Mengxun326](https://github.com/Mengxun326) - 项目负责人

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [项目文档](docs/)
- [API文档](http://localhost:8101/api/doc.html)
- [更新日志](CHANGELOG.md)
- [问题反馈](https://github.com/Mengxun326/SAR_MIS/issues)

## 📞 联系我们

- 📧 邮箱：xingchen@qq.com
- 🐛 问题反馈：[GitHub Issues](https://github.com/Mengxun326/SAR_MIS/issues)
- 💬 技术交流群：123456789

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个Star！**

Made with ❤️ by [星辰](https://github.com/Mengxun326)

</div> 