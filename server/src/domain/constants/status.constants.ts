export const APPROVAL_STATUS = ["PENDING", "APPROVED", "REJECTED"] as const;

export const ENTITY_STATUS = ["ACTIVE", "INACTIVE"] as const;

export const DOCTOR_STATUS = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
] as const;

export const SLOT_STATUS = [
  "AVAILABLE",
  "BOOKED",
  "BLOCKED",
  "EXPIRED",
  "CANCELLED",
  "EXCEEDED",
  "REPLACEABLE",
] as const;
