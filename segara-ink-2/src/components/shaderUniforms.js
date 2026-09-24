// Segara Ink palette: ink black -> deep teal -> tide -> bright turquoise core
const BASE_COLORS = [
  [0.027, 0.059, 0.078], // #070f14 ink
  [0.039, 0.290, 0.322], // #0a4a52 deep teal
  [0.055, 0.486, 0.525], // #0e7c86 tide
  [0.090, 0.722, 0.675], // #17b8ac tide-bright
  [0.090, 0.722, 0.675],
  [0.090, 0.722, 0.675],
  [0.090, 0.722, 0.675],
  [0.090, 0.722, 0.675],
]

// Punchy close-up look, used locally behind the Hero copy.
export const HERO_UNIFORMS = {
  colors: BASE_COLORS,
  colorCount: 4,
  scale: 0.5,
  intensity: 0.73,
  paramA: 0.39,
  warp: 0.246,
  detail: 3.552,
  contrast: 1.25,
  brightness: -0.05,
  saturation: 0.95,
  hue: 0.0,
  vignette: 1.0,
  blur: 0.0, // disabled: blur>0 makes the fragment shader run shade() 5x per pixel
  grain: 0.06,
  seed: 3505.0,
  rotate: 2.6005,
  offsetX: -0.01,
  offsetY: -0.02,
  drift: 0.076,
  timeScale: 0.518,
}

// Wide, dim, slow-drifting wash — sits fixed behind the whole site (see
// Layout.jsx), so it needs to read as an ambient ink diffusion rather than a
// focal blob: bigger scale, lower brightness/contrast, much slower time
// evolution since it's on screen continuously, not just for one section.
export const AMBIENT_UNIFORMS = {
  ...HERO_UNIFORMS,
  scale: 0.7,
  // Both the wob (intensity) and warp terms run the same low-octave fbm,
  // which reads as faceted/rectangular rather than smooth once it's the
  // dominant shape on screen (fine as a small accent behind Hero's copy,
  // not fine stretched across a whole calm page) — keep both low so the
  // ambient wash stays a soft drifting glow instead of "torn paper".
  intensity: 0.12,
  warp: 0.03,
  detail: 2.0,
  contrast: 0.8,
  // Note: u_vignette only darkens *outside* ~35% of the frame's diagonal —
  // it can't dim the center, so the center has to be dark on its own.
  // text-foam-dim body copy needs real contrast against this everywhere,
  // not just at the hero's oversized white headline, hence brightness/
  // saturation pulled down hard here vs. HERO_UNIFORMS.
  brightness: -0.35,
  saturation: 0.6,
  vignette: 0.9,
  grain: 0.05,
  seed: 3505.0,
  rotate: 2.6005,
  offsetX: -0.01,
  offsetY: -0.02,
  drift: 0.04,
  timeScale: 0.18,
}
