import { colord, extend, type Colord } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export type RGB = [number, number, number];

const toRgb = (c: Colord): RGB => {
  const { r, g, b } = c.toRgb();
  return [r / 255, g / 255, b / 255];
};

/**
 * 3×3 mesh palette derived from a single color (row-major, top-left first).
 * Hue shifts stay within ±35° so dark colors don't turn muddy;
 * white mixing is kept light so the gradient stays juicy.
 */
export const meshPalette = (color: string): RGB[] => {
  const c = colord(color);
  return [
    c.rotate(-30).saturate(0.05),
    c.mix("#fff", 0.15),
    c.rotate(30).saturate(0.05),
    c.rotate(-15),
    c,
    c.rotate(20),
    c.rotate(-30).darken(0.05),
    c.rotate(15),
    c.rotate(35).mix("#fff", 0.08),
  ].map(toRgb);
};

export const hexPalette = (colors: string[]): RGB[] => colors.map((c) => toRgb(colord(c)));

export const isLight = (color: string) => colord(color).isLight();
