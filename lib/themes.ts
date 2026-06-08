export const DEFAULT_COLOR_PALETTE = 'construction-orange' as const;
export const CUSTOM_PALETTE_ID = 'custom' as const;

export type PresetPaletteId =
  | 'construction-orange'
  | 'steel-blue'
  | 'forest-green'
  | 'brick-red'
  | 'deep-teal'
  | 'amber-gold'
  | 'ocean-navy'
  | 'copper-bronze'
  | 'royal-purple'
  | 'safety-yellow'
  | 'concrete-slate'
  | 'rust-terracotta';

export type ColorPaletteId = PresetPaletteId | typeof CUSTOM_PALETTE_ID;

export interface CustomColors {
  accentPrimary: string;
  accentHover?: string;
}

export interface ThemeOptions {
  colorPalette?: string;
  customColors?: CustomColors;
}

export interface ColorPalette {
  id: PresetPaletteId;
  name: string;
  description: string;
  preview: [string, string, string];
  vars: Record<string, string>;
}

export const DEFAULT_CUSTOM_COLORS: CustomColors = {
  accentPrimary: '#E07B00',
  accentHover: '#F59E0B',
};

export const CUSTOM_PALETTE_OPTION = {
  id: CUSTOM_PALETTE_ID,
  name: 'Custom Colors',
  description: 'Choose your own primary and hover accent colors.',
};

