import {
  Phone,
  Mail,
  Eye,
  RotateCcw,
  UserRound,
  Droplet,
  Ban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PatientListItemProps } from "@/types/patient";
import { useState } from "react";
import DeleteConfirmationalModal from "./DeleteConfirmationalModal";
import type { EntityStatus, UpdateMethods } from "@/types/common";
import { useMutate } from "@/hooks/useMutate";
import { updatePatient } from "@/services/admin.service";

export const PatientListItem = ({
  patientInfo,
  setPatientInfo,
}: PatientListItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<
    | ({ id: string; name: string; status: EntityStatus } & {
        action: UpdateMethods;
      })
    | null
  >(null);
  const navigate = useNavigate();

  const isUser = patientInfo.user;
  const isPatient = patientInfo.patient;

  const { mutate } = useMutate(updatePatient, {
    onSuccess: (data) => {
      setIsOpen(false);
      if (data.data?.userId === isPatient?.userId) {
        setPatientInfo((prev) => {
          return prev.map((p) => {
            if (p.patient?.userId === data.data?.userId) {
              return {
                ...p,
                user: {
                  ...p.user,
                  isActive: data.data?.isActive,
                  isBlocked: data.data?.isBlocked,
                },
              };
            }

            return p;
          });
        });
      }
    },
  });

  function onUpdate() {
    if (selectedPatient && selectedPatient.id) {
      mutate({ id: selectedPatient.id, method: selectedPatient.action });
    }
  }

  function closeDeleteBox() {
    setIsOpen(false);
  }

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-xl p-4 hover:border-[#1dc465]/30 transition-all">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#1dc465]/10 border border-[#1dc465]/20 flex items-center justify-center shrink-0">
            {isPatient?.imageUrl?.url ? (
              <img
                src={isPatient?.imageUrl.url}
                alt={isPatient?.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserRound size={22} className="text-[#1dc465]" />
            )}
          </div>

          <div className=" ">
            <div className="">
              <h3 className="text-white text-base font-semibold truncate xsxs:max-w-20 md:max-w-40">
                {isPatient?.displayName}
              </h3>

              <span className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[#8b9ab0]">
                {isPatient?.patientNumber ?? "Patient Number not found"}
              </span>
            </div>

            <div className="mt-3 text-xs text-[#8b9ab0]">
              <div className="flex gap-1 min-w-0">
                <Mail size={13} className="text-[#1dc465] shrink-0 mt-0.5" />
                <span className="truncate xsxs:w-20 xxs:w-40 md:w-30">
                  {isUser?.email || "Email address unavailable"}
                </span>
              </div>

              <div className="gap-1 flex mt-2 truncate w-30">
                <Phone size={13} className="text-[#1dc465]" />
                {isUser?.phone || "Phone unavailable"}
              </div>

              <div className="flex mt-2 xsxs:gap-2 xxs:gap-8 ">
                {isPatient?.medicalInformation.bloodGroup && (
                  <div className="flex">
                    <Droplet size={13} className="text-[#1dc465]" />
                    {isPatient?.medicalInformation.bloodGroup}
                  </div>
                )}

                <div className="">{isPatient?.gender}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row xl:flex-col gap-2 shrink-0">
          <span
            className={`xsxs:w-full md:w-35 text-center text-xs font-semibold xsxs:py-2 md:py-3 rounded-lg ${
              isUser?.isActive
                ? "bg-[#1dc465]/15 text-[#1dc465]"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {isUser?.isActive ? "Active" : "Blocked"}
          </span>

          <button
            onClick={() => navigate(`/admin/patients/${isPatient.id}`)}
            className="xsxs:w-full md:w-35 flex text-xs items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-[#8b9ab0] hover:text-white hover:border-[#1dc465]/40 transition cursor-pointer"
          >
            <Eye size={13} />
            Details
          </button>

          {isUser?.isActive ? (
            <button
              onClick={() => {
                setIsOpen(true);
                if (patientInfo.patient.id)
                  setSelectedPatient({
                    id: patientInfo.patient.id,
                    name: patientInfo.patient.displayName,
                    action: "BLOCK",
                    status: "ACTIVE",
                  });
              }}
              className="xsxs:w-full md:w-35 text-xs flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              <Ban size={12} />
              Block
            </button>
          ) : (
            <button
              onClick={() => {
                setIsOpen(true);
                if (patientInfo.patient.id)
                  setSelectedPatient({
                    id: patientInfo.patient.id,
                    name: patientInfo.patient.displayName,
                    action: "RESTORE",
                    status: "INACTIVE",
                  });
              }}
              className="xsxs:w-full md:w-35 text-xs flex items-center justify-center gap-2 py-2 rounded-lg bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465] hover:bg-[#1dc465] hover:text-black transition cursor-pointer"
            >
              <RotateCcw size={12} />
              Restore
            </button>
          )}
        </div>
      </div>

      {isOpen &&
        (selectedPatient ? (
          <DeleteConfirmationalModal
            id={selectedPatient.id}
            name={selectedPatient.name}
            type="Patient"
            service={onUpdate}
            action={selectedPatient.action}
            status={selectedPatient.status}
            closeDeleteBox={closeDeleteBox}
          />
        ) : (
          ""
        ))}
    </div>
  );
};
