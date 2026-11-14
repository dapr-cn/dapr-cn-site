# Node 24 with pnpm, the toolchain the site builds with. Nothing else is needed.
FROM node:24-bookworm

# Git for version control. curl helps when debugging a remote site.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        curl \
        git \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Enables pnpm for every user. The pnpm version is read from package.json (packageManager).
RUN corepack enable

WORKDIR /workspace
