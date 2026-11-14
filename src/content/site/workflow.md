---
title: "面向分布式应用的持久化工作流"
description: "用 Dapr Workflow 编写持久化、可验证的长时间运行流程，支持重试、定时器、人工审批和 Saga，无需独立运维工作流引擎。"
intro: "用普通代码编写工作流，Dapr 会持久化每个已完成步骤，使流程能够在崩溃、重启或重新部署后继续执行。"
source: "https://dapr.io/workflow/"
---

Dapr Workflow 为分布式应用提供持久化、可验证的执行能力。多步骤编排、Saga、审批流程、数据流水线和 AI 代理计划等长时间运行的过程，会将每一步的检查点写入状态存储，因此可以应对崩溃、重启和网络故障。使用 Go、Python、.NET、Java 或 JavaScript 编写普通代码，把重试、定时器、扇出与扇入、补偿等复杂工作交给 Dapr。

## 用代码定义工作流

使用熟悉的语言，把工作流写成普通函数。Dapr 自动将其转为持久化执行，无需学习 DSL、状态机编辑器或独立工作流引擎。现有测试工具与 IDE 无需改变。

[编写工作流](https://docs.dapr.io/developing-applications/building-blocks/workflow/howto-author-workflow/)

## 自动重试与补偿

在代码中声明重试策略、超时和补偿步骤。Dapr 负责瞬时故障、指数退避和 Saga 回滚。当流程无法恢复时，会进入明确的失败路径，而不是留下挂起的作业。

[重试策略](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-features-concepts/#retry-policies)

## 人工参与与外部事件

暂停工作流以等待审批、Webhook 回调或其他服务发出的事件。Dapr 将执行状态保存在状态存储中，信号到达后即可恢复，即使已过去数周或主机已经重启。

[外部系统交互](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-patterns/#external-system-interaction)

## 扩展规模，无需运维独立引擎

不必部署、修补或扩容独立的工作流服务器。Dapr Workflow 与其他 Dapr API 运行在同一个 Sidecar 中，并用现有的 Redis、Postgres、Cosmos DB 等状态存储作为持久化后端。项目每夜性能测试显示，Dapr 1.19 相较 1.18 的工作流吞吐量最高提升 40%。

[工作流架构](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-architecture/) · [1.19 发布说明](https://github.com/dapr/dapr/releases/tag/v1.19.0)

## 与 Dapr API 组合

在工作流活动中直接调用服务调用、发布订阅、状态、绑定、Actor 和 AI 代理能力。所有 Dapr 构建块均可与工作流结合，享有相同的安全与可观测性保障。

[工作流概览](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-overview/)

## 跨应用工作流

应用可以启动、查询、发送事件、暂停、恢复、终止和清除同一命名空间中其他应用拥有的工作流，无需自行注册这些工作流。受支持的 SDK 工作流客户端还可以重新运行它们。工作流所属应用的访问策略决定哪个调用方能对哪个工作流执行哪些操作。

[跨应用工作流](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-multi-app/)

## 分离式工作流

工作流可以启动一个分离式工作流：它拥有独立历史和生命周期，不与父工作流关联，也不向父工作流返回结果。适合清理、报表等需要比调用方存活更久的任务。

[分离式工作流](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-detached/)

## 生产级可观测性

通过 OpenTelemetry 追踪每个工作流实例、活动与重试。使用 Jaeger、Zipkin、Grafana Tempo、Application Insights 等标准追踪后端，检查运行状态、回放历史并调试故障。

[追踪概览](https://docs.dapr.io/operations/observability/tracing/tracing-overview/)

## 可验证执行

工作流执行历史可以进行密码学签名，使执行记录可审计，篡改可被发现。每个历史事件使用 Sidecar 的 mTLS 身份签名，形成签名链，并在每次加载工作流状态时验证。

[工作流历史签名](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-history-signing/)

## 开发时检查工作流

无需添加埋点，即可在本地运行时观察实例、活动、重试与历史。Diagrid 维护的 Dapr Dev Dashboard 提供本机 Dapr 的实时视图。

[体验 Dapr Dev Dashboard](https://docs.diagrid.io/dapr-open-source/dapr-dev-dashboard/)

## 开始使用

[阅读工作流概览](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-overview/) · [运行快速入门](https://docs.dapr.io/getting-started/quickstarts/workflow-quickstart/)
