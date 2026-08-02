import mongoose, { Schema,  model, type Document } from "mongoose";
import type { ModeRoleRef } from "../../domain/types/user.types.ts";

export interface IAddress extends Document {
    ownerId: mongoose.Types.ObjectId;
    ownerType: ModeRoleRef;
    addressLine: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
    createdAt: Date | null,
    updatedAt: Date | null
}

const addressSchema: Schema<IAddress> = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerType"
    },
    ownerType: {
      type: String,
      required: true,
      enum: ["Patient", "Admin", "Clinic", "Doctor"]
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
      minlength: [6, "Invalid PIN/ZIP"],
      maxlength: [12, "Invalid PIN/ZIP"],
      match: [/^[A-Z0-9\s\-]{4,10}$/i, "Invalid PIN/ZIP format"],
    },
  },
  {
    timestamps: true,
  }
);


export const AddressModel = model<IAddress>(
  "Address",
  addressSchema
);