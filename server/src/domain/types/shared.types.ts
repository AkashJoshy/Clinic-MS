export type Gender = "MALE" | "FEMALE" | "OTHERS" | "PREFER NOT TO SAY";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type ServiceMode = "ONLINE" | "OFFLINE" | "BOTH";

export type EntityStatus = "ACTIVE" | "INACTIVE";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AccountStatus = "APPROVED" | "SUSPENDED";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "MISSED";

export type ImageData = {
  url: string;
  publicId: string;
};

export interface QueryOptions {
  select?: string;
}

export type PlainUrl = {
  url: string;
};
