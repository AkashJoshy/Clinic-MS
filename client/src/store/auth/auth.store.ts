import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStateDTO } from "@/types/auth";
import type { AuthActions } from "./auth.actions";
import { initialAuthState } from "@/constants/user.constants";

type AuthStore = AuthActions & AuthStateDTO;

export const useAuthStore = create<AuthStore>()(
  persist(
    (_set) => ({
      tokens: {
        patient: null,
        admin: null,
        doctor: null,
      },
      user: null,
      doctor: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      patients: [],
      activePatient: null,
      setHasHydrated(val: boolean) {
        _set({ _hasHydrated: val });
      },
      login(token, user, role) {
        _set((state) => ({
          tokens: { ...state.tokens, [role]: token },
          user,
          isAuthenticated: true,
          error: null,
        }));
      },
      logout(role) {
        _set((state) => ({
          tokens: { ...state.tokens, [role]: null },
          patients: [],
          activePatient: null,
          clinic: null,
          user: Object.entries({ ...state.tokens, [role]: null }).some(
            ([, t]) => t !== null,
          )
            ? state.user
            : null,
          isAuthenticated: false,
        }));
      },
      updateToken(accessToken, role) {
        _set((state) => ({
          ...state,
          tokens: { ...state.tokens, [role]: accessToken },
        }));
      },
      setPatients(patients) {
        _set((state) => ({
          ...state,
          patients: patients,
        }));
      },
      updatePatients(patient) {
        _set((state) => {
          const exists = state.patients.some(
            (p) => p.patient.id! === patient.patient.id!,
          );
          return {
            patients: exists
              ? state.patients.map((p) =>
                  p.patient.id === patient.patient.id ? patient : p,
                )
              : [...state.patients, patient],
          };
        });
      },
      setActivePatient(patient) {
        _set((state) => ({
          ...state,
          activePatient: patient,
        }));
      },
      updateActivePatient(partial) {
        _set((state) => ({
          activePatient: state.activePatient
            ? { ...state.activePatient, ...partial }
            : null,
        }));
      },
      setError(error) {
        _set({ error });
      },
      setLoading(isLoading) {
        _set({ isLoading });
      },
      setUser(user) {
        _set({ user });
      },
      updateUser(partial) {
        _set((state: { user: any }) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        }));
      },
      setDoctor(doctor) {
        _set({ doctor });
      },
      updateDoctor(partial) {
        _set((state) => ({
          doctor: state?.doctor ? { ...state?.doctor, ...partial } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          return {
            ...initialAuthState,
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        activePatient: state.activePatient,
        patients: state.patients,
        doctor: state.doctor,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
