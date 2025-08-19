# DevContainer 配置说明

这个 devContainer 配置为 Dapr 中国社区网站提供了完整的开发环境。

## 包含的工具

- **Hugo Extended**: 用于构建静态网站
- **Go 1.21**: 用于 Hugo 模块管理
- **Node.js 18**: 用于前端工具链
- **Git**: 版本控制

## VS Code 扩展

- Hugo 语言支持
- Go 语言支持
- Markdown 预览和编辑
- YAML 支持
- 拼写检查

## 使用方法

1. 确保安装了 Docker 和 VS Code Dev Containers 扩展
2. 在 VS Code 中打开项目
3. 按 `Ctrl+Shift+P` 打开命令面板
4. 选择 "Dev Containers: Reopen in Container"

## 开发服务器

容器启动后，你可以运行以下命令启动 Hugo 开发服务器：

```bash
hugo server --bind 0.0.0.0 --port 1313
```

网站将在 `http://localhost:1313` 可访问。

## 注意事项

- 如果你有本地的 `wowchemy-hugo-themes` 目录，请确保它位于项目的父目录中
- 端口 1313 已经配置为自动转发
- 容器会自动下载 Go 模块依赖