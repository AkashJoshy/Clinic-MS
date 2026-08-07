import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserCheck,
  AlertTriangle,
  ShieldAlert as BlockIcon,
} from "lucide-react";
import { getPatient, updatePatient } from "@/services/admin.service";
import { useMutate } from "@/hooks/useMutate";
import toast from "react-hot-toast";
import type { PatientInfo } from "@/types/patient";
import DeleteConfirmationalModal from "@/components/shared/DeleteConfirmationalModal";
import { PatientProfileCard } from "@/components/shared/admin/patient-details/PatientProfileCard";
import { PatientContactCard } from "@/components/shared/admin/patient-details/PatientContactCard";
import { PersonalInformation } from "@/components/shared/admin/patient-details/PersonalInformation";

export default function PatientDetailsPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"DELETE" | "RESTORE">("DELETE");

  const fetchPatientDetails = async () => {
    if (!patientId) return;
    setLoading(true);
    try {
      const res = await getPatient(patientId);
      if (res.success && res.data) {
        setPatientData(res.data);
      } else {
        toast.error(res.message || "Failed to fetch patient details");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [patientId]);

  const { mutate: mutateStatus } = useMutate(updatePatient, {
    onSuccess: () => {
      setIsConfirmOpen(false);
      fetchPatientDetails();
    },
  });

  const handleStatusUpdate = () => {
    if (!patientId) return;
    mutateStatus({
      id: patientId,
      method: actionType,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 h-full space-y-4">
        <div className="w-12 h-12 border-4 border-[#1dc465]/20 border-t-[#1dc465] rounded-full animate-spin"></div>
        <p className="text-[#8b9ab0] text-sm animate-pulse">Loading patient details...</p>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <button
          onClick={() => navigate("/admin/patients")}
          className="flex items-center gap-2 text-[#8b9ab0] hover:text-white transition-colors text-sm font-semibold mb-4"
        >
          <ArrowLeft size={16} />
          Back to Patient Management
        </button>
        <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-8 text-center max-w-lg mx-auto">
          <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} />
          <h2 className="text-white text-xl font-bold mb-2">Patient Not Found</h2>
          <p className="text-[#8b9ab0] text-sm mb-6">
            The patient you are looking for does not exist or has been deleted from the system.
          </p>
          <button
            onClick={() => navigate("/admin/patients")}
            className="px-6 py-2.5 bg-[#1dc465] hover:bg-[#159a4e] text-black font-semibold rounded-xl transition-all"
          >
            Go Back to List
          </button>
        </div>
      </div>
    );
  }

  const { patient, address, user } = patientData;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-350 mx-auto border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/admin/patients")}
          className="flex items-center gap-2 text-[#8b9ab0] hover:text-white transition-colors text-sm font-semibold w-fit"
        >
          <ArrowLeft size={16} />
          Back to Patients
        </button>

        <div className="flex items-center gap-3">
          {user.isActive ? (
            <button
              onClick={() => {
                setActionType("DELETE");
                setIsConfirmOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              <BlockIcon size={16} />
              Block Patient
            </button>
          ) : (
            <button
              onClick={() => {
                setActionType("RESTORE");
                setIsConfirmOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465] hover:bg-[#1dc465] hover:text-black rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              <UserCheck size={16} />
              Restore Patient
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          
          <PatientProfileCard patient={patient} isActive={user.isActive} isEmailVerified={user.isEmailVerified} />

          <PatientContactCard email={user?.email} phone={user?.phone} createdAt={user?.createdAt} />
          
        </div>

        <PersonalInformation address={address} patient={patient} />

      </div>

      {isConfirmOpen && (
        <DeleteConfirmationalModal
          id={patientId || ""}
          name={patient.displayName}
          type="Patient"
          status={user.isActive ? "ACTIVE" : "INACTIVE"}
          action={actionType}
          service={handleStatusUpdate}
          closeDeleteBox={() => setIsConfirmOpen(false)}
        />
      )}
    </div>
  );
}
