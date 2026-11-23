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
import DeleteConfirmationalModal from "./delete-confirmational-modal.shared";
import type { EntityStatus, UpdateMethods } from "@/types/common";
import { useMutate } from "@/hooks/use-mutate.hook";
import { updatePatient } from "@/services/admin.service";
import { getPatientListItemTheme } from "@/helpers/admin/patients.helper";

export const PatientListItem = ({
  patientInfo,
  setPatientInfo,
  isDark,
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

  const theme = getPatientListItemTheme(isDark);

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
    if (selectedPatient?.id) {
      mutate({
        id: selectedPatient.id,
        method: selectedPatient.action,
      });
    }
  }

  function closeDeleteBox() {
    setIsOpen(false);
  }

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${theme.card} ${theme.cardHover}`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-primary/10">
            {isPatient?.imageUrl?.url ? (
              <img
                src={isPatient.imageUrl.url}
                alt={isPatient.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={22} className="text-primary" />
            )}
          </div>

          <div className="min-w-0">
            <div>
              <h3
                className={`w-30 truncate text-base font-semibold xsxs:max-w-20 md:max-w-40 ${theme.heading}`}
              >
                {isPatient?.displayName || "Name unavailable"}
              </h3>

              <span
                className={`rounded-md border px-2 py-1 text-[11px] ${theme.idBadge}`}
              >
                {isPatient?.patientNumber ?? "Patient ID unavailable"}
              </span>
            </div>

            {isUser && (
              <div className={`mt-3 text-xs ${theme.muted}`}>
                <div className="flex min-w-0 gap-1">
                  <Mail size={13} className="mt-0.5 shrink-0 text-primary" />

                  <span className="truncate xsxs:w-20 xxs:w-40 md:w-30">
                    {isUser.email || "Email address unavailable"}
                  </span>
                </div>

                <div className="mt-2 flex w-30 gap-1 truncate">
                  <Phone size={13} className="shrink-0 text-primary" />
                  {isUser.phone || "Phone unavailable"}
                </div>

                <div className="mt-2 flex xsxs:gap-2 xxs:gap-8">
                  {isPatient?.medicalInformation?.bloodGroup && (
                    <div className="flex items-center gap-1">
                      <Droplet size={13} className="text-primary" />
                      {isPatient.medicalInformation.bloodGroup}
                    </div>
                  )}

                  <div className="w-22 truncate">{isPatient?.gender}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isUser ? (
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row xl:flex-col">
            <span
              className={`rounded-lg py-2 text-center text-xs font-semibold xsxs:w-full xsxs:py-2 md:w-35 md:py-3 ${
                isUser.isBlocked
                  ? "bg-red-500/15 text-red-400"
                  : isUser.isActive
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-gray-500/15 text-gray-400"
              }`}
            >
              {isUser.isBlocked
                ? "Blocked"
                : isUser.isActive
                  ? "Active"
                  : "Inactive"}
            </span>

            <button
              type="button"
              onClick={() => navigate(`/admin/patients/${isPatient.id}`)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-xs transition xsxs:w-full md:w-35 ${theme.detailsButton} ${theme.detailsHover} hover:border-primary/40`}
            >
              <Eye size={13} />
              Details
            </button>

            {!isUser.isBlocked && isUser.isActive ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);

                  if (isPatient.id) {
                    setSelectedPatient({
                      id: isPatient.id,
                      name: isPatient.displayName,
                      action: "BLOCK",
                      status: "ACTIVE",
                    });
                  }
                }}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-xs text-red-400 transition hover:bg-red-500 hover:text-white xsxs:w-full md:w-35"
              >
                <Ban size={12} />
                Block
              </button>
            ) : !isUser.isBlocked && !isUser.isActive ? (
              ""
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);

                  if (isPatient.id) {
                    setSelectedPatient({
                      id: isPatient.id,
                      name: isPatient.displayName,
                      action: "RESTORE",
                      status: "INACTIVE",
                    });
                  }
                }}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 py-2 text-xs text-primary transition hover:bg-primary hover:text-white xsxs:w-full md:w-35"
              >
                <RotateCcw size={12} />
                Restore
              </button>
            )}
          </div>
        ) : (
          <div
            className={`flex min-w-35 flex-col items-center justify-center gap-2 rounded-xl border px-5 py-3 ${theme.missingCard}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
              <Ban size={15} className="text-red-400" />
            </div>

            <div className="text-center">
              <p className="text-xs font-semibold text-red-400">
                User Details Missing
              </p>

              <p className={`mt-0.5 text-[10px] ${theme.missingText}`}>
                Account information unavailable
              </p>
            </div>
          </div>
        )}
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
            isDark={isDark}
          />
        ) : null)}
    </div>
  );
};
