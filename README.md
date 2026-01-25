# React Code Editor

A modern, extensible **CodeMirror 6–based React code editor** featuring first-class TypeScript support, language-aware configuration, and optional diagnostics.

This library is designed to scale from a simple embedded editor to a **multi-language, schema-aware editing platform**.

---

## ✨ Features

- Built on **CodeMirror 6**
- Controlled & uncontrolled usage
- Language-specific configuration
- Optional diagnostics, completion, and hover
- JSON Schema validation support
- Light & dark themes
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

## 🌍 Languages

Languages are enabled explicitly using the `language` prop.

### Currently supported

- **JSON**

The architecture is designed to support additional languages such as:

- JavaScript
- TypeScript
- Python
- HTML / CSS

---

## ⚙️ Language Configuration

Language-specific behavior is configured via `languageOptions`.

### JSON Configuration Example

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

---

### JSON Options

| Option        | Description                        | Default     |
| ------------- | ---------------------------------- | ----------- |
| **`schema`**      | JSON Schema object for validation  | `undefined` |
| **`diagnostics`** | Enable JSON linting                | `true`      |
| **`completion`**  | Enable schema-based autocompletion | `true`      |
| **`hover`**       | Enable schema hover tooltips       | `true`      |

> If no schema is provided, the editor still works normally with **syntax diagnostics only**.

---

## 🧪 Diagnostics

Diagnostics are **configurable per language**.

### JSON diagnostics include:

- Syntax errors
- Schema validation errors (when schema is provided)

You may disable diagnostics entirely:

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
- This approach provides full control over responsive layouts

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
- Diagnostics, completion, and hover are opt-in
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
