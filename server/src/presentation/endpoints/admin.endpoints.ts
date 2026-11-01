
const DEPARTMENTS_BASE = "/departments";
const DOCTORS_BASE = "/doctors";
const PATIENTS_BASE = "/patients";
const SUBSCRIPTIONS_BASE = "/subscriptions";

export const ADMIN_ENDPOINTS = {
  DEPARTMENTS: {
    BASE: DEPARTMENTS_BASE,
    ADD_ONE: DEPARTMENTS_BASE,
    FETCH_ONE: `${DEPARTMENTS_BASE}/:departmentId`,
    FETCH_ALL: DEPARTMENTS_BASE,
    UPDATE_ONE: `${DEPARTMENTS_BASE}/:departmentId`
  },
  DOCTORS: {
    BASE: DOCTORS_BASE,
    FETCH_ONE: `${DOCTORS_BASE}/:doctorId`,
    FETCH_ALL: DOCTORS_BASE,
    UPDATE_ONE: `${DOCTORS_BASE}/:doctorId`,
    APPROVE_ONE: `${DOCTORS_BASE}/:doctorId/approve`,
    REJECT_ONE: `${DOCTORS_BASE}/:doctorId/reject`,
    VERIFY: {
      DOCTOR_DOC: `${DOCTORS_BASE}/:doctorId/verify`,
      CLINIC_DOC: `/clinic/:clinicId/verify`,
    },
  },
  PATIENTS: {
    BASE: PATIENTS_BASE,
    FETCH_ONE: `${PATIENTS_BASE}/:patientId`,
    FETCH_ALL: PATIENTS_BASE,
    UPDATE_ONE: `${PATIENTS_BASE}/:patientId`,
  },
  SUBSCRIPTION: {
    BASE: SUBSCRIPTIONS_BASE,
    ADD_ONE: SUBSCRIPTIONS_BASE,
    FETCH_ALL: SUBSCRIPTIONS_BASE,
    UPDATE_ONE: `${SUBSCRIPTIONS_BASE}/:subscriptionId`,
    UPDATE_STATUS: `${SUBSCRIPTIONS_BASE}/:subscriptionId/status`
  },
  USERS: {
    BASE: "/users"
  }
};
