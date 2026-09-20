<div align="center">

# ⬜ vibe-site

**열쇠를 쥔 사람에게만 존재하는 페이지.**

```
┌──────────────────────────────────────────────┐
│  ...빈 하얀 페이지...                        │
│                                              │
│   [ Tampermonkey 설치한 사람만 ]              │
│   $ connecting to vibe... ok                 │
│   $ loading manifesto... ok                  │
│                                              │
│   █ VIBE CODING MANIFESTO █                  │
└──────────────────────────────────────────────┘
```

`vibe-site`는 페이지를 그냥 진짜로 비워 두는 GitHub Pages 실험 프로젝트야.
소스에도, 안에 아무것도 없어. 터미널이 부팅되면서 **Vibe Coding Manifesto**가
펼쳐지는 이 모든 장면은 [Tampermonkey](https://www.tampermonkey.net/)
유저스크립트 안에만 들어 있어.

**들어가면 → 새하얀 화면. 스크립트 깔면 → 화면이 말을 걸어.**

**[⬇️ 스크립트 설치](https://spidychoipro.github.io/vibe-site/vibe.user.js)** — Tampermonkey 깔고 나서 브라우저에서 열면 설치 화면이 뜬다.

[English](README.md) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 빠른 시작

| 단계 | 할 일 |
|---|---|
| 1 | 브라우저에 [Tampermonkey](https://www.tampermonkey.net/) 설치 |
| 2 | **⬇️ [스크립트 설치](https://spidychoipro.github.io/vibe-site/vibe.user.js)** 를 눌러서 `vibe.user.js` 받기 |
| 3 | Tampermonkey에 뜨는 설치 화면에서 확인 |
| 4 | 사이트 방문 → <https://spidychoipro.github.io/vibe-site/> |
| 5 | 터미널 부팅되는 거 보고 슬쩍 감탄 |

> **스크립트 안 깔았어?** 하얀 화면만 보일 거야. 정상이고, 의도된 거야.

## 🌐 링크 모음

- **페이지:** <https://spidychoipro.github.io/vibe-site/>
- **유저스크립트:** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **저장소:** <https://github.com/spidychoipro/vibe-site>

## 🧠 왜 이렇게 되는 거지

평범한 웹사이트와 정반대로 만들어져 있어:

| 구성 요소 | 뭐가 들었나 |
|---|---|
| GitHub Pages — `index.html` | `<body></body>` — 진짜 아무것도 없는 문서 |
| Tampermonkey — `vibe.user.js` | `@match` 규칙 + 경험 데이터 전부 |
| 브라우저 + 스크립트 | 터미널 부팅 & 매니페스토 펼치기 |

<p align="center"><code>빈 페이지 ──▶ (스크립트가 채움) ──▶ 매직</code></p>

1. **`index.html`** 은 진짜 그냥 빈 문서야. 하얀 배경에 빈 `<body>`.
   소스를 까봐도 나올 게 없어. 있는 게 없으니까.
2. **`vibe.user.js`** 안에 모든 콘텐츠(CSS + 부팅 시퀀스 + 매니페스토)가
   들어 있어. Pages URL에 매칭되는지 보고, 페이지가 정말 빈 화면인지 확인한
   다음에야 내용을 집어넣는 구조지.
3. **자동 업데이트:** `@version` 올려서 push하면 Tampermonkey `@updateURL`
   을 따라서 설치자들한테 알아서 갱신돼.

즉, 전에는 어디에도 안 보이다가 이 비밀을 아는 사람에게만 보이는 콘텐츠가
되는 거야.

## 📁 프로젝트 구조

```
vibe-site/
├── index.html          # 일부러 비워 둔 빈 페이지
├── vibe.user.js        # 유저스크립트 — 경험 전부가 여기 들어 있음
├── README.md           # 문서 (영문)
├── README.ko.md        # 문서 (한국어) — 지금 이 문서
├── README.zh.md        # 문서 (中文)
├── README.ja.md        # 문서 (日本語)
└── LICENSE             # MIT
```

## 💻 로컬에서 돌려보기

그냥 띄워 주면 돼. 스크립트에 `@match localhost:8000` 이 이미 들어 있어서
따로 설정할 것도 없이 바로 확인돼.

```bash
npx serve .      # → http://localhost:8000
```

한 가지, Tampermonkey에는 로컬 버전 스크립트를 먼저 설치해 줘야 해.

그리고 스크립트는 **정말 빈 페이지에서만** 동작해. 네가 8000 포트로 돌리고
있는 다른 작업물을 덮어쓰거나 하지 않아.

### 내용 바꾸기

내용은 전부 `vibe.user.js` 맨 위에 데이터로 선언돼 있어서 문자열만 바꾸면 돼.

| 상수 | 하는 일 |
|---|---|
| `MANIFESTO` | 매니페스토 문장들 (문자열) |
| `BOOT` | 터미널 부팅 시퀀스 (`{ prompt, msg }` 목록) |

## 🔐 보안 관련 메모

> 아래는 실제로 털린 적이 있어서가 아니라, 설계 단계에서 검토한 내용이야.

- **밖으로 나가는 통신 없음:** `@grant none`, `@require` 없이 `fetch`/`eval`
  같은 것도 안 써. 페이지 밖으로 아무것도 안 건드려.
- **프레임 차단:** `@noframes` 덕분에 iframe 안에서는 실행되지 않아.
- **빈 페이지 확인:** `isTargetBlank` 검사로 진짜 빈 화면일 때만 동작해서,
  다른 로컬 서비스까지 침범할 일이 없어.
- **공급망 주의:** 업데이트는 `@updateURL/@downloadURL` 로 이 저장소를
  경유해서 내려와. 저장소에 쓰기 권한이 있는 사람은 설치된 전부에 코드를
  뿌릴 수 있다는 뜻이라, `spidychoipro` 계정(`2FA` 켜두기)이 사실상 전부를
  거는 믿음의 지점이야.
- **숨겨 둔다고 보안은 아니야:** 그렇게 '숨겨' 둔 콘텐츠는 유저스크립트 안에
  평문으로 그대로 들어 있어. 진짜 비밀을 이 방식으로 보관하지는 마.

## ⚖️ 라이선스

MIT — 뭐 하든 자유야, 즐기면 돼. [LICENSE](LICENSE) 참고.

---

<div align="center">

🟩 커서 깜빡임과, 빈 페이지에 대한 지나친 애정으로 만들었어.

**한 줄 요약:** 링크를 던져 줘. 하얀 화면 보고 어리둥절하는 표정을 봐.
스크립트 깔아보라고 하고. 즐겨.

</div>