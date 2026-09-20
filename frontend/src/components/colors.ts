// Sequential ramp used by the seniority matrix, and the ink that stays readable on any fill.

// Pure white and black: between them every fill reaches 4.5:1, which the page's cream and base ink do not.
const INK = '#ffffff'
const BASE = '#000000'

type Rgb = [number, number, number]

const RAMP_LOW: Rgb = [0x1b, 0x25, 0x54]
const RAMP_HIGH: Rgb = [0x9d, 0xaf, 0xff]

function toLinear(channel: number): number {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance([r, g, b]: Rgb): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function parseHex(hex: string): Rgb {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb
}

function contrast(a: Rgb, b: Rgb): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Colour for a value between 0 (low) and 1 (high). */
export function rampColor(t: number): string {
  const clamped = Math.min(1, Math.max(0, t))
  const [r, g, b] = RAMP_LOW.map((low, i) => Math.round(low + (RAMP_HIGH[i] - low) * clamped))
  return `rgb(${r} ${g} ${b})`
}

/** Light or dark ink, whichever has more contrast on the given rgb() fill. */
export function readableInk(fill: string): string {
  const rgb = (fill.match(/\d+/g) ?? ['0', '0', '0']).slice(0, 3).map(Number) as Rgb
  return contrast(parseHex(INK), rgb) >= contrast(parseHex(BASE), rgb) ? INK : BASE
}
