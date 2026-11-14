---
title: "Dapr 常见问题"
description: "关于持久化执行、工作流、AI 代理、MCP server、部署、SDK 语言、许可与支持的简明解答。"
intro: "以下回答整理自 Dapr 官网，并附有进一步阅读的文档链接。"
source: "https://dapr.io/faq/"
---

## Dapr 是什么

Dapr 是面向工作流和 AI 代理的持久化执行运行时，也提供构建事件驱动架构的 API。工作流、服务调用、发布订阅、状态管理等构建块，都是代码可以调用的 HTTP 或 gRPC API，并使用一个或多个 Dapr 组件。

[了解构建块](https://docs.dapr.io/concepts/building-blocks-concept/)

## 什么是持久化执行

持久化执行保证代码在崩溃、重启和中断的情况下仍可执行完成。Dapr 围绕持久化执行构建，其核心工作流引擎编排长时间运行的业务流程，并为持久化 AI 代理提供支持。

[阅读核心概念](https://docs.dapr.io/concepts/)

## Dapr 是工作流引擎吗

Dapr 包含工作流引擎。Dapr Workflow 提供持久化执行，你使用 Dapr SDK，以普通代码编写流程逻辑。Dapr 持久化每个已完成步骤的结果，在崩溃、重启或重新部署后，从最后完成的步骤继续。工作流也可以编排服务调用、发布订阅、状态管理、绑定等其他构建块。

[工作流概览](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-overview/)

## Dapr 如何帮助构建 AI 代理

Dapr Agents 是一个 Python 框架，利用 Dapr 的分布式系统能力构建基于大语言模型（LLM）的 AI 代理。代理可以执行持久化任务、作出决策并通过工作流协作，同时利用状态管理、消息和可观测性能力。Dapr Agents v1.0 已正式发布，可用于生产环境。

[探索 Dapr Agents](https://docs.dapr.io/developing-ai/dapr-agents/)

## 什么是 Dapr MCP server

Dapr MCP server（alpha）是独立的 Model Context Protocol 服务器，与 Dapr Sidecar 一同运行，将状态、发布订阅、绑定、密钥和服务调用等构建块变成任意 MCP 客户端可调用的工具。它有独立二进制和发布周期，并不是 Sidecar 本身的功能。由于仍处于 alpha 阶段，工具名称、输入与配置可能在未来版本改变。

[了解 Dapr MCP server](https://docs.dapr.io/developing-ai/mcp/dapr-mcp-server/)

## Dapr 必须运行在 Kubernetes 上吗

不必，但大多数组织确实在生产环境中使用 Kubernetes。Dapr 可以以自托管模式运行在开发机或生产虚拟机上，每个服务都有对应的 Sidecar 进程。自托管默认使用 Docker 初始化，也可使用 slim-init 模式，还支持离线和物理隔离网络环境。

[查看托管选项](https://docs.dapr.io/operations/hosting/) · [自托管说明](https://docs.dapr.io/operations/hosting/self-hosted/self-hosted-overview/)

## Dapr 支持哪些编程语言

Dapr 提供稳定的 .NET、Python、Java、Go、PHP 和 JavaScript SDK，C++ 和 Rust SDK 正在开发中。不同语言的 SDK 提供客户端、服务端扩展、Actor 和工作流等软件包。任意语言也都可以直接调用 HTTP 或 gRPC API。

[浏览 SDK](https://docs.dapr.io/developing-applications/sdks/)

## 如何向现有应用加入 Dapr

Dapr Sidecar 作为独立进程与应用并行运行，应用通过本地 HTTP 或 gRPC 端点调用 API。本地开发时，Dapr CLI 的 run 命令会同时启动应用和 Sidecar。在 Kubernetes 上，Sidecar injector 会为带有 `dapr.io/enabled` 注解的 Pod 注入 Sidecar。

[了解 Sidecar](https://docs.dapr.io/concepts/dapr-services/sidecar/)

## Dapr 可以用于生产吗，哪些组织在使用

可以，Dapr 已经具备生产就绪能力多年，也是 CNCF 毕业项目。采用者在 CNCF 案例页面介绍了自己的使用方式。

[查看 CNCF 项目与案例](https://www.cncf.io/projects/dapr/)

## Dapr 免费且开源吗

是。Dapr 采用 Apache License 2.0，源代码在 GitHub 上公开。

[查看 GitHub](https://github.com/dapr/dapr) · [查看许可证](https://github.com/dapr/dapr/blob/master/LICENSE)

## 哪里能获得商业支持

Dapr 生态中的公司提供商业支持、托管服务和企业发行版，面向生产运行场景。企业解决方案页面列出了这些服务。

[查看企业解决方案](/enterprise/)
