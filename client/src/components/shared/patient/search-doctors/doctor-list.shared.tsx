// DoctorList.tsx
import DoctorCard from "./doctor-card.shared";
import DoctorEmptyState from "./doctor-empty-state";
import { DoctorSkeletonList } from "./doctor-card-skeleton.shared";
import type { PatientDoctorDetailsCard } from "@/types/patient";

interface DoctorListProps {
  doctors: PatientDoctorDetailsCard[];
  isLoading: boolean;
  onClearFilters: () => void;
}

const DoctorList = ({
  doctors,
  isLoading,
  onClearFilters,
}: DoctorListProps) => {
  if (isLoading) return <DoctorSkeletonList />;

  if (doctors.length === 0) {
    return <DoctorEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-3">
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor.doctor.id} doctorProfile={doctor} index={index} />
      ))}
    </div>
  );
};

export default DoctorList;
