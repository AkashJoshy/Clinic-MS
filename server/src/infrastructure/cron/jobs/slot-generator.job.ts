// import cron, { type ScheduledTask } from "node-cron";
// import { mongooseDoctorClinicRepository, mongooseSlotRepository } from "../../../container/infrastructure.container.ts";
// import { SlotGenerationService } from "../../../application/services/slot/slot-generation.service.ts";

// const doctorClinicRepository = new mongooseDoctorClinicRepository();
// const slotRepository = new mongooseSlotRepository();
// const slotGenerationService = new SlotGenerationService();
// const slotExtendUseCase = new SlotExtendWindowUseCase(
//   doctorClinicRepository,
//   slotRepository,
//   slotGenerationService,
// );

// const slotGeneratorJob: ScheduledTask = cron.schedule("0 8 * * *", async () => {
//   try {
//     console.log("[CRON] Starting slot generation...");
//     await slotExtendUseCase.execute();
//     console.log("[CRON] Slot generation completed.");
//   } catch (error) {
//     console.error("[CRON] Slot extension failed:", error);
//   }
// });

// export default slotGeneratorJob;
