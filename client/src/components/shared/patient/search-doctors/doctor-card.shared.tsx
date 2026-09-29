import { motion } from "framer-motion";
import {
  BadgeCheck,
  Star,
  MapPin,
  Video,
  Building2,
  Clock,
  CalendarCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { PatientDoctorDetailsCard } from "@/types/patient";

function DoctorAvatar({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div className="shrink-0">
      <img
        src={src}
        alt={name}
        className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-xl object-cover object-top bg-gray-100"
        loading="lazy"
      />
    </div>
  );
}

function DoctorRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Star
        size={13}
        className="fill-amber-400 text-amber-400"
      />

      <span className="text-sm font-semibold text-gray-900">
        {rating}
      </span>

      <span className="text-xs text-gray-400">
        · {reviewCount} reviews
      </span>
    </div>
  );
}

function ConsultationInfo({
  modes,
}: {
  modes: string[];
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {modes.includes("ONLINE") && (
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Video
            size={12}
            className="text-primary"
          />
          Online
        </span>
      )}

      {modes.includes("OFFLINE") && (
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Building2
            size={12}
            className="text-primary"
          />
          In-clinic
        </span>
      )}
    </div>
  );
}

function DoctorMeta({
  experience,
  location,
}: {
  experience: number;
  location: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <CalendarCheck size={12} />
        {experience} yrs exp.
      </span>

      <span className="flex items-center gap-1">
        <MapPin size={12} />
        {location}
      </span>
    </div>
  );
}

function ClinicFees({
  clinics,
}: {
  clinics: PatientDoctorDetailsCard["doctorClinicDetails"];
}) {
  const clinicsWithFees = clinics.filter(
    (clinic) => clinic.consultationFee !== undefined,
  );

  if (clinicsWithFees.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1.5">
      {clinicsWithFees.map((clinic) => (
        <div
          key={clinic.id}
          className="
            flex items-center justify-between gap-3
            px-2.5 py-2
            rounded-lg
            bg-gray-50/80
            border border-gray-100
            max-w-md
          "
        >
          <div className="flex items-center gap-2 min-w-0">
            {clinic.type === "ONLINE" ? (
              <Video
                size={13}
                className="text-primary shrink-0"
              />
            ) : (
              <Building2
                size={13}
                className="text-primary shrink-0"
              />
            )}

            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">
                {clinic.clinic?.name ?? "Clinic"}
              </p>

              <p className="text-[10px] text-gray-400">
                {clinic.type === "ONLINE"
                  ? "Online consultation"
                  : "In-clinic consultation"}
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-gray-900 shrink-0">
            ₹{clinic.consultationFee}
          </span>
        </div>
      ))}
    </div>
  );
}

function DoctorSchedule({
  clinics,
}: {
  clinics: PatientDoctorDetailsCard["doctorClinicDetails"];
}) {
  const schedules = clinics.flatMap((clinic) =>
    (clinic.schedule ?? []).flatMap((weeklySchedule) =>
      weeklySchedule.sessions
        .filter((session) => session.isActive)
        .map((session) => ({
          clinicId: clinic.id,
          day: weeklySchedule.dayOfWeek,
          startTime: session.startTime,
          endTime: session.endTime,
          type: session.type,
        })),
    ),
  );

  if (schedules.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <Clock
        size={11}
        className="text-gray-400 shrink-0"
      />

      {schedules.slice(0, 4).map((slot, index) => (
        <Badge
          key={`${slot.clinicId}-${slot.day}-${slot.startTime}-${slot.endTime}-${index}`}
          variant="secondary"
          className="
            text-[11px]
            px-2 py-0.5
            font-normal
            text-gray-600
            bg-gray-50
            border-gray-100
          "
        >
          {slot.day.slice(0, 3)}
          {" · "}
          {slot.startTime} - {slot.endTime}
        </Badge>
      ))}

      {schedules.length > 4 && (
        <span className="text-[11px] text-gray-400">
          +{schedules.length - 4} more
        </span>
      )}
    </div>
  );
}

function BookAppointmentButton() {
  return (
    <Button
      variant="default"
      size="sm"
      className="
        bg-primary
        hover:bg-primary/90
        text-white
        text-xs
        font-medium
        px-4
        h-9
        rounded-lg
        cursor-pointer
        whitespace-nowrap
      "
    >
      Book Appointment
    </Button>
  );
}

interface DoctorCardProps {
  doctorProfile: PatientDoctorDetailsCard;
  index: number;
}

const DoctorCard = ({
  doctorProfile,
  index,
}: DoctorCardProps) => {
  const {
    doctor,
    department,
    address,
    doctorClinicDetails,
  } = doctorProfile;

  const consultationModes = [
    ...new Set(
      doctorClinicDetails.map(
        (clinic) => clinic.type,
      ),
    ),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.06,
      }}
      className="
        group
        bg-white
        border border-gray-100
        rounded-xl
        p-4 sm:p-5
        flex flex-col sm:flex-row
        gap-4
        hover:border-gray-200
        hover:shadow-md
        transition-all
        duration-200
        cursor-default
      "
    >
      <DoctorAvatar
        src={
          doctor.profilePicture?.url ??
          import.meta.env.VITE_DEFAULT_USER_PROFILE_IMAGE
        }
        name={doctor.displayName ?? "Unavailable"}
      />

      <div className="flex-1 min-w-0 space-y-2.5">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
              {doctor.displayName ?? "Unavailable"}
            </h3>

            {doctor.status === "APPROVED" && (
              <BadgeCheck
                size={16}
                className="text-primary shrink-0"
                aria-label="Verified doctor"
              />
            )}
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            {department?.name}
          </p>
        </div>

        <DoctorRating
          rating={doctor.averageRating}
          reviewCount={doctor.totalReviews}
        />

        <DoctorMeta
          experience={doctor.experienceYears}
          location={`${address?.country ?? ""} ${
            address?.city ?? ""
          }`}
        />

        <ConsultationInfo
          modes={consultationModes}
        />

        <ClinicFees
          clinics={doctorClinicDetails}
        />

        <DoctorSchedule
          clinics={doctorClinicDetails}
        />
      </div>

      <div className="flex sm:flex-col sm:items-end sm:justify-end shrink-0">
        <BookAppointmentButton />
      </div>
    </motion.div>
  );
};

export default DoctorCard;