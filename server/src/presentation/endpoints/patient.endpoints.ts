const PROFILES_BASE = "/profiles";
const DOCTORS_BASE = "/doctors";
const APPOINTMENTS_BASE = "/appointments";
const SLOTS_BASE = "/slot";

export const PATIENT_ENDPOINTS = {
  PROFILES: {
    BASE: PROFILES_BASE,
    CREATE_ONE: PROFILES_BASE,
    FETCH_ONE: `${PROFILES_BASE}/:userId`,
    UPDATE_ONE: `${PROFILES_BASE}/:patientId`,
    ADDRESS: {
      UPDATE_ONE: `${PROFILES_BASE}/addresses/:ownerId`,
    },
    EMERGENCY_CONTACT: {
      UPDATE_ONE: `${PROFILES_BASE}/emergency-contact/:patientId`,
    },
    PROFILE_PICTURE: {
      UPDATE_ONE: `${PROFILES_BASE}/picture/p`,
    },
  },
  DOCTORS: {
    BASE: DOCTORS_BASE,
    FETCH_ALL: DOCTORS_BASE,
    FETCH_NEARBY: `${DOCTORS_BASE}/nearby`,
    SLOTS: {
      FETCH_ALL: `${DOCTORS_BASE}/:doctorClinicId/slots`,
      BOOK_ONE: `${DOCTORS_BASE}/:doctorClinicId/slots/:slotId`,
    },
  },
  APPOINTMENTS: {
    BASE: APPOINTMENTS_BASE,
    FETCH_ALL: APPOINTMENTS_BASE,
  },
  SLOTS: {
    HOLD_ONE: `${SLOTS_BASE}/:slotId/held`,
  },
};