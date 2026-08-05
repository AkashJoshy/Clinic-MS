import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  getDoctor,
  approveDoctor,
  rejectDoctor,
  updateDoctorStatus,
} from "@/services/admin.service";
import { useMutate } from "@/hooks/useMutate";
import toast from "react-hot-toast";
import type { DoctorInfo, DoctorStatusUpdateDto } from "@/types/doctor";
import DeleteConfirmationalModal from "@/components/shared/DeleteConfirmationalModal";
import { RejectModal } from "@/components/layout/RejectModal";

// Subcomponents
import { DoctorProfileCard } from "@/components/shared/admin/doctor-details/DoctorProfileCard";
import { DoctorContactCard } from "@/components/shared/admin/doctor-details/DoctorContactCard";
import { DoctorQualificationsCard } from "@/components/shared/admin/doctor-details/DoctorQualificationsCard";
import { DoctorClinicCard } from "@/components/shared/admin/doctor-details/DoctorClinicCard";
import { DoctorScheduleCard } from "@/components/shared/admin/doctor-details/DoctorScheduleCard";
import type { User } from "@/types/user";

export default function DoctorDetailsPage() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState<DoctorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"DELETE" | "RESTORE">("DELETE");
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchDoctorDetails = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await getDoctor(doctorId);
      if (res.success && res.data) {
        setDoctorData(res.data);
      } else {
        toast.error(res.message || "Failed to fetch doctor details");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);

  const { mutate: mutateStatus } = useMutate(updateDoctorStatus, {
    onSuccess: () => {
      setIsConfirmOpen(false);
      fetchDoctorDetails();
    },
  });

  const { mutate: mutateApprove } = useMutate(approveDoctor, {
    onSuccess: () => {
      fetchDoctorDetails();
    },
  });

  const { mutate: mutateReject } = useMutate(rejectDoctor, {
    onSuccess: () => {
      setIsRejectOpen(false);
      navigate("/admin/doctors");
    },
  });

  const handleBlockToggle = () => {
    if (!doctorData?.doctor?.id) return;
    console.log(doctorData)
    mutateStatus({
      id: doctorData.doctor.id,
      method: actionType,
    });
  };

  const handleApprove = () => {
    if (!doctorId) return;
    mutateApprove({
      id: doctorId,
      reviewMessage: "Approved by Administrator",
    });
  };

  const handleRejectConfirm = (reason: string) => {
    setIsRejectOpen(false);
  };

  const formatDate = (dateString: Date | string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full space-y-4">
        <div className="w-12 h-12 border-4 border-[#1dc465]/20 border-t-[#1dc465] rounded-full animate-spin"></div>
        <p className="text-[#8b9ab0] text-sm animate-pulse">Loading doctor details...</p>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <button
          onClick={() => navigate("/admin/doctors")}
          className="flex items-center gap-2 text-[#8b9ab0] hover:text-white transition-colors text-sm font-semibold mb-4 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Doctor Management
        </button>
        <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-8 text-center max-w-lg mx-auto">
          <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} />
          <h2 className="text-white text-xl font-bold mb-2">Doctor Not Found</h2>
          <p className="text-[#8b9ab0] text-sm mb-6">
            The doctor profile you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/admin/doctors")}
            className="px-6 py-2.5 bg-[#1dc465] hover:bg-[#159a4e] text-black font-semibold rounded-xl transition-all cursor-pointer"
          >
            Go Back to List
          </button>
        </div>
      </div>
    );
  }

  const { doctor, clinic, doctorClinic, address, user, department } = doctorData;


  const isBlocked = (user as User)?.isBlocked === true || (user as any)?.isActive === false;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/admin/doctors")}
          className="flex items-center gap-2 text-[#8b9ab0] hover:text-white transition-colors text-sm font-semibold w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </button>

        <div className="flex items-center gap-3">
          {doctor.status === "PENDING" && (
            <>
              <button
                onClick={() => setIsRejectOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Reject Request
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1dc465] text-black hover:bg-[#159a4e] rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                <CheckCircle size={16} />
                Approve Doctor
              </button>
            </>
          )}

          {doctor.status === "APPROVED" && (
            <>
              {isBlocked ? (
                <button
                  onClick={() => {
                    setActionType("RESTORE");
                    setIsConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465] hover:bg-[#1dc465] hover:text-black rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  <UserCheck size={16} />
                  Restore Doctor
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActionType("DELETE");
                    setIsConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  <ShieldAlert size={16} />
                  Block Doctor
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <DoctorProfileCard
            doctor={doctor}
            department={department}
            isBlocked={isBlocked}
          />
          <DoctorContactCard
            email={user?.email}
            phone={user?.phone}
            languages={doctor.languages}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <DoctorQualificationsCard
            doctor={doctor}
            onViewDocument={setPreviewImage}
            formatDate={formatDate}
          />
          <DoctorClinicCard
            clinic={clinic}
            doctorClinic={doctorClinic}
            address={address}
          />
          <DoctorScheduleCard
            schedule={doctorClinic.schedule}
          />
        </div>
      </div>

      {isConfirmOpen && (
        <DeleteConfirmationalModal
          id={doctorId || ""}
          name={doctor.displayName}
          type="Doctor"
          status={isBlocked ? "INACTIVE" : "ACTIVE"}
          action={actionType}
          service={handleBlockToggle}
          closeDeleteBox={() => setIsConfirmOpen(false)}
        />
      )}

      {isRejectOpen && (
        <RejectModal<DoctorStatusUpdateDto>
          id={doctorId || ""}
          name={doctor.displayName}
          onConfirm={handleRejectConfirm}
          onClose={() => setIsRejectOpen(false)}
          mutateFn={mutateReject}
        />
      )}

      {previewImage && (
        <div
          className="fixed inset-0 bg-[#080d14]/90 backdrop-blur-md flex items-center justify-center z-100 p-4 sm:p-8 animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-[#0d1a27] border border-white/8 p-2 rounded-2xl relative max-w-4xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#080d14]/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-all z-10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="overflow-auto max-h-[85vh] rounded-xl bg-[#080d14]/30">
              <img
                src={previewImage}
                alt="Document Preview"
                className="w-full h-auto object-contain max-h-[80vh]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/800x600/0d1a27/1dc465?text=Document+Not+Found";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
