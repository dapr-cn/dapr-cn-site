# 首页、Header、Footer 重构素材清单

来源：`dapr/website` 仓库，提交 `460d369`（2026-11-06），许可证 Apache-2.0。
对应 `DESIGN.md` 末尾的 "Reference Study: dapr.io" 一节。本文只列素材和取舍，不改动页面代码。

> 后续决定：用户在原会话中确认“全部集成官网的内容”，采用中文整理并保留第三方内容。因此，下文最初“不采用官网文案、商业资源和采用者标志”的建议已被取代。当前实现保留来源归属、第三方权利和非官方声明；具体边界见 `README.md` 的 Official Dapr content 一节。动态轮播改为静态资源列表，视频改为外链，不导入注册表单或第三方脚本。

## 1. 使用边界

- **代码与模板**：可以参考其结构与交互，但我们是 Astro 项目，Hugo 模板不能直接搬。若复制了任何文件，保留其 Apache-2.0 声明，并在本仓库 README 注明来源。
- **文案**：不照搬。`AGENTS.md` 明确称官网文案是项目的官方表述；我们是志愿者维护的中立社区站，不能暗示官方立场（页脚已有 "不是 Dapr 官方网站" 的声明，需保持）。
- **Dapr 标志**：按 `PRODUCT.md` 原样使用 `public/media/dapr_logo.svg`，不重绘、不改色。
- **第三方商标**：Azure、AWS、Google Cloud、Kubernetes、CNCF、adopter 客户 logo 等都有各自的使用规则，首页不宜使用。
- **广告与承诺**：Banner 中的 Diagrid 商业推广（Support Pro、Dev Dashboard、Ops Dashboard、University）不采用。"提高 30% 开发效率" 是官网的官方数据表述，我们不以社区名义复述。
- **字体**：不引入 webfont，沿用 CJK 系统字体栈（见 `DESIGN.md` 的 The Native Stack Rule）。

## 2. 可直接参考的素材

| 素材 | 原位置（dapr/website） | 许可 | 用途 |
| --- | --- | --- | --- |
| 五张价值主张示意图（SVG） | `assets/images/diagrams/{automate,secure,integrate,adopt,apis}.svg` | Apache-2.0，需注明来源 | 首页 "为什么读这里" 的图文行，换成中文文案后使用 |
| 通用示意图（PNG） | `static/images/building-blocks.png`、`service-invocation.png`、`app.png` | Apache-2.0，需注明来源 | 博客或首页的说明配图 |
| Fluent 图标集（24px regular，共 20 个） | `assets/images/icons/fluent-*.svg` | MIT，保留版权声明 | 首页入口卡片和页脚图标；名称清单见下 |
| 无商标的中性图标 | `assets/images/icons/kubernetes.svg`、`redis.svg`、`rabbitmq.svg`、`apachekafka.svg` | CC0（Simple Icons） | 只在讲技术对比时使用，首页不需要 |
| 字体参考 | `themes/bigspring/static/fonts/` | OFL | 不使用，仅作记录 |

Fluent 图标在参考站首页的用法：`flowchart`（工作流）、`arrow-step-in-right`（服务调用）、`mail-copy`（发布订阅）、`database`（状态）、`people-team`（Actors）、`clock`（Jobs）、`key`（Secrets）、`settings-cog-multiple`（配置）、`plug-disconnected`（绑定）、`chat`（LLM）、`table-lock`（分布式锁）、`lock-closed-key`（加密）、`cloud-archive`（二进制存储）、`document-search`（搜索）、`data-scatter`（向量）、`heart-pulse`（可观测性）、`arrow-clockwise`（弹性）。参考站另有 `bot`（AI 代理）、`lock-shield`（安全）、`shield-checkmark`（可验证执行），但它们的 SVG 没有放在 `assets/images/icons/` 中，需要时要从 Iconify 的 Fluent 集（MIT）单独取得并保留声明。我们的入口可选用 `document-search`（博客）、`people-team`（社区）、`chat`（翻译）、`clock`（活动）、`mail-copy`（出版）。

## 3. 首页

**参考站的结构**（自上而下）：横幅轮播 → Hero（H1、一段说明、三个按钮、右侧 D3 架构图）→ 四卡用例 → 案例轮播 → 三段图文价值主张 → API 图标网格 → 跨领域关注点 → 客户 logo 墙 → 视频 → CNCF 区块 → 收尾区。

