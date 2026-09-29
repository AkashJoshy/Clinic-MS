import { Stethoscope } from "lucide-react";

const DoctorSearchHeader = () => {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1DC465]/10 text-[#1DC465]">
        <Stethoscope className="size-5" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Find the right doctor for you
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Search specialists, compare doctors, and find available appointments.
        </p>
      </div>
    </div>
  );
};

export default DoctorSearchHeader;