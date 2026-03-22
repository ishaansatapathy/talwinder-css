# Talwinder CSS

Talwinder CSS is a lightweight, beginner-friendly utility engine inspired by Tailwind CSS. It scans your HTML for `tw-` utility classes, applies inline styles in the browser, and ships with a small set of custom elements you can use immediately.

## Features

- Simple `tw-` prefixed utility classes
- Vanilla JavaScript only
- No React, Vue, or other frameworks
- Built-in custom elements like `login-card`, `fancy-btn`, and `spin-loader`
- Lightweight and easy to understand
- ESM-ready package exports

## Installation

```bash
npm install talwinder-css
```

## Usage

```js
import { initEngine } from "talwinder-css";

initEngine();
```

`initEngine()` registers the built-in components and applies Talwinder utility classes in one call.

If you want direct access to component registration:

```js
import { registerComponents, applyUtilities } from "talwinder-css";

registerComponents();
applyUtilities();
```

## Example HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Talwinder CSS Demo</title>
  </head>
  <body>
    <div class="tw-p-4 tw-bg-black tw-text-white tw-rounded">
      Hello from Talwinder CSS
    </div>

    <fancy-btn>Click Me</fancy-btn>

    <script type="module">
      import { initTalwinder } from "talwinder-css";

      initTalwinder();
    </script>
  </body>
</html>
```

## Supported Utilities

- `tw-bg-*`
- `tw-text-*`
- `tw-p-*`
- `tw-px-*`
- `tw-py-*`
- `tw-m-*`
- `tw-w-*`
- `tw-h-*`
- `tw-flex`
- `tw-flex-center`
- `tw-border`
- `tw-rounded`
- `tw-shadow-soft`
- `tw-shadow-hard`
- `tw-shadow-*`
- `tw-glow-*`
- `tw-card-3d`

## Built-in Components

- `login-card`
- `fancy-btn`
- `glass-card`
- `card-3d`
- `gol-roti`
- `spin-loader`