const PALETTES: Record<PresetPaletteId, ColorPalette> = {
  'construction-orange': {
    id: 'construction-orange',
    name: 'Construction Orange',
    description: 'Warm industrial orange — the default Raj Shuttering look.',
    preview: ['#E07B00', '#F59E0B', '#FFF4E6'],
    vars: {
      '--color-accent-primary': '#E07B00',
      '--color-accent-hover': '#F59E0B',
      '--color-accent-subtle': '#FFF4E6',
      '--color-accent-steel': '#4A6B8A',
      '--color-bg-light': '#FFF8F0',
      '--color-bg-accent': '#FFF4E6',
      '--color-accent-rgb': '224, 123, 0',
    },
  },
  'steel-blue': {
    id: 'steel-blue',
    name: 'Steel Blue',
    description: 'Professional steel tones for a modern construction feel.',
    preview: ['#2563EB', '#3B82F6', '#EFF6FF'],
    vars: {
      '--color-accent-primary': '#2563EB',
      '--color-accent-hover': '#3B82F6',
      '--color-accent-subtle': '#EFF6FF',
      '--color-accent-steel': '#1E3A5F',
      '--color-bg-light': '#F0F6FF',
      '--color-bg-accent': '#EFF6FF',
      '--color-accent-rgb': '37, 99, 235',
    },
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Earthy greens suited to sustainable building projects.',
    preview: ['#15803D', '#22C55E', '#F0FDF4'],
    vars: {
      '--color-accent-primary': '#15803D',
      '--color-accent-hover': '#22C55E',
      '--color-accent-subtle': '#F0FDF4',
      '--color-accent-steel': '#365314',
      '--color-bg-light': '#F7FEF9',
      '--color-bg-accent': '#F0FDF4',
      '--color-accent-rgb': '21, 128, 61',
    },
  },
  'brick-red': {
    id: 'brick-red',
    name: 'Brick Red',
    description: 'Bold brick-red accents for a strong, confident brand.',
    preview: ['#B91C1C', '#EF4444', '#FEF2F2'],
    vars: {
      '--color-accent-primary': '#B91C1C',
      '--color-accent-hover': '#EF4444',
      '--color-accent-subtle': '#FEF2F2',
      '--color-accent-steel': '#7F1D1D',
      '--color-bg-light': '#FFF5F5',
      '--color-bg-accent': '#FEF2F2',
      '--color-accent-rgb': '185, 28, 28',
    },
  },
  'deep-teal': {
    id: 'deep-teal',
    name: 'Deep Teal',
    description: 'Refined teal palette with a clean, trustworthy tone.',
    preview: ['#0F766E', '#14B8A6', '#F0FDFA'],
    vars: {
      '--color-accent-primary': '#0F766E',
      '--color-accent-hover': '#14B8A6',
      '--color-accent-subtle': '#F0FDFA',
      '--color-accent-steel': '#134E4A',
      '--color-bg-light': '#F5FFFE',
      '--color-bg-accent': '#F0FDFA',
      '--color-accent-rgb': '15, 118, 110',
    },
  },
  'amber-gold': {
    id: 'amber-gold',
    name: 'Amber Gold',
    description: 'Rich golden amber for a premium, established look.',
    preview: ['#D97706', '#FBBF24', '#FFFBEB'],
    vars: {
      '--color-accent-primary': '#D97706',
      '--color-accent-hover': '#FBBF24',
      '--color-accent-subtle': '#FFFBEB',
      '--color-accent-steel': '#92400E',
      '--color-bg-light': '#FFFCF5',
      '--color-bg-accent': '#FFFBEB',
      '--color-accent-rgb': '217, 119, 6',
    },
  },
  'ocean-navy': {
    id: 'ocean-navy',
    name: 'Ocean Navy',
    description: 'Deep navy blues for a corporate, dependable presence.',
    preview: ['#1E40AF', '#3B82F6', '#EFF6FF'],
    vars: {
      '--color-accent-primary': '#1E40AF',
      '--color-accent-hover': '#3B82F6',
      '--color-accent-subtle': '#EFF6FF',
      '--color-accent-steel': '#1E3A8A',
      '--color-bg-light': '#F0F4FF',
      '--color-bg-accent': '#EFF6FF',
      '--color-accent-rgb': '30, 64, 175',
    },
  },
  'copper-bronze': {
    id: 'copper-bronze',
    name: 'Copper Bronze',
    description: 'Warm bronze and copper tones with a crafted, solid feel.',
    preview: ['#9A3412', '#EA580C', '#FFF7ED'],
    vars: {
      '--color-accent-primary': '#9A3412',
      '--color-accent-hover': '#EA580C',
      '--color-accent-subtle': '#FFF7ED',
      '--color-accent-steel': '#7C2D12',
      '--color-bg-light': '#FFFAF5',
      '--color-bg-accent': '#FFF7ED',
      '--color-accent-rgb': '154, 52, 18',
    },
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Bold violet accents for a distinctive, premium brand.',
    preview: ['#7C3AED', '#A78BFA', '#F5F3FF'],
    vars: {
      '--color-accent-primary': '#7C3AED',
      '--color-accent-hover': '#A78BFA',
      '--color-accent-subtle': '#F5F3FF',
      '--color-accent-steel': '#5B21B6',
      '--color-bg-light': '#FAF5FF',
      '--color-bg-accent': '#F5F3FF',
      '--color-accent-rgb': '124, 58, 237',
    },
  },
  'safety-yellow': {
    id: 'safety-yellow',
    name: 'Safety Yellow',
    description: 'High-visibility construction yellow — energetic and bold.',
    preview: ['#CA8A04', '#EAB308', '#FEFCE8'],
    vars: {
      '--color-accent-primary': '#CA8A04',
      '--color-accent-hover': '#EAB308',
      '--color-accent-subtle': '#FEFCE8',
      '--color-accent-steel': '#854D0E',
      '--color-bg-light': '#FFFEF5',
      '--color-bg-accent': '#FEFCE8',
      '--color-accent-rgb': '202, 138, 4',
    },
  },
  'concrete-slate': {
    id: 'concrete-slate',
    name: 'Concrete Slate',
    description: 'Cool slate grays inspired by concrete and steel structures.',
    preview: ['#475569', '#64748B', '#F1F5F9'],
    vars: {
      '--color-accent-primary': '#475569',
      '--color-accent-hover': '#64748B',
      '--color-accent-subtle': '#F1F5F9',
      '--color-accent-steel': '#334155',
      '--color-bg-light': '#F8FAFC',
      '--color-bg-accent': '#F1F5F9',
      '--color-accent-rgb': '71, 85, 105',
    },
  },
  'rust-terracotta': {
    id: 'rust-terracotta',
    name: 'Rust Terracotta',
    description: 'Earthy terracotta rust — warm, grounded, and approachable.',
    preview: ['#C2410C', '#F97316', '#FFF7ED'],
    vars: {
      '--color-accent-primary': '#C2410C',
      '--color-accent-hover': '#F97316',
      '--color-accent-subtle': '#FFF7ED',
      '--color-accent-steel': '#9A3412',
      '--color-bg-light': '#FFFAF5',
      '--color-bg-accent': '#FFF7ED',
      '--color-accent-rgb': '194, 65, 12',
    },
  },
};

