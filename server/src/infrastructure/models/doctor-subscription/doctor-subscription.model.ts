import { model } from "mongoose";
import type { IDoctorSubscription } from "./doctor-subscription.types.ts";
import { doctorSubscriptionSchema } from "./doctor-subscription.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

const DoctorSubscriptionModel = model<IDoctorSubscription>(
  MODEL_NAMES.DOCTOR_SUBSCRIPTION,
  doctorSubscriptionSchema,
);

export default DoctorSubscriptionModel;
