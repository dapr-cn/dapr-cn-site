
+++
title = "[译]Dapr和Kubernetes的三大用例"
authors = ["chendonghai"]
date =  2022-12-26
draft = false
featured = true

tags = []
summary = "在SDLC(Software Development Lifecycle软件开发生命周期中)，绝大多数CNCF项目都是专注于软件开发的中后期阶段，特别是运维和可观测性方面。而很少有CNCF项目专注于早期阶段。而Dapr就是在软件开发的早期阶段，帮助开发者提高生产力。"
abstract = "在SDLC(Software Development Lifecycle软件开发生命周期中)，绝大多数CNCF项目都是专注于软件开发的中后期阶段，特别是运维和可观测性方面。而很少有CNCF项目专注于早期阶段。而Dapr就是在软件开发的早期阶段，帮助开发者提高生产力。"

[header]
image = ""
caption = ""

+++

> 本文翻译自 [Bilgin Ibryam](https://twitter.com/bibryam) 发表于 2022.12.20 的博客文章 [Top Three Use Cases for Dapr and Kubernetes](https://www.diagrid.io/blog/k8s-dapr-top3) 。译者：[陈东海(seachen)](https://github.com/1046102779)，目前就职于腾讯，同时 Dapr Member 和 Dapr 中国社区成员。

适合阅读人群：研发人员以及云原生产品经理。

内容摘要：

1. 大多数IT项目，主要是围绕**增加收入**、**降低成本**和**降低风险**三个业务目标而创建的，并推导出产生的三个副作用， 分别是多语言、多负载和多环境的支持。以此作为XYZ三维坐标轴，提出问题和分析问题；并引出云原生是解决问题的答案；
2. 了解SDLC(软件开发生命周期)不同阶段的CNCF项目，往往都聚焦于中后期的应用运维，比较少地关注如何创建应用并提高开发者的生产力。而Dapr就是这样的一款社区开源产品；
3. 从集群上、集群外和多集群的三个案例，来分析Dapr如何与Kubernetes互补来帮助开发者开发出云原生应用。

--------

（**以下是译者想告诉读者的**）


Bilgin Ibryam之前是Red Hat的产品经理和架构师。他在2020年写过[《 Multi-Runtime Microservices Architecture》](https://www.infoq.com/articles/multi-runtime-microservice-architecture/)一文，文章中的分布式原语(distributed primitives)就是这位童鞋提出来的。[Dapr](https://dapr.io)社区开源产品和他提出的这个理念非常契合， 2022年中旬了解到Dapr后并迅速加入了[diagrid](https://www.diagrid.io/)小型创业公司。目前在该公司担任产品经理，而diagrid公司是由两位前微软童鞋[Mark Fussell(现任CEO)](https://twitter.com/mfussell)和[Yaron Schneider(现任CTO)](https://twitter.com/yaronschneider)在2021年底创办的。

Diagrid公司融资详情：[Diagrid Emerges from Stealth with $24.2 Million in Funding, Launches Fully Managed Dapr for Kubernetes](https://newsdirect.com/news/diagrid-emerges-from-stealth-with-24-2-million-in-funding-launches-fully-managed-dapr-for-kubernetes-781847682)

由 Dapr 和 KEDA（Kubernetes Event-Driven Autoscaling）创始人 Mark Fussell 和 Yaron Schneider 创办的 Diagrid 最近获得 **2400 万美元**融资。投资人阵容十分强大，包括 **Kubernetes 联合创始人 Joe Beda**、**Buoyant CEO William Morgan**(这人是开创性地提出了服务网格(Service Mesh)概念，其著名的开源项目 [Linkerd](https://github.com/linkerd/linkerd2) 笔者最早在2016年使用(Java开发，面向服务治理的代理)， **Azure CTO Mark Russinovich**，前 Atlassian CTO Sri Viswanath，以及前 Heroku CEO Adam Gross。

--------

（**以下是译文**）

Kubernetes已经成为运行分布式应用的事实标准，无论它们是集群上的、集群外的还是多集群的。 但是Kubernetes并没有为业务开发者提供很多好处，也没有为大多数其他CNCF项目提供好处。 但是也有例外，新的CNCF项目（例如[Dapr](https://www.cncf.io/projects/dapr/)(**孵化中**)）正在提高[开发者的生产力](https://www.diagrid.io/blog/dapr-as-a-10x-platform)，让业务开发变得简单。 在这篇文章中，我们将探索前三个案例，以展示Kubernetes也可以扩展新的运营领域，以及为什么Dapr是最适合开发者的Kubernetes伙伴。

## 技术扩散阻碍生产力

如果我们从较高的层面看一下大多数IT项目，它们都属于以下类别之一：**增加收入**、**降低成本**或**降低风险**。 在您的组织中，您可能有这三者的变体，例如提高客户满意度、减少客户流失等，但它们大致属于同一类。 有多种方法可以实现这些目标，这里我挑选了一些作为示例，但对于您的组织而言，这些方法的顺序会有所不同。

![Business goals and side effects](https://wework.qpic.cn/wwpic/537779_BJhJ4fDxQd2nEtM_1671849532/0)
业务目标与副作用

您可能决定采用一些很新很酷的开源机器学习技术，并利用它开发一些创新服务来增加收入。 您可以通过迭代开发实践和较小的开发单元（如微服务）按时更新软件来降低合规风险。 裁员并不是性价比最高的方式，在公司内部或者小团队内并不是所有事情都需要亲力亲为，而是通过自动化，采用云和SaaS服务的方式来实现软件生命周期的全流程管理，这样性价比更高。 但后果总是有的， 您意识到机器学习最流行的语言是Python，Javascript是Web开发的最佳语言，Java用于桌面，Swift用于移动终端，C++用于IoT应用等等， 您最终会在组织内使用多种语言。然后您意识到您必须运维微服务、函数、单体服务以及介于这两者之间的许多其他应用。 而且您必须在本地和一个或多个云上执行此操作。 从组织层面来看，所有这些都导致了同时发生多个维度的技术扩散。

![Technology proliferation impact on Dev and Ops teams](https://wework.qpic.cn/wwpic/34659_Og4snfxpRHmhlQx_1671850556/0)
图：技术扩散对开发和运维的影响

| 序号 | 英文                                                         | 译文                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | How to do reliable service invocation？                      | 如何可靠地执行服务调用?                                      |
| 2    | How run heterogeneous workloads consistently？               | 如何一致性地运行异构的工作负载？                             |
| 3    | How to connect 3rd-party services?                           | 如何连接第三方服务？                                         |
| 4    | How to provision and automate hybrid infrastructure uniformly? | 如何统一地配置和自动化混合基础设施？(**这个翻译怪怪的**)， 大概含义就是在混合基础设施环境下，如何通过配置来统一部署 |
| 5    | How to do pub/sub with DLQx in language X?                   | 如何用任意一种语言处理带死信队列的消息发布与订阅？           |
| 6    | How to package and distribute polyglot apps consistently?    | 如何一致性地打包和分发多语言应用？                           |

技术扩散不同程度地影响着不同的团队。仅仅使用Python，您就可以有自己的数据科学团队，但是这个平台的工程团队必须为使用不同语言的多个团队提供构建和打包工具。您可能有新创建的微服务，它们遵循[12-factor](https://12factor.net/)原则。但是运维团队可能还必须照顾单体应用，以及不断增加函数的实例。您的基础设施团队必须创建自动化以遵循多个云和本地部署上进行配置。

平台和运维团队的挑战在于如何保证许多团队之间的一致性和统一性，开发团队的挑战在于其团队内部的生产力。通常，开发团队使用某些语言(例如：java和.net，他们更适合创建分布式应用，和可以连接到各个SaaS端点的应用)， 而使用不同语言的其他团队往往是孤立的，他们并不能从丰富的云原生生态系统中受益。这些团队不能复用相同的工具和模式来解决常见问题。

应对技术扩散带来的这些挑战，答案是什么？一个答案就是成为云原生，这是CNCF[定义](https://github.com/cncf/toc/blob/main/DEFINITION.md)的方式以及那里不断增长的项目生态系统。

## 开发者的期望仍未得到满足

作为一名前开发人员，我决定检查哪些CNCF项目，可以帮助开发者编写代码并实现云原生应用。我粗略地绘制了SDLC阶段(全称：Software Development Lifecycle软件开发生命周期)，并将它们放在所有已毕业的CNCF项目中，趋势很明显。 没有任何一个已毕业的CNCF项目可以帮助软件开发的早期阶段。 我也增加了孵化中的CNCF项目，专注于运维和可观测性应用的趋势更加强烈。如下图所示：

![CNCF projects and their focus area in software development life cycle](https://wework.qpic.cn/wwpic/56820_tRRFbRWsRZarZiL_1671852983/0)
图：在软件开发生命周期中的CNCF项目

该图不是完整的，它不能完全代表生态系统中的所有变化。例如：这里有些是聚焦运行时的项目，也帮助了开发者。例如，可观测性工具总是提供SDK。Knative serving为运行应用提供自动伸缩和蓝绿发布功能，而Knative eventing帮助开发者实现事件驱动的应用。与此同时，无论是Kubernetes, 代理还是基于eBPF的linux内核，任何以前属于应用层的分布式系统职责也正在通过eBPF转移到基础设施层。但是总体来说，所显示的趋势是准确的，CNCF项目的重点仍然是运维应用，而不是创建应用。好消息是这里有新的项目，例如：Dapr和其他针对开发者的项目，并专注于实现适应云原生环境的应用。

接下来，我们将研究三个具体的用例，其中 Kubernetes正在成为部署和运维应用的事实标准，而Dapr使开发者能够实现云原生应用，并以云原生方式使用基础设施。这些用例展示了Dapr如何与Kubernetes互补并提高开发者的生产力，就像Kubernetes提高运维团队的生产力一样。

## 创建和运维集群上的应用

如今，Kubernetes API是部署和运行分布式系统最流行的方式。容器和Kubernetes允许我们定义和实施应用程序资源约束。具有初始化容器和Sidecar的Pod抽象提供了应用生命周期的保障。健康检查APIs提供了从短暂地运行时故障中检测和恢复的能力。 有声明式部署、回滚和策略驱动的应用placement。 所有这些都允许运维自动化部署和管理大量工作负载，但对开发人员来说有什么好处呢？

![Dapr helps Devs implement distributed apps that Ops can run on Kubernetes](https://wework.qpic.cn/wwpic/428311_WPObw6mmSVm3S58_1671854283/0)
图：Dapr帮助开发者实现运维能够在k8s上运行的分布式应用

开发人员可以使用Kubernetes自带的服务发现，但它缺乏重试、超时和熔断等网络弹性功能。 虽然Kubernetes有ConfigMaps和Secrets，但它们缺乏动态更新和细粒度的访问控制。 Kubernetes有StatefulSet，但没有用于访问该状态的API。 Kubernetes有健康检查，但它不会申请出口连接，例如从队列中消费(**翻译得不太明白**)。Kubernetes中没有任何东西可以帮助实现事件驱动的应用。

这就是 Dapr 的用武之地。Dapr 解决了这些限制，并为开发者提供了与 Kubernetes为运维提供了相同的生产力。Kubernetes通过抽象基础设施来帮助运维应用。 Dapr帮助开发者实现这些应用并以可靠的方式连接它们。 Dapr具有[服务调用](https://docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/)和 [Pub/Sub](https://docs.dapr.io/developing-applications/building-blocks/pubsub/pubsub-overview/) API，可帮助以任何语言编写的应用，在动态云基础设施上可靠地交互。 它具有[状态管理](https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/)、[配置中心](https://docs.dapr.io/developing-applications/building-blocks/configuration/configuration-api-overview/)、[秘钥](https://docs.dapr.io/developing-applications/building-blocks/secrets/secrets-overview/)和其他API，可帮助开发者通过通用且可复用的模式实现应用需求和使用基础设施。

## 提供和使用集群外的资源

Kubernetes可以很好地管理集群上的应用。 但这些集群上的应用需要并依赖于集群外的资源，例如数据库、文档存储、消息队列和数十种其他云服务。 如果您已经在使用 Kubernetes 来运维应用，那意味着您使用的是YAML语法，以及定义所需资源状态的声明性概念。 如果您正在使用基础设施即代码和GitOps等工具来实现自动化，那么您也可以使用 Kubernetes API来管理外部资源。 这使得Kubernetes成为资源所需状态的单一“真实来源”，不仅适用于集群上的容器，也适用于集群外的资源。 现在有这样的 Kubernetes云厂商，例如 AWS Controller for Kubernetes、Azure Service Operator、Google Config Connector，以及像 [Crossplane](https://www.crossplane.io/) 这样的 CNCF 项目，它们使用 Kubernetes CRD来管理外部资源。 但是这些工具的职责在管理外部资源的生命周期之后结束，并且不会扩展到绑定到在 Kubernetes 数据平面中运行的应用。 通常，这些云厂商有一种机制，可以将外部资源的坐标和访问机制添加到configmap、secret 或 CRD 中。 但是使用特定协议从应用到资源的实际绑定会再次留给开发者处理。

![Dapr helps Devs consume 3rd party service that Ops provision through Kubernetes](https://wework.qpic.cn/wwpic/258079_NjWdWcogSp-uE8Q_1671855218/0)
图：Dapr帮助开发者使用运维通过k8s提供的第三方服务

这就是Dapr能够帮助开发者的地方。 Dapr[绑定](https://docs.dapr.io/developing-applications/building-blocks/bindings/bindings-overview/)可帮助开发者将应用与外部资源连接起来，无论您的应用程序使用何种语言。 提供外部资源只是故事的一半。 Dapr帮助您从应用中使用该基础设施。 并通过添加弹性、跟踪、安全性并以一致性的方式做到这一点，并通过 API 和 sidecars以云原生方式做到这一点，而不是将难以升级的库嵌入到应用中。

## 开发和编排多集群的应用

我们已经了解了 Kubernetes 如何用于管理集群上的应用程序以及如何用于管理集群外的资源。 使用 Kubernetes API还有一种趋势，那就是管理多个远端集群上的应用。

如今，由于规模、应用和数据本地化、隔离等各种原因，组织必须将应用部署到多个数据中心、云和 Kubernetes集群中。 Kubernetes集群的物理边界并不总是符合所需的应用边界。 通常，必须将同一个应用或一组应用部署到多个集群中，这需要多集群部署和编排。 有许多项目和服务可以让您在多个集群上运行应用，例如 Azure Arc、Google Anthos、Red Hat Advanced Cluster Manager、Hypershift 和 kcp.io等项目。 这些项目提供统一的用户界面、仪表板、警报、日志、策略和对多个集群的访问控制。 他们中的大多数通过提供 Kubernetes API作为控制平面，并将每个集群作为数据平面来实现这一点。 为了使用一致的操作、安全、合规模型，您可以集成 DevOps 工具包。

![Dapr helps Devs create multi-cloud applications that Ops can operate through Kubernetes APIs](https://wework.qpic.cn/wwpic/709747_KBT25G1pTzCYgqq_1671855779/0)
图：Dapr帮助开发者创建运维可以通过Kubernetes API操作的多云应用

在这种场景下，Dapr帮助创建可以运行并与任何云环境交互的多云应用。 在不同的云环境中打包和运行应用又是故事的另一半。 通常在云环境中运行的应用必须使用该云环境的本地服务，而Dapr支持这一点。 通常，不同的云厂商提供不同的抽象、模式和工具来解决相同的问题，这些问题在不同的环境中不可转移和重用。 例如，Azure 有 Event Grid，AWS 有 EventBridge，GCP 有 Eventarc 用于创建事件驱动的应用程序。 这些服务中的每一个都有独特的学习曲线，并与云厂商耦合。 另一方面，Dapr pub/sub API 提供了通用的异步构建块，可用于为任何云和本地创建事件驱动的应用程序。

在多云场景中，Dapr API充当统一的构建块，使开发者能够创建独立于云的解决方案，并使运维团队能够应用弹性策略并从统一的独立于云的应用程序运行时获取指标和跟踪。 [Diagrid Conductor](https://www.diagrid.io/conductor)等服务可以帮助在多个云环境中运行Dapr。 所有这些使得Dapr成为创建多云应用的开发者和运维这些应用程序的理想补充。

（ps. 译者备注，**开发和编排多集群的应用**：主要是讲可移植性。使用Dapr Sidecar后就与云厂商解耦了。）

## 无处不在的云原生API

Kubernetes已经不仅仅是一个容器编排器。它也可以管理集群内、集群外和多集群资源。 它是用于管理多种资源的通用且可扩展的操作模型。 其声明式YAML API和异步协调过程已成为资源编排范式的代名词。 它的CRD 和 Operators 已经成为将领域知识与分布式系统合并的通用扩展机制。

![Characteristics of Kubernetes and Dapr APIs](https://wework.qpic.cn/wwpic/686374_jPbYsO93S0CVhXL_1671856353/0)
图：Kubernetes和Dapr APIs的特点

Dapr建立在与Kubernetes相同的原则和基础之上。 Dapr通过定义明确的API(称为构建块)提供其功能。 这些API在无处不在的 HTTP 和 gRPC 协议上运行，使它们支持多种语言，并且可以从任何语言或环境中访问。 Dapr功能随着新构建块的添加而不断增长，例如最近的分布式锁API，以及内容存储和[工作流 API](https://github.com/dapr/dapr/issues/4576)的提案。 Dapr功能还通过添加当前超过100个并且还在增长的构建块来扩展。

这篇文章基于我在底特律Dapr社区日的[演讲](https://www.youtube.com/watch?v=Wk9MfoaNrV4)。 在[@bibryam](https://twitter.com/bibryam) 和[@diagridio](https://twitter.com/bibryam) 关注我，看看我使用Dapr和构建[Diagrid Cloud](https://www.diagrid.io/cloud-runtime-apis)的旅程，或者说出您的任何想法和评论。