export const COLOR_PALETTE_LIST = Object.values(PALETTES);

/** Non-empty tuple for Zod `z.enum()` */
export const PALETTE_IDS_ZOD: [ColorPaletteId, ...ColorPaletteId[]] = [
  COLOR_PALETTE_LIST[0].id,
  ...COLOR_PALETTE_LIST.slice(1).map((palette) => palette.id),
  CUSTOM_PALETTE_ID,
];

export function normalizeHexColor(hex: string, fallback = '#E07B00'): string {
  let value = hex.trim().replace(/^#/, '');
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(value)) return fallback;
  return `#${value.toUpperCase()}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = normalizeHexColor(hex);
  const value = normalized.slice(1);
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const channel = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

function mixHex(hex1: string, hex2: string, weight: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return rgbToHex(
    r1 * (1 - weight) + r2 * weight,
    g1 * (1 - weight) + g2 * weight,
    b1 * (1 - weight) + b2 * weight
  );
}

function withDerivedVars(vars: Record<string, string>): Record<string, string> {
  const rgb = vars['--color-accent-rgb'];
  return {
    ...vars,
    '--color-border-accent': `rgba(${rgb}, 0.35)`,
    '--shadow-glow': `0 8px 32px rgba(${rgb}, 0.22)`,
  };
}

export function buildCustomPaletteVars(custom?: CustomColors): Record<string, string> {
  const primary = normalizeHexColor(custom?.accentPrimary ?? DEFAULT_CUSTOM_COLORS.accentPrimary);
  const hover = normalizeHexColor(
    custom?.accentHover ?? mixHex(primary, '#FFFFFF', 0.22),
    mixHex(primary, '#FFFFFF', 0.22)
  );
  const [r, g, b] = hexToRgb(primary);

  return {
    '--color-accent-primary': primary,
    '--color-accent-hover': hover,
    '--color-accent-subtle': mixHex(primary, '#FFFFFF', 0.9),
    '--color-accent-steel': mixHex(primary, '#000000', 0.35),
    '--color-bg-light': mixHex(primary, '#FFFFFF', 0.95),
    '--color-bg-accent': mixHex(primary, '#FFFFFF', 0.9),
    '--color-accent-rgb': `${r}, ${g}, ${b}`,
  };
}

export function resolvePaletteId(id?: string): ColorPaletteId {
  if (id === CUSTOM_PALETTE_ID) return CUSTOM_PALETTE_ID;
  if (id && id in PALETTES) return id as PresetPaletteId;
  return DEFAULT_COLOR_PALETTE;
}

export function getColorPalette(id?: string): ColorPalette {
  return PALETTES[resolvePaletteId(id) as PresetPaletteId];
}

function resolveThemeOptions(
  paletteIdOrOptions?: string | ThemeOptions,
  customColors?: CustomColors
): ThemeOptions {
  if (typeof paletteIdOrOptions === 'object' && paletteIdOrOptions !== null) {
    return paletteIdOrOptions;
  }
  return { colorPalette: paletteIdOrOptions, customColors };
}

export function getPaletteCssVars(
  paletteIdOrOptions?: string | ThemeOptions,
  customColors?: CustomColors
): Record<string, string> {
  const options = resolveThemeOptions(paletteIdOrOptions, customColors);
  const resolved = resolvePaletteId(options.colorPalette);

  if (resolved === CUSTOM_PALETTE_ID) {
    return withDerivedVars(buildCustomPaletteVars(options.customColors));
  }

  const palette = PALETTES[resolved];
  return withDerivedVars(palette.vars);
}

export function getCustomPreview(custom?: CustomColors): [string, string, string] {
  const vars = buildCustomPaletteVars(custom);
  return [
    vars['--color-accent-primary'],
    vars['--color-accent-hover'],
    vars['--color-accent-subtle'],
  ];
}

export function applyPaletteToDocument(
  paletteIdOrOptions?: string | ThemeOptions,
  customColors?: CustomColors
) {
  if (typeof document === 'undefined') return;
  const vars = getPaletteCssVars(paletteIdOrOptions, customColors);
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
