# Hugo 版本锁定说明

本项目使用 **Hugo v0.97.3 Extended** 版本进行构建。

## 为什么锁定版本？

- 确保构建的一致性和可重现性
- 避免新版本 Hugo 可能引入的兼容性问题
- 与现有的主题和模块保持兼容

## 配置文件

以下文件已配置使用 Hugo 0.97.3：

- `.github/workflows/release.yml` - GitHub Actions 部署工作流
- `.github/workflows/hugo-build.yml` - GitHub Actions 构建测试
- `.devcontainer/devcontainer.json` - VS Code Dev Container
- `netlify.toml` - Netlify 部署配置
- `.gitpod.yml` - Gitpod 开发环境

## 本地开发

### 使用 Dev Container (推荐)
```bash
# 在 VS Code 中打开项目
# 按 Ctrl+Shift+P，选择 "Dev Containers: Reopen in Container"
```

### 手动安装
```bash
# Linux/macOS
wget https://github.com/gohugoio/hugo/releases/download/v0.97.3/hugo_extended_0.97.3_Linux-64bit.tar.gz
tar -xzf hugo_extended_0.97.3_Linux-64bit.tar.gz
sudo mv hugo /usr/local/bin/

# 验证版本
hugo version
```

### 运行开发服务器
```bash
hugo server --bind 0.0.0.0 --port 1313
```

## 升级 Hugo 版本

如果需要升级 Hugo 版本，请同时更新以上所有配置文件中的版本号。