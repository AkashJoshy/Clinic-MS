import React, { useState } from "react";
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { SAVED_PAYMENT_METHODS } from "../mock-data";

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [methods, setMethods] = useState(SAVED_PAYMENT_METHODS);

  if (!isOpen) return null;

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
    toast.success("Default payment method updated");
  };

  const handleDelete = (id: string) => {
    if (methods.length <= 1) {
      toast.error("You must maintain at least one linked payment method");
      return;
    }
    setMethods((prev) => prev.filter((m) => m.id !== id));
    toast.success("Payment method removed");
  };

  const handleAddNew = () => {
    toast("Redirecting to secure bank/UPI verification link...", {
      icon: "🔒",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3 className="text-xl font-bold text-[#0D1A27]">
            Payment & Payout Methods
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your verified accounts for instant top-ups and withdrawals.
          </p>
        </div>

        <div className="space-y-3">
          {methods.map((method) => {
            const Icon =
              method.type === "UPI"
                ? QrCode
                : method.type === "BANK"
                ? Building2
                : CreditCard;

            return (
              <div
                key={method.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  method.isDefault
                    ? "bg-emerald-50/40 border-[#1DC465]/60"
                    : "bg-slate-50/70 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      method.isDefault
                        ? "bg-[#1DC465] text-white"
                        : "bg-white border border-slate-200 text-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0D1A27]">
                        {method.title}
                      </span>
                      {method.isDefault && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                          <Check className="w-3 h-3" /> Default
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {method.detail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!method.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(method.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(method.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#1DC465] text-slate-600 hover:text-[#118042] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bank Account or UPI ID</span>
        </button>

        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0D1A27] text-white text-xs font-semibold hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
