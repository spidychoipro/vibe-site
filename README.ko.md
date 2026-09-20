<div align="center">

# ⬜ vibe-site

**열쇠를 가진 자에게만 존재하는 페이지.**

```
┌──────────────────────────────────────────────┐
│  ...빈 하얀 페이지...                        │
│                                              │
│   [ Tampermonkey 사용자만 ]                   │
│   $ connecting to vibe... ok                 │
│   $ loading manifesto... ok                  │
│                                              │
│   █ VIBE CODING MANIFESTO █                  │
└──────────────────────────────────────────────┘
```

`vibe-site`는 페이지가 *진짜로* 빈 채로 남아 있는 GitHub Pages 실험 프로젝트다.
콘텐츠도, 페이로드도, 소스 안에 아무것도 없다. 터미널이 부팅되며 **Vibe Coding
Manifesto**를 펼치는 모든 경험은 [Tampermonkey](https://www.tampermonkey.net/)
유저스크립트 안에 담겨 있다.

**방문 → 텅 빈 공허. 스크립트 설치 → 공허가 말을 건다.**

**[⬇️ 스크립트 설치](https://spidychoipro.github.io/vibe-site/vibe.user.js)** — Tampermonkey 설치 후 브라우저에서 열면 설치 화면이 나온다.

[English](README.md) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 빠른 시작

| 단계 | 동작 |
|---|---|
| 1 | 브라우저에 [Tampermonkey](https://www.tampermonkey.net/) 설치 |
| 2 | **⬇️ [스크립트 설치](https://spidychoipro.github.io/vibe-site/vibe.user.js)** 를 눌러 `vibe.user.js` 다운로드 |
| 3 | Tampermonkey 설치 화면에서 확인 |
| 4 | 접속 → <https://spidychoipro.github.io/vibe-site/> |
| 5 | 터미널이 부팅되는 것을 지켜보자. 조용히 감탄하자. |

> **스크립트가 없나요?** 빈 하얀 페이지가 보일 것이다. 정상이다. 그게 전부다.

## 🌐 리소스

- **라이브 페이지:** <https://spidychoipro.github.io/vibe-site/>
- **유저스크립트:** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **저장소:** <https://github.com/spidychoipro/vibe-site>

## 🧠 동작 원리

이 프로젝트는 기존의 프론트엔드 전달 방식을 뒤집는다:

| 구성 요소 | 담고 있는 것 |
|---|---|
| GitHub Pages — `index.html` | `<body></body>` — 진짜 텅 빈 문서 |
| Tampermonkey — `vibe.user.js` | `@match` 규칙 + 전체 경험 데이터 |
| 너의 브라우저 + 스크립트 | 터미널 부팅, 매니페스토 전개 |

<p align="center"><code>빈 페이지 ──▶ (스크립트 주입) ──▶ 마법</code></p>

1. **`index.html`** 은 진짜 비어 있는 문서다. 흰 배경, 빈 `<body>`.
   소스를 열어봐도 아무것도 안 보인다 — 아무것도 없으니까.
2. **`vibe.user.js`** 는 모든 콘텐츠(CSS + 부팅 시퀀스 + 매니페스토)를 내장된
   데이터로 담는다. Pages URL을 매칭하고, 페이지가 정말 빈 화면인지 확인한
   뒤 경험을 주입한다.
3. **자동 업데이트:** `@version`을 올리고 push하면 Tampermonkey `@updateURL`
   을 통해 모든 설치자에게 자동 배포된다.

결과는 인터넷 앞에서는 보이지 않고, 비밀을 아는 자에게만 보이는 콘텐츠다.

## 📁 프로젝트 구조

```
vibe-site/
├── index.html          # 의도적으로 비운 빈 페이지
├── vibe.user.js        # 유저스크립트 — 전체 경험이 여기에 담겨 있음
├── README.md           # 문서 (영문)
├── README.ko.md        # 문서 (한국어) — 지금 보고 있는 문서
├── README.zh.md        # 문서 (中文)
├── README.ja.md        # 문서 (日本語)
└── LICENSE             # MIT
```

## 💻 로컬 개발

프로젝트를 로컬로 서빙하면, 스크립트에 이미 `@match localhost:8000` 규칙이
있어 바로 확인할 수 있다:

```bash
npx serve .      # → http://localhost:8000
```

먼저 Tampermonkey에 로컬 버전의 스크립트를 설치해야 한다.

스크립트는 **진짜 빈 페이지에서만** 활성화된다 — 8000 포트에 우연히 떠 있는
다른 앱을 가로채지는 않는다.

### 콘텐츠 수정

모든 콘텐츠는 `vibe.user.js` 상단에 있는 평범한 데이터다:

| 상수 | 용도 |
|---|---|
| `MANIFESTO` | 매니페스토 문장 (문자열) |
| `BOOT` | 터미널 부팅 시퀀스 (`{ prompt, msg }` 항목) |

## 🔐 보안 참고

> 아래 내용은 실제 사고가 아니라 설계 검토의 결과다.

- **외부 통신 없음:** `@grant none`, `@require` 없음, `fetch`/`eval` 없음.
  페이지 밖에 손대지 않는다.
- **프레임 차단:** `@noframes` 로 임베디드 iframe 내 실행을 차단한다.
- **진짜-빈-화면 가드:** `isTargetBlank` 런타임 검사로 페이지가 진짜로 빈
  경우에만 작동하도록 하여, 다른 로컬 서비스 오작동을 막는다.
- **공급망:** 업데이트는 `@updateURL/@downloadURL` 을 거쳐 이 저장소로
  돌아온다. 즉 저장소에 쓰기 권한이 있는 사람은 모든 설치자에게 코드를 배포할
  수 있다 — `spidychoipro` 계정(`2FA` 켜두기)이 유일한 신뢰 지점이다.
- **이건 '숨김'이지, 진짜 보안이 아니다:** "숨겨진" 콘텐츠는 유저스크립트
  안에 평문으로 들어 있다. 비밀 정보를 보관하는 데 이 방식을 **쓰지 마라.**

## ⚖️ 라이선스

MIT — 마음껏 쓰되, 재밌게. [LICENSE](LICENSE) 참조.

---

<div align="center">

🟩 커서의 깜빡임, 그리고 빈 페이지에 대한 사랑으로 만들었다.

**요약하자면:** URL을 보여주자. 하얀 화면을 멍하니 보게 하자. 스크립트를
설치하라고 하자. 즐기자.

</div>