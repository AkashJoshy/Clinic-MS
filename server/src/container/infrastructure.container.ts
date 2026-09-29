import { AddressDetailsService } from "../application/services/address-details.service.ts";
import { ClinicDetailsService } from "../application/services/clinic-details.service.ts";
import { DepartmentDetailsService } from "../application/services/department-details.service.ts";
import { DoctorClinicContextService } from "../application/services/doctor-clinic-context.service.ts";
import { DoctorClinicDetailsService } from "../application/services/doctor-clinic-details.service.ts";
import { DoctorDetailsService } from "../application/services/doctor-details.service.ts";
import { EmailVerificationService } from "../application/services/email-verification.service.ts";
import { redis } from "../infrastructure/cache/redis.client.ts";
import { AddressRepository } from "../infrastructure/repositories/address.repository.ts";
import { ClinicRepository } from "../infrastructure/repositories/clinic.repository.ts";
import { DepartmentRepository } from "../infrastructure/repositories/department.repository.ts";
import { DoctorClinicRepository } from "../infrastructure/repositories/doctor-clinic.repository.ts";
import { DoctorReapplicationRepository } from "../infrastructure/repositories/doctor-reapplication.repository.ts";
import { DoctorRepository } from "../infrastructure/repositories/doctor.repository.ts";
import { PatientRepository } from "../infrastructure/repositories/patient.repository.ts";
import { RefreshSessionRepository } from "../infrastructure/repositories/refresh-session.repository.ts";
import { UserRepository } from "../infrastructure/repositories/user.repository.ts";
import { ArgonHashService } from "../infrastructure/services/argon-hash.service.ts";
import { JWTService } from "../infrastructure/services/jwt.service.ts";
import { NodeMailerService } from "../infrastructure/services/mail/node-mailer.service.ts";
import { RedisCacheService } from "../infrastructure/services/redis-cache.service.ts";

// DB Repo's
export const mongooseUserRepository = new UserRepository();
export const mongoosePatientRepository = new PatientRepository();
export const mongooseAddressRepository = new AddressRepository();
export const mongooseDoctorRepository = new DoctorRepository();
export const mongooseRefreshSessionRepository = new RefreshSessionRepository();
export const mongooseDepartmentRepository = new DepartmentRepository();
export const mongooseClinicRepository = new ClinicRepository();
export const mongooseDoctorClinicRepository = new DoctorClinicRepository();
export const mongooseDoctorReapplicationRepository = new DoctorReapplicationRepository();

// Services
export const argonHashService = new ArgonHashService();
export const redisService = new RedisCacheService(redis);
export const nodeMailService = new NodeMailerService();
export const jwtService = new JWTService();

// UseCase-Service
export const emailVerificationService = new EmailVerificationService(
  nodeMailService,
  redisService,
);
export const addressDetailsService = new AddressDetailsService(
  mongooseAddressRepository
)
export const clinicDetailsService = new ClinicDetailsService(
  mongooseClinicRepository
)
export const doctorClinicDetailsService = new DoctorClinicDetailsService(
  mongooseDoctorClinicRepository
)
export const departmentDetailsService = new DepartmentDetailsService(
  mongooseDepartmentRepository
)
export const doctorClinicContextService = new DoctorClinicContextService(
  addressDetailsService,
  clinicDetailsService,
  doctorClinicDetailsService
)
export const doctorDetailsService = new DoctorDetailsService(
  mongooseUserRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  mongooseDepartmentRepository,
  addressDetailsService,
  departmentDetailsService,
  doctorClinicContextService,
);
