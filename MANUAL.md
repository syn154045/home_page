# Next.js

- Launched: 24/06/15

# Done List

## directory structure
```script

```

## TailwindCSS plugin
### tailwind typography
- refs
[tailwind typography](https://github.com/tailwindlabs/tailwindcss-typography)
- install
``` bash
npm install -D @tailwindcss/typography
```
- add config setting
```ts:tailwind.config.ts
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    + require('@tailwindcss/typography'),
    // ...
  ],
}
```
- how to use
```tsx
<div className="prose">
    <h1>title</h1>
    <p>body.</p>
</div>
```

### tailwind-variants
- refs
[]()


## TailwindCSS Eslint & prettier
- install
```bash
npm i -D eslint-plugin-tailwndcss prettier
```

- add config setting
```json:package.json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    + "fix": "next lint --fix",
    + "format": "prettier --write src",
    + "ff": "npm run format && npm run fix"
  },
```
```json:.eslintc.json
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "next",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended"
  ],
  "plugins": [
    "tailwindcss"
  ],
  "settings": {
    "config": "./tailwind.config.ts",
    "groupByResponsive": true
  }
}
```
[prettier options](https://prettier.io/docs/en/options#jsx-quotes)
```mjs:.prettierrc.mjs
export default {
    // クォーテーションをシングルに変更 (default: false)
    singleQuote: true,
    // タブインデントを４に変更 (default: 2)
    tabWidth: 4
}
```
```.prettierignore
# Node modules
node_modules/

# Build directories
build/
dist/
out/

# Next.js specific
.next/
.vercel/

# Logs
logs/
*.log

# Dependency directories
bower_components/

# Test coverage
coverage/

# Generated files
*.min.js
*.min.css

# Config files
*.config.js
*.config.ts

# Markdown files (optional)
*.md

# Ignore specific folders
public/
static/

# Ignore specific file types
*.svg
*.png
*.jpg
*.jpeg

# Ignore specific files
.env
.DS_Store

# Ignore all hidden files
.*
```

- runコマンド
```bash
npm run ff
```

## 