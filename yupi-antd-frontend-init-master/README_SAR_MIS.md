# 学生学籍管理信息系统 (SAR_MIS)

## 项目简介

学生学籍管理信息系统是一个基于 React + Ant Design Pro 的现代化学生信息管理平台，为学校提供完整的学生学籍管理解决方案。

## 技术栈

- **前端框架**: React 18.2.0
- **UI 组件库**: Ant Design 5.2.2 + Ant Design Pro 6.0.0
- **构建工具**: Umi 4.0
- **开发语言**: TypeScript
- **状态管理**: Umi 内置状态管理
- **HTTP 客户端**: Umi Request

## 功能模块

### 1. 学生信息管理
- ✅ 学生基本信息录入、编辑、删除
- ✅ 学生信息详情查看
- ✅ 学生信息列表查询和分页
- ✅ 支持按学号、姓名、专业、班级等条件搜索

### 2. 成绩管理 (待开发)
- 📋 成绩录入和修改
- 📋 成绩统计分析
- 📋 GPA 计算
- 📋 成绩排名

### 3. 课程管理 (待开发)
- 📋 课程信息管理
- 📋 选课系统
- 📋 课程安排

### 4. 学籍异动管理 (待开发)
- 📋 休学申请
- 📋 复学申请
- 📋 转专业申请
- 📋 退学申请

### 5. 奖惩管理 (待开发)
- 📋 奖励记录管理
- 📋 处分记录管理

### 6. 家庭信息管理 (待开发)
- 📋 家庭成员信息
- 📋 联系方式管理

### 7. 健康档案管理 (待开发)
- 📋 体检记录
- 📋 健康状况跟踪

## 项目配置

### 1. 后端接口配置

项目已配置代理，将前端请求代理到后端服务器：

```typescript
// config/proxy.ts
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8081',  // 后端服务地址
      changeOrigin: true,
    },
  },
};
```

### 2. 权限配置

系统支持三种角色权限：

```typescript
// src/access.ts
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 'admin',
    canTeacher: currentUser && (currentUser.userRole === 'teacher' || currentUser.userRole === 'admin'),
    canStudent: currentUser && (currentUser.userRole === 'student' || currentUser.userRole === 'admin'),
  };
}
```

- **admin**: 管理员，拥有所有权限
- **teacher**: 教师，可以管理成绩、课程等
- **student**: 学生，可以查看自己的信息

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run start:dev
```

访问地址：http://localhost:8000

### 构建生产版本

```bash
npm run build
```

## 后端接口要求

### 接口基础信息

- **后端服务地址**: http://localhost:8081
- **接口前缀**: /api
- **响应格式**: 
```json
{
  "code": 0,
  "data": {},
  "message": "ok"
}
```

### 主要接口列表

#### 用户认证
- `POST /api/user/login` - 用户登录
- `POST /api/user/logout` - 用户注销
- `GET /api/user/get/login` - 获取当前登录用户

#### 学生管理
- `POST /api/student/add` - 添加学生
- `POST /api/student/update` - 更新学生信息
- `POST /api/student/delete` - 删除学生
- `GET /api/student/get` - 获取学生详情
- `POST /api/student/list/page` - 分页查询学生列表

更多接口详情请参考 `docs/api/api.md` 文件。

## 项目结构

```
src/
├── components/          # 公共组件
├── pages/              # 页面组件
│   ├── Student/        # 学生管理页面
│   │   ├── List.tsx    # 学生列表
│   │   ├── Add.tsx     # 添加学生
│   │   ├── Edit.tsx    # 编辑学生
│   │   └── Detail.tsx  # 学生详情
│   ├── User/           # 用户相关页面
│   ├── Admin/          # 管理员页面
│   └── Welcome.tsx     # 首页
├── services/           # API 服务
│   └── backend/        # 后端接口
├── access.ts           # 权限配置
├── app.tsx            # 应用配置
└── global.tsx         # 全局配置
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 下创建页面组件
2. 在 `config/routes.ts` 中添加路由配置
3. 如需权限控制，在路由中添加 `access` 字段

### 添加新接口

1. 在 `src/services/backend/` 下创建对应的 Controller 文件
2. 在 `src/services/backend/typings.d.ts` 中添加类型定义
3. 在页面中导入并使用接口

### 样式开发

项目使用 Ant Design 的设计语言，建议：
- 优先使用 Ant Design 组件
- 使用 Pro Components 提高开发效率
- 遵循 Ant Design 的设计规范

## 部署说明

### 开发环境部署

1. 确保后端服务在 8081 端口运行
2. 启动前端开发服务器：`npm run start:dev`
3. 访问 http://localhost:8000

### 生产环境部署

1. 构建项目：`npm run build`
2. 将 `dist` 目录部署到 Web 服务器
3. 配置反向代理将 `/api` 请求转发到后端服务

## 常见问题

### 1. 代理配置不生效

确保后端服务正在 8081 端口运行，并且接口路径正确。

### 2. 权限控制不生效

检查用户登录状态和 `userRole` 字段是否正确设置。

### 3. 页面路由不生效

检查 `config/routes.ts` 中的路由配置和页面组件路径。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题，请联系项目维护者。 