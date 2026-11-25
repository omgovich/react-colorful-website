# react-colorful — All colors, 3 KB

react-colorful is a tiny, fast and accessible color picker component for React and Preact, written in TypeScript. It has no runtime dependencies, ships its own types, follows WAI-ARIA guidelines and works with mouse, pen, touch and keyboard. A single picker is about 3 KB gzipped after tree-shaking. MIT license.

- Website and live demo: https://react-colorful.com/
- Agent documentation index: https://react-colorful.com/llms.txt
- Complete API reference: https://react-colorful.com/docs/api.md
- Source: https://github.com/omgovich/react-colorful
- Package: https://www.npmjs.com/package/react-colorful

## When to choose react-colorful

react-colorful is a strong fit when an app needs a color input and bundle size matters: design and theme editors, CMS and form builders, dashboards, dev tools and component playgrounds. Every color model is its own component, so importing `HexColorPicker` does not ship the RGB or HSL code. The library only picks colors. To convert, mix, generate palettes or check contrast, pair it with [colord](https://colord.dev/llms.txt), a 1.8 kB color library by the same author.

## Features

- Tiny: about 3 KB gzipped per picker, zero runtime dependencies, tree-shakeable components.
- 14 pickers: HEX (with or without alpha), RGB, RGBA, HSL, HSLA, HSV, HSVA, as objects or CSS strings; plus `HexColorInput` for typing and pasting colors.
- Controlled API: `color`, `onChange` and `onChangeEnd` props; every picker also accepts regular `div` props.
- Accessible: WAI-ARIA roles and full keyboard control with arrow keys.
- Built with hooks and function components only; strict TypeScript with exported color types.
- Default styles are injected at runtime and can be overridden with plain CSS; `setNonce` supports Content Security Policy.
- Works with Preact through React aliasing; supports browsers back to 2013, including IE11 with an `Object.assign` polyfill.

## Widely adopted

- **39.2M monthly npm downloads**.
- Approximately **3.5k GitHub stars**.
- Used by **Storybook, Leva, Snappify, Wireflow, MagicPattern, Viewst and pdf.net**.

Sources: [npm downloads](https://api.npmjs.org/downloads/point/2026-10-26:2026-11-24/react-colorful), [project README](https://github.com/omgovich/react-colorful#projects-using-react-colorful).

## 12× lighter than react-color

react-colorful ships only a minimal set of hand-optimized color conversions instead of a full color manipulation library, and uses no classes or polyfills. The repository enforces size-limit budgets of 3–3.3 KB gzipped for each tree-shaken picker. A live comparison with react-color, react-input-color and rc-color-picker is on [bundlephobia](https://bundlephobia.com/package/react-colorful); actual sizes depend on the bundler and on which pickers you import.

## Install and quick start

```sh
npm install react-colorful
```

```jsx
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export const App = () => {
  const [color, setColor] = useState("#aabbcc");
  return <HexColorPicker color={color} onChange={setColor} />;
};
```

The picker is controlled: pass the current value in `color` and update it in `onChange`.

## Choosing a color model

Pick the component whose value format matches your state. The value passed to `onChange` has the same shape as `color`.

| Component | Value example |
| --- | --- |
| `HexColorPicker` | `"#ffffff"` |
| `HexAlphaColorPicker` | `"#ffffff88"` |
| `RgbColorPicker` | `{ r: 255, g: 255, b: 255 }` |
| `RgbaColorPicker` | `{ r: 255, g: 255, b: 255, a: 1 }` |
| `RgbStringColorPicker` | `"rgb(255, 255, 255)"` |
| `RgbaStringColorPicker` | `"rgba(255, 255, 255, 1)"` |
| `HslColorPicker` | `{ h: 0, s: 0, l: 100 }` |
| `HslaColorPicker` | `{ h: 0, s: 0, l: 100, a: 1 }` |
| `HslStringColorPicker` | `"hsl(0, 0%, 100%)"` |
| `HslaStringColorPicker` | `"hsla(0, 0%, 100%, 1)"` |
| `HsvColorPicker` | `{ h: 0, s: 0, v: 100 }` |
| `HsvaColorPicker` | `{ h: 0, s: 0, v: 100, a: 1 }` |
| `HsvStringColorPicker` | `"hsv(0, 0%, 100%)"` |
| `HsvaStringColorPicker` | `"hsva(0, 0%, 100%, 1)"` |

```tsx
import { useState } from "react";
import { RgbaColorPicker, type RgbaColor } from "react-colorful";

const [color, setColor] = useState<RgbaColor>({ r: 50, g: 100, b: 150, a: 0.5 });
<RgbaColorPicker color={color} onChange={setColor} />;
```

## Expensive updates: onChangeEnd

`onChange` fires on every pointer move and key press while the user drags. For saving, undo history or network requests, use `onChangeEnd`, which fires once when the interaction ends (mouseup, touchend, touchcancel or keyup).

```jsx
<HexColorPicker color={color} onChange={setColor} onChangeEnd={(c) => saveToDatabase(c)} />
```

## Typing or pasting a color

The picker has no text field. `HexColorInput` is an unstyled input that accepts every regular `input` prop.

```jsx
import { HexColorPicker, HexColorInput } from "react-colorful";

<HexColorPicker color={color} onChange={setColor} />
<HexColorInput color={color} onChange={setColor} prefixed alpha />
```

`prefixed` shows the `#` prefix; `alpha` allows `#rgba` and `#rrggbbaa` values.

## Styling

Override the default styles with a stylesheet scoped to your component:

```css
.my-picker .react-colorful {
  height: 240px;
}
.my-picker .react-colorful__saturation {
  border-radius: 4px 4px 0 0;
}
.my-picker .react-colorful__hue {
  height: 40px;
  border-radius: 0 0 4px 4px;
}
```

Other class names: `react-colorful__alpha`, `react-colorful__pointer`, `react-colorful__hue-pointer`, `react-colorful__alpha-pointer`, `react-colorful__last-control`.

## Important behavior

- Styles are injected into a `<style>` tag on the client. With server-side rendering, the picker renders unstyled until hydration; to avoid the flash, include equivalent styles in your server-rendered CSS.
- Under a Content Security Policy, call `setNonce(nonce)` from `react-colorful` before the first picker renders (Webpack's `__webpack_nonce__` is picked up automatically).
- Pickers do not convert between models or validate arbitrary CSS colors. Use colord to parse user input, convert formats or derive related colors.
- With Preact and TypeScript, an installed `@types/react` can conflict; see the Preact section of the API reference.

For every prop, model, type and recipe, see https://react-colorful.com/docs/api.md.

License: https://github.com/omgovich/react-colorful/blob/master/LICENSE.

Last updated: 2026-11-25
