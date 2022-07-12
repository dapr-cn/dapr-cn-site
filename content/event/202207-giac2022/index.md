---
title: GIAC 全球互联网架构大会

event: GIAC 全球互联网架构大会
event_url: https://giac.msup.com.cn/2022sz/home

location: 深圳

summary: '全球互联网架构大会(简称“GIAC”)是长期关注互联网技术与架构的高可用架构技术社区和msup推出的面向架构师、技术负责人及高端技术从业人员的年度技术架构大会，是中国地区规模最大的技术会议之一。在CloudNative(云原生)专场将有一个 Dapr 的演讲主题——如虎添翼：Java云原生新思路'
abstract: '在CloudNative(云原生)专场将有一个 Dapr 的演讲主题——如虎添翼：Java云原生新思路'

# Talk start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
date: '2022-07-23T09:00:00+08:00'
date_end: '2022-07-23T10:00:00+08:00'
all_day: false

# Schedule page publish date (NOT talk date).
publishDate: '2022-07-12T10:00:00Z'

authors: []
tags: ["incoming"]

# Is this a featured talk? (true/false)
featured: true

image:
  caption: ''
  focal_point: Right

url_code: ''
url_pdf: ''
url_slides: ''
url_video: ''

# Markdown Slides (optional).
#   Associate this talk with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides:

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects:
---

## 活动介绍：全球互联网架构大会

全球互联网架构大会(简称“GIAC”)是长期关注互联网技术与架构的高可用架构技术社区和msup推出的面向架构师、技术负责人及高端技术从业人员的年度技术架构大会，是中国地区规模最大的技术会议之一。

https://giac.msup.com.cn/2022sz/home

## 专题介绍：CloudNative(云原生)



https://giac.msup.com.cn/2022sz/subject?id=5414

## 演讲介绍：如虎添翼：Java云原生新思路

演讲时间：2022年7月23日 上午 09:00-10:00

讲师： 敖小剑

https://giac.msup.com.cn/2022sz/course?id=16186

### 案例背景

云原生时代 Java 受到前所未有的挑战，容器技术的广泛应用严重削弱了 Java 引以为傲的"一次编译，到处运行"的优势，而 Java 虚拟机的资源消耗大启动慢等劣势在函数计算场景下备受诟病，"面向长时间大规模程序而设计"的原则也被微服务和 serverless 打破。 基于语言层虚拟化的 Java 该如何应对以操作系统层虚拟化为前提的云原生时代？

### 解决思路

将 Java 代码直接编译为原生代码的静态编译技术是解决上述问题的主要思路，Quarkus / Spring Native / GraalVM / Micronaut / Helidon 等项目都在近几年中努力探索。Dapr 是新兴的分布式应用运行时，在以能力抽象+构建块方式帮助构建微服务应用的同时，Sidecar 模型也可以有效地帮助应用轻量化。结合使用静态编译技术和 Dapr，Java 可以克服基因缺陷，从而适用于函数计算、serverless 等云原生场景，借助庞大的用户群和成熟的生态，在云原生时代继续辉煌。

### 成果

结合使用 Quarkus 和 Dapr 并进行静态编译所得到的 Java 应用，其二进制文件大概53M，启动时间约0.1秒，占用内存45M，远远优于普通 Java 应用，完全可以胜任 serverless 场景。Java 静态编译技术加 Sidecar 模型，将在云原生时代为 Java 带来新的希望和突破。

### 听众收益

- 了解云原生时代 Java 面临的困境和问题根源所在
- 了解业界解决上述问题最新技术方向和产品思路
- 体验 Quarkus + Dapr 在 Serverless 上的最新实践
