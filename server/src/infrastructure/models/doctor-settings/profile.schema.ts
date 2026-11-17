import { Schema } from "mongoose";

export const profileSchema = new Schema(
  {
    acceptNewPatients: {
      type: Boolean,
      default: true,
    },

    publicDirectoryVisibility: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);
