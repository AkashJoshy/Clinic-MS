import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  ShieldAlert,
  X,
  AlertCircle,
} from "lucide-react";
import {
  getDoctor,
  approveDoctor,
  rejectDoctor,
  updateDoctorStatus,
  verifyDoctorDocument,
  verifyClinicDocument,
} from "@/services/admin.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import toast from "react-hot-toast";
import type {
  AdminDoctorInfo,
  DoctorRejectDto,
  DocumentDto,
} from "@/types/doctor";
import DeleteConfirmationalModal from "@/components/shared/delete-confirmational-modal.shared";
import { RejectModal } from "@/components/layout/reject-modal.layout";
import { DoctorProfileCard } from "@/components/shared/admin/doctors/profile-card.shared";
import { DoctorContactCard } from "@/components/shared/admin/doctors/contact-card.shared";
import { DoctorQualificationsCard } from "@/components/shared/admin/doctors/qualifications-card.shared";
import { DoctorClinicCard } from "@/components/shared/admin/doctors/clinic-card.shared";
import DocumentVerificationModal from "@/components/shared/document-verification-modal.shared";
import type { User } from "@/types/user";
import type { UpdateMethods } from "@/types/common";
import StatusTicker from "@/components/shared/status-ticker.shared";
import { useAuthStore } from "@/store";
import { getDoctorDetailsTheme } from "@/helpers/admin/doctors.helper";
import DoctorNotFound from "@/components/shared/admin/doctors/doctor-not-found.shared";

