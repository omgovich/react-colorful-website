"use client";

import { useEffect, useRef } from "react";
import type { RGB } from "@/lib/palette";

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Nine color points sit on a 3×3 grid and slowly orbit around their home
// positions; each pixel is an inverse-distance blend of them.
const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_colors[9];

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float t = u_time;
  uv += 0.075 * vec2(sin(uv.y * 3.1 + t * 0.35), cos(uv.x * 2.7 + t * 0.28));

  float aspect = sqrt(u_res.x / u_res.y);
  vec3 col = vec3(0.0);
  float sum = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    vec2 home = vec2(mod(fi, 3.0) * 0.5, floor(fi / 3.0) * 0.5);
    vec2 p = home + 0.24 * vec2(
      sin(t * (0.19 + fi * 0.031) + fi * 1.7),
      cos(t * (0.15 + fi * 0.027) + fi * 2.3)
    );
    vec2 d = uv - p;
    d.x *= aspect;
    float w = 1.0 / pow(dot(d, d) + 0.004, 2.3);
    col += u_colors[i] * w;
    sum += w;
  }
  col /= sum;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 128.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

// The shader starts at this time; the CSS fallback below freezes the points
// at the same moment so the hand-off from CSS to WebGL is seamless.
const START_TIME = 12;

// How fast the color points drift; 1 is the original calm pace.
const SPEED = 1.8;

const pointAt = (i: number, t: number): [number, number] => [
  (i % 3) * 0.5 + 0.24 * Math.sin(t * (0.19 + i * 0.031) + i * 1.7),
  Math.floor(i / 3) * 0.5 + 0.24 * Math.cos(t * (0.15 + i * 0.027) + i * 2.3),
];

const rgb = ([r, g, b]: RGB, a = 1) =>
  `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)} / ${a})`;

/** A CSS approximation of the shader's first frame, rendered on the server. */
const cssMesh = (colors: RGB[]) =>
  colors
    .map((c, i) => {
      const [x, y] = pointAt(i, START_TIME);
      return `radial-gradient(60% 75% at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, ${rgb(c)}, ${rgb(c, 0)})`;
    })
    .concat(rgb(colors[4]))
    .join(", ");

type Props = {
  colors: RGB[];
  className?: string;
};

export function MeshGradient({ colors, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef<RGB[]>(colors);
  target.current = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uColors = gl.getUniformLocation(program, "u_colors");

    // The gradient is soft, so rendering below native resolution is invisible
    // and much cheaper.
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 1) * 0.5;
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const current = target.current.map((c) => [...c] as RGB);
    const flat = new Float32Array(27);
    let visible = true;
    let raf = 0;
    let time = 0;
    let last = performance.now();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    function frame(now: number) {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!reduceMotion.matches) time += dt * SPEED;

      // Ease toward the target palette: fast enough to feel live while
      // dragging, smooth enough to hide jumps.
      const k = 1 - Math.pow(0.0001, dt);
      target.current.forEach((t, i) => {
        for (let j = 0; j < 3; j++) {
          current[i][j] += (t[j] - current[i][j]) * k;
          flat[i * 3 + j] = current[i][j];
        }
      });

      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, time + START_TIME);
      gl!.uniform3fv(uColors, flat);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      canvas!.dataset.ready = "";
      if (visible) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    // Blending averages colors toward gray; the saturate filter pushes them back
    // up for both the CSS fallback and the WebGL canvas inside.
    <div className={className} style={{ background: cssMesh(colors), filter: "saturate(1.08)" }} aria-hidden>
      <canvas ref={canvasRef} className="mesh-canvas" />
    </div>
  );
}
