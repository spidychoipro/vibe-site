<div align="center">

# ⬜ vibe-site

**鍵を持つ者にだけ存在するページ。**

```
┌──────────────────────────────────────────────┐
│  ...真っ白なページ...                        │
│                                              │
│   [ Tampermonkey ユーザーのみ ]              │
│   $ connecting to vibe... ok                 │
│   $ loading manifesto... ok                  │
│                                              │
│   █ VIBE CODING MANIFESTO █                  │
└──────────────────────────────────────────────┘
```

`vibe-site` は、ページが*本当に*空白のままの GitHub Pages 実験プロジェクト。
コンテンツもペイロードも、ソースには何もない。ターミナルが起動して
**Vibe Coding Manifesto** を展開する体験のすべては、
[Tampermonkey](https://www.tampermonkey.net/) ユーザースクリプトの中に
埋め込まれている。

**訪問 → 白い虚空。スクリプトを入れる → 虚空が語り出す。**

**[⬇️ スクリプトをインストール](https://spidychoipro.github.io/vibe-site/vibe.user.js)** — Tampermonkey 導入後、ブラウザで開くとインストール画面が表示されます。

[English](README.md) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 クイックスタート

クリック3回で完了します。

| ブラウザ | ワンクリックインストール |
|---|---|
| Chrome | [Tampermonkey (Web Store)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Tampermonkey (Add-ons)](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Edge | [Tampermonkey (Add-ons)](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Safari | [Tampermonkey (App Store)](https://apps.apple.com/app/tampermonkey-classic/id1482490089) |

そして：

| 手順 | クリック |
|---|---|
| 1 | 上のストアリンクを開く → **追加**をクリック |
| 2 | **⬇️ [スクリプトをインストール](https://spidychoipro.github.io/vibe-site/vibe.user.js)** を開く → **インストール**をクリック |
| 3 | アクセス → https://spidychoipro.github.io/vibe-site/。ターミナル起動を見守って小さく感嘆する |

> **スクリプトがない？** 白いページが見えるはず。正常です。それこそが本題です。

## 🌐 リソース

- **ライブページ:** <https://spidychoipro.github.io/vibe-site/>
- **ユーザースクリプト:** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **リポジトリ:** <https://github.com/spidychoipro/vibe-site>

## 🧠 仕組み

このプロジェクトは、従来のフロントエンド配信方式を逆転させる：

| 構成要素 | 中身 |
|---|---|
| GitHub Pages — `index.html` | `<body></body>` — 本当に空のドキュメント |
| Tampermonkey — `vibe.user.js` | `@match` ルール + 体験データ一式 |
| ブラウザ + スクリプト | ターミナル起動、マニフェスト展開 |

<p align="center"><code>空白ページ ──▶ (スクリプト注入) ──▶ マジック</code></p>

1. **`index.html`** は本当に空のドキュメント。白い背景、空の `<body>`。
   ソースを覗いても何も見えない——何もないのだから。
2. **`vibe.user.js`** はすべてのコンテンツ（CSS + 起動シーケンス + マニフェスト）
   を埋め込みデータとして持つ。Pages URL にマッチし、ページが本当に空で
   あることを確認したうえで体験を注入する。
3. **自動更新:** `@version` を上げて push すると、Tampermonkey の
   `@updateURL` を通じてインストール済みの全ユーザーに自動配布される。

結果として、コンテンツはインターネット全体には見えず、秘密を知る者にしか
見えない。

## 📁 プロジェクト構成

```
vibe-site/
├── index.html          # 意図的に空にしたページ
├── vibe.user.js        # ユーザースクリプト — 体験のすべてがここにある
├── README.md           # ドキュメント (English)
├── README.ko.md        # ドキュメント (한국어)
├── README.zh.md        # ドキュメント (中文)
├── README.ja.md        # ドキュメント (日本語) — 今読んでいるもの
└── LICENSE             # MIT
```

## 💻 ローカル開発

プロジェクトをローカルで配信すれば、スクリプトに組み込み済みの
`@match localhost:8000` ルールでそのまま確認できる：

```bash
npx serve .      # → http://localhost:8000
```

先に Tampermonkey へローカル版のスクリプトをインストールしておくこと。

スクリプトは**本当に空白のページでのみ**有効になる。ポート 8000 でたまたま
動いている他アプリを乗っ取ることはない。

### コンテンツの編集

すべてのコンテンツは `vibe.user.js` 先頭にある素のデータです：

| 定数 | 用途 |
|---|---|
| `MANIFESTO` | マニフェストの各行（文字列） |
| `BOOT` | ターミナル起動シーケンス（`{ prompt, msg }` エントリ） |

## 🔐 セキュリティノート

> 以下は設計レビューの結果であって、実際の事故に基づくものではない。

- **外部通信なし:** `@grant none`、`@require` なし、`fetch`/`eval` なし。
  ページの外には一切触れない。
- **フレーム隔離:** `@noframes` により、埋め込み iframe 内での実行を防ぐ。
- **真の空白ガード:** `isTargetBlank` の実行時チェックで、ページが本当に空
  の場合のみ動作させ、他のローカルサービスの誤動作を防ぐ。
- **サプライチェーン:** 更新は `@updateURL/@downloadURL` 経由で本リポジトリ
  に戻る。リポジトリへの書き込み権限を持つ者なら、インストール済みの全
  クライアントにコードを配布できる。`spidychoipro` アカウント（`2FA` 有効）
  を唯一の信頼の基点として扱うこと。
- **これは難読化であってセキュリティではない:**「隠された」コンテンツは
  ユーザースクリプトの中に平文で存在する。機密情報の保存にこの方式を
  **使わないこと。**

## ⚖️ ライセンス

MIT — 好きに使って、楽しんで。 [LICENSE](LICENSE) 参照。

---

<div align="center">

🟩 の点滅カーソル、そして空白ページへの過剰な愛から作られた。

**要約:** URL を見せよ。白を見つめる様を見守れ。スクリプトを入れろと言え。楽しめ。

</div>