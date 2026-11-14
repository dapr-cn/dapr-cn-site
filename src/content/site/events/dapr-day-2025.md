---
title: "Dapr Day 2025：观看免费线上活动录像"
description: "观看 Dapr 维护者、采用者和社区专家关于微服务与代理式 AI 的演讲录像。"
intro: "Dapr Day 2025 是 2025 年 11 月 5 日举办的免费线上活动，用户分享生产实践，维护者展示最新功能。"
source: "https://dapr.io/events/dapr-day-2025/"
---

![Dapr Day 2025](/media/official/events/dapr-day-2025-banner.png)

## 活动信息

活动面向开发者和平台工程师，介绍 Dapr 这一工作流和 AI 代理的持久化执行运行时。Dapr 是 CNCF 毕业项目，许多组织使用它构建安全、可靠的微服务和代理式 AI 系统。

时间为 **2025 年 11 月 5 日 16:00 至 20:30 UTC**，即 **17:00 至 21:30 CET / 8:00 至 12:30 PST**。

活动免费，向所有人开放。当时参与者通过表单注册，收到确认邮件，并在活动前一周收到直播链接。

[观看全部录像](https://www.youtube.com/playlist?list=PLcip_LgkYwzsOa3eXZwAKv6hp-DinXpjx)

## 开场

Dana Arsovska、Cecil Phillip 与 Marc Duiker，Dapr 社区经理。

## Dapr 路线图

Mark Fussell 与 Yaron Schneider，Dapr 联合创建者。

## 自 2020 年起使用 Dapr 构建和运行应用

Fabian Steinbach，ZEISS Group 软件架构师。

ZEISS Vision 自 2020 年起使用 Dapr 构建新的云原生订单履约系统。五年后回顾这段旅程：遇到过哪些挑战，有哪些经验，使用了哪些构建块，又从中学到了什么？展望未来，还需要确定哪些关键构建块能支持后续发展。

## 简化 Java 生态中的 Dapr 本地开发

Mauricio（Salaboy）Salatino，Diagrid 开源软件与生态工程师、Java Champion、Cloud Native Ambassador。

深入了解 Dapr 与 Spring Boot、Quarkus 的集成，以及为使用特定工具和框架的社区简化开发体验的重要性。通过 Java SDK 实例介绍现有能力、缺口与路线图，并展示 Dapr Workflow 如何结合 Spring AI，帮助 Java 开发者在 Spring Boot 和 Quarkus 应用中开始使用 Dapr。

## 用 Dapr 构建可靠的分布式支付：幂等、保障与规模

Krishna Dusad，高级软件工程师。

分布式支付必须在延迟、重试和局部故障中可靠运行。本演讲展示 Dapr 如何帮助工程师处理异步问题，构建可扩展且有弹性的金融基础设施。

内容包括将交易意图与执行分离的容错账本抽象，通过幂等标记保证安全重试、避免重复；还将介绍 Outbox/Inbox 消息、补偿逻辑和有时间限制的状态机，以处理并发、顺序及监管时限。

持续对账通过流式验证和异常检测实现实时恢复、减少差异。演讲中的基准测试展示了这些模式如何在峰值负载中以分钟以内延迟支撑数十亿笔交易。利用服务调用、状态存储和 Actor 构建块，组织可以简化复杂度、保持合规并扩展分布式支付。

## 用 Dapr 构建 MCP server，通过 Azure IoT Operations 查询工业设备

Walter Coan，UNIVILLE 教授。

Azure IoT Operations（AIO）是 Microsoft Azure 的新工业物联网平台，默认使用 Dapr 开发发布到 AIO Kubernetes 设备上的模块。本演讲展示如何使用 Dapr Runtime 构建 MCP server，部署到运行 AIO 的 Kubernetes 集群，并通过 OPC UA 协议查询集成工业设备的实时状态数据。

## 用 Dapr 与事件驱动架构加速 Elation Health 现代化

Patrick Assuied，Elation Health 平台工程总监。

Elation Health 为独立初级保健服务提供者提供一体化 EHR 方案已有十五年，最初采用内部称为“hippo”的单体架构。随着规模增长，复杂度阻碍了交付。首次微服务尝试因为缺少统一框架，形成了脆弱的“分布式单体”。团队随后转向以 Confluent 托管 Apache Kafka 为骨干的事件驱动架构，但发布订阅应用又引入实现不一致、重试与死信队列保障不足等问题。

团队先引入 Dapr 发布订阅构建块，利用其 Kafka 支持和统一容错编程模型，尤其服务于 Python/FastAPI 生态。SDK 提供类似请求响应模型的熟悉抽象，同时自动执行弹性策略。

成功后，团队用 copier 建立完整微服务模板，集成能自动配置 Dapr 组件的 Helm chart，让工程师几秒内采用功能，并在几分钟内全量调整组件。Dapr Workflows 等能力正加速 AI 原生 EHR 的创新，让精干团队专注临床价值，而非基础设施复杂度。

## Dapr 驱动的 AI 银行：云原生转型与欺诈检测

Rajender Chilukala，独立作者。

银行业正在拥抱云原生与智能自动化，以应对敏捷金融科技公司的竞争。本演讲围绕 AI 客户开户、可扩展核心银行系统和实时欺诈检测，介绍 Dapr 如何加速转型。

OCR 和机器学习消除纸质开户的迟缓，生物识别兼顾速度与安全。Dapr 支持模块化、事件驱动架构，帮助突破传统单体限制，提供容器化部署、弹性服务通信和 API 优先集成，使核心银行负载能够持续运行、平滑扩展。

欺诈检测从静态规则转向从交易流持续学习的模型。结合发布订阅与事件流水线，机构能够处理高吞吐、低延迟数据，实时发现异常。演讲还讨论与既有大型机集成、监管要求和数据保护，让合规与创新互相促进。

## 用 Container Apps 与 Dapr 连接 .NET Aspire 服务

Eduard Keilholz，4Dotnet 云解决方案架构师、作者、国际大会演讲者、https://spreaview.com 创始人。

本演讲提供将 .NET Aspire 从本地开发迁移到生产云环境的实践路线，使用 Azure Container Apps 与 Dapr 部署多服务方案，处理扩缩容、服务间通信和弹性。

- 将 .NET Aspire 服务容器化，部署到 Azure Container Apps。
- 利用 Dapr 组件实现服务调用、发布订阅与状态管理。
- 无需复杂样板代码，改善服务通信与可靠性。
- 建立简化 Azure 应用部署与运维的策略。

目标是帮助开发者和架构师简化服务体系、加速部署流水线，自信地在生产运行现代云原生 .NET 方案。

## 抽奖与闭幕

Dana Arsovska、Cecil Phillip 与 Marc Duiker，Dapr 社区经理。
