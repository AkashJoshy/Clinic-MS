export enum ownerModel {
  PATIENT = "Patient",
  DOCTOR = "Doctor",
  ADMIN = "Admin",
}

export enum walletType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum walletPaymentMethod {
  WALLET = "WALLET",
  RAZORPAY = "RAZORPAY",
  BANK_TRANSFER = "BANK_TRANSFER",
  SYSTEM = "SYSTEM",
}

export enum walletStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum walletTransactionSource {
    WALLET_TOPUP = "WALLET_TOPUP",
    APPOINTMENT_PAYMENT = "APPOINTMENT_PAYMENT",
    APPOINTMENT_REFUND = "APPOINTMENT_REFUND",
    SUBSCRIPTION_PAYMENT = "SUBSCRIPTION_PAYMENT",
    PAYOUT = "PAYOUT",
    ADMIN_ADJUSTMENT = "ADMIN_ADJUSTMENT",
}
