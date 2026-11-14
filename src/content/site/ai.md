---
title: "用 Dapr 构建生产级 AI 代理"
description: "Dapr Agents 是用于构建有状态、持久化、可观测 AI 代理的开源框架，让多代理工作流可靠运行。"
intro: "Dapr Agents 是基于 Dapr 的开源 Python 框架，用于构建持久化、可观测的 AI 代理和多代理系统。"
source: "https://dapr.io/ai/"
---

Dapr Agents 从第一天起就为 AI 代理提供持久化、可观测性和生产就绪能力。基于经过实践验证的 Dapr 运行时，代理开箱即用地获得状态持久化、工作流持久性、安全工具调用与多代理协作能力，无需编写基础设施代码。可以在任何云上运行任意 LLM，并获得团队在微服务中已经信赖的可靠性。

## 默认支持持久化

基于 Dapr Workflow 的代理能够应对崩溃、重启和基础设施故障。代理推理的每一步都会将检查点写入状态存储，长时间运行的计划可以从中断处继续，不丢失上下文，也不留下只执行一半的动作。

[核心概念](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-core-concepts/)

## 不绑定模型或工具

在 OpenAI、Anthropic、Google、Azure OpenAI、Hugging Face 上的开源模型和本地模型之间切换，无需改动代理代码。工具通过 Dapr 组件模型调用，可以修改配置来替换实现，而不是修改代码。

[模型与工具集成](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-integrations/)

## 多代理编排

使用 Dapr 的发布订阅、工作流和 Actor API，将专长不同的代理组合成团队。运行时负责代理之间的消息传递、路由和状态共享。你定义角色与任务，Dapr 负责大规模协作。

[代理模式](https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-patterns/)

## 安全工具调用与 MCP

通过 Dapr 服务调用路由的工具请求，可以获得 mTLS 身份、可配置访问控制和追踪。原生 Model Context Protocol（MCP）支持，让代理通过同样的控制访问外部工具和数据源。

[了解 MCP](https://docs.dapr.io/developing-ai/mcp/)

## Dapr MCP server（alpha）

Dapr MCP server 是拥有独立发布周期的二进制程序，与 Dapr Sidecar 一同运行。它将状态、发布订阅、绑定、密钥、服务调用、Actor 等构建块作为 MCP 工具暴露给任意 MCP 客户端。

认证在配置之前处于关闭状态。当通过 HTTP 向 localhost 之外提供服务时，应当开启认证。

[Dapr MCP server 文档](https://docs.dapr.io/developing-ai/mcp/dapr-mcp-server/)

## 搜索与向量 API（alpha）

搜索与向量 API 分别以统一、可移植的接口存储和查询数据，让代理和其他应用获取上下文时不必为每个引擎学习不同 SDK。搜索构建块在全文搜索引擎中索引和查询 JSON 文档；向量构建块存储应用生成的嵌入向量，并执行相似度查询，为检索增强生成（RAG）等模式提供存储与检索层。Dapr 1.19 为两者提供 Meilisearch 组件，切换引擎只需更换组件。

[搜索 API](https://docs.dapr.io/developing-applications/building-blocks/search/search-overview/) · [向量 API](https://docs.dapr.io/developing-applications/building-blocks/vector/vector-overview/)

## 从第一次请求起即可观测

代理自动获得 OpenTelemetry 追踪、指标和日志。每次提示、工具调用和状态转换，都能在平台团队用于微服务的同一套仪表盘中查看。

[追踪概览](https://docs.dapr.io/operations/observability/tracing/tracing-overview/)

## Kubernetes 原生，随处运行

像部署其他 Dapr 应用一样部署代理：可以是 Kubernetes 中的 Sidecar、虚拟机上的独立进程，或笔记本上的本地进程。代理与其他 Dapr 工作负载具有相同的可移植性保障。

[托管选项](https://docs.dapr.io/operations/hosting/)

## 开始使用

[开始使用 Dapr Agents](https://docs.dapr.io/developing-ai/dapr-agents/) · [查看 GitHub 源码](https://github.com/dapr/dapr-agents)
