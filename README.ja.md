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

[English](../..) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 クイックスタート

| 手順 | 操作 |
|---|---|
| 1 | ブラウザに [Tampermonkey](https://www.tampermonkey.net/) をインストール |
| 2 | **⬇️ [スクリプトをインストール](https://spidychoipro.github.io/vibe-site/vibe.user.js)** をクリックして `vibe.user.js` をダウンロード |
| 3 | インストール画面で確認 |
| 4 | アクセス → <https://spidychoipro.github.io/vibe-site/> |
| 5 | ターミナルが起動するのを見守る。小声で感嘆する。 |

> **スクリプトがない？** 白いページが見えるはず。正常です。それこそが本題です。

## 🌐 リソース

- **ライブページ:** <https://spidychoipro.github.io/vibe-site/>
- **ユーザースクリプト:** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **リポジトリ:** <https://github.com/spidychoipro/vibe-site>

## 🧠 仕組み

このプロジェクトは、従来のフロントエンド配信方式を逆転させる：

```
┌────────────────────────────┐        ┌────────────────────────────┐
│  GitHub Pages (index.html) │        │  Tampermonkey (vibe.user.js) │
│                            │        │                            │
│  <body></body>             │  ◄────  │  @match github.io/vibe-site │
│  ソース: 文字通り何もない   │        │  内容: すべて埋め込み       │
└────────────────────────────┘        └────────────────────────────┘
```

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
├── index.html      # 意図的に空にしたページ
├── vibe.user.js    # ユーザースクリプト — 体験のすべてがここにある
└── README.md       # 今読んでいるドキュメント
```

## 💻 ローカル開発

プロジェクトを配信し、組み込みの `@match localhost:8000` を利用する：

```bash
npx serve .      # → http://localhost:8000
```

その後、Tampermonkey にローカル版のスクリプトをインストールする。

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
  ユーザースクリプトの中に平文で存在する。このパターンを機密情報の保持に
  **再利用しないこと。**

## ⚖️ ライセンス

MIT — 好きに使って、楽しんで。 [LICENSE](LICENSE) 参照。

---

<div align="center">

🟩 の点滅カーソル、そして空白ページへの過剰な愛から作られた。

**要約:** URL を見せよ。白を見つめる様を見守れ。スクリプトを入れろと言え。楽しめ。

</div>