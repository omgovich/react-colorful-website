"use client";

import { useState, type ComponentType } from "react";
import { colord } from "colord";
import {
  HexColorPicker,
  HslColorPicker,
  HsvaStringColorPicker,
  RgbaColorPicker,
  type HslColor,
  type RgbaColor,
} from "react-colorful";

type PickerProps<T> = { color: T; onChange: (c: T) => void };

function Model<T extends string | object>({
  name,
  Picker,
  initial,
  format,
}: {
  name: string;
  Picker: ComponentType<PickerProps<T>>;
  initial: T;
  format: (c: T) => string;
}) {
  const [color, setColor] = useState<T>(initial);
  const glow = colord(color as never).alpha(0.7).toRgbString();

  return (
    <figure className="model">
      <div className="model-stage">
        <span className="glow" style={{ background: glow }} aria-hidden />
        <div className="picker picker--model">
          <Picker color={color} onChange={setColor} />
        </div>
      </div>
      <figcaption>
        <code className="model-name">{`<${name} />`}</code>
        <code className="model-value">{format(color)}</code>
      </figcaption>
    </figure>
  );
}

const round = (n: number, d = 0) => Math.round(n * 10 ** d) / 10 ** d;

export function ColorModels() {
  return (
    <div className="models-grid">
      <Model name="HexColorPicker" Picker={HexColorPicker} initial="#2ebee6" format={(c) => JSON.stringify(c)} />
      <Model<RgbaColor>
        name="RgbaColorPicker"
        Picker={RgbaColorPicker}
        initial={{ r: 224, g: 170, b: 34, a: 0.8 }}
        format={(c) => `{ r: ${c.r}, g: ${c.g}, b: ${c.b}, a: ${round(c.a, 2)} }`}
      />
      <Model<HslColor>
        name="HslColorPicker"
        Picker={HslColorPicker}
        initial={{ h: 145, s: 68, l: 53 }}
        format={(c) => `{ h: ${round(c.h)}, s: ${round(c.s)}, l: ${round(c.l)} }`}
      />
      <Model
        name="HsvaStringColorPicker"
        Picker={HsvaStringColorPicker}
        initial="hsva(268, 80%, 90%, 1)"
        format={(c) => JSON.stringify(c)}
      />
    </div>
  );
}
