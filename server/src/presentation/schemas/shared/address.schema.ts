import { z } from "zod";
import { addressLine, city, country, pincode, state } from "../base.schema.ts";

export const updateAddressSchema = z.object({
  addressLine,
  country,
  state,
  city,
  pincode,
});
