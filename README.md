![npm](https://img.shields.io/npm/v/react-code-editor)
![downloads](https://img.shields.io/npm/dw/react-code-editor)
![license](https://img.shields.io/npm/l/react-code-editor)

# React Code Editor

A modern, extensible **CodeMirror 6–based React code editor** featuring first-class TypeScript support, language-aware configuration, optional diagnostics, and search/validation support.

This library is designed to scale from a simple embedded editor to a **multi-language, schema-aware editing platform**.

---

## ✨ Features

- Built on **CodeMirror 6**
- Controlled & uncontrolled usage
- Language-specific configuration
- Optional diagnostics, completion, and hover
- JSON Schema validation support
- Light & dark themes
- Search & Replace support
- Validation state callback
- Designed for future multi-language support

---

## 📦 Installation

### Install the editor library

```bash
npm install react-code-editor
```

### Required peer dependencies

```bash
npm install react react-dom
```

### JSON language support (optional, but recommended)

```bash
npm install @codemirror/lang-json codemirror-json-schema ajv
```

> `ajv` is used internally by `codemirror-json-schema` for JSON Schema validation.

---

## 🚀 Basic Usage

```tsx
import { CodeEditor } from 'react-code-editor';

export function Example() {
    return <CodeEditor language="json" defaultValue="{}" />;
}
```

This creates an **uncontrolled JSON editor** with default configuration.

---

## 🔁 Controlled vs Uncontrolled

### Uncontrolled Editor

```tsx
<CodeEditor language="json" defaultValue='{ "name": "John" }' />
```

### Controlled Editor

```tsx
const [value, setValue] = useState('{}');

<CodeEditor language="json" value={value} onChange={setValue} />;
```

> ⚠️ Do not pass both `value` and `defaultValue`.

---

## 🎮 Editor Controller API

The editor exposes a controller API that allows you to trigger actions programmatically.

### ⚠️ Important design choice

This library does **not** impose formatting logic.
Instead, you **pass a callback function** that receives the current editor value and returns the formatted result.

This keeps the editor **language-agnostic** and flexible.

### Available Controller Actions

- `copy()`
- `format(formatter)`
- `foldAll()`
- `unfoldAll()`
- `openSearch()`
- `closeSearch()`
- `findNext()`
- `findPrev()`
- `replace(replacement: string)`
- `replaceAll(replacement: string)`

### 🧠 Format API (Callback-Based)

```tsx
format(formatter: (value: string) => string): void
```

- The editor passes the **current content**
- Your formatter returns the **new formatted content**
- The editor updates itself with the returned value

### Example

```tsx
import { useRef } from 'react';
import type { EditorController } from 'react-codemirror-editor';

const controllerRef = useRef<EditorController | null>(null);

<CodeEditor
  language="json"
  controllerRef={controllerRef}
/>;

function formatJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

<button onClick={() => controllerRef.current?.format(formatJson)}>Format</button>
<button onClick={() => controllerRef.current?.copy()}>Copy</button>
<button onClick={() => controllerRef.current?.foldAll()}>Fold All</button>
<button onClick={() => controllerRef.current?.unfoldAll()}>Unfold All</button>
<button onClick={() => controllerRef.current?.openSearch()}>Search</button>
<button onClick={() => controllerRef.current?.closeSearch()}>Close Search</button>
```

- Works for **any language**
- Supports **custom formatter functions**
- Search UI is **optional** and can be enabled via props

### Example: Prettier Integration (Concept)

```tsx
controllerRef.current?.format((code) =>
    prettier.format(code, { parser: 'json' }),
);
```

---

## 📋 Why Callback-Based Formatting?

- Keeps core editor **small**
- Avoids hard dependency on Prettier
- Supports **any language**
- Lets consumers decide formatting rules

This is a library-level design decision, not a limitation.

---

## 🔍 Search & Replace

The editor includes **search & replace functionality** via a controller API:

- `openSearch()` – Opens the search panel
- `closeSearch()` – Closes the search panel
- `findNext()` – Finds the next match
- `findPrev()` – Finds the previous match
- `replace(replacement: string)` – Replaces the current match
- `replaceAll(replacement: string)` – Replaces all matches

You can pass **search configuration**:

```tsx
<CodeEditor
    language="json"
    searchOptions={{
        top: true,
        caseSensitive: false,
    }}
/>
```

---

## ✅ JSON Validation State

You can track JSON validity and react to changes in real-time via `onValidationChange`:

```tsx
<CodeEditor
    language="json"
    languageOptions={{
        json: {
            schema: myJsonSchema,
            onValidationChange: (isValid) => console.log('Valid:', isValid),
        },
    }}
/>
```

- `isValid` is `true` if there are no syntax or schema errors
- Useful for enabling/disabling Save buttons or warnings in your UI

---

## 🌍 Languages

Languages are enabled explicitly using the `language` prop.

### Currently supported

- **JSON**

Future support for:

- JavaScript
- TypeScript
- Python
- HTML / CSS

---

## ⚙️ Language Configuration

Language-specific behavior is configured via `languageOptions`.

```tsx
<CodeEditor
    language="json"
    languageOptions={{
        json: {
            schema: myJsonSchema,
            diagnostics: true,
            completion: true,
            hover: true,
        },
    }}
/>
```

### JSON Options

| Option               | Type                         | Default                   | Description                                            |
| -------------------- | ---------------------------- | ------------------------- | ------------------------------------------------------ |
| `schema`             | `object`                     | `undefined`               | JSON Schema used for validation, completion, and hover |
| `diagnostics`        | `boolean`                    | `true`                    | Enables JSON syntax diagnostics                        |
| `gutter`             | `boolean`                    | `true`                    | Shows the diagnostics gutter (error markers)           |
| `schemaLint`         | `boolean`                    | `true if schema provided` | Enables schema-based validation                        |
| `hover`              | `boolean`                    | `true if schema provided` | Enables hover tooltips from schema                     |
| `autocomplete`       | `boolean`                    | `true if schema provided` | Enables schema-based autocompletion                    |
| `onValidationChange` | `(isValid: boolean) => void` | `undefined`               | Callback called whenever JSON validity changes         |

> If no schema is provided, the editor still works normally with **syntax diagnostics only**.

---

## 🧪 Diagnostics

Diagnostics are **configurable per language**.

### JSON diagnostics include

- Syntax errors
- Schema validation errors (when schema is provided)

Disable diagnostics:

```tsx
languageOptions={{
  json: {
    diagnostics: false
  }
}}
```

---

## 🔒 Read-Only Mode

```tsx
<CodeEditor language="json" value={json} readOnly={true} />
```

**Notes:**

- `readOnly` must be a boolean
- Default is `false`
- When enabled, the editor is non-editable but remains selectable and scrollable

---

## 📐 Layout & Sizing

By default, CodeMirror sizes itself based on content height.
This can result in a single-line editor when the value contains only one line.

The editor is designed to expand and fill its container.
To ensure a consistent height, define a height or `min-height` via CSS.

```css
.cm-editor-container {
    min-height: 200px;
}

.cm-editor-container,
.cm-editor-container .cm-editor {
    width: 100%;
    height: 100%;
}
```

**Notes:**

- The editor always fills the container height
- Padding, borders, and background should be applied to the container
- Provides full control over responsive layouts

---

## 🎨 Theming

```tsx
<CodeEditor language="json" theme="dark" />
```

Both **light and dark themes** are supported, each with multiple variants.

Available themes:

Light themes:

- light
- ayu_light
- clouds_light
- espresso_light
- noctis_lilac_light
- rose_pine_dawn_light
- smoothy_light
- tomorrow_light

Dark themes:

- dark
- barf_dark
- cobalt_dark
- cool_glow_dark
- dracula_dark

Theme names are type-safe via the exported ThemeName union.

```tsx
import type { ThemeName } from 'react-codemirror-editor';
```

---

## 🏗 Architecture Notes

- Built on **CodeMirror 6**
- Language features are isolated and composable
- Diagnostics, completion, hover, and search are opt-in
- Clean separation between core editor, languages, and UI
- Designed for long-term multi-language expansion

---

## 🛣 Roadmap

- JavaScript / TypeScript language support
- Python language support
- Custom extension injection
- Editor presets
- Diff & read-only modes

---

## 📜 License

MIT License © 2025 Mihir Mistry

---

## 🙏 Credits

Some themes in this library are inspired by  
[Thememirror](https://github.com/vadimdemedes/thememirror)  
by Vadim Demedes, licensed under the MIT License.
