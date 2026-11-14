# DevContainer 配置说明

这个 devContainer 为 Dapr 中国社区网站提供开发环境：Node.js 24 和 pnpm，用于 Astro 构建。

## 包含的工具

- **Node.js 24**: 构建和运行 Astro 站点
- **pnpm**: 版本由 `package.json` 的 `packageManager` 字段指定，通过 corepack 启用
- **Git**: 版本控制

## VS Code 扩展

- Astro 语言支持
- Markdown 预览和编辑
- YAML 支持
- 拼写检查

## 使用方法

1. 确保安装了 Docker 和 VS Code Dev Containers 扩展
2. 在 VS Code 中打开项目
3. 按 `Ctrl+Shift+P` 打开命令面板
4. 选择 "Dev Containers: Reopen in Container"

容器创建后会自动执行 `pnpm install --frozen-lockfile`。

## 开发服务器

```bash
pnpm run dev
```

网站将在 `http://localhost:4321` 可访问。内容改动会自动刷新。

## 其他命令

```bash
pnpm run build    # 构建到 dist/，并生成搜索索引
pnpm run verify   # 构建并检查路由、内容、链接和图片
```

## 注意事项

- 端口 4321 已经配置为自动转发
