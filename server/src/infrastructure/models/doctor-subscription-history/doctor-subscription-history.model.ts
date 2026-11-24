import { model } from "mongoose";
import type { IDoctorSubscriptionHistory } from "./doctor-subscription-history.types.ts";
import doctorSubscriptionHistorySchema from "./doctor-subscription-history.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

const DoctorSubscriptionHistoryModel = model<IDoctorSubscriptionHistory>(
  MODEL_NAMES.DOCTOR_SUBSCRIPTION_HISTORY,
  doctorSubscriptionHistorySchema,
);

export default DoctorSubscriptionHistoryModel;
