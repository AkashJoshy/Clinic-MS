import { Schema, Types } from "mongoose";

const previousSubscriptionPlanSchema = new Schema(
  {
    previousPlanId: {
      type: Types.ObjectId,
      ref: "SubscriptionPlan",
      default: null,
    },
    previousPlanName: {
      type: String,
      default: null,
    },
    previousPrice: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    id: false,
  },
);

export default previousSubscriptionPlanSchema;
