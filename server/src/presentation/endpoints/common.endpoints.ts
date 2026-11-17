const DEPARTMENTS_BASE = "/departments";
const ADDRESSES_BASE = "/addresses";
const WALLET_BASE = "/wallet";
const PLATFORM_DATA = "/platform-data"

export const COMMON_ENDPOINTS = {
  DEPARTMENTS: {
    BASE: DEPARTMENTS_BASE,
    FETCH_ALL: DEPARTMENTS_BASE,
  },
  ADDRESSES: {
    BASE: ADDRESSES_BASE,
    UPDATE_ONE: `${ADDRESSES_BASE}/:ownerId`,
  },
  PLATFORM: {
    BASE: PLATFORM_DATA
  },
  WALLET: {
    BASE: WALLET_BASE,
    FETCH_ONE: `${WALLET_BASE}/:ownerId`,
    FETCH_ONE_BALANCE: `${WALLET_BASE}/:ownerId/balance`,
    TOP_UP: {
      CREATE_ORDER: `${WALLET_BASE}/top-up/orders`,
      VERIFY_ORDER: `${WALLET_BASE}/top-up/orders/verify`,
    },
  },
};