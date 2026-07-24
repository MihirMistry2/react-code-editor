# React Code Editor

![npm](https://img.shields.io/npm/v/react-codemirror-editor)
![downloads](https://img.shields.io/npm/dw/react-codemirror-editor)
![license](https://img.shields.io/npm/l/react-codemirror-editor)

A modern, extensible **CodeMirror 6–based React code editor** with TypeScript support, built-in language plugins, JSON schema validation, diagnostics, search, and a powerful controller API.

Designed to scale from simple embeds to **multi-language platforms**.

---

## Features

- Built on CodeMirror 6
- JSON schema validation (AJV-powered)
- JavaScript & TypeScript support
- Diagnostics, autocomplete & hover
- Powerful search
- Controller API
- Curated light & dark themes
- Language-agnostic formatting
- Multi-language plugin architecture

---

## Install

```bash
npm install react-codemirror-editor
npm install react react-dom
```

Optional (JSON support):

```bash
npm install @codemirror/lang-json codemirror-json-schema ajv
```

Optional (JavaScript / TypeScript support):

```bash
npm install @codemirror/lang-javascript
```

---

## Basic Usage

### JSON

```tsx
import { CodeEditor } from 'react-codemirror-editor';

export function Example() {
    return <CodeEditor language="json" defaultValue="{}" />;
}
```

### JavaScript

```tsx
import { CodeEditor } from 'react-codemirror-editor';

export function Example() {
    return <CodeEditor language="js" defaultValue="const message = 'Hello World';" />;
}
```

### TypeScript

```tsx
import { CodeEditor } from 'react-codemirror-editor';

export function Example() {
    return <CodeEditor language="ts" defaultValue="interface User { name: string }" />;
}
```

---

## Controlled vs Uncontrolled

```tsx
// Uncontrolled
<CodeEditor language="json" defaultValue='{"name":"John"}' />

// Controlled
const [value, setValue] = useState('{}');
<CodeEditor language="json" value={value} onChange={setValue} />;
```

Do not pass both `value` and `defaultValue`.

---

## Controller API

Pass `controllerRef` for programmatic control.

### Methods

```text
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

Disable diagnostics for any language:

```tsx
languageOptions={{ json: { diagnostics: false } }}
```

### JSON

Supports:

- Syntax errors
- Schema validation (if schema provided)

### JavaScript / TypeScript

Supports:

- Syntax diagnostics
- Snippet autocomplete
- Global scope completions
- Custom schema-based autocomplete
- Schema hover tooltips

---

## Language Support

**Current:** `JSON`, `JavaScript`, `TypeScript`  
**Planned:** `Python`, `HTML`, `CSS`

---

## Language Configuration

### Common Options

These options are available for all supported languages.

| Option         | Type    | Default          | Description                              |
| -------------- | ------- | ---------------- | ---------------------------------------- |
| `diagnostics`  | boolean | `true`           | Enable syntax diagnostics                |
| `gutter`       | boolean | `true`           | Show error gutter                        |
| `hover`        | boolean | `true` if schema | Enables hover tooltips from schema       |
| `autocomplete` | boolean | `true` if schema | Enable autocompletion                    |

### JSON

```tsx
<CodeEditor
    language="json"
    languageOptions={{
        json: {
            schema,
            diagnostics: true,
            gutter: true,
        },
    }}
/>
```

### JSON Options

| Option         | Type    | Default          | Description                              |
| -------------- | ------- | ---------------- | ---------------------------------------- |
| `schema`       | object  | `undefined`      | Schema for validation, completion, hover |
| `schemaLint`   | boolean | `true` if schema | Enables schema-based validation          |

### JavaScript  / TypeScript

```tsx
<CodeEditor
    language="js/ts"
    languageOptions={{
        "js/ts": {
            schema,
            diagnostics: true,
            gutter: true,
            autocomplete: true,
            jsx: true
        },
    }}
/>
```

### JavaScript / TypeScript Options

| Option         | Type           | Default          | Description                                     |
| -------------- | -------------- | ---------------- | ----------------------------------------------- |
| `schema`       | `Completion[]` | `[]`             | Custom schema used for JavaScript autocomplete  |
| `jsx`          | boolean        | `false`          | Enable JSX syntax support                       |

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
import { Themes } from 'react-codemirror-editor';
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

- HTML support
- CSS support
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