| 区块 | 借鉴点 | 我们的做法 |
| --- | --- | --- |
| Hero | H1 中两个关键词做成色块；一个主按钮加两个次按钮排成一行 | 保留现有 Signal Field 深色 Hero；关键词用 brand-indigo 白字色块（不用第二种颜色）；按钮为 "阅读博客" 主按钮 + "加入翻译小组" 次按钮，与现有一致 |
| 入口卡片 | 四卡，每卡一个图标、标题、两句话、一个链接 | 三到五个入口：博客、活动、翻译、会议、出版；图标用上面的 Fluent 清单 |
| 图文价值行 | 图示与文字交替，图示可暂停或静态 | 用 `diagrams/*.svg` 的静态版（`diagramstatic`），不引入 D3 |
| 收尾区 | 一段话加一个按钮 | 已有 `Closing.astro`，保持 |
| 横幅轮播 | 自动轮播、悬停暂停 | 不做轮播；需要公告时用一条静态通知 |
| 客户 logo 墙、案例轮播 | 社会证明 | 不采用：我们没有可核实的客户数据（`PRODUCT.md` 的 Evidence on Hand 已明确不编造） |

**需要决定**：首页是否保留 "30%" 之类的数据表述（建议不做）；入口卡片的顺序是否以 "翻译" 为首（取决于社区的主要目标，见 `PRODUCT.md`）。

## 4. Header

**参考站的结构**：白色粘性导航，左侧 Logo，中间 7 个一级项目（Docs、Learn、Community、Enterprise、Platform Engineering、News & Media 下拉、中国社区），右侧 "Join our Discord" 橙色色块和 GitHub、X 图标。移动端为汉堡按钮，下拉项目由 `aria-expanded` 控制。

| 借鉴点 | 说明 | 建议 |
| --- | --- | --- |
| 按意图分组 | 一级项目过多时，把相关项目放进一个下拉 | 我们现有 7 个一级项目；可以参考页脚的 "阅读 / 社区" 分组，把 "博客、翻译、出版" 归为一组。是否改动由重构决定 |
| 社交图标行 | 图标带 `aria-label` | 只在有官方账号时添加，当前只确认了 GitHub（`site.ts` 中的 `githubUrl`） |
| 右侧动作按钮 | 参考站用橙色色块吸引注意 | 不用橙色。如需加入入口，用 brand-indigo 描边的胶囊按钮，与 `button-secondary` 一致 |
| 键盘与焦点行为 | 参考站有 Escape 关闭、焦点离开时关闭、视口切换时同步状态的脚本 | 我们的 `<details>` 菜单已经原生可用，不需要复制脚本；可以参考其 `tests/specs/keyboard.spec.js` 写出相应的测试用例 |

## 5. Footer

**参考站的结构**：四列链接（Concepts、Community、Blog/Case studies/Logos、Legal），底部有版权和 Linux Foundation 商标声明。

我们现有的 Footer 已经是四栏（品牌说明、阅读、社区、资源）加底部一行（版权和非官方声明、回到顶部）。可以参考的部分：

- **法律行**：参考站有 Terms、Privacy、Trademarks 三个链接。我们目前没有隐私或条款页面，而站点使用了 Google Analytics。是否新增这些页面需要你来决定，我不会替你写政策文本。
- **社交链接**：当前只有 GitHub 和 RSS。若有 Discord、微信群或其他账号，再添加；社区图标位于 `static/images/community/`，同样受各平台商标规则约束。
- **版权行**：保持现有的 "© {year}. Dapr 中国社区版权所有" 和非官方声明，不要改成参考站的 "The Dapr Authors" 写法。

## 6. 需要你确认的问题

1. 是否有 Discord、微信群等入口需要放进 Header 或 Footer？
2. 是否需要隐私政策与使用条款页面？
3. 首页是否保留 Signal Field 作为 Hero？（`DESIGN.md` 当前的设定是保留。）
4. 是否允许使用参考站的五张价值示意图（需注明来源）？还是只参考其布局，自己重绘？

## 7. 下一步（页面重构的建议顺序）

1. 先确定首页的区块顺序和入口卡片内容（第 3 节），确认后再动 `src/components/home/`。
2. 再决定 Header 是否分组（第 4 节），只改动 `src/config/nav.ts` 与 `Header.astro`，URL 不变（`scripts/hugo-urls.txt` 的路由一致性由 `pnpm run verify` 检查）。
3. 最后处理 Footer 的社交与法律行（第 5 节）。
