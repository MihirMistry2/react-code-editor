# React Code Editor

![npm](https://img.shields.io/npm/v/react-code-editor)
![downloads](https://img.shields.io/npm/dw/react-code-editor)
![license](https://img.shields.io/npm/l/react-code-editor)

A modern, extensible **CodeMirror 6–based React code editor** with TypeScript support, JSON schema validation, diagnostics, search, and a powerful controller API.

Designed to scale from simple embeds to **multi-language platforms**.

---

## Features

- Built on CodeMirror 6
- JSON schema validation (AJV-powered)
- Diagnostics & search
- Controller API
- Curated light & dark themes
- Language-agnostic formatting
- Multi-language ready architecture

---

## Install

```bash
npm install react-code-editor
npm install react react-dom
```

Optional (JSON support):

```bash
npm install @codemirror/lang-json codemirror-json-schema ajv
```

---

## Basic Usage

```tsx
import { CodeEditor } from 'react-code-editor';

export function Example() {
    return <CodeEditor language="json" defaultValue="{}" />;
}
```

---

## Controlled vs Uncontrolled

```tsx
// Uncontrolled
<CodeEditor language="json" defaultValue='{"name":"John"}' />

// Controlled
const [value, setValue] = useState('{}')
<CodeEditor language="json" value={value} onChange={setValue} />
```

Do not pass both `value` and `defaultValue`.

---

## Controller API

Pass `controllerRef` for programmatic control.

### Methods

```
copy()
format(formatter)
foldAll()
unfoldAll()
openSearch()
closeSearch()
findNext()
findPrev()
replace(string)
replaceAll(string)
getValidation()
getDiagnostics()
```

### Formatting Example

```tsx
controllerRef.current?.format((value) =>
    JSON.stringify(JSON.parse(value), null, 2),
);
```

- No built-in formatter
- Works with Prettier or custom logic
- Fully language-agnostic

---

## Search

```tsx
<CodeEditor
    language="json"
    searchOptions={{ top: true, caseSensitive: false }}
/>
```

---

## Validation & Diagnostics

```ts
const validation = controllerRef.current?.getValidation();
const diagnostics = controllerRef.current?.getDiagnostics();
```

JSON supports:

- Syntax errors
- Schema validation (if schema provided)

Disable diagnostics:

```tsx
languageOptions={{ json: { diagnostics: false } }}
```

---

## Language Support

**Current:** `JSON`  
**Planned:** `JavaScript`, `TypeScript`, `Python`, `HTML/CSS`

### Configuration

```tsx
<CodeEditor
    language="json"
    languageOptions={{
        json: {
            schema,
            diagnostics: true,
            completion: true,
            hover: true,
        },
    }}
/>
```

### JSON Options

| Option         | Type    | Default          | Description                              |
| -------------- | ------- | ---------------- | ---------------------------------------- |
| `schema`       | object  | `undefined`      | Schema for validation, completion, hover |
| `diagnostics`  | boolean | `true`           | Enable syntax diagnostics                |
| `gutter`       | boolean | `true`           | Show error gutter                        |
| `schemaLint`   | boolean | `true` if schema | Enables schema-based validation          |
| `hover`        | boolean | `true` if schema | Enables hover tooltips from schema       |
| `autocomplete` | boolean | `true` if schema | Enables schema-based autocompletion      |

> Without a schema, syntax diagnostics still work.

---

## Read Only

```tsx
<CodeEditor language="json" value={json} readOnly={true} />
```

---

## Layout

Set height via CSS:

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

---

## Themes

```tsx
import { Themes } from 'react-code-editor';
<CodeEditor theme={Themes.dark} />;
```

### Available Themes

**Light:**  
`light`, `ayu_light`, `clouds_light`, `espresso_light`, `noctis_lilac_light`, `rose_pine_dawn_light`, `smoothy_light`, `tomorrow_light`

**Dark:**  
`dark`, `barf_dark`, `cobalt_dark`, `cool_glow_dark`, `dracula_dark`

---

## Architecture

- Modular & composable
- Optional diagnostics, hover, completion, search
- Language extensions isolated per configuration
- Designed for extensibility

---

## Roadmap

- JavaScript / TypeScript support
- Python support
- Extension injection API
- Presets
- Diff mode

---

## License

MIT License © 2025 Mihir Mistry

---

## Acknowledgements

Some themes are inspired by  
[Thememirror](https://github.com/vadimdemedes/thememirror)  
by Vadim Demedes (MIT License).