export default function DoctorDetailsPage() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const [doctorData, setDoctorData] = useState<AdminDoctorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<UpdateMethods | null>(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentDto | null>(
    null,
  );

  const theme = getDoctorDetailsTheme(isDark);

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

  const { mutate: mutateVerifyDoctorDoc, isPending: isVerifyingDoctorDoc } =
    useMutate(verifyDoctorDocument, {
      onSuccess: () => {
        setSelectedDocument(null);
        fetchDoctorDetails();
      },
    });

  const { mutate: mutateVerifyClinicDoc, isPending: isVerifyingClinicDoc } =
    useMutate(verifyClinicDocument, {
      onSuccess: () => {
        setSelectedDocument(null);
        fetchDoctorDetails();
      },
    });

  const handleDocumentAction = () => {
    if (!selectedDocument) return;

    const dto: DocumentDto = {
      id: selectedDocument.id,
      name: selectedDocument.name,
      action: selectedDocument.action,
      documentRelatedTo: selectedDocument.documentRelatedTo,
      documentField: selectedDocument.documentField,
      url: selectedDocument.url,
    };

    if (selectedDocument.documentRelatedTo === "DOCTOR") {
      mutateVerifyDoctorDoc(dto);
    } else {
      mutateVerifyClinicDoc(dto);
    }
  };

  const handleBlockToggle = () => {
    if (!doctorData?.doctor?.id || !actionType) return;

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

  const handleRejectConfirm = () => {
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
      <div
        className={`flex h-full min-h-100 flex-col items-center justify-center space-y-4 ${
          isDark ? "bg-[#080d14]" : "bg-gray-50"
        }`}
      >
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1dc465]/20 border-t-[#1dc465]" />
        <p className={`${theme.muted} animate-pulse text-sm`}>
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <DoctorNotFound onBack={() => navigate("/admin/doctors")} theme={theme} />
    );
  }

  const { user, doctor, address, department, doctorClinicDetails } = doctorData;

  const isBlocked =
    (user as User)?.isBlocked === true || (user as any)?.isActive === false;

  return (
    <div
      className={`mx-auto max-w-[1400px] animate-fade-in space-y-6 border p-6 shadow-2xs lg:p-8 ${
        theme.page
      }`}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <button
          onClick={() => navigate("/admin/doctors")}
          className={`flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold transition-colors ${theme.backButton}`}
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </button>

        <div className="flex items-center gap-3">
          {doctor.status === "PENDING" && (
            <>
              <button
                onClick={() => setIsRejectOpen(true)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-500 hover:text-white"
              >
                Reject Doctor
              </button>

              <button
                onClick={handleApprove}
                className={`flex cursor-pointer items-center gap-2 rounded-xl bg-[#1dc465] px-5 py-2.5 text-sm font-semibold transition-all ${theme.primaryButton}`}
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
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/10 px-5 py-2.5 text-sm font-semibold text-[#1dc465] transition-all hover:bg-[#1dc465] hover:text-black"
                >
                  <UserCheck size={16} />
                  Restore Doctor
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActionType("BLOCK");
                    setIsConfirmOpen(true);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-500 hover:text-white"
                >
                  <ShieldAlert size={16} />
                  Block Doctor
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Rejection status */}
      {doctor.status === "REJECTED" && (
        <StatusTicker
          message={`${import.meta.env.VITE_DOCTOR_REJECTION_MESSAGE} ${
            doctor.reviewedMessage
              ? `Admin message: ${doctor.reviewedMessage}`
              : ""
          }`}
          icon={AlertCircle}
          variant="error"
        />
      )}

      {/* Doctor details */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <DoctorProfileCard
            doctor={doctor}
            department={department}
            isBlocked={isBlocked}
            role="admin"
          />

          <DoctorContactCard
            email={user?.email}
            phone={user?.phone}
            languages={doctor.languages}
            address={address}
            role="admin"
          />
        </div>

        <div className="space-y-6 lg:col-span-8">
          <DoctorQualificationsCard
            doctor={doctor}
            role="admin"
            onViewDocument={setPreviewImage}
            formatDate={formatDate}
            onDocumentAction={(
              name,
              action,
              id,
              documentRelatedTo,
              documentField,
              url,
            ) => {
              setSelectedDocument({
                name,
                action,
                id,
                documentRelatedTo,
                documentField,
                url,
              });
            }}
          />

          <DoctorClinicCard
            onViewDocument={setPreviewImage}
            doctorClinicDetails={doctorClinicDetails}
            onDocumentAction={(
              name,
              action,
              id,
              documentRelatedTo,
              documentField,
              url,
            ) =>
              setSelectedDocument({
                name,
                action,
                id,
                documentRelatedTo,
                documentField,
                url,
              })
            }
          />
        </div>
      </div>

      {selectedDocument && (
        <DocumentVerificationModal
          documentName={selectedDocument.name}
          action={selectedDocument.action}
          service={handleDocumentAction}
          onClose={() => setSelectedDocument(null)}
          isLoading={isVerifyingDoctorDoc || isVerifyingClinicDoc}
          isDark={isDark}
        />
      )}

      {isConfirmOpen && (
        <DeleteConfirmationalModal
          id={doctorId || ""}
          name={doctor.displayName}
          type="Doctor"
          status={isBlocked ? "INACTIVE" : "ACTIVE"}
          action={actionType!}
          service={handleBlockToggle}
          closeDeleteBox={() => setIsConfirmOpen(false)}
          isDark={isDark}
        />
      )}

      {isRejectOpen && (
        <RejectModal<DoctorRejectDto>
          id={doctorId || ""}
          name={doctor.displayName}
          onConfirm={handleRejectConfirm}
          onClose={() => setIsRejectOpen(false)}
          mutateFn={mutateReject}
          isDark={isDark}
        />
      )}

      {previewImage && (
        <div
          className={`fixed inset-0 z-[100] flex animate-fade-in items-center justify-center p-4 backdrop-blur-md sm:p-8 ${theme.imageOverlay}`}
          onClick={() => setPreviewImage(null)}
        >
          <div
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border p-2 shadow-2xl ${theme.imageCard}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-rose-500"
            >
              <X size={20} />
            </button>

            <div
              className={`max-h-[85vh] overflow-auto rounded-xl ${theme.imageContent}`}
            >
              <img
                src={previewImage}
                alt="Document Preview"
                className="h-auto max-h-[80vh] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
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
