import type { Tokens } from "./auth";

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => { logout: keyof Tokens; path: string };
}