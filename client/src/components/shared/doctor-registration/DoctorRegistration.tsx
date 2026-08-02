import BasicInfo from "./BasicInfo";
import { useMutate } from "@/hooks/useMutate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllDepartments } from "@/services/common.service";
import RegistrationHeader from "./RegistrationHeader";
import { useDoctorRegistrationContext } from "@/hooks/useDoctorRegistrationContext";
import ProfessionalInfo from "./ProfessionalInfo";
import AccountSecurity from "./AccountSecurity";
import ClinicInfo from "./ClinicInfo";
import ClinicAddress from "./ClinicAddress";
import ConsultationInfo from "./ConsultationInfo";
import VerificationDocs from "./VerificationDocs";
import type { DepartmentData } from "@/types/admin";
import { registerDoctor } from "@/services/doctor.service";

export default function ClinicRegistration() {
  const { step, goNext, goBack, onSubmit } = useDoctorRegistrationContext();
  const [allDepartments, setAllDepartments] = useState<DepartmentData[] | []>(
    [],
  );
  const navigate = useNavigate();

  const { mutate, isPending } = useMutate(registerDoctor, {
    onSuccess: () => navigate("/doctor"),
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      let response: { data: DepartmentData[] } = await getAllDepartments();
      const data = response.data.filter((dept) => dept.status === "ACTIVE");
      setAllDepartments(data);
    };

    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen mt-15 bg-linear-to-br from-primary-50 via-white to-cyan-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <RegistrationHeader />

        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 ${
                  step === s
                    ? "bg-primary-300 text-white shadow-md shadow-primary-200"
                    : step > s
                      ? "bg-primary-100 text-primary"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:block ${
                  step === s ? "text-primary-600" : "text-gray-400"
                }`}
              >
                {s === 1
                  ? "Basic & Contact"
                  : s === 2
                    ? "Clinic Details"
                    : "Docs"}
              </span>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${step > 1 ? "bg-primary-400" : "bg-gray-200"} transition-all`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-8">
              <BasicInfo />
              <ProfessionalInfo />
              <AccountSecurity />
              <button
                onClick={() => goNext(1)}
                className="w-full py-3 bg-primary hover:bg-primary-600 text-white font-bold rounded-xl transition shadow-md shadow-primary-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                Next: Clinic Information <span>→</span>
              </button>

              <p className="text-center text-xs text-gray-400">
                Already registered?{" "}
                <a
                  href="/doctor"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <ClinicInfo />
              <ClinicAddress />
              <ConsultationInfo departments={allDepartments} />

              <div className="flex gap-3">
                <button
                  onClick={() => goBack(2)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <span>←</span> Back
                </button>
                <button
                  onClick={() => goNext(2)}
                  className="flex-1 py-3 bg-primary hover:bg-primary-600 text-white font-bold rounded-xl transition shadow-md shadow-primary-100 cursor-pointer"
                >
                  Next: Documents <span>→</span>
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                Your registration will be reviewed within{" "}
                <strong>24–48 hours</strong>.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <VerificationDocs />

              <div className="flex gap-3">
                <button
                  onClick={() => goBack(3)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <span>←</span> Back
                </button>
                <button
                  disabled={isPending}
                  onClick={async () => {
                    const data = await onSubmit();
                    if (data) mutate(data);
                  }}
                  className={`flex-1 py-3 text-white font-bold rounded-xl transition shadow-md shadow-primary-100 ${
                    isPending
                      ? "bg-primary cursor-not-allowed opacity-60"
                      : "bg-primary hover:bg-primary-600 cursor-pointer"
                  }`}
                >
                  {isPending ? "Registering..." : "Register"}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                Your registration will be reviewed within{" "}
                <strong>24–48 hours</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
