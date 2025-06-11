# SPA路由刷新404问题解决方案

## 问题描述
在单页应用(SPA)中，当使用浏览器历史模式(`browser` history)时，直接访问或刷新非根路径页面会出现404错误。

## 问题原因
- **开发环境**：webpack-dev-server自动处理路由回退
- **生产环境**：Web服务器收到如 `/student/list` 的请求时，会查找对应的静态文件，但SPA只有一个 `index.html` 文件

## 解决方案

### 方案1：Hash路由模式（已实施）
**修改配置文件**：`config/config.ts`
```typescript
history: {
  type: 'hash'  // 从 'browser' 改为 'hash'
}
```

**重要提醒**：⚠️ 修改配置后需要：
1. **停止开发服务器**（Ctrl+C）
2. **清除缓存**：删除 `.umi` 和 `node_modules/.cache` 文件夹
3. **重新启动**：`npm start`

**优点**：
- 简单直接，无需服务器配置
- 刷新页面不会出现404
- 兼容性好

**缺点**：
- URL带#号（如：`http://localhost:8000/#/student/list`）
- SEO不友好
- 分享链接体验较差

### 方案2：Browser路由 + 服务器配置
**保持配置文件**：`config/config.ts`
```typescript
history: {
  type: 'browser'
}
```

**Nginx配置**：`nginx.conf`（已配置）
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**优点**：
- URL更友好（如：`http://localhost:8000/student/list`）
- SEO友好
- 用户体验更好

**缺点**：
- 需要服务器配置支持
- 配置稍复杂

## 当前状态
- ✅ **已切换到Hash路由模式**，解决刷新404问题
- ✅ **Nginx配置完善**，支持Browser路由模式
- ✅ **缓存已清除**，配置已生效
- 🔄 **可随时切换**两种模式

## 故障排除

### 如果配置修改后没有生效
1. **停止开发服务器**：按 `Ctrl+C`
2. **清除UmiJS缓存**：
   ```bash
   # Windows
   rmdir /s /q .umi
   rmdir /s /q node_modules\.cache
   
   # macOS/Linux
   rm -rf .umi
   rm -rf node_modules/.cache
   ```
3. **重新启动**：`npm start`
4. **检验效果**：URL是否变为 `#` 格式

### 验证Hash模式是否生效
- ✅ 正确：`http://localhost:8000/#/welcome`
- ❌ 错误：`http://localhost:8000/welcome`

## 切换方式

### 切换到Browser模式
1. 修改 `config/config.ts`：
```typescript
history: {
  type: 'browser'
}
```

2. 确保生产环境Nginx配置正确：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

3. 清除缓存并重新构建部署

### 切换到Hash模式
1. 修改 `config/config.ts`：
```typescript
history: {
  type: 'hash'
}
```

2. 清除缓存并重新构建部署

## 测试方法
1. 构建项目：`npm run build`
2. 部署到服务器
3. 访问子路径（如：`/student/list`）
4. 刷新页面，确认无404错误

## 推荐
- **开发/测试环境**：使用Hash模式，简单稳定
- **生产环境**：使用Browser模式，用户体验更好 