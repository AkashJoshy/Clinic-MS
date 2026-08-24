export const initialAuthState = {
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
};