import { Schema } from "mongoose";

export const appearanceSchema = new Schema(
  {
    theme: {
      type: String,
      enum: ["DARK", "LIGHT"],
      default: "DARK",
    },

    colorPaletteId: {
      type: String,
      required: true,
      default: "emerald",
      trim: true,
    },

    walletCardDesignId: {
      type: Number,
      required: true,
      default: 200,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Wallet card design ID must be an integer",
      },
    },

    compactScheduleView: {
      type: Boolean,
      default: false,
    },

    highContrastMode: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);
