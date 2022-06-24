---
widget: slider
weight: 1
active: true
headless: true

design:
  # Slide height is automatic unless you force a specific height (e.g. '400px')
  slide_height: ''
  is_fullscreen: true
  # Automatically transition through slides?
  loop: false
  # Duration of transition between slides (in ms)
  interval: 2000

content:
  slides:
    - title: 👋 欢迎加入 Dapr 中国社区
      content: 看看我们在干什么......
      align: center
      background:
        position: right
        color: '#666'
        brightness: 0.7
        media: coders.jpg
    - title: 学习 & 分享 ☕️
      content: '向社区分享你的知识，交流落地经验，和朋友们一起成长!'
      align: left
      background:
        position: center
        color: '#555'
        brightness: 0.7
        media: contact.jpg
      link:
        icon: book
        icon_pack: fa
        text: 阅读博客分享文章
        url: ../post/
    - title: 官方文档中文翻译
      content: '让更多的人更轻松的使用 Dapr!'
      align: right
      background:
        position: center
        color: '#333'
        brightness: 0.5
        media: books.jpg
      link:
        icon: fighter-jet
        icon_pack: fa
        text: 加入翻译小组
        url: ../tranlation/
    - title: Dapr源码学习和解读
      content: '即将启动!'
      align: right
      background:
        position: center
        color: '#333'
        brightness: 0.5
        media: study.jpg
      link:
        icon: code
        icon_pack: fa
        text: 开始源码学习
        url: ../source/
---
