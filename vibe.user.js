// ==UserScript==
// @name         vibe-site unlocker
// @namespace    https://github.com/spidychoipro/vibe-site
// @version      0.2.0
// @description  빈 페이지 뒤에 숨어있는 Vibe Coding Manifesto를 드러내는 스크립트. 설치하면 마법이 일어난다.
// @author       spidychoipro
// @match        https://spidychoipro.github.io/vibe-site/*
// @match        http://localhost:8000/*
// @match        http://127.0.0.1:8000/*
// @run-at       document-idle
// @grant        none
// @noframes
// @downloadURL  https://spidychoipro.github.io/vibe-site/vibe.user.js
// @updateURL    https://spidychoipro.github.io/vibe-site/vibe.user.js
// ==/UserScript==

(function () {
  'use strict';

  const CSS = `
    #vibe-root, #vibe-root * { box-sizing: border-box; }
    #vibe-root {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #050805;
      color: #33ff66;
      font-family: "Consolas", "Courier New", monospace;
      font-size: 15px;
      line-height: 1.65;
      padding: 40px 8vw 60px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    #vibe-root::before {
      content: "";
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.02) 0px,
        rgba(255,255,255,0.02) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
    }
    #vibe-root .line { white-space: pre-wrap; word-break: break-word; min-height: 1.65em; }
    #vibe-root .cur {
      display: inline-block;
      width: 9px; height: 1.1em;
      background: #33ff66;
      vertical-align: text-bottom;
      animation: vibe-blink 1s steps(1) infinite;
    }
    @keyframes vibe-blink { 50% { opacity: 0; } }
    #vibe-root .prompt { color: #22cc55; }
    #vibe-root .dim { color: #1d8f40; }
    #vibe-root .title {
      font-size: 30px;
      font-weight: bold;
      color: #b6ffc9;
      letter-spacing: 2px;
      margin: 26px 0 6px;
      text-shadow: 0 0 12px rgba(51,255,102,0.6);
    }
    #vibe-root .manifesto { margin: 18px 0 0 8px; }
    #vibe-root .manifesto .num { color: #1d8f40; }
    #vibe-root .btn {
      display: inline-block;
      margin-top: 30px;
      padding: 10px 18px;
      border: 1px solid #33ff66;
      color: #33ff66;
      background: transparent;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      letter-spacing: 1px;
    }
    #vibe-root .btn:hover { background: rgba(51,255,102,0.15); }
    #vibe-root .easter {
      margin-top: 14px;
      color: #ff66aa;
      min-height: 1.65em;
    }
    #vibe-root a { color: #33ff66; text-decoration: underline; }
    #vibe-root .fade { opacity: 0; transition: opacity 0.8s ease; }
    #vibe-root .fade.show { opacity: 1; }
    #vibe-root footer { margin-top: 40px; color: #1d8f40; font-size: 13px; }
  `;

  const MANIFESTO = [
    '우리는 존재하지 않는 페이지를 목격한다.',
    '우리는 하얀 벽 뒤에 삶이 있다는 걸 알고 있다.',
    '우리는 커서가 깜빡이는 이유를 안다. — 목적지가 없다.',
    '우리는 타이핑이 제일 멋진 형태의 연설이라고 믿는다.',
    '코드는 쓰는 것이 아니다. 숨 쉬는 것이다.',
    '바이브란, 들켜도 좋지만 안 들키면 더 좋은 것이다.',
    '오늘도 우리는 누군가가 이 페이지를 보기 전엔 아무것도 아니기를 자청한다.'
  ];

  const BOOT = [
    { prompt: '$', msg: 'connecting to vibe... ok' },
    { prompt: '$', msg: 'decrypting blank page... ok' },
    { prompt: '$', msg: 'loading manifesto... ok' },
    { prompt: '$', msg: 'climbing the white wall... vroom vroom' }
  ];

  let root;

  function injectStyle() {
    const s = document.createElement('style');
    s.id = 'vibe-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildRoot() {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    root = document.createElement('div');
    root.id = 'vibe-root';
    document.body.appendChild(root);
    return root;
  }

  function appendLine(html) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = html;
    root.appendChild(line);
    root.scrollTop = root.scrollHeight;
    return line;
  }

  function typeText(bootLine, onDone, speed) {
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = bootLine.prompt + ' ';
    const span = document.createElement('span');
    span.className = 'txt';
    const cursor = document.createElement('span');
    cursor.className = 'cur';
    const line = document.createElement('div');
    line.className = 'line';
    line.appendChild(prompt);
    line.appendChild(span);
    line.appendChild(cursor);
    root.appendChild(line);
    const text = bootLine.msg;
    let i = 0;
    const spd = speed || 28;
    const timer = setInterval(() => {
      span.textContent = text.slice(0, i);
      root.scrollTop = root.scrollHeight;
      i += 1;
      if (i > text.length) {
        clearInterval(timer);
        cursor.remove();
        if (onDone) onDone();
      }
    }, spd);
  }

  function showWithFade(el) {
    el.classList.add('show');
  }

  function runBoot(cb) {
    let idx = 0;
    function next() {
      if (idx >= BOOT.length) { cb(); return; }
      typeText(BOOT[idx], next);
      idx += 1;
    }
    next();
  }

  function buildManifesto() {
    appendLine('');
    appendLine('<span class="dim">// 아무것도 없어 보였지?</span>');

    const title = document.createElement('div');
    title.className = 'title fade';
    title.textContent = 'VIBE CODING MANIFESTO';
    root.appendChild(title);

    const block = document.createElement('div');
    block.className = 'manifesto fade';
    MANIFESTO.forEach((t, i) => {
      const l = document.createElement('div');
      l.className = 'line';
      l.innerHTML = '<span class="num">[' + String(i + 1).padStart(2, '0') + ']</span> ' + t;
      block.appendChild(l);
    });
    root.appendChild(block);

    const btn = document.createElement('button');
    btn.className = 'btn fade';
    btn.textContent = '이거 봤다고 하지 마셈';
    root.appendChild(btn);

    const easter = document.createElement('div');
    easter.className = 'easter';
    root.appendChild(easter);

    btn.addEventListener('click', () => {
      easter.textContent = '🙊 네 명예는 안전하다. 스크립트 없는 친구들은 아직 하얀 벽만 보고 있겠지.';
    });

    const footer = document.createElement('footer');
    footer.className = 'fade';
    footer.innerHTML = 'vibe-site v0.2.0 · <a href="https://spidychoipro.github.io/vibe-site/vibe.user.js" target="_blank">vibe.user.js</a>';
    root.appendChild(footer);

    setTimeout(showWithFade, 60, title);
    setTimeout(showWithFade, 160, block);
    setTimeout(showWithFade, 260, btn);
    setTimeout(showWithFade, 360, footer);
  }

  function isTargetBlank() {
    if (!document.body) return false;
    if ((document.title || '').trim() !== '' && (document.title || '').trim() !== '.') return false;
    if (document.body.childElementCount > 0) return false;
    return (document.body.textContent || '').trim() === '';
  }

  function start() {
    if (!isTargetBlank()) return;
    injectStyle();
    buildRoot();
    appendLine('');
    appendLine('<span class="dim">vibe-site/~ root shell (c) 2026</span>');
    appendLine('');
    runBoot(() => buildManifesto());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();