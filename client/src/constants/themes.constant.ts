
export type ThemeStyle =
  | "dark-glow"
  | "glass"
  | "flat"
  | "neon"
  | "soft"
  | "brutal"
  | "minimal"
  | "retro"
  | "gradient"
  | "outline";

export type Theme = {
  name: string;
  style: ThemeStyle;
  accent: string;
  dark: string;
  bg: string;
  nav: string;
  navEnd: string;
  muted: string;
  dimmed: string;
  label: string;
};

export const THEMES: Theme[] = [
  {
    name: "Emerald",
    style: "dark-glow",
    accent: "#1dc465",
    dark: "#0fa84e",
    bg: "#0b1219",
    nav: "#0f1923",
    navEnd: "#0d1f1a",
    muted: "#4a6d60",
    dimmed: "#3a5a50",
    label: "#8a9bb0",
  },
];

export function getStyleProps(
  style: ThemeStyle,
  accent: string,
  dark: string
) {
  switch (style) {
    case "glass":
      return {
        cardBg: `rgba(139,92,246,0.07)`,
        cardBorder: `rgba(139,92,246,0.2)`,
        cardRadius: 16,
        cardBlur: "blur(8px)",
        btnRadius: 12,
      };

    case "neon":
      return {
        cardBg: `rgba(6,182,212,0.04)`,
        cardBorder: `rgba(6,182,212,0.35)`,
        cardRadius: 8,
        cardBlur: "none",
        btnRadius: 4,
        neonShadow: `0 0 12px ${accent}88, 0 0 2px ${accent}`,
      };

    case "soft":
      return {
        cardBg: `rgba(244,63,94,0.06)`,
        cardBorder: `rgba(244,63,94,0.12)`,
        cardRadius: 20,
        cardBlur: "none",
        btnRadius: 999,
      };

    case "retro":
      return {
        cardBg: `rgba(245,158,11,0.06)`,
        cardBorder: `rgba(245,158,11,0.25)`,
        cardRadius: 4,
        cardBlur: "none",
        btnRadius: 2,
        retro: true,
      };

    case "minimal":
      return {
        cardBg: "rgba(255,255,255,0.02)",
        cardBorder: "rgba(59,130,246,0.1)",
        cardRadius: 12,
        cardBlur: "none",
        btnRadius: 8,
      };

    case "flat":
      return {
        cardBg: `rgba(20,184,166,0.08)`,
        cardBorder: "transparent",
        cardRadius: 12,
        cardBlur: "none",
        btnRadius: 10,
        flatShadow: `4px 4px 0 ${accent}30`,
      };

    case "gradient":
      return {
        cardBg: `linear-gradient(135deg, rgba(217,70,239,0.08), rgba(162,28,175,0.04))`,
        cardBorder: `rgba(217,70,239,0.18)`,
        cardRadius: 16,
        cardBlur: "none",
        btnRadius: 14,
      };

    case "brutal":
      return {
        cardBg: "rgba(15,25,5,0.9)",
        cardBorder: accent,
        cardRadius: 0,
        cardBlur: "none",
        btnRadius: 0,
        brutalBorder: true,
      };

    case "outline":
      return {
        cardBg: "transparent",
        cardBorder: `rgba(249,115,22,0.4)`,
        cardRadius: 10,
        cardBlur: "none",
        btnRadius: 8,
        outlineDash: true,
      };

    case "dark-glow":
    default:
      return {
        cardBg: `rgba(29,196,101,0.06)`,
        cardBorder: `rgba(29,196,101,0.15)`,
        cardRadius: 14,
        cardBlur: "none",
        btnRadius: 10,
      };
  }
}