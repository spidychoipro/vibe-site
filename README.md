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
[Tampermonkey](https://www.tampermonkey.net/) userscript.

**Visit → white void. Install the script → the void speaks.**

**[⬇️ Install the Script](https://spidychoipro.github.io/vibe-site/vibe.user.js)** — open it in your browser after installing Tampermonkey.

[English](README.md) · [한국어](README.ko.md) · [中文](README.zh.md) · [日本語](README.ja.md)

</div>

---

## 📦 Quick Start

Three clicks and you're done.

| Browser | One-click install |
|---|---|
| Chrome | [Tampermonkey (Web Store)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Tampermonkey (Add-ons)](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Edge | [Tampermonkey (Add-ons)](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Safari | [Tampermonkey (App Store)](https://apps.apple.com/app/tampermonkey-classic/id1482490089) |

Then:

| Step | Click |
|---|---|
| 1 | Open the store link above → press **Add**. |
| 2 | Open **⬇️ [Install the Script](https://spidychoipro.github.io/vibe-site/vibe.user.js)** → press **Install**. |
| 3 | Visit → <https://spidychoipro.github.io/vibe-site/>. Watch the terminal boot. Swear under your breath. |

> **No script?** You will see a blank white page. That is correct. That is the point.

## 🌐 Resources

- **Live page:** <https://spidychoipro.github.io/vibe-site/>
- **Userscript:** <https://spidychoipro.github.io/vibe-site/vibe.user.js>
- **Repository:** <https://github.com/spidychoipro/vibe-site>

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
├── vibe.user.js        # Userscript — the entire experience lives here
├── README.md           # Docs (English) — you are here
├── README.ko.md        # Docs (한국어)
├── README.zh.md        # Docs (中文)
├── README.ja.md        # Docs (日本語)
└── LICENSE             # MIT
```

## 💻 Local Development

Serve the project and rely on the bundled `@match localhost:8000`:

```bash
npx serve .      # → http://localhost:8000
```

Then install the local copy of the script in Tampermonkey.

The script only activates on genuinely blank pages — it will **not** hijack
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
- **Frame isolation:** `@noframes` prevents execution inside embedded iframes.
- **True-blank guard:** a runtime check (`isTargetBlank`) aborts unless the page
  is genuinely empty, preventing accidental takeover of other local services.
- **Supply chain:** updates flow through `@updateURL/@downloadURL` back to this
  repo. Anyone with write access to the repository can distribute code to every
  installed client — treat the `spidychoipro` account (2FA) as the sole trust anchor.
- **This is obscurity, not security:** the "hidden" content is embedded in plain
  sight inside the userscript. Do **not** reuse this pattern for secrets.

## ⚖️ License

MIT — do whatever, just have fun. See [LICENSE](LICENSE).

---

<div align="center">

Made with 🟩, a blinking cursor, and an unreasonable love of blank pages.

**TL;DR:** Show someone the URL. Watch them stare at white. Tell them to install the script. Enjoy.

</div>