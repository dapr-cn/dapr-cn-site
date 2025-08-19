# 可选的自定义 Dockerfile，如果需要额外的工具可以使用
FROM mcr.microsoft.com/devcontainers/go:1.21-bullseye

# 安装额外的工具
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        curl \
        wget \
        git \
        build-essential \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /workspace