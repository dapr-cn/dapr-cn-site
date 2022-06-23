+++
title = "[译] 你想知道的关于 actor 模型但可能不敢问的所有信息"
authors = ["aoxiaojian"]
date =  2022-06-13
lastmod = 2022-06-13
draft = false

tags = ["Dapr", "actor", "翻译"]
summary = "希望这篇技术文章能帮助你理解 actor 模型背后的关键思想及其主要前提"
abstract = "希望这篇技术文章能帮助你理解 actor 模型背后的关键思想及其主要前提"

[header]
image = ""
caption = ""

+++

> 译者注：关于 actor 模型，有一个非常赞的视频（2012年），以及一篇和这个视频相关的文章（2016年），但我搜索了一下没有发现中文版本。因此在仔细学习的过程中顺手翻译了一下，希望可以对后面的同学稍有帮助。
>
> 原视频地址： [Hewitt, Meijer and Szyperski: The Actor Model (everything you wanted to know...) - YouTube](https://www.youtube.com/watch?v=7erJ1DV_Tlo)
>
> 原文请见： [Everything you wanted to know about the Actor Model but might have been afraid to ask](https://alex-karaberov.medium.com/everything-you-always-wanted-to-know-about-the-actor-model-but-were-afraid-to-ask-b6eee8722953)



在这篇博客文章中，我想阐述 Actor 模型的基本方面。 希望这篇技术文章能帮助你理解 actor 模型背后的关键思想及其主要前提，正如 [Carl E. Hewitt 教授](https://en.wikipedia.org/wiki/Carl_Hewitt) 的 [开创性论文](https://arxiv.org/pdf/1008.1459.pdf) 中所说的那样。 本文的另一个参考资料是 Hewitt 和 Baker 的一篇名为 [Laws for Communicating Parallel Processes ](https://dspace.mit.edu/bitstream/handle/1721.1/41962/AI_WP_134A.pdf)的论文，其中介绍了 Actor 模型的数学框架和定律。

*UPD：Carl E. Hewitt教授* [*赞许这篇文章*](https://news.ycombinator.com/item?id=21857763) **

我不想用有关特定实现的复杂细节的信息淹没您，例如 Erlang/Elixir 进程或 Akka Actor。 此外，尽管听起来可能有争议，但我不知道有任何主流工业技术或编程语言实现了 **纯** Actor 模型而与原始模型没有细微的差异。 因此，这里的目标是提出抽象标准并描述 Actor 模型的 *概念规范*。 请注意，尽管我努力做到尽可能严谨，但不要将本文视为任何形式的论文。

现在，事不宜迟，让我们开始吧。

Actor模型是一种计算的数学理论，基于 **Actors** 的概念。 Actor是计算的基本单元，它体现为三件事：

1. **信息处理（计算）。**
2. **存储（状态）**
3. **通信**

Actors 是模型中的基础而**唯一**的对象，因此 *一切都是 actor*。 系统不可能只有一个 actor，因为 actor 必须与其他 actor 进行**通讯**。 Actors 的相互交互是*仅*由一个 Actor 向另一个 Actor 发送 **messenger** （message），它也是一个 *Actor*。 Message 和 messenger 是可以完全互换的概念，我将同时使用它们。

也许你已经注意到 Actor 模型和纯面向对象编程之间的相似之处，即一切都是对象，发送消息，局部可变状态。 但有一个重要的区别需要考虑 - actor 之间的边界是不可变的，也就是说，一个 actor 不能将可修改的引用传递给另一个 actor 或以某种方式修改另一个 actor 的状态。 Actor **只能** 发送消息。 Actors 是独立的实体，其模型不将它们限制为进程或线程，它们具有跨进程、管道、机器进行通信的能力。 因此，仅概括一下——OOP 对行为和状态进行建模，而 Actor 模型对计算进行建模，并且是一种精确、完整、正式定义的理论，而不是 OOP。

向其发送信使（messenger）的 actor 称为 **target**。 因此，在这种计算模型中唯一的一种*事件*是目标（target）接收到信使（messenger）。 **事件** 是 actor 计算的持续历史中的离散步骤；它们是 actor 理论的基本交互。 每个事件 **E** 都由 **message(E)** 组成，被称为 **target(E)** 的目标（接收者）接收。 术语基于论文 [Laws for Communicating Parallel Processes](https://dspace.mit.edu/bitstream/handle/1721.1/41962/AI_WP_134A.pdf) （Hewitt 和 Baker）。

收到消息后，目标 actor 通过向其他 actor 发送消息来揭示 **行为**。 Actor 可以由另一个 actor 创建，作为第二个 actor 行为的一部分。 事实上，几乎每个信使 actor（消息）都是在发送到目标 actor 之前新创建的。 对于每个 actor *X*，我们将要求有一个独特的事件 *Birth(X)* ，其中 *X* 首先出现。 更准确地说， *Birth（X）* 具有该性质，如果 *X* 是另一个事件 **E** 的参与者，则 *Birth（X）→* **E**，其中→是事件的二元关系， 这意味着事件的部分排序。 形式上，它将是 Actor 模型中的激活顺序和事件到达顺序的并集的 [传递闭包](https://en.wikipedia.org/wiki/Transitive_closure)。

每个 actor 都有 **地址（address）**。 在各种实现中，地址可以是直接物理地址，例如 NIC 的 MAC 地址、内存地址或仅仅是进程标识符 （PID）。 多个 actor 可以有相同的地址，一个 actor 可以有多个地址。 这里有一个 *多对多* 的关系。 地址 **不是** actor 的唯一标识符。 Actor 没有身份，只有地址。 因此，当我们退后一步，看看我们的概念 Actor 模型时，我们只能看到并使用地址。 即使我们有一个地址，我们也无法判断我们是有一个 actor 还是有多个 actor ，因为这个地址可以是 actor 分组的代理。 我们对地址所能做的就是向它发送消息。 Address 代表 Actor 模型中的 *能力*。 地址和 actor 的映射不是概念 actor 模型的一部分，尽管它是实现的一个特征。

Actor 可以向自己发送消息（递归支持），他们将在以后的步骤中接收和处理这些消息。 此外，actor *可能* 有一个邮箱（mailbox）。 **邮箱（Mailbox）** 是 actor（请记住： *一切都是 actor*），它表示消息的目的地。 Actor 不需要邮箱，因为如果 Actor 需要有邮箱，那么邮箱将是一个需要拥有自己的邮箱的 Actor，我们最终会得到无限递归。

Actor模型中存在两个 **局部性公理** ，包括 **组织（Organisational）** 和 **操作（Operational）**。

**组织（Organisational）:** 响应收到的消息，Actor **只能**：

1. 产生有限数量的新 actor。
2. *仅*将消息发送到刚刚收到的消息中的地址或其本地存储中的地址。
3. 为下一条消息更新其本地存储（指定如何处理下一条消息）

**组织（Organisational）：** Actor 的本地存储包括的地址**只能是**：

1. 在创建时提供的
2. 在消息中收到的
3. 适用于此处创建的 Actors（操作公理的第 1 段）

从概念上讲，actor 按顺序处理来自其邮箱的传入消息，一次处理一个消息，但物理实现始终以某种方式优化或管道消息处理。 Actor 模型没有为消息传递和处理提供许多保证。 不同的物理实现可以自由地添加有趣的功能，例如消息模式匹配或 在 Erlang 中[选择性接收](http://ndpar.blogspot.com/2010/11/erlang-explained-selective-receive.html) 排队消息中不匹配的消息，以便以后处理和管理超时。

Actor 模型还支持 **委派（delegation）**，因为 actor 可以在消息中发送其他 actor 的地址（在 Erlang 中，这些是 PID）。

正如我之前已经提到的，Actor 可以向自己发送消息（递归），为了避免死锁，我们在 Actor 模型中有一个 **future** 的概念。 Future 的想法是，你可以创建一个 actor ，在它仍然在计算时得到结果。 **Future** 是一种特殊的消息类型，它表示（可能很长的）计算或事件（向目标发送消息的结果）的“未来（future）”值。 Actor 可以将 future 传递给其他 Actor，他们也可以将 future 发送给自己。 是的，这些与我们现在在 JavaScript 或 Scala 等主流编程语言中拥有的 **future** 相同。 Future 的概念于 1977 年首次出现在 Actor 模型中（Carl Hewitt 和 Baker 的[“进程的增量垃圾收集”](https://dl.acm.org/citation.cfm?id=806932)）。

消息传递没有顺序保证，并且可以丢弃消息（例如，如果在发送信使之前 Actor 被销毁），因此我们有 [尽最大努力的传递](https://en.wikipedia.org/wiki/Best-effort_delivery)。 消息可以持久化（Actor 定义的第 2 段： *storage*）并且可以重新发送。 消息**最多**可以传递 一次（一次或零次）。 快速到达的消息可能会导致 actor 出现某种拒绝服务，从而使 actor 无法处理传入的消息流。 为了缓解这个问题，存在一个邮箱 actor 接收信使并持有这些信使，直到 actor 能够处理它们。 消息可能需要任意长的时间才能最终到达接收方的邮箱。 在 Actor 模型的物理实现中，邮箱中消息的入队和出队是原子操作，因此不可能出现争用情况。

Actor 具有自己的状态或存储这一事实意味着额外的期望要求，特别是 actor 应具有固有的持久性，除非不再可访问。 因此，Actor 系统应该根据它拥有的记录来恢复 Actor。 我们可以将此属性称为“actor 的存储持久性”。 这里的持久性是一个程度问题。 最低是记录在 RAM 中。 接下来是持久性本地存储（本地数据库服务器等）。 之后是其他机器上的存储，可以表示为由分布式数据库支持的复制日志（日志）。 此属性的一个有趣的物理实现是 [Akka Persistence](https://doc.akka.io/docs/akka/2.4/scala/persistence.html)。 **Akka persistence** 使有状态的 Actor 能够持久化其内部状态，以便在 Actor 启动、JVM 崩溃后重新启动、由 supervisor 重新启动或在集群中迁移时恢复。 Akka 持久性背后的关键概念是，只保留对 actor 内部状态的更改，但从不直接保留其当前状态（可选快照除外）。

Actor 之间没有 channel 或任何其他类型的中介。 我们将消息 *直接* 发送给 actor 。 当然，我们可以通过带有“put”和“get”信使的 actor 来实现通道，但这根本不是必需的。

Actor 模型中的计算被认为是分布在空间中的，其中称为 Actor 的计算设备使用 Actor 的地址进行异步通信，并且整个计算不处于任何明确定义的状态。

Actor 的本地状态是在收到消息时定义的，在其他时间可能是不确定的。 使用 Actor 模型，您将拥有一个基于配置的计算模型。 该模型的基础是接收到的消息，其本质上是动态的，而不是固定的。

您可能已经注意到，Actor 模型在设计和定义上都是可扩展的。 这种固有的可扩展性意味着，在不久的将来（根据 Hewitt 的 [2025年可重用可扩展智能系统 ](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3428114)），我们可以在具有数百万个 Actor 内核的计算机盒子上观察到 Actor 模式的物理实现，平均10纳秒延迟消息在千万亿 Actor 之间传递。

在 Actor 模型中还存在 **仲裁者（Arbiter）** 的概念。 [仲裁者](https://en.wikipedia.org/wiki/Arbiter_(electronics)) 为我们提供了 [不确定性](https://en.wikipedia.org/wiki/Indeterminacy_in_concurrent_computation)。 根据 Hewitt 的论文 [Physical Indeterinacy in Digital Computation](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3459566) ，仲裁者实现了 actor 的不确定性。 通常，Actor 处理消息的顺序所观察到的细节会影响结果。 我们没有观察 Actor 计算仲裁过程的内部细节，而是等待结果。 仲裁者的不确定性会在 Actor 系统中产生不确定性。 这些仲裁者实际上类似于电子 [仲裁者](https://en.wikipedia.org/wiki/Arbiter_(electronics)) 。 给定一个仲裁者，您可以同时将多个输入（例如 Input1，Input2）输入仲裁者，但 *只有* 一个可能的结果（Output1或Exput2）将出现在另一端。 从概念上讲，仲裁者是某种具有逻辑门的电路，它可以基于 [NAND逻辑](https://en.wikipedia.org/wiki/NAND_logic) （例如XNOR，NAND和NOT）。 这些门需要合适的阈值和其他参数。

在仲裁者启动后，它可以在最终断言 Output1 或 Output2 之前，在不受限制的时间段内保持 [元稳定](https://en.wikipedia.org/wiki/Metastability_in_electronics) 状态。 但是仲裁者尚未决定的概率随着时间的推移呈指数下降。 仲裁者的内部流程不是公开流程，而是“黑匣子”。 试图观察它们会影响它们的结果。 我们必须等待结果，而不是观察仲裁过程的内部。

仲裁者是一个非常方便和实用的理论框架，引入它是为了能够推理或描述当我们有多个消息发送给同一个 actor 时发生的事情。 抽象地，仲裁者本身“决定”传入消息的顺序。 然而，真实可感知世界的一个标志是单个抽象概念的各种物理 [实例化](https://en.wikipedia.org/wiki/Instantiation_principle) ，因此可能有很多仲裁者的实例或示例 - CPU时钟生成器，Linux内核计时器飞轮， [CFS](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)，由垃圾回收引起的不可预测的暂停， 操作系统级暂停以解决主要页面故障，无数 [网络故障](https://queue.acm.org/detail.cfm?id=2655736)，CPU交叉调用和TLB关闭等等。

我们可以将 Erlang VM 视为一个具体的示例。 Erlang 消息传递的语义指出，每当两个进程分别向第三个进程发送一条消息，并且对单个发送事件没有排序约束时，我们永远不能依赖哪条消息将首先出现在接收方的邮箱中。 即使所有进程都在同一个 Erlang VM 中运行，它们也可能被任意延迟。 如果发送方位于不同的调度程序线程上，则可能会发生这种情况。 发送操作可以按一个顺序（挂钟时间）完成，但消息仍可能以交换顺序到达接收者的邮箱。 如果我们运行分布式 Erlang，甚至会发生更多的事情。 例如，Actor 通过拥塞网络向不同子网中的另一个 Actor 发送消息，该网络遭受 [TCP](https://www.usenix.org/system/files/login/articles/chen12-06.pdf) 或 [BGP 故障](https://www.usenix.org/legacy/events/nsdi05/tech/feamster/feamster.pdf)。 揭穿一个潜在的误解——在 Erlang 中，消息排序只在一个进程中得到保证。 也就是说，如果有一个实时进程，我们向它发送一条消息A，然后发送一条消息B，那么可以保证如果消息B到达，消息A已经到达它之前。

为了总结上述内容，我们可以假设 Actor 模型中的不确定性：

- 由数字计算实现
- 可能涉及与外部 Actor 的通信
- 无限的不确定性：总是可以停止但需要无限的时间。

实际上，Actor Model 是一个非常抽象的概念模型，因此任何基于上述局部性公理的实现都是合理的。

为了建立一个类比，我们可以假设 actor 模型类似于 [范畴论](https://ncatlab.org/nlab/show/category+theory) 计算。 范畴理论也是抽象的、最小的，并且专注于对象之间的相互作用，例如态射、函子、自然变换、 [变换](https://ncatlab.org/nlab/show/transfor) ，而不描述对象本身的性质和内部结构。

我不擅长总结，因此我将用 Robin Milner 的“交互元素：图灵奖讲座”中的一句话来结束：

> *现在，纯粹的 lambda 演算只用两种东西构建：术语和变量。 我们可以为过程演算实现相同的经济性吗？ Carl Hewitt 凭借他的 actor 模型，很久以前就应对了这一挑战。他声明值、值操作符和过程都应该是同一种东西：Actor。 这个目标给我留下了深刻的印象，因为它暗示了表达的同质性和完整性 …*