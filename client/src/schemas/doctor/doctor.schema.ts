import * as z from "zod"
import { doctorRegisterStep1Schema, doctorRegisterStep2Schema, doctorRegisterStep3Schema } from "./register.schema";

export type DoctorRegisterStep1FormData = z.infer<typeof doctorRegisterStep1Schema>
export type DoctorRegisterStep2FormData = z.input<typeof doctorRegisterStep2Schema>
export type DoctorRegisterStep3FormData = z.infer<typeof doctorRegisterStep3Schema>
