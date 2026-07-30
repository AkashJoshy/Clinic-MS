import { useAuthStore } from "./auth.store";
import type { Tokens } from "@/types/auth";

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useAuthToken = (role: keyof Tokens) =>
  useAuthStore((state) => state.tokens[role]);

export const useAuthLoading = () =>
  useAuthStore((state) => state.isLoading);

export const useAuthError = () =>
  useAuthStore((state) => state.error);