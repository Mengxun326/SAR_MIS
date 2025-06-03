# 📚 项目文档目录

这个目录包含项目的相关文档和资源文件。

## 📁 目录结构

```
docs/
├── images/                 # 系统截图和图片资源
│   ├── dashboard.png       # 首页大屏截图
│   ├── student-management.png  # 学生管理页面截图
│   ├── score-management.png    # 成绩管理页面截图
│   ├── course-management.png   # 课程管理页面截图
│   └── ...                # 其他页面截图
├── api/                    # API文档（可选）
├── design/                 # 设计文档（可选）
└── README.md              # 本说明文件
```

## 🖼️ 系统截图规范

### 图片命名规范
- 使用小写字母和连字符分隔
- 文件名要有描述性
- 统一使用 `.png` 格式（推荐）或 `.jpg` 格式

### 建议的截图内容
1. **dashboard.png** - 系统首页/仪表板
2. **student-management.png** - 学生管理列表页面
3. **student-add.png** - 添加学生页面
4. **course-management.png** - 课程管理页面
5. **score-management.png** - 成绩管理页面
6. **login.png** - 登录页面
7. **user-profile.png** - 用户个人信息页面

### 截图要求
- **分辨率**：建议1920x1080或以上
- **格式**：PNG（支持透明背景）或JPG
- **大小**：单个文件不超过2MB
- **内容**：确保截图内容清晰，包含完整的页面布局
- **数据**：使用模拟数据，避免真实敏感信息

### 如何添加截图
1. 将截图文件放入 `docs/images/` 目录
2. 在 README.md 中使用相对路径引用：
   ```markdown
   ![页面名称](docs/images/your-screenshot.png)
   ```

## 📋 其他文档类型

### API文档
如果需要独立的API文档，可以在 `docs/api/` 目录下创建：
- `api-reference.md` - API接口说明
- `authentication.md` - 认证机制说明

### 设计文档
可以在 `docs/design/` 目录下添加：
- `database-design.md` - 数据库设计文档
- `system-architecture.md` - 系统架构设计
- `ui-guidelines.md` - UI设计规范

## 💡 使用建议

1. **保持更新**：当系统界面有重大更新时，及时更新对应的截图
2. **多角度展示**：可以包含桌面端和移动端的截图
3. **功能演示**：除了静态截图，也可以考虑添加GIF动图展示操作流程
4. **文件压缩**：使用工具压缩图片大小，提高README加载速度

## 🔗 相关链接

- [主项目README](../README.md)
- [部署说明](../部署说明.md)
- [更新日志](../CHANGELOG.md) 