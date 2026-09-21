<div align="center">

# ⬜ vibe-site

**A page that doesn't exist — unless you're holding the key.**

```
┌──────────────────────────────────────────────┐
│  ...a blank white page...                    │
│                                              │
│   [ Tampermonkey users only ]                │
│   $ connecting to vibe... ok                 │
│   $ loading manifesto... ok                  │
│                                              │
│   █ VIBE CODING MANIFESTO █                  │
└──────────────────────────────────────────────┘
```

`vibe-site` is a GitHub Pages experiment where the page is *genuinely* blank.
No content, no payload, nothing in the source. The entire experience — a booting
terminal that unfolds the **Vibe Coding Manifesto** — lives inside a
<a href="https://www.tampermonkey.net/" target="_blank" rel="noopener noreferrer">Tampermonkey</a> userscript.

**Visit → white void. Install the script → the void speaks.**

**⬇️ <a href="https://spidychoipro.github.io/vibe-site/vibe.user.js" target="_blank" rel="noopener noreferrer">Install the Script</a>** — open it in your browser after installing Tampermonkey.

<a href="README.md" target="_blank" rel="noopener noreferrer">English</a> · <a href="README.ko.md" target="_blank" rel="noopener noreferrer">한국어</a> · <a href="README.zh.md" target="_blank" rel="noopener noreferrer">中文</a> · <a href="README.ja.md" target="_blank" rel="noopener noreferrer">日本語</a>

</div>

---

## 📦 Quick Start

Three clicks and you're done.

| Browser | One-click install |
|---|---|
| Chrome | <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo" target="_blank" rel="noopener noreferrer">Tampermonkey (Web Store)</a> |
| Firefox | <a href="https://addons.mozilla.org/firefox/addon/tampermonkey/" target="_blank" rel="noopener noreferrer">Tampermonkey (Add-ons)</a> |
| Edge | <a href="https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd" target="_blank" rel="noopener noreferrer">Tampermonkey (Add-ons)</a> |
| Safari | <a href="https://apps.apple.com/app/tampermonkey-classic/id1482490089" target="_blank" rel="noopener noreferrer">Tampermonkey (App Store)</a> |

Then:

| Step | Click |
|---|---|
| 1 | Open the store link above → press **Add**. |
| 2 | Open **⬇️ <a href="https://spidychoipro.github.io/vibe-site/vibe.user.js" target="_blank" rel="noopener noreferrer">Install the Script</a>** → press **Install**. |
| 3 | Visit → <a href="https://spidychoipro.github.io/vibe-site/" target="_blank" rel="noopener noreferrer">https://spidychoipro.github.io/vibe-site/</a>. Watch the terminal boot. Swear under your breath. |

> **No script?** You will see a blank white page. That is correct. That is the point.

## 🌐 Resources

- **Live page:** <a href="https://spidychoipro.github.io/vibe-site/" target="_blank" rel="noopener noreferrer">https://spidychoipro.github.io/vibe-site/</a>
- **Userscript:** <a href="https://spidychoipro.github.io/vibe-site/vibe.user.js" target="_blank" rel="noopener noreferrer">https://spidychoipro.github.io/vibe-site/vibe.user.js</a>
- **Repository:** <a href="https://github.com/spidychoipro/vibe-site" target="_blank" rel="noopener noreferrer">https://github.com/spidychoipro/vibe-site</a>

## 🧠 How It Works

This project inverts conventional front-end delivery:

| Component | What it holds |
|---|---|
| GitHub Pages — `index.html` | `<body></body>` — a truly empty document |
| Tampermonkey — `vibe.user.js` | `@match` rule + the full experience payload |
| Your browser + script | Boots the terminal, unfolds the manifesto |

<p align="center"><code>blank page ──▶ (script injects) ──▶ magic</code></p>

1. **`index.html`** is a real, empty document. White background, empty `<body>`.
   Inspecting the source reveals nothing — because there is nothing.
2. **`vibe.user.js`** carries all content (CSS + boot sequence + manifesto) as an
   embedded payload. It matches the Pages URL, verifies the page is truly blank,
   then injects the experience.
3. **Auto-update:** bumping `@version` and pushing updates the script for every
   installed user via Tampermonkey's `@updateURL`.

The result is content that is invisible to the internet at large and visible
only to those in on the secret.

## 📁 Project Structure

```
vibe-site/
├── index.html          # Intentionally empty white page
├── vibe.user.js        # Userscript (deployed) — no localhost, auto-updates
├── vibe.dev.user.js    # Userscript (local dev) — adds localhost:8000, no auto-update
├── README.md           # Docs (English) — you are here
├── README.ko.md        # Docs (한국어)
├── README.zh.md        # Docs (中文)
├── README.ja.md        # Docs (日本語)
└── LICENSE             # MIT
```

## 💻 Local Development

The deployed `vibe.user.js` matches the GitHub Pages URL **only** — it never
touches `localhost`. For local iteration, use the dev build instead:

| Script | Matches |
|---|---|
| `vibe.user.js` | GitHub Pages only |
| **`vibe.dev.user.js`** | GitHub Pages **+** `localhost:8000` / `127.0.0.1:8000` |

Serve the project and install **⬇️ <a href="https://spidychoipro.github.io/vibe-site/vibe.dev.user.js" target="_blank" rel="noopener noreferrer">vibe.dev.user.js</a>** in Tampermonkey:

```bash
npx serve .      # → http://localhost:8000
```

The dev build has no `@updateURL`/`@downloadURL`, so it never auto-updates.
Both variants only activate on genuinely blank pages — they will **not** hijack
other apps you happen to run on port 8000.

### Editing Content

All content is plain data at the top of `vibe.user.js`:

| Constant | Purpose |
|---|---|
| `MANIFESTO` | The manifesto lines (strings) |
| `BOOT` | Terminal boot sequence (`{ prompt, msg }` entries) |

## 🔐 Security Notes

> The following reflects a deliberate design review, not a past incident.

- **No network egress:** the script uses `@grant none`, declares no `@require`,
  and performs no `fetch`/`eval`. It touches nothing outside the page.
- **Narrow trust boundary:** the deployed script matches **only**
  `https://spidychoipro.github.io/vibe-site/` — no `localhost`. Local development
  uses a separate `vibe.dev.user.js` that never auto-updates.
- **Frame isolation:** `@noframes` prevents execution inside embedded iframes.
- **True-blank guard:** a runtime check (`isTargetBlank`) aborts unless the page
  is genuinely empty, preventing accidental takeover of other local services.
- **Supply chain:** updates flow through `@updateURL/@downloadURL` back to this
  repo. Anyone with write access to the repository can distribute code to every
  installed client — treat the `spidychoipro` account (2FA) as the sole trust anchor.
- **This is obscurity, not security:** the "hidden" content is embedded in plain
  sight inside the userscript. Do **not** reuse this pattern for secrets.

## ⚖️ License

MIT — do whatever, just have fun. See <a href="LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>.

---

<div align="center">

Made with 🟩, a blinking cursor, and an unreasonable love of blank pages.

**TL;DR:** Show someone the URL. Watch them stare at white. Tell them to install the script. Enjoy.

</div>