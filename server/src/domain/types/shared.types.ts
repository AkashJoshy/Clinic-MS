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

export type RestrictionStatus = "PENDING" | "REJECTED"

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AccountStatus = "APPROVED" | "SUSPENDED";

export type SessionStatus =
  | "AVAILABLE"
  | "PENDING"
  | "BOOKED"
  | "CANCELLED"
  | "COMPLETED"
  | "EXPIRED"
  | "UPCOMING"
  | "UNAVAILABLE"
  | "DAY_OFF"
  | "CONFIRMED"
  | "LIVE"
  | "MISSED"
  | "PENDING";

export type ImageData = {
  url: string;
  publicId: string;
};

export type VerifyImageData = ImageData & {
  status: ApprovalStatus
}

export interface QueryOptions {
  select?: string;
}

export type PlainUrl = {
  url: string;
};

export type ApprovalPlainUrl = {
  url: string;
  status: ApprovalStatus
};

export interface BulkWriteInsertOne<T> {
  insertOne: {
    document: T;
  };
}

export interface BulkWriteUpdateOne<T> {
  updateOne: {
    filter: Record<string, unknown>;
    update: Partial<T>;
    upsert: boolean
  };
}

export interface BulkWriteUpdateMany<T> {
  updateMany: {
    filter: Record<string, unknown>;
    update: Partial<T>;
    upsert: boolean
  };
}

export interface BulkWriteReplaceOne<T> {
  replaceOne: {
    filter: Record<string, unknown>;
    replacement: T;
  };
}

export interface BulkWriteDeleteOne {
  deleteOne: {
    filter: Record<string, unknown>;
  };
}

export interface BulkWriteDeleteMany {
  deleteMany: {
    filter: Record<string, unknown>;
  };
}

export type BulkWriteOperation<T> =
  | BulkWriteInsertOne<T>
  | BulkWriteUpdateOne<T>
  | BulkWriteUpdateMany<T>
  | BulkWriteReplaceOne<T>
  | BulkWriteDeleteOne
  | BulkWriteDeleteMany;