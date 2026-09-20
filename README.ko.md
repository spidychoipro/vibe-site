# vibe-site

> [English](README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · 한국어

빈 화면 뒤에 숨겨 둔 Vibe Coding Manifesto 사이트입니다.

스크립트 없이 방문하면 진짜 빈 페이지 하나만 나옵니다.
[Tampermonkey](https://www.tampermonkey.net/) 유저스크립트를
설치해야 터미널이 부팅되면서 콘텐츠가 나타납니다.

## 바로가기

- 페이지: <https://spidychoipro.github.io/vibe-site/>
- 유저스크립트: <https://spidychoipro.github.io/vibe-site/vibe.user.js>

## 기능

- **진짜 빈 페이지**: `index.html`은 완전히 비어 있어서 소스를 봐도 아무것도 없습니다.
- **스크립트만 동작**: 모든 콘텐츠(CSS + 부팅 시퀀스 + 매니페스토)가 `vibe.user.js`에 내장되어 설치자에게만 보입니다.
- **자동 업데이트**: `@version`을 올려 push하면 Tampermonkey가 자동으로 갱신합니다.
- **안전한 실행**: 외부 통신 없음(`@grant none`), iframe 차단(`@noframes`), 진짜 빈 페이지에서만 동작.

## 설치 방법

딸깍 세 번이면 끝입니다.

| 브라우저 | 원클릭 설치 |
| --- | --- |
| Chrome | [Tampermonkey (Web Store)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Tampermonkey (Add-ons)](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Edge | [Tampermonkey (Add-ons)](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Safari | [Tampermonkey (App Store)](https://apps.apple.com/app/tampermonkey-classic/id1482490089) |

그 다음:

| 단계 | 클릭 |
| --- | --- |
| 1 | 위 스토어 링크 열기 → **추가** 클릭 |
| 2 | **⬇️ [스크립트 설치](https://spidychoipro.github.io/vibe-site/vibe.user.js)** 열기 → **설치** 클릭 |
| 3 | 사이트 접속 → 터미널 부팅 & 매니페스토 표시 |

## 동작 원리

| 구성 요소 | 내용 |
| --- | --- |
| GitHub Pages — `index.html` | `<body></body>` — 아무것도 없는 문서 |
| Tampermonkey — `vibe.user.js` | `@match` 규칙 + 콘텐츠 데이터 전부 |
| 브라우저 + 스크립트 | 터미널 부팅 & 매니페스토 펼치기 |

1. `index.html`은 그냥 빈 문서입니다. 소스에 내용이 없으니 볼 것도 없습니다.
2. `vibe.user.js`가 Pages URL에 매칭되고, 페이지가 정말 비었는지 확인한 뒤 경험을 주입합니다.
3. `@version`을 올려 push하면 `@updateURL`을 통해 설치자 전체에 자동 배포됩니다.

결과적으로 콘텐츠는 인터넷에 노출되지 않고, 스크립트를 아는 사람에게만 보입니다.

## 프로젝트 구조

```
vibe-site/
├── index.html          # 일부러 비워 둔 빈 페이지
├── vibe.user.js        # 유저스크립트 — 콘텐츠 전부가 여기 들어 있음
├── README.md           # 문서 (English)
├── README.ko.md        # 문서 (한국어) — 지금 이 문서
├── README.zh.md        # 문서 (中文)
├── README.ja.md        # 문서 (日本語)
└── LICENSE             # MIT
```

## 로컬 개발

`@match localhost:8000`이 이미 포함되어 있어서 로컬 서버에서 바로 확인할 수 있습니다.

```bash
npx serve .    # → http://localhost:8000
```

Tampermonkey에 로컬 버전 스크립트를 먼저 설치해야 합니다.

스크립트는 **진짜 빈 페이지에서만** 활성화되므로, 8000 포트의 다른 프로젝트를 덮어쓰지 않습니다.

### 콘텐츠 수정

`vibe.user.js` 상단의 데이터만 바꾸면 됩니다.

| 상수 | 용도 |
| --- | --- |
| `MANIFESTO` | 매니페스토 문장들 (문자열) |
| `BOOT` | 터미널 부팅 시퀀스 (`{ prompt, msg }` 목록) |

## 보안

> 실제 사고가 아니라 설계 검토 내용입니다.

- **외부 통신 없음**: `@require` 없이 `fetch`/`eval`도 사용하지 않아 페이지 밖으로 나가는 요청이 없습니다.
- **프레임 차단**: `@noframes`로 iframe 내부 실행을 막습니다.
- **빈 페이지 확인**: `isTargetBlank` 검사로 실제로 비어 있는 화면에서만 동작해 다른 로컬 서비스를 건드리지 않습니다.
- **공급망 주의**: 업데이트는 이 저장소를 통해 내려옵니다. 저장소 쓰기 권한이 있으면 모든 설치자에게 코드를 배포할 수 있으므로, `spidychoipro` 계정(2FA)이 유일한 신뢰 지점입니다.
- **오해 주의**: '숨겨 둔' 콘텐츠는 유저스크립트 안에 평문으로 그대로 있습니다. 보안이 아니라 숨김이므로, 진짜 비밀을 이 방식으로 보관하지 마세요.

## 라이선스

MIT License — [LICENSE](LICENSE) 참고.