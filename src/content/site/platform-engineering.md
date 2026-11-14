---
title: "用 Dapr 应对平台工程挑战"
description: "了解平台团队如何通过 Dapr 处理基础设施复杂度、可观测性、安全和 Kubernetes 原生 GitOps。"
intro: "平台团队可以集中配置复杂的基础设施，再向应用团队提供简单、一致的 API。"
source: "https://dapr.io/platform-engineering/"
---

Dapr 是 CNCF 毕业项目。平台团队可以配置复杂的环境，同时向应用开发团队暴露简单接口，让构建高扩展性的分布式应用更容易。许多平台团队用 Dapr 为基于 API 的基础设施交互提供治理和黄金路径。

## 基础设施复杂度与耦合

Dapr 构建块 API 抽象了底层基础设施。开发团队无需使用产品专属 SDK，因此可以轻松切换产品，也能支持同类的多个产品。

例如，应用代码使用 Dapr 发布订阅 API，开发环境的消息代理是本地容器中的 Redis Streams，生产环境则使用云上的 Kafka。平台团队也可以同时提供 Kafka、Pulsar 和 RabbitMQ，开发团队通过同一个发布订阅 API 使用其中任意一种。

## 用可观测性排查生产问题

应用与基础设施之间的通信经过 Dapr 进程，因此 Dapr 能改善分布式应用的可观测性。Dapr 原生集成 OpenTelemetry，遵循 W3C 追踪规范，在各个 API 中自动生成并传播追踪上下文，减少手动埋点和开发时间。

这让指标、日志和追踪数据更容易收集，也能缩短问题解决时间。可观测性对生产环境尤其重要。

[了解 Dapr Ops Dashboard](https://docs.diagrid.io/dapr-open-source/dapr-ops-dashboard/)

## 管理安全与合规

Dapr 内置安全通信、访问控制和身份认证能力。服务之间通过双向 TLS（mTLS）加密通信，保障数据完整性与机密性。平台团队可以定义访问策略，控制对服务、基础设施资源（组件）和密钥的访问。Dapr 还支持 OAuth 2.0 等中间件组件，为 Web API 处理认证与授权。

## 高可靠性与弹性

平台工程师可以配置重试、熔断和超时策略，提高应用弹性。策略能够限定到具体应用和基础设施资源（组件），实现细粒度控制并提高应用可用性。

## 平台集成

Dapr 提供 Kubernetes 原生自定义资源定义，用于配置应用与基础设施资源（组件），支持通过 Argo CD、Flux CD 等工具实施 GitOps。Dapr 还能集成 Kyverno、OPA 等策略引擎，简化合规与治理工作，帮助产品团队避免配置错误。
