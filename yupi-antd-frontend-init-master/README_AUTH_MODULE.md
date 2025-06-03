# 用户认证与管理模块文档

## 模块概述

本模块包含了学生学籍管理信息系统的用户认证和管理功能，包括用户登录、注册、用户信息管理等核心功能。

## 功能特性

### 1. 用户认证功能

#### 1.1 用户登录 (`/user/login`)
- **功能描述**: 用户通过账号密码进行身份认证
- **页面路径**: `src/pages/User/Login/index.tsx`
- **主要特性**:
  - 支持账号密码登录
  - 表单验证（账号至少4位，密码至少8位）
  - 登录成功后自动跳转到首页或重定向页面
  - 统一的错误处理和用户提示
  - 响应式设计，适配不同屏幕尺寸

#### 1.2 用户注册 (`/user/register`)
- **功能描述**: 新用户账号注册
- **页面路径**: `src/pages/User/Register/index.tsx`
- **主要特性**:
  - 用户账号规则验证（4-16位，只能包含字母、数字、下划线）
  - 密码强度验证（8-32位，必须包含大小写字母和数字）
  - 二次密码确认验证
  - 注册成功后自动跳转到登录页面
  - 友好的错误提示

### 2. 用户管理功能

#### 2.1 用户列表管理 (`/admin/user`)
- **功能描述**: 管理员查看和管理系统中的所有用户
- **页面路径**: `src/pages/Admin/User/index.tsx`
- **主要特性**:
  - 用户列表展示（ID、账号、昵称、头像、简介、角色、创建时间等）
  - 支持按账号、昵称、角色进行搜索过滤
  - 支持按创建时间、更新时间排序
  - 分页显示，支持自定义每页显示数量
  - 用户角色标签化显示（管理员、教师、学生、普通用户）

#### 2.2 用户创建功能
- **组件路径**: `src/pages/Admin/User/components/CreateModal.tsx`
- **主要特性**:
  - 模态框表单设计
  - 完整的表单验证
  - 默认角色设置为学生
  - 创建成功后自动刷新列表

#### 2.3 用户编辑功能
- **组件路径**: `src/pages/Admin/User/components/UpdateModal.tsx`
- **主要特性**:
  - 预填充现有用户信息
  - 支持修改用户昵称、头像、简介、角色
  - 实时表单验证
  - 更新成功后自动刷新列表

#### 2.4 用户删除功能
- **主要特性**:
  - 删除确认对话框
  - 安全的删除操作
  - 删除成功后自动刷新列表

## 技术实现

### 1. 前端技术栈
- **框架**: React 18.2.0 + TypeScript
- **UI组件库**: Ant Design Pro 6.0.0
- **状态管理**: Umi 4.0 + dva
- **表单处理**: ProTable + ProForm
- **HTTP请求**: Umi Request

### 2. API接口
所有用户相关接口位于 `src/services/backend/userController.ts`：

- `userLoginUsingPost`: 用户登录
- `userRegisterUsingPost`: 用户注册
- `getLoginUserUsingGet`: 获取当前登录用户
- `userLogoutUsingPost`: 用户注销
- `listUserByPageUsingPost`: 分页查询用户列表
- `addUserUsingPost`: 添加用户
- `updateUserUsingPost`: 更新用户信息
- `deleteUserUsingPost`: 删除用户
- `getUserByIdUsingGet`: 根据ID获取用户信息

### 3. 类型定义
用户相关类型定义位于 `src/services/backend/typings.d.ts`：

```typescript
// 用户基本信息
type User = {
  createTime?: string;
  id?: string;
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  userPassword?: string;
  userProfile?: string;
  userRole?: string;
}

// 登录请求
type UserLoginRequest = {
  userAccount?: string;
  userPassword?: string;
}

// 注册请求  
type UserRegisterRequest = {
  checkPassword?: string;
  userAccount?: string;
  userPassword?: string;
}

// 用户创建请求
type UserAddRequest = {
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  userRole?: string;
}

// 用户更新请求
type UserUpdateRequest = {
  id?: string;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole?: string;
}
```

## 权限控制

### 1. 角色定义
- **admin**: 管理员 - 拥有所有权限
- **teacher**: 教师 - 可以管理学生信息、成绩等
- **student**: 学生 - 只能查看和修改自己的信息
- **user**: 普通用户 - 基础权限

### 2. 页面权限
- 用户管理页面 (`/admin/user`) 需要管理员权限 (`canAdmin`)
- 登录注册页面无需权限验证
- 其他页面根据角色进行权限控制

## 表单验证规则

### 1. 用户账号验证
- 必填项
- 长度：4-16位字符
- 格式：只能包含字母、数字、下划线
- 正则表达式：`/^[a-zA-Z0-9_]+$/`

### 2. 密码验证
- 必填项
- 长度：8-32位字符
- 强度：必须包含大小写字母和数字
- 正则表达式：`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/`

### 3. 其他字段验证
- 用户昵称：最大50个字符
- 用户简介：最大200个字符
- 用户角色：必选项

## 用户体验优化

### 1. 界面设计
- 统一的品牌标识和主题色彩
- 响应式设计，支持移动端访问
- 清晰的导航结构和面包屑
- 友好的加载状态和错误提示

### 2. 交互优化
- 实时表单验证反馈
- 操作确认对话框
- 成功/失败状态的及时反馈
- 键盘快捷键支持

### 3. 性能优化
- 组件懒加载
- API请求缓存
- 分页加载减少数据传输
- 防抖搜索避免频繁请求

## 安全措施

### 1. 前端安全
- 输入数据验证和清理
- XSS攻击防护
- 敏感信息不在前端存储

### 2. 接口安全
- HTTPS加密传输
- JWT令牌认证
- 接口访问权限控制
- 请求频率限制

## 错误处理

### 1. 网络错误
- 连接超时处理
- 网络中断重试机制
- 友好的错误提示信息

### 2. 业务错误
- 后端错误码统一处理
- 表单验证错误高亮显示
- 操作失败原因明确提示

## 部署说明

### 1. 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问地址：http://localhost:8000
```

### 2. 生产环境
```bash
# 构建项目
npm run build

# 部署dist目录到Web服务器
```

### 3. 环境配置
- 后端API地址配置：`src/constants/index.ts`
- 代理配置：`config/proxy.ts`
- 默认设置：`config/defaultSettings.ts`

## 后续优化计划

### 1. 功能扩展
- [ ] 忘记密码功能
- [ ] 手机号/邮箱登录
- [ ] 第三方登录集成
- [ ] 用户头像上传
- [ ] 用户在线状态

### 2. 体验优化
- [ ] 记住登录状态
- [ ] 登录页面背景轮播
- [ ] 深色主题支持
- [ ] 多语言国际化
- [ ] 无障碍访问支持

### 3. 安全增强
- [ ] 验证码机制
- [ ] 登录失败锁定
- [ ] 异地登录提醒
- [ ] 敏感操作二次确认
- [ ] 操作日志记录

## 联系方式

如有问题或建议，请联系开发团队。

---

*最后更新时间：2024年12月* 