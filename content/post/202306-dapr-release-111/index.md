
+++
title = "Dapr v1.11 正式发布"
authors = ["zhangshanyou"]
date =  2023-06-14
draft = false

tags = ["Dapr", "微服务",]
summary = "Dapr是什么，Dapr1.11 包含什么新功能。"
abstract = "Dapr是什么，Dapr1.11 包含什么新功能。"

[header]
image = ""
caption = ""

+++
> 中文翻译转载自博客文章： [Dapr v1.11 正式发布](https://www.cnblogs.com/shanyou/p/17480763.html)

Dapr是一套开源、可移植的事件驱动型运行时，允许开发人员轻松立足云端与边缘位置运行弹性、微服务、无状态以及有状态等应用程序类型。Dapr能够确保开发人员专注于编写业务逻辑，而不必分神于解决分布式系统难题，由此显著提高生产力并缩短开发时长。Dapr 是用于构建云原生应用程序的开发人员框架，可以更轻松帮助开发人员在 Kubernetes 上构建运行多个微服务，并与外部状态存储/数据库、机密存储、发布/订阅代理以及其他云服务和自托管解决方案进行交互。

2023年6月12日正式发布了1.11版本，Dapr v1.11.0 版本提供了几项新功能，包括 服务调用现在可以调用非 Dapr 端点（预览功能），Dapr 工作流更新（预览版）、加密构建块（Alpha预览） Dapr 仪表盘不再与控制平面一起安装，从v1.5.0 首次引入的配置 API 已进入稳定版本，可以正式应用于生产。Dapr 中现在有 115 个内置组件。在这个版本中添加了7个新组件，这个版本还增加了很多的稳定的组件。

- 详细了解Dapr[1]
- 阅读 Dapr 1.11.0 的发行说明[2]

 亮点

## 配置 API 现在达到 v1 稳定版
- 配置构件块现在是一个 v1 版稳定的 API，包括所有 SDK 中的 API。
## 服务调用现在可以调用非 Dapr 端点（预览功能）
- 这个版本扩展了服务调用，使其能够调用非 Dapr 端点。比如说：
  + 你可以选择只在整个应用的一部分使用 Dapr
  + 你可能无法获得代码来迁移现有的应用程序以使用 Dapr
  + 你希望 Dapr 的功能，如弹性策略和可观察性应用于非 Dapr 服务调用
  + 你需要调用一个外部的 HTTP 服务
## Dapr 工作流更新（预览功能）
- 工作流有几个更新，包括
  + 你现在可以在管理 API 中暂停、重启和清除工作流
  + 你现在可以让一个工作流在外部事件上等待
  + Python SDK 现在与 .NET SDK 一起支持 Dapr 工作流

## 加密构建块（预览功能）
- 引入了一个新的 alpha 加密构建块，以支持使用密钥信息对数据进行加密和解密。
- 使用加密构建基块，您可以以安全一致的方式利用加密。
- Dapr 公开 API，允许你在 Dapr 边车中执行操作，例如加密和解密消息，而无需向应用程序公开加密密钥。
- 还有一些 alpha 加密组件可用于构建基块。
- 尝试加密快速入门，了解实际效果

## 选择 Dapr sidecar 的构建方式：所有组件或仅有稳定组件
从这个版本开始，有两个可用的 dapr 构建版本

- 默认的镜像包含所有的组件，这和迄今为止所有的版本都是一样的
- 一个新的版本只包含稳定组件，需使用 stablecomponents 标签

## Dapr 仪表盘不再与控制平面一起安装
- 当通过 Helm 安装时，Dapr 仪表盘不再默认与 Dapr 控制平面一起安装。要安装仪表盘，请使用新的 dapr-dashboard：
```
helm repo add dapr <https://dapr.github.io/helm-charts/>
helm repo update
kubectl create namespace dapr-system
helm install dapr dapr/dapr-dashboard --namespace dapr-system
```
## Windows Server 2022 容器Image
Dapr 1.11 提供使用标记为 Windows Server 2022 容器Image， 这是基于Windows Server 1809的Image 的补充。

## 用于改进本地开发的多应用运行进行了改进
您可以使用多应用运行命令dapr run -f .将应用日志写入控制台以及本地日志文件[3]。

## Actor状态 TTL（预览版）
新的预览功能启用 TTL on actor[4]使你能够在特定时间后自动删除状态.

## 指标
- 现在报告了参与者提醒和计时器[5]的指标
- 现在报告复原策略[6]的指标


AKS 和启用 Arc 的 Kubernetes 的 Dapr 扩展现在支持 Dapr v1.11.0[7]

如果您不熟悉 Dapr，请访问入门[8]页面并熟悉 Dapr。 文档已更新，包含此版本的所有新功能和更改。通过概念[9]和开发应用程序[10]文档开始使用此版本中引入的新功能。要将 Dapr 升级到 1.11.0 版，请跳至本节[11]。



相关链接：

- [1]详细了解Dapr: https://docs.dapr.io/concepts/overview/

- [2]阅读 Dapr 1.11.0 的发行说明:https://blog.dapr.io/posts/2023/06/12/dapr-v1.11-is-now-available/

- [3]将应用日志写入控制台以及本地日志文件: https://v1-11.docs.dapr.io/developing-applications/local-development/multi-app-dapr-run/multi-app-overview/#logs

- [4]TTL on actor: https://aka.ms/dapr/ttl

- [5]参与者提醒和计时器的指标:https://github.com/dapr/dapr/blob/master/docs/development/dapr-metrics.md#actors

- [6]复原策略 的指标: https://github.com/dapr/dapr/blob/master/docs/development/dapr-metrics.md#resiliency

- [7]AKS 和启用 Arc 的 Kubernetes 的 Dapr 扩展现在支持 Dapr v1.11.0:https://techcommunity.microsoft.com/t5/azure-developer-community-blog/dapr-v1-11-0-now-available-in-the-dapr-extension-for-aks-and-arc/ba-p/3844016

- [8] Dapr入门： https://docs.dapr.io/getting-started/

- [9] Dapr 概念：https://docs.dapr.io/concepts/

- [10]开发应用程序：https://docs.dapr.io/developing-applications/

- [11]升级到Dapr 1.11.0版本： https://blog.dapr.io/posts/2023/06/12/dapr-v1.11-is-now-available/#upgrading-to-dapr-111
