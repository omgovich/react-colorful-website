"use client";

import { useMemo, useState, type ReactNode } from "react";
import { HexColorPicker } from "react-colorful";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import { CopyButton } from "./CopyButton";

extend([mixPlugin, a11yPlugin]);

const INK = "#0b0b0f";

const grade = (ratio: number) =>
  ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";

const useTheme = (color: string) =>
  useMemo(() => {
    const c = colord(color);
    const light = c.isLight();
    const hover = c.darken(0.1);
    // Pick the button text by contrast against the button itself (the hover
    // shade), not by isLight() of the picked color: near the threshold the two
    // disagree and the text becomes hard to read.
    const round = (n: number) => Math.round(n * 100) / 100;
    const onWhite = round(hover.contrast("#fff"));
    const onInk = round(hover.contrast(INK));
    const whiteText = onWhite >= onInk;
    const contrast = Math.max(onWhite, onInk);
    return {
      light,
      text: whiteText ? "#fff" : INK,
      whiteText,
      onWhite,
      onInk,
      contrast,
      grade: grade(contrast),
      pageBg: c.mix("#fff", 0.93).toHex(),
      tagBg: c.mix("#fff", 0.86).toHex(),
      // Light colors need a deeper shade to stay readable on their own tint
      tagText: c.darken(light ? 0.4 : 0.18).toHex(),
      hover: hover.toHex(),
      soft: c.lighten(0.3).alpha(0.4).toRgbString(),
      softText: c.darken(light ? 0.42 : 0.22).toHex(),
      swatches: [
        ...c.tints(5).slice(1, 4).reverse(),
        c,
        ...c.shades(5).slice(1, 4),
      ].map((x) => x.toHex()),
    };
  }, [color]);

/** Code chip: method names get the accent, arguments stay ink. */
const Call = ({ name, args, hint }: { name: string; args: string; hint?: string }) => (
  <code className="call">
    .<span className="call-name">{name}</span>
    {args}
    {hint && <span className="call-hint">{hint}</span>}
  </code>
);

const Note = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`note ${className}`} aria-hidden>
    <span className="note-line" />
    <span className="note-pill">{children}</span>
  </span>
);

const notes = {
  tag: <Call name="mix" args={'("#fff", 0.86)'} />,
  swatches: (
    <code className="call">
      .<span className="call-name">tints</span>() + .<span className="call-name">shades</span>()
    </code>
  ),
  hover: <Call name="darken" args="(0.1)" hint="  on hover" />,
  soft: (
    <code className="call">
      .<span className="call-name">lighten</span>(0.3).<span className="call-name">alpha</span>(0.4)
    </code>
  ),
  page: <Call name="mix" args={'("#fff", 0.93)'} />,
};

export function ColordSection() {
  const [color, setColor] = useState("#21b548");
  const t = useTheme(color);

  return (
    <section id="colord" className="section colord">
      <div className="colord-head">
        <p className="kicker">react-colorful + colord</p>
        <h2 className="h2 colord-title">
          One color in.
          <br />A whole theme out.
        </h2>
        <p className="lead colord-lead">
          Pick it with react-colorful. Derive hover states, tints and readable text with colord — a 1.8 KB sibling
          with the same no-deps attitude.
        </p>
        <div className="colord-links">
          <a className="pill pill--dark" href="https://colord.dev" target="_blank" rel="noreferrer">
            Explore colord
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
          <CopyButton value="npm i colord" className="pill pill--outline" label="Copy colord install command">
            <code>$ npm i colord</code>
          </CopyButton>
        </div>
      </div>

      <div className="theme-stage">
        <div className="picker picker--colord">
          <HexColorPicker color={color} onChange={setColor} aria-label="Pick a theme color" />
        </div>

        <div className="flow" aria-hidden>
          <code>colord(color)</code>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>

        <div className="demo">
          <div className="app-window" role="img" aria-label={`Example app themed with ${color}`}>
            <div className="app-chrome">
              <i /><i /><i />
              <span className="app-url">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                acme.app/settings
              </span>
            </div>
            <div className="app-body" style={{ background: t.pageBg }}>
              <div className="app-card">
                <div className="row">
                  <span className="app-tag" style={{ background: t.tagBg, color: t.tagText }}>
                    New
                  </span>
                  {/* The tag is short, so its line starts right at the tag */}
                  <span className="note-lead" aria-hidden />
                  <Note className="note--from-row">{notes.tag}</Note>
                </div>
                <p className="app-title">Appearance</p>
                <p className="app-text">Pick an accent color for your workspace. Everything else follows.</p>
                <div className="row">
                  <div className="app-swatches">
                    <span className="app-label">Accent</span>
                    {t.swatches.map((hex, i) => (
                      <span key={i} className="app-swatch" data-base={i === 3 || undefined} style={{ background: hex }} />
                    ))}
                  </div>
                  <Note>{notes.swatches}</Note>
                </div>
                <div className="row">
                  <span className="app-button" style={{ background: t.hover, color: t.text }}>
                    Save changes
                    <svg className="app-cursor" width="20" height="24" viewBox="0 0 20 24" aria-hidden>
                      {/* Classic "pointing hand" cursor: white glove, dark outline */}
                      <path
                        d="M6 3C6 2.2 6.7 1.5 7.5 1.5S9 2.2 9 3v6.6c0-.8.7-1.5 1.5-1.5S12 8.8 12 9.6v.6c0-.8.7-1.5 1.5-1.5S15 9.4 15 10.2v.8c0-.8.7-1.5 1.5-1.5S18 10.2 18 11v4c0 1.6-.4 2.7-1 3.8-.6 1.1-1.1 2.2-1.4 3.7H8c-.3-1.5-.9-2.6-2-3.9L2.4 14c-.6-.7-.6-1.7 0-2.3.7-.7 1.8-.6 2.4.1L6 13.2Z"
                        fill="#fff"
                        stroke="#0b0b0f"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                      <path d="M9 9.6V14M12 10.2V14M15 11v3" stroke="#0b0b0f" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </span>
                  <Note>{notes.hover}</Note>
                </div>
                <div className="row">
                  <span className="app-button app-button--soft" style={{ background: t.soft, color: t.softText }}>
                    Reset to default
                  </span>
                  <Note>{notes.soft}</Note>
                </div>
              </div>
              <Note className="note--page">{notes.page}</Note>
            </div>
          </div>

          <div className="checks">
            <span className="check">
              <code className="call">
                .<span className="call-name">darken</span>(0.1).<span className="call-name">contrast</span>(
                {t.whiteText ? '"#fff"' : '"#0b0b0f"'}) {t.contrast.toFixed(2)}
                <span className="call-hint"> → {t.whiteText ? "white" : "dark"} text</span>
              </code>
              <span className="badge" data-grade={t.grade}>
                {t.grade}
              </span>
            </span>
          </div>

          {/* Narrow screens: the same notes as a list instead of callouts */}
          <ul className="notes-list">
            {Object.entries(notes).map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
