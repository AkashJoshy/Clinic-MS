import type { Clinic } from "../../domain/entities/clinic.entity.ts";
import type { UpdateClinicDto, UpdateClinicEntityDto } from "../dto/clinic.dto.ts";

export interface IUpdateClinicService {
  execute(data: UpdateClinicEntityDto): Promise<Clinic>;
}
