import type {
  CreateWalletTopUpOrderParams,
  verifyPaymentMutationParams,
  WalletOwnerParams,
} from "@/types/wallet";
import api from "../api/interceptors";
import { ENDPOINTS } from "./endpoints";
import type {
  OpenRazorpayCheckoutOptions,
  RazorpayOptions,
  RazorpayPaymentResponse,
} from "@/types/razorpay";

export const getAllDepartments = async () => {
  try {
    const res = await api.get(ENDPOINTS.COMMON.DEPARTMENTS);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const fetchWallet = async (walletData: WalletOwnerParams) => {
  try {
    const { id, ownerRole } = walletData;
    const res = await api.get(ENDPOINTS.COMMON.GET_WALLET(id), {
      authRole: ownerRole,
    });

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const getWalletBalance = async (walletData: WalletOwnerParams) => {
  try {
    const { id, ownerRole } = walletData;
    const res = await api.get(ENDPOINTS.COMMON.GET_WALLET_BALANCE(id), {
      authRole: ownerRole,
    });

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const createWalletTopUpOrder = async (
  data: CreateWalletTopUpOrderParams,
) => {
  try {
    const { amount, authRole } = data;
    console.log(`Reaching.... ${authRole} & ${amount}`);
    const res = await api.post(
      ENDPOINTS.COMMON.CREATE_WALLET_TOPUP_ORDER,
      { amount },
      { authRole },
    );

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const openRazorpayCheckout = ({
  order,
  description = "Patient Wallet Top-up",
  onSuccess,
  onFailure,
  onDismiss,
}: OpenRazorpayCheckoutOptions): void => {
  const razorpay = new window.Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: import.meta.env.VITE_WEBSITE_NAME,
    description,
    order_id: order.orderId,
    handler: (response: RazorpayPaymentResponse) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        onDismiss?.();
      },
    },
    prefill: {
      name: import.meta.env.VITE_PLATFORM_OWNER,
      email: import.meta.env.VITE_PLATFORM_MAIL,
      contact: "",
    },
    notes: {
      purpose: "WALLET_TOP_UP",
    },
    theme: {
      color: "#1DC465",
      backdrop_color: "rgba(13, 26, 39, 0.75)",
    },
  });

  razorpay.on("payment.failed", (response) => {
    onFailure?.(response.error);
  });

  razorpay.open();
};

export const verifyPaymentMutation = async (
  data: verifyPaymentMutationParams,
) => {
  try {
    const { orderDetails, authRole, status } = data;
    const res = await api.post(
      ENDPOINTS.COMMON.VERIFY_WALLET_TOPUP_ORDER,
      { orderDetails, status },
      { authRole },
    );

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: error.message || "Network Error",
    };
  }
};
