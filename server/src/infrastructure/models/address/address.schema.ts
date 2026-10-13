import { Schema } from "mongoose"
import type { IAddress } from "./address.types.ts";

export const addressSchema: Schema<IAddress> = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerType",
    },
    ownerType: {
      type: String,
      required: true,
      enum: ["Patient", "Admin", "Clinic", "Doctor"],
    },
    addressLine: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
      validate: [
        {
          validator(value: string) {
            return value === "" || value.length >= 6;
          },
          message: "Invalid PIN/ZIP",
        },
        {
          validator(value: string) {
            return value === "" || value.length <= 12;
          },
          message: "Invalid PIN/ZIP",
        },
        {
          validator(value: string) {
            return value === "" || /^[A-Z0-9\s\-]{6,12}$/i.test(value);
          },
          message: "Invalid PIN/ZIP",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);
