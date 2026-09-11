import { z } from "zod";
import { bookingSchema } from "./booking.schema";
import { relativeSchema } from "./relative.schema";
import type {
  EmergencyDetailsSchema,
  personalDetailsSchema,
  updatePersonalProfilePictureSchema,
} from "./personal-details.schema";

export type BookingFormData = z.infer<typeof bookingSchema>;
export type RelativeFormData = z.input<typeof relativeSchema>;
export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;
export type UpdatePersonalProfilePictureForm = z.infer<
  typeof updatePersonalProfilePictureSchema
>;
export type EmergencyDetailsForm = z.infer<typeof EmergencyDetailsSchema>;
