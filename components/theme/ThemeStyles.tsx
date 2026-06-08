import { getPaletteCssVars, type CustomColors } from '@/lib/themes';

interface ThemeStylesProps {
  paletteId?: string;
  customColors?: CustomColors;
}

export function ThemeStyles({ paletteId, customColors }: ThemeStylesProps) {
  const vars = getPaletteCssVars({ colorPalette: paletteId, customColors });
  const css = `:root{${Object.entries(vars)
    .map(([key, value]) => `${key}:${value}`)
    .join(';')}}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
