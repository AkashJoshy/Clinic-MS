
export interface ISlotInitialGenerationService {
  execute(doctorId: string): Promise<void>;
}