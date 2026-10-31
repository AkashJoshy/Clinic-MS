import { model } from "mongoose";
import type { IDoctorSubscription } from "./doctor-subscription.types.ts";
import { doctorSubscriptionSchema } from "./doctor-subscription.schema.ts";

const DoctorSubscriptionModel = model<IDoctorSubscription>(
  "DoctorSubscription",
  doctorSubscriptionSchema,
);

export default DoctorSubscriptionModel;
