import cron, { type ScheduledTask } from "node-cron";
import { SlotExtendWindowUseCase } from "../../../application/use-cases/clinic/slot-management/slot-extend-window.usecase.js";
import { MongooseDoctorClinicRepository } from "../../repositories/doctor-clinic.repository.ts";
import { MongooseSlotRepository } from "../../repositories/mongoose-slot.repository.js";
import { SlotGenerationService } from "../../../application/services/slot-generation.service.ts";

const doctorClinicRepository = new MongooseDoctorClinicRepository();
const slotRepository = new MongooseSlotRepository();
const slotGenerationService = new SlotGenerationService();
const slotExtendUseCase = new SlotExtendWindowUseCase(
  doctorClinicRepository,
  slotRepository,
  slotGenerationService,
);

const slotGeneratorJob: ScheduledTask = cron.schedule("0 8 * * *", async () => {
  try {
    console.log("[CRON] Starting slot generation...");
    await slotExtendUseCase.execute();
    console.log("[CRON] Slot generation completed.");
  } catch (error) {
    console.error("[CRON] Slot extension failed:", error);
  }
});

export default slotGeneratorJob;
