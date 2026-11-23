type PrimaryShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type ColorFamily =
  | "RED"
  | "ORANGE"
  | "YELLOW"
  | "GREEN"
  | "CYAN"
  | "BLUE"
  | "PURPLE"
  | "PINK"
  | "GRAY";

type PrimaryPalette = {
  primary: string;
  foreground: string;
} & Record<`primary-${PrimaryShade}`, string>;

const mixColors = (color: string, target: string, amount: number): string => {
  const hexToRgb = (hex: string) => {
    const value = hex.replace("#", "");

    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  };

  const from = hexToRgb(color);
  const to = hexToRgb(target);

  const mix = (a: number, b: number) => Math.round(a + (b - a) * amount);

  return (
    "#" +
    [mix(from.r, to.r), mix(from.g, to.g), mix(from.b, to.b)]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
  );
};

const getLuminance = (hex: string): number => {
  const value = hex.replace("#", "");

  const channels = [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ].map((channel) => {
    const normalized = channel / 255;

    return normalized <= 0.04045
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const getContrastForeground = (color: string): string => {
  const luminance = getLuminance(color);

  const whiteContrast = 1.05 / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;

  return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
};

export const generatePrimaryPalette = (
  primaryColor: string,
): PrimaryPalette => {
  const color = primaryColor.toUpperCase();

  const shades = {
    50: mixColors(color, "#FFFFFF", 0.95),
    100: mixColors(color, "#FFFFFF", 0.88),
    200: mixColors(color, "#FFFFFF", 0.76),
    300: mixColors(color, "#FFFFFF", 0.6),
    400: mixColors(color, "#FFFFFF", 0.35),
    500: color,
    600: mixColors(color, "#000000", 0.12),
    700: mixColors(color, "#000000", 0.25),
    800: mixColors(color, "#000000", 0.4),
    900: mixColors(color, "#000000", 0.55),
  };

  return {
    primary: color,
    foreground: getContrastForeground(color),

    "primary-50": shades[50],
    "primary-100": shades[100],
    "primary-200": shades[200],
    "primary-300": shades[300],
    "primary-400": shades[400],
    "primary-500": shades[500],
    "primary-600": shades[600],
    "primary-700": shades[700],
    "primary-800": shades[800],
    "primary-900": shades[900],
  };
};

export const applyPrimaryColor = (primaryColor: string): void => {
  const palette = generatePrimaryPalette(primaryColor);
  const root = document.documentElement;

  Object.entries(palette).forEach(([key, value]) => {
    const variable = key === "foreground" ? "--primary-foreground" : `--${key}`;

    root.style.setProperty(variable, value);
  });
};


const LIGHT_COLOR_LUMINANCE_THRESHOLD = 0.5;

export const getContrastTextColor = (hex: string): "#000000" | "#FFFFFF" => {
  const normalized = hex.replace("#", "");

  if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) {
    return "#000000";
  }

  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const channels = [0, 2, 4].map(
    (index) => parseInt(fullHex.slice(index, index + 2), 16) / 255,
  );

  const [r, g, b] = channels.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4),
  );

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Only very light colors get black text; dark and mid-tone colors get white.
  return luminance > LIGHT_COLOR_LUMINANCE_THRESHOLD ? "#000000" : "#FFFFFF";
};
// export const getColorFamily = (hex: string): ColorFamily => {
//   const normalized = hex.replace("#", "");

//   if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) {
//     return "GRAY";
//   }

//   const fullHex =
//     normalized.length === 3
//       ? normalized
//           .split("")
//           .map((char) => char + char)
//           .join("")
//       : normalized;

//   const [r, g, b] = [0, 2, 4].map(
//     (index) => parseInt(fullHex.slice(index, index + 2), 16) / 255,
//   );

//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   const delta = max - min;

//   if (delta < 0.08) return "GRAY";

//   let hue = 0;

//   if (max === r) hue = 60 * (((g - b) / delta) % 6);
//   else if (max === g) hue = 60 * ((b - r) / delta + 2);
//   else hue = 60 * ((r - g) / delta + 4);

//   hue = (hue + 360) % 360;

//   if (hue < 15 || hue >= 345) return "RED";
//   if (hue < 45) return "ORANGE";
//   if (hue < 70) return "YELLOW";
//   if (hue < 165) return "GREEN";
//   if (hue < 195) return "CYAN";
//   if (hue < 255) return "BLUE";
//   if (hue < 290) return "PURPLE";
//   return "PINK";
// };

// type ContrastMode = "AUTO" | "LIGHT" | "DARK";

// export const getBrandForegroundColor = (
//   primaryColor: string,
//   mode: ContrastMode = "AUTO"
// ): "#000000" | "#FFFFFF" => {
//   if (mode === "LIGHT") return "#FFFFFF";
//   if (mode === "DARK") return "#000000";

//   return getContrastTextColor(primaryColor);
// };
