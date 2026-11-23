import React from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface DoctorNotFoundProps {
  onBack: () => void;
  theme: {
    backButton: string;
    card: string;
    heading: string;
    muted: string;
    primaryButton: string;
  };
}

const DoctorNotFound: React.FC<DoctorNotFoundProps> = ({ onBack, theme }) => {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <button
        onClick={onBack}
        className={`mb-4 flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold transition-colors ${theme.backButton}`}
      >
        <ArrowLeft size={16} />
        Back to Doctor Management
      </button>

      <div
        className={`mx-auto max-w-lg rounded-2xl border p-8 text-center ${theme.card}`}
      >
        <AlertTriangle className="mx-auto mb-4 text-amber-500" size={48} />

        <h2 className={`${theme.heading} mb-2 text-xl font-bold`}>
          Doctor Not Found
        </h2>

        <p className={`${theme.muted} mb-6 text-sm`}>
          The doctor profile you are looking for does not exist or has been
          removed.
        </p>

        <button
          onClick={onBack}
          className={`cursor-pointer rounded-xl bg-primary px-6 py-2.5 font-semibold transition-all ${theme.primaryButton}`}
        >
          Go Back to List
        </button>
      </div>
    </div>
  );
};

export default DoctorNotFound;
