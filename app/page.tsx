import { Hero } from "@/components/Hero";
import { ColorModels } from "@/components/ColorModels";
import { ColordSection } from "@/components/ColordSection";
import { CopyButton } from "@/components/CopyButton";
import { MeshGradient } from "@/components/MeshGradient";
import { hexPalette } from "@/lib/palette";
import { links } from "@/lib/links";

const stats = [
  ["3.1 KB", "gzipped, the whole thing"],
  ["0", "dependencies"],
  ["100%", "test coverage, strict TS"],
  ["14", "color models out of the box"],
];

const features = [
  ["Accessible", "WAI-ARIA roles, full keyboard control", "M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 8l8 1 8-1M12 9v6m0 0-3 7m3-7 3 7"],
  ["Touch-ready", "Works with mouse, pen and fingers", "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 16h.01"],
  ["Tree-shakeable", "Ship only the picker you import", "M12 22v-6M8 16h8l-4-6h3L12 5l-3 5h3l-4 6Z"],
  ["Typed", "Strict TypeScript, types included", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4"],
];

const users = [
  ["Storybook", "https://storybook.js.org"],
  ["pdf.net", "https://pdf.net"],
  ["Leva", "https://github.com/pmndrs/leva"],
  ["Snappify", "https://snappify.com"],
  ["Wireflow", "https://wireflow.co"],
  ["MagicPattern", "https://www.magicpattern.design"],
  ["Viewst", "https://viewst.com"],
];

const footerPalette = hexPalette([
  "#FFB800", "#FF6A3D", "#FF2E88",
  "#FF8A00", "#FF3D6E", "#B620E0",
  "#FF4D4D", "#E0218A", "#5B2BFF",
]);

export default function Page() {
  return (
    <>
      <Hero />

      <main>
        <section id="used-by" className="section users">
          <p className="kicker">Trusted by teams at</p>
          <ul className="users-row">
            {users.map(([name, href]) => (
              <li key={name}>
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="stats" className="section stats">
          <div className="section-head split">
            <h2 className="h2">
              Small enough to forget
              <br />
              it&apos;s even there.
            </h2>
            <p className="lead">
              12× lighter than react-color. Hand-tuned color math, hooks only, no classes and no polyfills.
            </p>
          </div>
          <dl className="stats-row">
            {stats.map(([value, label]) => (
              <div key={value} className="stat">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="color-models" className="section models">
          <div className="section-head">
            <p className="kicker">Supported color models</p>
            <h2 className="h2">
              HEX, RGB, HSL, HSV.
              <br />
              With or without alpha.
            </h2>
          </div>
          <ColorModels />
        </section>

        <section id="code" className="section code">
          <div className="code-copy">
            <h2 className="h2">
              Three lines.
              <br />
              That&apos;s the API.
            </h2>
            <ul className="features">
              {features.map(([title, desc, d]) => (
                <li key={title}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={d} />
                  </svg>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="code-stage">
            <div className="code-card">
              <div className="code-bar">
                <i /><i /><i />
                <span>App.jsx</span>
              </div>
              <pre>
                <code>
                  <K>import</K> {"{ HexColorPicker } "}<K>from</K> <S>&quot;react-colorful&quot;</S>;{"\n\n"}
                  <K>export const</K> <F>App</F> = () =&gt; {"{"}{"\n"}
                  {"  "}<K>const</K> [color, setColor] = <F>useState</F>(<S>&quot;#21d4fd&quot;</S>);{"\n"}
                  {"  "}<K>return</K> <G>&lt;</G><F>HexColorPicker</F> color<G>={"{"}color{"}"}</G> onChange<G>={"{"}setColor{"}"} /&gt;</G>;{"\n"}
                  {"};"}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <ColordSection />
      </main>

      <footer id="footer" className="footer">
        <MeshGradient colors={footerPalette} className="mesh" />
        <div className="footer-top">
          <h2 className="footer-title">
            Every color is
            <br />
            one install away
          </h2>
          <div className="hero-actions">
            <CopyButton value="npm i react-colorful" className="pill pill--dark" label="Copy install command">
              <code>$ npm i react-colorful</code>
            </CopyButton>
            <a className="pill pill--light" href={links.github} target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>MIT License · Made by Vlad Shilov</span>
          <span>
            Also:{" "}
            <a href="https://github.com/web-padawan/vanilla-colorful" target="_blank" rel="noreferrer">vanilla-colorful</a> ·{" "}
            <a href="https://github.com/fil0157/angular-colorful" target="_blank" rel="noreferrer">angular-colorful</a>
          </span>
        </div>
      </footer>
    </>
  );
}

const K = ({ children }: { children: React.ReactNode }) => <span className="t-k">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="t-s">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="t-f">{children}</span>;
const G = ({ children }: { children: React.ReactNode }) => <span className="t-g">{children}</span>;
