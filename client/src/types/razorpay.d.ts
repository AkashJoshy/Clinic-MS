
export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

export interface RazorpayOrder {
  orderId: string;
  amount: number;
  currency: string;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OpenRazorpayCheckoutOptions {
  order: RazorpayOrder;
  description?: string;
  onSuccess: (response: RazorpayPaymentResponse) => void;
  onFailure?: (error: unknown) => void;
  onDismiss?: () => void;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;

  handler: (
    response: RazorpaySuccessResponse,
  ) => void | Promise<void>;

  modal?: {
    ondismiss?: () => void;
  };
  prefill: {
      name: string,
      email: string,
      contact: string,
    }
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  notes: {
      purpose: string,
    }
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayFailureResponse) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions,
    ) => RazorpayInstance;
  }
}

export {};
