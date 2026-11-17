import React from "react";
import { useFormContext } from "react-hook-form";
import { ShieldCheck, Info, Sparkles } from "lucide-react";
import type { DoctorSettingsValues } from "@/types/doctor-settings";
import { PanCardItem } from "./kyc/pan-card-item.component";
import { BankAccountItem } from "./kyc/bank-account-item.component";
import { AadhaarItem } from "./kyc/aadhaar-item.component";
import { useDoctorKyc } from "@/hooks/use-doctor-kyc.hook";

export interface KycSectionProps {
  isDark: boolean;
}

export const KycSection: React.FC<KycSectionProps> = ({ isDark }) => {
  const { watch } = useFormContext<DoctorSettingsValues>();
  const { aadhaarDetails, bankDetails, panDetails, isLoading } = useDoctorKyc();

  const verifiedCount = [
    panDetails?.status === "VERIFIED",
    bankDetails?.status === "VERIFIED",
    aadhaarDetails?.status === "VERIFIED",
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* KYC Verification Banner */}
      <div
        className={`p-5 rounded-2xl border transition-colors ${
          isDark
            ? "bg-gradient-to-r from-primary/10 via-[#0d1a27] to-[#0d1a27] border-primary/20"
            : "bg-gradient-to-r from-primary/10 via-emerald-50/40 to-white border-primary/20"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={20} className="text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4
                  className={`text-base font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Doctor KYC & Regulatory Compliance
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                  <Sparkles size={11} /> {verifiedCount} of 3 Documents Verified
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-600"
                }`}
              >
                Government-mandated identity documents and verified banking
                details for regulatory compliance, TDS taxation, and direct
                consultation payout transfers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {panDetails && <PanCardItem details={panDetails} isDark={isDark} />}

        {bankDetails && (
          <BankAccountItem details={bankDetails} isDark={isDark} />
        )}

        {aadhaarDetails && (
          <AadhaarItem details={aadhaarDetails} isDark={isDark} />
        )}
      </div>

      <div
        className={`flex items-start gap-3 p-4 rounded-xl border text-xs leading-relaxed ${
          isDark
            ? "bg-[#060c13] border-white/5 text-[#6b7c93]"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        <Info size={16} className="text-primary shrink-0 mt-0.5" />
        <p>
          All submitted identity documents are encrypted with AES-256 and
          verified through authorized government gateways (UIDAI / NSDL / NPCI).
          We never share your sensitive financial records with third parties.
        </p>
      </div>
    </div>
  );
};

export default KycSection;
