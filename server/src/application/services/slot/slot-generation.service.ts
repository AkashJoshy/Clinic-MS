// import { Slot } from "../../../domain/entities/slot.entity.ts";
// import type { DayOfWeek } from "../../../domain/types/shared.types.ts";
// import type { SlotGenerationDto } from "../../dto/doctor-clinic.dto.ts";
// import type { ISlotGenerationService } from "../../interfaces/services/slot/i-slot-generation.service.ts";

// export class SlotGenerationService implements ISlotGenerationService {
//   constructor() {}

//   execute({
//     doctorClinicId,
//     date,
//     session,
//     duration,
//   }: SlotGenerationDto): Slot[] {
//     const slots: Slot[] = [];
//     const [startH, startM] = session.startTime.split(":").map(Number);
//     const [endH, endM] = session.endTime.split(":").map(Number);

//     let currentMinutes = startH! * 60 + startM!;
//     const endMinutes = endH! * 60 + endM!;

//     while (currentMinutes + duration <= endMinutes) {
//       const sH = Math.floor(currentMinutes / 60);
//       const sM = currentMinutes % 60;
//       const eH = Math.floor((currentMinutes + duration) / 60);
//       const eM = (currentMinutes + duration) % 60;

//       const startTime = `${sH.toString().padStart(2, "0")}:${sM.toString().padStart(2, "0")}`;
//       const endTime = `${eH.toString().padStart(2, "0")}:${eM.toString().padStart(2, "0")}`;

//       slots.push(
//         Slot.create({
//           id: null,
//           doctorClinicId: doctorClinicId,
//           date: date,
//           startTime,
//           endTime,
//           status: "AVAILABLE",
//           // type: session,
//           // heldBy: null,
//           // holdExpiresAt: null,
//         }),
//       );

//       currentMinutes += duration;
//     }

//     slots.forEach(slot => console.log(slot))
    
//     return slots;
//   }

//   getDayName(dayIndex: number): DayOfWeek {
//     const days: DayOfWeek[] = [
//       "SUNDAY",
//       "MONDAY",
//       "TUESDAY",
//       "WEDNESDAY",
//       "THURSDAY",
//       "FRIDAY",
//       "SATURDAY",
//     ];
//     return days[dayIndex]!;
//   }
// }
