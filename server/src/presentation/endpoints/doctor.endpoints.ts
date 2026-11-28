const PROFILE_BASE = "/profile";
const PROFESSIONAL_DETAILS_BASE = "/professional-details";
const PERSONAL_DETAILS_BASE = "/personal-details";
const CONSULTATION_DETAILS_BASE = "/consultation-details";
const ADDRESSES_BASE = "/addressess";
const PROFILE_PICTURE_BASE = "/profile-picture";
const REAPPLICATIONS_BASE = "/reapplications";
const CLINICS_BASE = "/clinics";
const SUBSCRIPTION_BASE = "/subscriptions";
const SUBSCRIPTION_PURCHASE_BASE = `${SUBSCRIPTION_BASE}/purchase`;
const KYC_BASE = "/kyc";
const SETTINGS_BASE = "/doctor-settings";
const SCHEDULE_BASE = "/schedule";


export const DOCTOR_ENDPOINTS = {
  DASHBOARD: {
    OVERVIEW: `/dashboard/overview`,
    CALENDAR_SLOTS: `/calendar/slots`
  },
  PROFILE: {
    BASE: PROFILE_BASE,
    FETCH_ONE: `${PROFILE_BASE}/:userId`,
    UPDATE_ONE: `${PROFILE_BASE}/:userId`,
  },
  PROFESSIONAL_DETAILS: {
    BASE: PROFESSIONAL_DETAILS_BASE,
    UPDATE_ONE: `/:userId${PROFESSIONAL_DETAILS_BASE}`,
  },
  PERSONAL_DETAILS: {
    BASE: PERSONAL_DETAILS_BASE,
    UPDATE_ONE: PERSONAL_DETAILS_BASE,
  },
  CONSULTATION_DETAILS: {
    BASE: CONSULTATION_DETAILS_BASE,
    UPDATE_ONE: `/:userId${CONSULTATION_DETAILS_BASE}`,
  },
  ADDRESSES: {
    BASE: ADDRESSES_BASE,
    UPDATE_ONE: `${ADDRESSES_BASE}/:ownerId`,
  },
  PROFILE_PICTURE: {
    BASE: PROFILE_PICTURE_BASE,
  },
  REAPPLICATIONS: {
    BASE: REAPPLICATIONS_BASE,
    FETCH_ONE: `${REAPPLICATIONS_BASE}/token/:token`,
    UPDATE_ONE: `${REAPPLICATIONS_BASE}/token/:token`,
  },
  CLINICS: {
    BASE: CLINICS_BASE,
    SLOTS: {
      GENERATE: `${CLINICS_BASE}/:doctorClinicId/slots/generate`,
      CONFIRM: `${CLINICS_BASE}/:doctorClinicId/slots/confirm`,
    },
  },
  SUBSCRIPTION: {
    BASE: SUBSCRIPTION_BASE,
    CREATE_ONE: SUBSCRIPTION_BASE,
    OVERVIEW: `${SUBSCRIPTION_BASE}/overview`,
    UPGRADE_OPTIONS: `${SUBSCRIPTION_BASE}/:doctorId/upgrade-options`,
    CANCEL: `${SUBSCRIPTION_BASE}/:planId/cancel`,
    BUY: {
      WALLET: `${SUBSCRIPTION_PURCHASE_BASE}/wallet`,
      RAZORPAY: {
        PURCHASE: `${SUBSCRIPTION_PURCHASE_BASE}/razorpay`,
        VERIFY: `${SUBSCRIPTION_PURCHASE_BASE}/razorpay/verify`,
      },
    },
  },
  KYC: {
    BASE: KYC_BASE,
    GET: KYC_BASE,
    PAN: {
      BASE: `${KYC_BASE}/pan`,
      UPDATE: `${KYC_BASE}/pan`
    },
    BANK: {
      BASE: `${KYC_BASE}/bank`,
      UPDATE: `${KYC_BASE}/bank`
    },
    AADHAAR: {
      BASE: `${KYC_BASE}/aadhaar`,
      UPDATE: `${KYC_BASE}/aadhaar`
    }
  },
  SETTINGS: {
    BASE: SETTINGS_BASE,
    UPDATE_ONE: `${SETTINGS_BASE}`,
    FETCH_ONE: `${SETTINGS_BASE}`
  },
  SCHEDULE: {
    BASE: SCHEDULE_BASE,
    UPDATE: SCHEDULE_BASE,
  }
};
