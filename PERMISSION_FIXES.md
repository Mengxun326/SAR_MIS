# 权限问题修复总结

## 问题概述
在检查系统权限控制时，发现多个页面存在权限控制不严格的问题，可能导致普通用户点击无权限操作的按钮时出现404错误。

## 修复的权限问题

### 1. 个人中心页面 (Account/Center.tsx)
**问题**: 编辑链接使用了 `<a href="/account/settings">` 导致页面刷新
**修复**: 改为使用 `<Link to="/account/settings">` 进行前端路由跳转

### 2. 课程详情页面 (Course/Detail.tsx)
**问题**: "编辑课程"按钮对所有用户可见，普通学生点击会导致404
**修复**: 添加权限控制，只对教师和管理员显示编辑按钮
```typescript
{(currentUser?.userRole === 'teacher' || currentUser?.userRole === 'admin') && [
  <Button key="edit" type="primary" onClick={() => history.push(`/course/edit/${id}`)}>
    编辑课程
  </Button>
]}
```

### 3. 学籍异动详情页面 (StatusChange/Detail.tsx)
**问题**: "审批"按钮没有权限检查，普通用户点击会导致404
**修复**: 添加权限控制，只对管理员显示审批按钮
```typescript
{record?.status === '待审批' && (currentUser?.userRole === 'admin') && [
  <Button key="edit" type="primary" onClick={() => history.push('/status-change/approve')}>
    审批
  </Button>
]}
```

### 4. 成绩列表页面 (Score/List.tsx)
**问题**: 编辑、删除按钮和录入成绩按钮对所有用户可见
**修复**: 添加权限控制，只对教师和管理员显示这些按钮
- 表格操作列中的编辑和删除按钮
- 工具栏中的录入成绩按钮

### 5. 学生列表页面 (Student/List.tsx)
**问题**: 编辑、删除按钮和新增学生按钮对所有用户可见
**修复**: 添加权限控制，只对教师和管理员显示这些按钮
- 表格操作列中的编辑和删除按钮
- 工具栏中的新增学生按钮

### 6. 学生详情页面 (Student/Detail.tsx)
**问题**: "编辑"按钮对所有用户可见，普通学生点击会导致404
**修复**: 添加权限控制，只对教师和管理员显示编辑按钮

## 权限控制原则
- **学生角色** (`user`): 只能访问查看功能，不能进行编辑、删除、新增操作
- **教师角色** (`teacher`): 可以访问所有教学相关的管理功能
- **管理员角色** (`admin`): 拥有所有权限，包括系统管理功能

## 技术实现
使用 `useModel('@@initialState')` 获取当前用户信息，根据 `currentUser?.userRole` 判断用户权限：
```typescript
const { initialState } = useModel('@@initialState');
const { currentUser } = initialState || {};

// 权限检查
(currentUser?.userRole === 'teacher' || currentUser?.userRole === 'admin')
```

## 用户体验改进
- 避免了用户点击无权限按钮时出现404错误
- 提供了更直观的界面，只显示用户有权限的操作
- 保持了系统的一致性和安全性

## 测试建议
1. 使用不同角色用户登录测试
2. 确认各角色用户只能看到对应权限的操作按钮
3. 验证权限控制后不再出现404错误 