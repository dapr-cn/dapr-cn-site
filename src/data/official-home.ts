// Adapted and translated from dapr/website at 460d369, data/homepage.yml (Apache-2.0).
export interface OfficialItem {
  name: string;
  description: string;
  link: string;
  icon: string;
  alpha?: boolean;
}

const icon = (name: string) => `/media/official/icons/fluent-${name}.svg`;

export const officialHome = {
  hero: {
    description: "Dapr 提供持久化、可验证的执行能力，让工作流与 AI 代理在崩溃、重启和中断后从原处继续。基于不绑定基础设施的 API，内置生产级安全、弹性与可观测性，让你专注代码。",
  },
  useCases: {
    title: "你可以构建什么",
    intro: "持久化执行会在应用运行时为每一步保存检查点并进行回放。进程崩溃、Pod 重启或网络调用失败时，Dapr 从最后完成的步骤继续，而不是从头开始，或留下只完成一半的工作。",
    items: [
      { name: "工作流", icon: icon("flowchart"), description: "编排长时间运行、有状态且始终执行到完成的流程。支持重试、定时器、人工审批和 Saga，无需独立运维工作流引擎。", link: "https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-overview/" },
      { name: "AI 代理", icon: icon("chat"), description: "构建能够推理、调用工具并从任意故障点恢复的 AI 代理。代理计划的每一步都有检查点，可以继续执行。", link: "https://docs.dapr.io/developing-ai/dapr-agents/dapr-agents-introduction/" },
      { name: "微服务", icon: icon("arrow-step-in-right"), description: "通过统一 API 实现服务间调用，内置服务发现、mTLS、重试和分布式追踪。", link: "https://docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/" },
      { name: "事件驱动架构", icon: icon("mail-copy"), description: "通过发布订阅解耦发送方和接收方，在受支持的消息代理之间切换，无需改动应用代码。", link: "https://docs.dapr.io/developing-applications/building-blocks/pubsub/" },
    ] satisfies OfficialItem[],
  },
  apis: {
    title: "背后的构建块 API",
    intro: "持久化执行是 Dapr 集成 API 中的一部分。构建块 API 帮助你更快构建分布式应用，内置的弹性、安全和可观测性让你专注业务逻辑。",
    diagram: "/media/official/diagrams/apis.svg",
    diagramAlt: "Dapr API 架构概览",
    diagramDesc: "Node.js、Python、.NET、Go、Java、PHP、Rust 等任意语言或运行时的应用，通过 HTTP 或 gRPC 调用 Dapr。Dapr 提供工作流、发布订阅、服务调用、状态管理、Actor、作业、外部配置、密钥、绑定和中间件 API，内置可观测性、安全和弹性。二进制存储、搜索、向量、加密、分布式锁和对话六项 API 处于 alpha 阶段。Dapr 可运行并集成于 Microsoft Azure、AWS、Google Cloud、Kubernetes、虚拟机、物理机、数据库、消息代理及其他服务等云端或边缘基础设施。",
    items: [
      { name: "工作流", icon: icon("flowchart"), description: "通过 Dapr 工作流或工作流组件，定义跨多个微服务的长时间运行、持久化流程或数据流，也可以与其他构建块 API 组合。", link: "https://docs.dapr.io/developing-applications/building-blocks/workflow/" },
      { name: "服务调用", icon: icon("arrow-step-in-right"), description: "应用通过已知端点，以 HTTP 或 gRPC 消息通信。Dapr 端点结合反向代理、内置服务发现、分布式追踪和错误处理。", link: "https://docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/" },
      { name: "发布订阅", icon: icon("mail-copy"), description: "发送方将消息发布到主题，接收方订阅主题，形成松耦合消息模式。Dapr 支持应用之间的发布订阅。", link: "https://docs.dapr.io/developing-applications/building-blocks/pubsub/" },
      { name: "状态管理", icon: icon("database"), description: "保存应用希望在单次会话之外保留的状态。Dapr 提供键值状态 API、alpha 查询 API，以及可插拔的持久化状态存储。", link: "https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/" },
      { name: "Actor", icon: icon("people-team"), description: "Actor 是隔离、独立、单线程执行的计算与状态单元。Dapr 基于虚拟 Actor 模式实现单线程编程模型，并在 Actor 不使用时进行回收。", link: "https://docs.dapr.io/developing-applications/building-blocks/actors/actors-overview/" },
      { name: "作业", icon: icon("clock"), description: "为应用安排未来执行的动作，在指定时间或按指定间隔调度作业。", link: "https://docs.dapr.io/developing-applications/building-blocks/jobs/" },
      { name: "密钥", icon: icon("key"), description: "通过统一 API 集成公有云、本地和 Kubernetes 等密钥存储，服务可以获取数据库连接字符串等密钥。", link: "https://docs.dapr.io/developing-applications/building-blocks/secrets/secrets-overview/" },
      { name: "外部配置", icon: icon("settings-cog-multiple"), description: "从受支持的配置存储获取并订阅应用配置项，例如在启动时读取配置，或接收存储中的配置变化。", link: "https://docs.dapr.io/developing-applications/building-blocks/configuration/" },
      { name: "绑定", icon: icon("plug-disconnected"), description: "与外部云端或本地服务、系统建立双向连接。应用通过绑定 API 调用服务，也可由外部服务事件触发。", link: "https://docs.dapr.io/developing-applications/building-blocks/bindings/bindings-overview/" },
      { name: "LLM 对话", icon: icon("chat"), alpha: true, description: "降低大规模、安全、可靠地与大语言模型交互的复杂度，包含提示缓存和个人身份信息混淆，避免向 LLM 发送敏感信息。", link: "https://docs.dapr.io/developing-applications/building-blocks/conversation/conversation-overview/" },
      { name: "分布式锁", icon: icon("table-lock"), alpha: true, description: "锁定资源，使应用的多个实例能够无冲突地访问资源，并提供一致性保障。", link: "https://docs.dapr.io/developing-applications/building-blocks/distributed-lock/" },
      { name: "加密", icon: icon("lock-closed-key"), alpha: true, description: "安全、一致地使用密码学能力。在密钥库或 Dapr Sidecar 中执行消息加解密等操作，无需向应用暴露加密密钥。", link: "https://docs.dapr.io/developing-applications/building-blocks/cryptography/cryptography-overview/" },
      { name: "二进制存储", icon: icon("cloud-archive"), alpha: true, description: "通过组件存取和删除不适合放入状态存储的大型二进制文件，内容以流方式传输。Dapr 1.19 包含 Amazon S3 及兼容存储、Azure Blob Storage、Azure Data Lake Storage、Google Cloud Storage、OCI Object Storage 组件。", link: "https://docs.dapr.io/developing-applications/building-blocks/binarystore/binarystore-overview/" },
      { name: "搜索", icon: icon("document-search"), alpha: true, description: "用统一、可移植 API 在全文搜索引擎中存储、获取和查询 JSON 文档，通过修改组件切换引擎。Dapr 1.19 提供 Meilisearch 组件。", link: "https://docs.dapr.io/developing-applications/building-blocks/search/search-overview/" },
      { name: "向量", icon: icon("data-scatter"), alpha: true, description: "用统一、可移植 API 单条或批量存取嵌入向量、执行相似度查询，为 RAG 和语义搜索提供存储与检索层。Dapr 1.19 提供 Meilisearch 组件。", link: "https://docs.dapr.io/developing-applications/building-blocks/vector/vector-overview/" },
    ] satisfies OfficialItem[],
  },
  values: {
    title: "更快构建持久化应用",
    intro: "Dapr 是一组面向分布式应用的 API，内置安全、弹性和可观测性最佳实践。官网介绍，开箱即用的持久化工作流、代理式 AI、发布订阅、状态管理、密钥存储、外部配置、绑定、Actor、作业、分布式锁和加密等功能，将开发效率提高 30%。内置安全、可靠性和可观测性能力，减少实现生产级应用所需的样板代码。",
    items: [
      {
        name: "让业务流程持久化执行", diagram: "/media/official/diagrams/automate.svg",
        diagramDesc: "发布订阅消息启动工作流；活动一读取密钥，流程等待外部事件；活动二调用应用；活动三保存键值状态；完成后发布消息。",
        paragraphs: [
          "用代码编写工作流，自动化有状态、持久化、长时间运行的复杂业务流程。每一步都将检查点写入状态存储，崩溃或重启后从最后完成的步骤继续，而不是重新开始。",
          "使用任务链、扇出与扇入、监控、定时器、外部系统交互等模式。结合 Dapr API 发送消息、调用服务、保存键值数据，工作流状态可以存入你选择的数据库。",
        ],
      },
      {
        name: "默认安全，具备弹性", diagram: "/media/official/diagrams/secure.svg",
        diagramDesc: "应用安全地调用另一个应用，后者向消息代理发布消息，再分发给两个应用。失败调用由弹性策略重试，直至成功。",
        paragraphs: [
          "Dapr 内置默认开启的安全功能。开发与运维可以为 API、服务和组件设置以应用为中心的访问策略，无需深入底层网络细节。传输中的通信自动通过 mTLS 加密。",
          "弹性策略应对硬件故障、意外吞吐量，以及扩容和重启等生命周期事件。Dapr 可以检测故障，并配置重试、退避、熔断和超时。",
        ],
      },
      {
        name: "集成你选择的基础设施", diagram: "/media/official/diagrams/integrate.svg",
        diagramDesc: "应用使用密钥存储和消息代理，消息分发给两个应用，其中一个使用数据库。架构可运行于 Microsoft Azure、AWS、Google Cloud 或本地，仅组件发生变化。",
        paragraphs: [
          "组件模型将 API 与底层资源解耦。例如使用发布订阅 API 时，只需替换 YAML 组件文件，就能从 RabbitMQ 切换到 Kafka 或其他受支持的代理，无需修改代码。",
          "Dapr 应用既可以运行在 Kubernetes 上，也可以自托管于虚拟机或物理机，因此能够运行于任意云或边缘环境。",
        ],
      },
      {
        name: "逐步采用", diagram: "/media/official/diagrams/adopt.svg",
        diagramDesc: "现有三个应用和 Apache Kafka 保持不变，先加入使用状态存储的 Dapr 应用，再加入向 RabbitMQ 发送消息的 Dapr 应用。",
        paragraphs: ["Dapr 可以逐步引入现有架构，随着应用成熟再采用更多 API。Dapr 应用可以调用未使用 Dapr 的端点，同时继续获得弹性策略、可观测性、通过作用域控制的安全访问等能力。"],
      },
    ],
  },
  concerns: {
    title: "贯穿应用的能力",
    items: [
      { name: "安全", icon: icon("shield-lock"), description: "服务调用 API 提供端到端安全、应用认证和端点访问策略。发布订阅组件可限制主题类型，以及允许向指定主题发布或订阅的应用。", link: "https://docs.dapr.io/concepts/security-concept/" },
      { name: "可观测性", icon: icon("heart-pulse"), description: "可配置输出 OpenTelemetry 和 Zipkin 协议的追踪数据，方便集成多种可观测性工具。", link: "https://docs.dapr.io/concepts/observability-concept/" },
      { name: "弹性", icon: icon("arrow-clockwise"), description: "定义超时、重试与退避、熔断等容错策略，通过弹性规范应用到组件调用的 Dapr API。", link: "https://docs.dapr.io/concepts/resiliency-concept/" },
      { name: "可验证执行", icon: icon("shield-lock"), description: "工作流历史可以进行密码学签名，使执行可审计、篡改可发现。每个事件使用 Sidecar 的 mTLS 身份签名，签名链在每次加载状态时验证。", link: "https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-history-signing/" },
    ] satisfies OfficialItem[],
  },
  adopters: [
    ["IBM", "ibm"], ["PWC", "pwc"], ["Intel", "intel"], ["Microsoft", "microsoft"],
    ["Alibaba", "alibaba"], ["Zeiss", "zeiss"], ["NASA", "nasa"], ["HDFC Bank", "hdfcbank"],
    ["Cisco", "cisco"], ["Rakuten", "rakuten"], ["Lufthansa", "lufthansa"], ["Zscaler", "zscaler"],
    ["Bosch", "bosch"], ["Fujitsu", "fujitsu"], ["Grafana", "grafana"], ["DeFacto", "defacto"],
    ["At Bay", "atbay"], ["Man group", "man-group"], ["Wortell", "wortell"], ["Composabl", "composabl"],
    ["Derivco", "derivco"], ["Tempestive", "tempestive"],
  ].map(([name, file]) => ({ name, image: `/media/official/adopters/${file}.png` })),
  caseStudies: [
    { name: "Watts Water", title: "Dapr 如何帮助 Watts Water Technologies 快速开发", image: "/media/official/casestudy/case-study-watts-water.png", link: "https://www.cncf.io/case-studies/wattswatertechnologies/" },
    { name: "Grafana", title: "Grafana Security 如何用 Dapr 改善漏洞扫描", image: "/media/official/casestudy/case-study-grafana.png", link: "https://www.cncf.io/case-studies/grafana/" },
    { name: "Derivco", title: "用 Dapr 大规模实现近实时个性化推荐", image: "/media/official/casestudy/case-study-derivco.png", link: "https://www.cncf.io/case-studies/derivco/" },
    { name: "Tempestive", title: "用 Dapr 和 Kubernetes 追踪物联网设备上的数十亿条消息，同时降低成本", image: "/media/official/casestudy/case-study-tempestive.png", link: "https://www.cncf.io/case-studies/tempestive/" },
    { name: "HDFC Bank", title: "用 Dapr 高效处理数百万笔交易", image: "/media/official/casestudy/case-study-hdfc.png", link: "https://www.cncf.io/case-studies/hdfc-bank/" },
    { name: "DataGalaxy", title: "化繁为简，用 Dapr 构建更易维护的软件生态", image: "/media/official/casestudy/case-study-datagalaxy.png", link: "https://www.cncf.io/case-studies/datagalaxy/" },
  ],
  banner: [
    { prefix: "Dapr Support Pro", text: "为团队提供 Dapr 专家指导和邮件支持，每月 99 美元起。", link: "https://www.diagrid.io/dapr-support" },
    { prefix: "Dapr Dev Dashboard", text: "免费实时查看本地 Dapr 应用和工作流。", link: "https://docs.diagrid.io/develop/local-development/dev-dashboard/" },
    { prefix: "Dapr Ops Dashboard", text: "免费自动化 Kubernetes 上的 Dapr 运维。", link: "https://docs.diagrid.io/dapr-open-source/dapr-ops-dashboard/" },
    { prefix: "Dapr University", text: "通过免费、自主学习的课程学习 Dapr。", link: "https://www.diagrid.io/university" },
  ],
};
