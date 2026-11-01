// export const COMMON_ENDPOINTS = {
//     FETCH_DEPARTMENTS: "/departments",
//     UPDATE_PROFILE_ADDRESS: "/addresses/:ownerId",
//     GET_WALLET: "/wallet/:ownerId",
//     CREATE_WALLET_TOPUP_ORDER: `/wallet/top-up/orders`,
//     VERIFY_WALLET_TOP_ORDER: `/wallet/top-up/orders/verify`
// }  

const DEPARTMENTS_BASE = "/departments";
const ADDRESSES_BASE = "/addresses";
const WALLET_BASE = "/wallet";

export const COMMON_ENDPOINTS = {
  DEPARTMENTS: {
    BASE: DEPARTMENTS_BASE,
    FETCH_ALL: DEPARTMENTS_BASE,
  },
  ADDRESSES: {
    BASE: ADDRESSES_BASE,
    UPDATE_ONE: `${ADDRESSES_BASE}/:ownerId`,
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