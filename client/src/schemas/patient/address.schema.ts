import { z } from "zod";
import { addressLine, city, country, pincode, state } from "../base.schema";

export const addressSchema = z.object({
  ownerId: z.string().min(1, "id is required"),
  addressLine,
  country,
  state,
  city,
  pincode,
});

export type AddressForm = z.infer<typeof addressSchema>;
