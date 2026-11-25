"use client";

import { useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { MeshGradient } from "./MeshGradient";
import { CopyButton } from "./CopyButton";
import { Nav } from "./Nav";
import { isLight, meshPalette } from "@/lib/palette";

const INITIAL = "#ed2f7e";

export function Hero() {
  const [color, setColor] = useState(INITIAL);
  const palette = useMemo(() => meshPalette(color), [color]);
  const tone = isLight(color) ? "light" : "dark";

  return (
    <header id="hero" className="hero" data-tone={tone}>
      <MeshGradient colors={palette} className="mesh" />
      <Nav />
      <div className="hero-body">
        <div className="hero-head">
          <h1 className="hero-title">
            All colors, 3 KB
          </h1>
          <p className="hero-sub">A tiny, fast and accessible color picker for React and Preact.</p>
        </div>

        <div className="picker picker--hero">
          <HexColorPicker color={color} onChange={setColor} aria-label="Pick a color for this page" />
        </div>

        <div className="hero-actions">
          <CopyButton value="npm i react-colorful" className="pill pill--dark" label="Copy install command">
            <code>$ npm i react-colorful</code>
          </CopyButton>
          <CopyButton value={color} className="pill pill--light" label={`Copy ${color}`}>
            <span className="swatch" style={{ background: color }} />
            <code>{color.toUpperCase()}</code>
          </CopyButton>
        </div>
      </div>
    </header>
  );
}
