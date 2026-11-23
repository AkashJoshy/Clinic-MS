import React, { useEffect, useState } from "react";

import { X, CreditCard, ShieldCheck, Lock, AlertCircle } from "lucide-react";

import type { ManagePaymentMethodModalProps } from "@/types/doctor-subscription";

export const ManagePaymentMethodModal: React.FC<
  ManagePaymentMethodModalProps
> = ({ subscription, isOpen, isDark, onClose, onUpdatePaymentMethod }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setCardNumber("");
    setExpiry("");
    setCardHolder("");
    setCvv("");
    setError("");
  }, [isOpen, subscription?.id]);

  if (!isOpen) return null;

  const cleanNumber = cardNumber.replace(/\D/g, "");

  const detectCardBrand = (number: string): string => {
    if (/^4/.test(number)) return "Visa";

    if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(number)) {
      return "Mastercard";
    }

    if (/^3[47]/.test(number)) return "American Express";
    if (/^6(?:011|5)/.test(number)) return "Discover";

    return "Card";
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    return digits.match(/.{1,4}/g)?.join(" ") ?? "";
  };

  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      setExpiry(digits);
      return;
    }

    setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      setError("Please enter a valid card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError("Enter a valid expiry date in MM/YY format.");
      return;
    }

    const [monthString, yearString] = expiry.split("/");
    const month = Number(monthString);
    const year = 2000 + Number(yearString);
    const now = new Date();
    const expiryDate = new Date(year, month, 0, 23, 59, 59);

    if (expiryDate < now) {
      setError("This card has expired. Please use a valid card.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV.");
      return;
    }

    if (!cardHolder.trim()) {
      setError("Please enter the name on the card.");
      return;
    }

    const brand = detectCardBrand(cleanNumber);
    const last4 = cleanNumber.slice(-4);

    // Send display metadata only. Never persist raw card details or CVV.
    onUpdatePaymentMethod(brand, last4, expiry);
  };

  const currentPaymentMethod = subscription?.paymentMethod ?? null;

  const previewBrand = cleanNumber ? detectCardBrand(cleanNumber) : "NEW CARD";

  const previewLast4 = cleanNumber
    ? cleanNumber.slice(-4).padStart(4, "•")
    : "••••";

  const previewExpiry = expiry || "MM/YY";

  const modalBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const headerBg = isDark ? "bg-[#09101a]" : "bg-slate-50";
  const borderColor = isDark ? "border-white/10" : "border-slate-200";
  const primaryText = isDark ? "text-white" : "text-slate-900";
  const secondaryText = isDark ? "text-gray-300" : "text-slate-700";
  const mutedText = isDark ? "text-gray-400" : "text-slate-600";
  const inputBg = isDark ? "bg-white/5" : "bg-slate-50";
  const inputBorder = isDark ? "border-white/10" : "border-slate-200";
  const subtlePanel = isDark
    ? "border-white/5 bg-white/[0.02]"
    : "border-slate-200 bg-slate-50";

  const inputClass = `w-full rounded-xl border ${inputBorder} ${inputBg} px-3 py-2 text-xs ${secondaryText} transition-colors placeholder:text-gray-500 focus:border-primary focus:outline-none`;

  const labelClass = `text-[11px] font-bold uppercase tracking-wider ${mutedText}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-in fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-method-title"
        className={`flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border ${borderColor} ${modalBg} shadow-2xl`}
      >
        {/* Header */}
        <div
          className={`flex shrink-0 items-center justify-between border-b ${borderColor} ${headerBg} px-6 py-4`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <CreditCard size={16} />
            </span>

            <h3
              id="payment-method-title"
              className={`text-sm font-bold ${primaryText}`}
            >
              {currentPaymentMethod
                ? "Manage Payment Method"
                : "Add Payment Method"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
              isDark
                ? "text-gray-400 hover:bg-white/10 hover:text-white"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`flex-1 space-y-4 overflow-y-auto p-6 text-xs ${secondaryText}`}
        >
          {/* Card Preview */}
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-tr from-[#0a1b24] via-[#0e2a33] to-[#123e3e] p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                {previewBrand}
              </span>
              <Lock size={13} className="text-gray-300" />
            </div>

            <div className="mt-4 font-mono text-base tracking-widest text-white">
              •••• •••• •••• {previewLast4}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px]">
              <div>
                <span className="block text-[9px] uppercase text-gray-300">
                  Cardholder
                </span>
                <span className="font-semibold text-white">
                  {cardHolder.trim() || "Name on Card"}
                </span>
              </div>

              <div>
                <span className="block text-[9px] uppercase text-gray-300">
                  Expires
                </span>
                <span className="font-semibold text-white">
                  {previewExpiry}
                </span>
              </div>
            </div>
          </div>

          <p className={`text-[11px] leading-relaxed ${mutedText}`}>
            {currentPaymentMethod
              ? `Current payment method: ${currentPaymentMethod.replaceAll("_", " ")}. Enter your new card details below.`
              : "No saved card details are available. Enter your card details to add a payment method."}
          </p>

          {/* Card Number */}
          <div className="space-y-1.5">
            <label htmlFor="payment-card-number" className={labelClass}>
              Card Number
            </label>

            <input
              id="payment-card-number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="Enter card number"
              required
              maxLength={23}
              className={inputClass}
            />
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="payment-card-expiry" className={labelClass}>
                Expiry Date (MM/YY)
              </label>

              <input
                id="payment-card-expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="payment-card-cvv" className={labelClass}>
                Security CVV
              </label>

              <input
                id="payment-card-cvv"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                maxLength={4}
                pattern="[0-9]{3,4}"
                placeholder="CVV"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Cardholder */}
          <div className="space-y-1.5">
            <label htmlFor="payment-cardholder" className={labelClass}>
              Name on Card
            </label>

            <input
              id="payment-cardholder"
              type="text"
              autoComplete="cc-name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Enter cardholder name"
              required
              className={inputClass}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-[11px] text-red-500 dark:text-red-300"
            >
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Security Notice */}
          <div
            className={`flex items-start gap-2 rounded-lg border p-2.5 text-[11px] ${subtlePanel} ${mutedText}`}
          >
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>
              Use a PCI-DSS-compliant payment provider to securely collect and
              tokenize card details. Never store raw card numbers or CVV in your
              application database.
            </span>
          </div>

          {/* Footer */}
          <div
            className={`flex items-center justify-end gap-2.5 border-t ${borderColor} pt-3`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                isDark
                  ? "border-white/10 text-gray-300 hover:bg-white/5"
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              {currentPaymentMethod
                ? "Update Payment Method"
                : "Add Payment Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
