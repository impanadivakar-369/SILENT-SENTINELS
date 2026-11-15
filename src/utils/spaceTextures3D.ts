import * as THREE from 'three';

/**
 * Software WebGL detection from the GPU renderer string (Three.js skill standard).
 * Used strictly for rendering cost (pixel ratio, antialiasing, shadow map, frame pacing)
 * while preserving 100% identical scene objects, geometry detail, and layout.
 */
export const isSoftwareGl: boolean = (() => {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return false;
    }
    const gpu = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
})();

/**
 * Deterministic pseudo-random generator for consistent realistic planetary features
 */
function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

let cachedMoonTextures: { colorMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
let cachedMarsTextures: { colorMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
let cachedGoldFoilBump: THREE.CanvasTexture | null = null;
let cachedSolarPanelMap: THREE.CanvasTexture | null = null;

/**
 * Generates realistic high-detail Lunar surface albedo + crater bump textures
 * including Mare Tranquillitatis, Oceanus Procellarum, Mare Imbrium, Mare Crisium,
 * and rayed craters (Tycho, Copernicus).
 */
export function getLunarTextures(maxAnisotropy = 4): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  if (cachedMoonTextures) return cachedMoonTextures;

  const width = 1024;
  const height = 512;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d')!;

  // Base lunar highland regolith tone
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#9FA6B0');
  baseGrad.addColorStop(0.25, '#B2B8C2');
  baseGrad.addColorStop(0.5, '#BCC2CC');
  baseGrad.addColorStop(0.75, '#AEB4BE');
  baseGrad.addColorStop(1, '#989FA8');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  const rand = seededRandom(19690720);

  // Subtle multi-scale regolith mottling
  for (let i = 0; i < 1600; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = 4 + rand() * 32;
    const shade = 150 + Math.floor(rand() * 55);
    ctx.fillStyle = `rgba(${shade}, ${shade + 2}, ${shade + 6}, 0.08)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Authentic Lunar Maria (dark basaltic lava plains on the near side)
  const mariaRegions = [
    // Oceanus Procellarum
    { x: width * 0.34, y: height * 0.46, rx: 135, ry: 105, rot: -0.2, alpha: 0.58 },
    // Mare Imbrium
    { x: width * 0.44, y: height * 0.31, rx: 85, ry: 68, rot: 0.1, alpha: 0.62 },
    // Mare Serenitatis
    { x: width * 0.56, y: height * 0.34, rx: 58, ry: 50, rot: 0.15, alpha: 0.6 },
    // Mare Tranquillitatis (Apollo 11 Eagle landing site!)
    { x: width * 0.61, y: height * 0.47, rx: 68, ry: 52, rot: -0.1, alpha: 0.64 },
    // Mare Fecunditatis
    { x: width * 0.69, y: height * 0.54, rx: 48, ry: 42, rot: 0.25, alpha: 0.54 },
    // Mare Crisium
    { x: width * 0.72, y: height * 0.37, rx: 36, ry: 28, rot: 0, alpha: 0.65 },
    // Mare Nubium & Mare Humorum
    { x: width * 0.43, y: height * 0.62, rx: 65, ry: 48, rot: 0.12, alpha: 0.52 }
  ];

  for (const mare of mariaRegions) {
    ctx.save();
    ctx.translate(mare.x, mare.y);
    ctx.rotate(mare.rot);
    const g = ctx.createRadialGradient(0, 0, 8, 0, 0, mare.rx);
    g.addColorStop(0, `rgba(68, 73, 82, ${mare.alpha})`);
    g.addColorStop(0.65, `rgba(76, 82, 92, ${mare.alpha * 0.8})`);
    g.addColorStop(1, 'rgba(90, 96, 106, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, mare.rx, mare.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Slightly smoother low-elevation basin in bump map
    bCtx.save();
    bCtx.translate(mare.x, mare.y);
    bCtx.rotate(mare.rot);
    bCtx.fillStyle = 'rgba(95, 95, 95, 0.35)';
    bCtx.beginPath();
    bCtx.ellipse(0, 0, mare.rx * 0.9, mare.ry * 0.9, 0, 0, Math.PI * 2);
    bCtx.fill();
    bCtx.restore();
  }

  // Hundreds of realistic impact craters with subtle natural selenographic rims & depressed floors
  for (let i = 0; i < 380; i++) {
    const cx = rand() * width;
    const cy = 25 + rand() * (height - 50);
    const radius = 1.5 + Math.pow(rand(), 4) * 14;

    // Color crater rim & shadow bowl
    const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.1);
    rimGrad.addColorStop(0, 'rgba(62, 66, 74, 0.26)');
    rimGrad.addColorStop(0.78, 'rgba(205, 212, 222, 0.16)');
    rimGrad.addColorStop(1, 'rgba(160, 166, 176, 0)');
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Bump crater rim (white) + bowl (dark)
    const bumpGrad = bCtx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.1);
    bumpGrad.addColorStop(0, 'rgba(55, 55, 55, 0.6)');
    bumpGrad.addColorStop(0.8, 'rgba(215, 215, 215, 0.6)');
    bumpGrad.addColorStop(1, 'rgba(128, 128, 128, 0)');
    bCtx.fillStyle = bumpGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2);
    bCtx.fill();
  }

  // Prominent Ray Craters (Tycho in southern highlands, Copernicus in Imbrium/Procellarum)
  const rayCraters = [
    { x: width * 0.47, y: height * 0.76, r: 16, rays: 18 },
    { x: width * 0.41, y: height * 0.43, r: 14, rays: 14 },
    { x: width * 0.33, y: height * 0.46, r: 10, rays: 10 }
  ];

  for (const rc of rayCraters) {
    for (let rIdx = 0; rIdx < rc.rays; rIdx++) {
      const angle = (rIdx / rc.rays) * Math.PI * 2 + rand() * 0.25;
      const len = rc.r * (4 + rand() * 6);
      ctx.strokeStyle = 'rgba(232, 238, 246, 0.22)';
      ctx.lineWidth = 1.5 + rand() * 2;
      ctx.beginPath();
      ctx.moveTo(rc.x + Math.cos(angle) * rc.r, rc.y + Math.sin(angle) * rc.r);
      ctx.lineTo(rc.x + Math.cos(angle) * len, rc.y + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(240, 244, 250, 0.7)';
    ctx.beginPath();
    ctx.arc(rc.x, rc.y, rc.r * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = maxAnisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.anisotropy = maxAnisotropy;

  cachedMoonTextures = { colorMap, bumpMap };
  return cachedMoonTextures;
}

/**
 * Generates realistic high-detail Martian surface albedo + topographic bump map
 * including rusty iron-oxide plains, Syrtis Major & Acidalia dark basalt,
 * Valles Marineris canyon system, Tharsis volcanoes, and polar ice caps.
 */
export function getMarsTextures(maxAnisotropy = 4): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  if (cachedMarsTextures) return cachedMarsTextures;

  const width = 1024;
  const height = 512;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d')!;

  // Base Martian iron-oxide ochre/terracotta gradient
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#D8A888');
  baseGrad.addColorStop(0.18, '#B85330');
  baseGrad.addColorStop(0.45, '#C9633B');
  baseGrad.addColorStop(0.55, '#BE5632');
  baseGrad.addColorStop(0.82, '#A24324');
  baseGrad.addColorStop(1, '#D8B49A');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  const rand = seededRandom(19970704);

  // Dusty ochre and rust wind-streak variations
  for (let i = 0; i < 1400; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const rx = 12 + rand() * 55;
    const ry = 4 + rand() * 18;
    const isLight = rand() > 0.45;
    ctx.fillStyle = isLight ? 'rgba(232, 146, 98, 0.08)' : 'rgba(115, 42, 22, 0.09)';
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, (rand() - 0.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dark basaltic albedo features (Syrtis Major, Acidalia Planitia, Meridiani, Terra Sirenum)
  const darkFeatures = [
    { x: width * 0.68, y: height * 0.48, rx: 75, ry: 95, rot: 0.2, alpha: 0.52 }, // Syrtis Major
    { x: width * 0.42, y: height * 0.28, rx: 95, ry: 60, rot: -0.15, alpha: 0.48 }, // Acidalia Planitia
    { x: width * 0.52, y: height * 0.54, rx: 85, ry: 38, rot: 0.05, alpha: 0.46 }, // Sinus Sabaeus & Meridiani
    { x: width * 0.25, y: height * 0.65, rx: 90, ry: 45, rot: -0.1, alpha: 0.42 } // Mare Erythraeum
  ];

  for (const df of darkFeatures) {
    ctx.save();
    ctx.translate(df.x, df.y);
    ctx.rotate(df.rot);
    const g = ctx.createRadialGradient(0, 0, 10, 0, 0, df.rx);
    g.addColorStop(0, `rgba(62, 30, 22, ${df.alpha})`);
    g.addColorStop(0.7, `rgba(82, 38, 26, ${df.alpha * 0.6})`);
    g.addColorStop(1, 'rgba(140, 62, 36, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, df.rx, df.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Valles Marineris Grand Canyon scar across equator
  ctx.save();
  ctx.strokeStyle = 'rgba(54, 22, 14, 0.72)';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(width * 0.26, height * 0.52);
  ctx.bezierCurveTo(width * 0.33, height * 0.54, width * 0.4, height * 0.51, width * 0.46, height * 0.53);
  ctx.stroke();

  bCtx.strokeStyle = 'rgba(20, 20, 20, 0.9)';
  bCtx.lineWidth = 9;
  bCtx.beginPath();
  bCtx.moveTo(width * 0.26, height * 0.52);
  bCtx.bezierCurveTo(width * 0.33, height * 0.54, width * 0.4, height * 0.51, width * 0.46, height * 0.53);
  bCtx.stroke();
  ctx.restore();

  // Olympus Mons & Tharsis Montes shield volcanoes
  const volcanoes = [
    { x: width * 0.18, y: height * 0.39, r: 26 }, // Olympus Mons
    { x: width * 0.23, y: height * 0.45, r: 16 }, // Ascraeus Mons
    { x: width * 0.21, y: height * 0.5, r: 15 }, // Pavonis Mons
    { x: width * 0.19, y: height * 0.55, r: 16 } // Arsia Mons
  ];
  for (const v of volcanoes) {
    const vg = ctx.createRadialGradient(v.x, v.y, 2, v.x, v.y, v.r);
    vg.addColorStop(0, 'rgba(90, 38, 22, 0.8)');
    vg.addColorStop(0.3, 'rgba(225, 130, 85, 0.55)');
    vg.addColorStop(1, 'rgba(180, 82, 48, 0)');
    ctx.fillStyle = vg;
    ctx.beginPath();
    ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
    ctx.fill();

    const bg = bCtx.createRadialGradient(v.x, v.y, 2, v.x, v.y, v.r);
    bg.addColorStop(0, 'rgba(90, 90, 90, 0.9)');
    bg.addColorStop(0.25, 'rgba(250, 250, 250, 0.95)');
    bg.addColorStop(1, 'rgba(128, 128, 128, 0)');
    bCtx.fillStyle = bg;
    bCtx.beginPath();
    bCtx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
    bCtx.fill();
  }

  // Martian craters
  for (let i = 0; i < 240; i++) {
    const cx = rand() * width;
    const cy = 35 + rand() * (height - 70);
    const r = 2 + Math.pow(rand(), 3) * 20;
    bCtx.strokeStyle = 'rgba(215, 215, 215, 0.45)';
    bCtx.lineWidth = 1.5;
    bCtx.beginPath();
    bCtx.arc(cx, cy, r, 0, Math.PI * 2);
    bCtx.stroke();
  }

  // North & South Polar Water/CO2 Ice Caps
  const northCap = ctx.createLinearGradient(0, 0, 0, 38);
  northCap.addColorStop(0, 'rgba(248, 245, 242, 0.95)');
  northCap.addColorStop(0.6, 'rgba(238, 220, 208, 0.65)');
  northCap.addColorStop(1, 'rgba(210, 140, 110, 0)');
  ctx.fillStyle = northCap;
  ctx.fillRect(0, 0, width, 38);

  const southCap = ctx.createLinearGradient(0, height - 34, 0, height);
  southCap.addColorStop(0, 'rgba(210, 140, 110, 0)');
  southCap.addColorStop(0.45, 'rgba(238, 220, 208, 0.6)');
  southCap.addColorStop(1, 'rgba(248, 245, 242, 0.92)');
  ctx.fillStyle = southCap;
  ctx.fillRect(0, height - 34, width, 34);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = maxAnisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.anisotropy = maxAnisotropy;

  cachedMarsTextures = { colorMap, bumpMap };
  return cachedMarsTextures;
}

/**
 * Generates a realistic crinkled Multi-Layer Insulation (MLI) Kapton gold foil bump map
 * for spacecraft bodies and Apollo/Viking/InSight descent stages.
 */
export function getGoldKaptonBumpTexture(): THREE.CanvasTexture {
  if (cachedGoldFoilBump) return cachedGoldFoilBump;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  const rand = seededRandom(19720302);
  for (let i = 0; i < 450; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 4 + rand() * 18;
    const v = Math.floor(70 + rand() * 145);
    const g = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    g.addColorStop(0, `rgb(${v}, ${v}, ${v})`);
    g.addColorStop(0.5, `rgb(${255 - v}, ${255 - v}, ${255 - v})`);
    g.addColorStop(1, 'rgb(128, 128, 128)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * r * 2, y + (rand() - 0.5) * r * 2);
    ctx.lineTo(x + (rand() - 0.5) * r * 2, y + (rand() - 0.5) * r * 2);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  cachedGoldFoilBump = tex;
  return tex;
}

/**
 * Generates a realistic spacecraft photovoltaic solar panel grid texture
 */
export function getSolarPanelTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  if (cachedSolarPanelMap) return cachedSolarPanelMap;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0F2547';
  ctx.fillRect(0, 0, size, size);

  // Silicon cells with metallic silver busbars
  const cols = 8;
  const rows = 16;
  const cellW = size / cols;
  const cellH = size / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#143261' : '#102A52';
      ctx.fillRect(c * cellW + 1.5, r * cellH + 1.5, cellW - 3, cellH - 3);

      // Subtle copper/silver interconnect
      ctx.fillStyle = '#60A5FA';
      ctx.fillRect(c * cellW + cellW * 0.5 - 0.5, r * cellH + 2, 1, cellH - 4);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  cachedSolarPanelMap = tex;
  return tex;
}
