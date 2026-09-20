# vibe-site

빈 하얀 페이지 뒤에 숨어있는 Vibe Coding Manifesto.

- 스크립트 없이 접속하면 → **진짜 빈 페이지**
- Tampermonkey 스크립트를 설치하면 → **터미널이 부팅되고 Manifesto가 드러남**

## 링크

- 페이지: https://spidychoipro.github.io/vibe-site/
- 유저스크립트: https://spidychoipro.github.io/vibe-site/vibe.user.js

## 설치 방법

1. 브라우저에 [Tampermonkey](https://www.tampermonkey.net/) 확장 프로그램 설치
2. 위 유저스크립트 링크 열기 → Tampermonkey 설치 화면에서 설치
3. https://spidychoipro.github.io/vibe-site/ 방문

## 원리

- `index.html`은 진짜로 비어 있음 → 소스 봐도 내용 없음
- 모든 콘텐츠는 `vibe.user.js` 안에 내장 → 스크립트 설치자에게만 화면이 나타남
- 스크립트를 업데이트하면 (`@version` 올리고 push) Tampermonkey가 자동 갱신

## 로컬 개발

```sh
npx serve .   # http://localhost:8000
```

스크립트에 `@match http://localhost:8000/*`가 포함되어 있어 로컬에서도 동작한다.

## 콘텐츠 교체

`vibe.user.js`의 `MANIFESTO` 배열과 `BOOT` 배열을 수정하면 된다.