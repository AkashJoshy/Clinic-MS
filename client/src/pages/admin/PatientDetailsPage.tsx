import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Droplet,
  ShieldAlert,
  HeartPulse,
  UserCheck,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert as BlockIcon,
} from "lucide-react";
import { getPatient, updatePatient } from "@/services/admin.service";
import { useMutate } from "@/hooks/useMutate";
import toast from "react-hot-toast";
import type { PatientInfo } from "@/types/patient";
import DeleteConfirmationalModal from "@/components/shared/DeleteConfirmationalModal";

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

  const calculateAge = (dobString: string) => {
    if (!dobString) return "";
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return "";
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    return `${years} years`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full space-y-4">
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
          <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-[#1dc465]/10 border-2 border-[#1dc465]/35 flex items-center justify-center">
              {patient.imageUrl?.url ? (
                <img
                  src={patient.imageUrl.url}
                  alt={patient.displayName}
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <User size={56} className="text-[#1dc465]" />
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-white text-xl font-bold tracking-tight">
                {patient.displayName}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0]">
                  {patient.patientNumber}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0] capitalize">
                  {patient.relation === "Self" ? "Primary Patient" : `Relation: ${patient.relation}`}
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8b9ab0]">Account Status</span>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    user.isActive
                      ? "bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465]"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                  }`}
                >
                  {user.isActive ? "Active" : "Blocked"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8b9ab0]">Email Verification</span>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    user.isEmailVerified
                      ? "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                      : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                  }`}
                >
                  {user.isEmailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6 space-y-4">
            <h3 className="text-white text-sm font-semibold border-b border-white/5 pb-2">
              Quick Contacts
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Email Address</p>
                  <p className="text-white text-sm break-all font-medium">{user.email || "No Email Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Phone Number</p>
                  <p className="text-white text-sm font-medium">{user.phone || "No Phone Provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-[#1dc465] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase text-[#8b9ab0] font-semibold tracking-wider">Joined Date</p>
                  <p className="text-white text-sm font-medium">{formatDate(String(user.createdAt))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
              <User size={18} className="text-[#1dc465]" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Gender</p>
                <p className="text-white font-medium capitalize text-sm">{patient.gender.toLowerCase()}</p>
              </div>
              
              <div>
                <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Date of Birth</p>
                <p className="text-white font-medium text-sm">{formatDate(patient.dateOfBirth)}</p>
              </div>

              <div>
                <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-1">Age</p>
                <p className="text-white font-medium text-sm">
                  {calculateAge(patient.dateOfBirth) || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
            <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
              <HeartPulse size={18} className="text-[#1dc465]" />
              Medical Profile
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                  <Droplet size={18} className="text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Blood Group</p>
                  <p className="text-white font-bold text-base">
                    {patient.medicalInformation?.bloodGroup || "Not Specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-2">Allergies</p>
                  {patient.medicalInformation?.allergies && patient.medicalInformation.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.medicalInformation.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white text-sm bg-white/5 px-3 py-2 rounded-xl border border-white/5 inline-block font-medium">
                      No Allergies Reported
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider mb-2">Chronic Conditions</p>
                  {patient.medicalInformation?.chronicConditions && patient.medicalInformation.chronicConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.medicalInformation.chronicConditions.map((condition, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white text-sm bg-white/5 px-3 py-2 rounded-xl border border-white/5 inline-block font-medium">
                      No Chronic Conditions
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
              <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#1dc465]" />
                Primary Address
              </h3>
              
              {address ? (
                <div className="space-y-3.5 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Street Address</p>
                    <p className="text-white font-medium">{address.addressLine}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">City</p>
                      <p className="text-white font-medium">{address.city}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">State / Region</p>
                      <p className="text-white font-medium">{address.state}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Country</p>
                      <p className="text-white font-medium">{address.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Pincode</p>
                      <p className="text-white font-medium">{address.pincode}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-white/2 text-[#8b9ab0] text-center">
                  <MapPin size={24} className="opacity-40 mb-2" />
                  <p className="text-xs font-semibold">No Address Details Registered</p>
                </div>
              )}
            </div>

            <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
              <h3 className="text-white text-base font-semibold border-b border-white/5 pb-3 mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-[#1dc465]" />
                Emergency Contact
              </h3>
              
              {patient.emergencyContact?.name ? (
                <div className="space-y-3.5 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Contact Name</p>
                    <p className="text-white font-medium text-base">{patient.emergencyContact.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Relationship</p>
                      <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white capitalize mt-1 inline-block">
                        {patient.emergencyContact.relationship || "Guardian"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-[#8b9ab0] font-semibold uppercase tracking-wider">Phone Number</p>
                      <a
                        href={`tel:${patient.emergencyContact.phone}`}
                        className="text-[#1dc465] hover:text-[#159a4e] font-semibold transition-colors flex items-center gap-1 mt-1 group w-fit"
                      >
                        {patient.emergencyContact.phone}
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-white/2 text-[#8b9ab0] text-center">
                  <ShieldAlert size={24} className="opacity-40 mb-2" />
                  <p className="text-xs font-semibold">No Emergency Contact Registered</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8b9ab0]">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#1dc465]" />
              Profile Created: {formatDate(patient.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#1dc465]" />
              Last Updated: {formatDate(patient.updatedAt)}
            </span>
          </div>
        </div>
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
