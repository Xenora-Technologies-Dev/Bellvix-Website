/** Light app palette used inside the dark device frames. All data in mockups is synthetic. */
export const C = {
  bg: '#F4F5F7',
  panel: '#FFFFFF',
  stroke: '#E3E5EA',
  ink: '#15171C',
  sub: '#6B7080',
  faint: '#9AA0AE',
  teal: '#0E9F9A',
  cyan: '#2EE6D6',
  lime: '#B5CF45',
  limeSoft: '#EEF5D2',
  tealSoft: '#DDF5F3',
  dark: '#111114',
  red: '#E5484D',
  redSoft: '#FDECEC',
  amber: '#E39A1B',
  amberSoft: '#FDF3E1',
  blue: '#3B82F6',
  blueSoft: '#E6EFFE',
  violet: '#8B5CF6',
}

/** Smooth path through points (Catmull-Rom → Bezier). */
export function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`
  }
  return d
}

