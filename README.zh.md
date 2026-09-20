<div align="center">

# ⬜ vibe-site

**一个只对持有钥匙者存在的页面。**

```
┌──────────────────────────────────────────────┐
│  ...空白页面...                              │
│                                              │
│   [ 仅限 Tampermonkey 用户 ]                 │
│   $ connecting to vibe... ok                 │
│   $ loading manifesto... ok                  │
│                                              │
│   █ VIBE CODING MANIFESTO █                  │
└──────────────────────────────────────────────┘
```

`vibe-site` 是一个 GitHub Pages 实验项目，页面**真正**保持空白。
没有内容、没有负载、源代码里什么都没有。从终端启动到展开
**Vibe Coding Manifesto** 的全部体验，都封装在
[Tampermonkey](https://www.tampermonkey.net/) 用户脚本里。

**访问 → 白色虚空。安装脚本 → 虚空开始说话。**

[English](../..) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 快速开始

| 步骤 | 操作 |
|---|---|
| 1 | 为浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) |
| 2 | 打开用户脚本 → [vibe.user.js](https://spidychoipro.github.io/vibe-site/vibe.user.js) |
| 3 | 在安装界面确认 |
| 4 | 访问 → <https://spidychoipro.github.io/vibe-site/> |
| 5 | 看着终端启动。小声惊叹。 |

> **没有脚本？** 你会看到一片白页。这是正常的。这正是本意。

## 🌐 资源

- **在线页面：** <https://spidychoipro.github.io/vibe-site/>
- **用户脚本：** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **仓库：** <https://github.com/spidychoipro/vibe-site>

## 🧠 工作原理

这个项目颠覆了传统的前端交付方式：

```
┌────────────────────────────┐        ┌────────────────────────────┐
│  GitHub Pages (index.html) │        │  Tampermonkey (vibe.user.js) │
│                            │        │                            │
│  <body></body>             │  ◄────  │  @match github.io/vibe-site │
│  源码：真的什么都没有       │        │  内容：全部内嵌              │
└────────────────────────────┘        └────────────────────────────┘
```

1. **`index.html`** 是一个真正空白的文档。白色背景，空的 `<body>`。
   查看源码什么都看不到——因为本来就没有。
2. **`vibe.user.js`** 将全部内容（CSS + 启动序列 + 宣言）作为内嵌数据携带。
   它匹配 Pages URL，确认页面确实为空白，然后注入体验。
3. **自动更新：** 提升 `@version` 并推送，脚本就会通过 Tampermonkey 的
   `@updateURL` 自动分发给所有已安装用户。

结果是：内容对互联网整体不可见，只对知道秘密的人可见。

## 📁 项目结构

```
vibe-site/
├── index.html      # 刻意留空的页面
├── vibe.user.js    # 用户脚本 — 全部体验都在这里
└── README.md       # 你现在看的这份文档
```

## 💻 本地开发

启动项目并利用内置的 `@match localhost:8000`：

```bash
npx serve .      # → http://localhost:8000
```

然后在 Tampermonkey 中安装本地的脚本副本。

脚本只在**真正空白的页面**上激活——不会劫持你在 8000 端口偶然运行的其他应用。

### 编辑内容

所有内容都是 `vibe.user.js` 顶部的普通数据：

| 常量 | 用途 |
|---|---|
| `MANIFESTO` | 宣言的每一行（字符串） |
| `BOOT` | 终端启动序列（`{ prompt, msg }` 条目） |

## 🔐 安全说明

> 以下内容来自设计审查，而非实际发生的事故。

- **无网络外联：** 脚本使用 `@grant none`，没有 `@require`，也没有
  `fetch`/`eval`。不会触碰页面之外的任何东西。
- **框架隔离：** `@noframes` 阻止在嵌入的 iframe 中执行。
- **真-空白守卫：** `isTargetBlank` 运行时检查确保只有在页面真正为空时才
  运行，防止意外接管其他本地服务。
- **供应链：** 更新经由 `@updateURL/@downloadURL` 回到本仓库。任何拥有仓库
  写入权限的人都可以向所有已安装客户端分发代码——请将 `spidychoipro`
  账户（启用 `2FA`）视为唯一的信任锚点。
- **这是隐蔽性，不是安全性：** “隐藏”的内容就明文躺在用户脚本里。
  不要把这种模式**复用于**保存机密信息。

## ⚖️ 许可证

MIT — 随意使用，开心就好。参见 [LICENSE](LICENSE)。

---

<div align="center">

用 🟩 方块、一个闪烁的光标，以及对空白页面近乎执念的热爱制作。

**总结一下：** 把 URL 给人看。看他们盯着白色发呆。叫他们装脚本。享受。

</div>