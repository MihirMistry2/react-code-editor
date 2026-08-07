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
- JavaScript, TypeScript & HTML support
- Diagnostics, autocomplete & validation
- Powerful search
- Controller API
- Built-in light & dark themes
- Fully customizable themes
- Configurable editor options
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

Optional (HTML support):

```bash
npm install @codemirror/lang-html
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

### HTML

```tsx
import { CodeEditor } from 'react-codemirror-editor';

export function Example() {
    return <CodeEditor language="html" defaultValue="<h1>Hello World</h1>" />;
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
- Custom schema-based autocomplete
- Schema hover tooltips

### HTML

Supports:

- Syntax diagnostics
- HTML tag autocomplete
- HTML attribute autocomplete

---

## Language Support

**Current:** `JSON`, `JavaScript`, `TypeScript`, `HTML`  
**Planned:** `Python`, `CSS`

---

## Language Configuration

### Common Options

These options are available for all supported languages.

| Option         | Type    | Default          | Description                              |
| -------------- | ------- | ---------------- | ---------------------------------------- |
| `diagnostics`  | boolean | `true`           | Enable syntax diagnostics                |
| `gutter`       | boolean | `true`           | Show error gutter                        |
| `autocomplete` | boolean | `true`           | Enable language-specific autocomplete.   |

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
| `hover`        | boolean | `true` if schema | Enables hover tooltips from schema       |

### JavaScript  / TypeScript

```tsx
<CodeEditor
    language="ts"
    languageOptions={{
        "ts": {
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
| `hover`        | boolean        | `true` if schema | Enables hover tooltips from schema              |
| `jsx`          | boolean        | `false`          | Enable JSX syntax support                       |

### HTML

```tsx
<CodeEditor
    language="html"
    languageOptions={{
        html: {
            diagnostics: true,
            gutter: true,
            autocomplete: true,
        },
    }}
/>
```

> Without a schema, syntax diagnostics still work.

---

## Read Only

```tsx
<CodeEditor language="json" value={json} readOnly={true} />
```

---

## Editor Options

Configure the editor experience with a set of customizable editor options.

```tsx
<CodeEditor
    language="json"
    editorOptions={{
        line_wrapping: true,
        indent_unit: 4,
        indent_with_tab: true,
        ...
    }}
/>
```

### Available Options

| Option | Type | Default | Description |
| ------- | ---- | :-----: | ----------- |
| `line_numbers` | `boolean` | `true` | Display line numbers. |
| `line_wrapping` | `boolean` | `false` | Wrap long lines instead of enabling horizontal scrolling. |
| `highlight_active_line` | `boolean` | `true` | Highlight the active line. |
| `highlight_selection_matches` | `boolean` | `true` | Highlight all occurrences of the current selection. |
| `fold_gutter` | `boolean` | `true` | Display the code folding gutter and enable code folding. |
| `bracket_matching` | `boolean` | `true` | Highlight matching brackets while the cursor is adjacent to them. |
| `auto_close_brackets` | `boolean` | `true` | Automatically insert matching brackets and quotes while typing. |
| `indent_on_input` | `boolean` | `true` | Automatically re-indent lines as you type. |
| `indent_with_tab` | `boolean` | `true` | Allow the <kbd>Tab</kbd> key to indent the current line or selected lines. |
| `indent_unit` | `number` | `2` | Number of spaces used for indentation when tabs are disabled. |
| `allow_multiple_selections` | `boolean` | `true` | Enable multiple cursors and selections using <kbd>Ctrl/Cmd + D</kbd>. |

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

| Category  | Themes                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Light** | `light`, `ayu_light`, `clouds_light`, `espresso_light`, `noctis_lilac_light`, `rose_pine_dawn_light`, `smoothy_light`, `tomorrow_light` |
| **Dark**  | `dark`, `barf_dark`, `cobalt_dark`, `cool_glow_dark`, `dracula_dark`                                                                    |

### Custom Theme

Create a custom editor theme using a simple configuration object.

```tsx
const customTheme = {
    dark: true,
    colors: {
        background: '#1b1414',
        foreground: '#f2eaea',
        cursor: '#ff6b6b',
        selection: '#5a2424',
        activeLineBackground: '#2b1c1c',
    },
    syntax: {
        keyword: '#ff6b81',
        string: '#ffb86c',
        function: '#ff8a65',
        comment: '#8c6b6b',
    },
};

<CodeEditor theme={customTheme} />
```

### Theme Options

| Section      | Options |
| ------------ | ------- |
| **General**  | `dark` |
| **Colors**   | `background`, `foreground`, `cursor`, `selection`, `gutterBackground`, `gutterForeground`, `lineNumber`, `activeLineNumber`, `activeLineBackground`, `activeLineGutter` |
| **Syntax**   | `keyword`, `string`, `number`, `comment`, `variable`, `function`, `property`, `type`, `class`, `tag`, `attribute`, `operator`, `punctuation` |

---

## Architecture

- Modular & composable
- Optional diagnostics, hover, completion, search
- Language extensions isolated per configuration
- Designed for extensibility

---

## Roadmap

- CSS support
- Python support

---

## License

MIT License © 2025 Mihir Mistry

---

## Acknowledgements

Some themes are inspired by
[Thememirror](https://github.com/vadimdemedes/thememirror)
by Vadim Demedes (MIT License).
