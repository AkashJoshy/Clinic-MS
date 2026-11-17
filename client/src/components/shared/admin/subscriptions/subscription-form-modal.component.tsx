
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CreditCard, Sparkles, Save, Check, Flame } from "lucide-react";

import {
  subscriptionSchema,
  type SubscriptionFormInput,
  type SubscriptionFormValues,
} from "@/schemas/admin/subscription.schema";

import type {
  SubscriptionPlan,
  SubscriptionFeature,
} from "@/types/subscription";

import SubscriptionFeaturesManager from "./subscription-features-manager.component";

interface SubscriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: SubscriptionFormValues) => void;
  initialData?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  isDark: boolean;
}

export const SubscriptionFormModal: React.FC<SubscriptionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  isDark,
}) => {
  const isEditing = Boolean(initialData);

  const defaultValues: SubscriptionFormValues = {
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    price: initialData?.price ?? 2999,
    currency: initialData?.currency || "INR",
    billingCycle: initialData?.billingCycle || "MONTHLY",
    status: initialData?.status || "ACTIVE",
    isPopular: initialData?.isPopular || false,
    badgeText: initialData?.badgeText || "",
    colorTheme: initialData?.colorTheme || "emerald",
    features: initialData?.features || [],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubscriptionFormInput, any, SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  const isPopularWatch = watch("isPopular");

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const theme = {
    modal: isDark
      ? "border-white/10 bg-[#0c141f]"
      : "border-gray-200 bg-white",

    header: isDark
      ? "border-white/8 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",

    heading: isDark ? "text-white" : "text-gray-900",

    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    closeButton: isDark
      ? "text-gray-400 hover:text-white hover:bg-white/10"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-200",

    label: isDark ? "text-gray-300" : "text-gray-700",

    input: isDark
      ? "bg-[#080d14] border-white/10 text-white placeholder:text-gray-500"
      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400",

    section: isDark
      ? "bg-white/[0.02] border-white/8"
      : "bg-gray-50 border-gray-200",

    popularLabel: isDark ? "text-white" : "text-gray-800",

    divider: isDark ? "border-white/8" : "border-gray-200",

    cancelButton: isDark
      ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };

  const inputClass = `w-full px-3.5 py-2.5 border rounded-xl text-sm focus:border-primary/60 focus:ring-1 focus:ring-primary/30 outline-none transition-all ${theme.input}`;

  const labelClass = `text-xs font-semibold ${theme.label}`;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200 ${
        isDark ? "bg-black/70" : "bg-gray-900/40"
      }`}
    >
      <div
        className={`relative w-full max-w-2xl my-8 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${theme.modal}`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${theme.header}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              {isEditing ? (
                <CreditCard size={20} />
              ) : (
                <Sparkles size={20} />
              )}
            </div>

            <div>
              <h2 className={`text-lg font-bold tracking-tight ${theme.heading}`}>
                {isEditing
                  ? "Edit Subscription Plan"
                  : "Create New Subscription"}
              </h2>

              <p className={`text-xs ${theme.description}`}>
                {isEditing
                  ? "Update subscription terms, pricing, and feature set"
                  : "Define plan tier details, pricing, and dynamic features"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${theme.closeButton}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar"
        >
          {/* Plan Name and Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>
                Subscription Plan Name{" "}
                <span className="text-rose-400">*</span>
              </label>

              <input
                type="text"
                {...register("name")}
                placeholder="e.g. Professional Practice"
                className={inputClass}
              />

              {errors.name && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Tagline / Sub-heading</label>

              <input
                type="text"
                {...register("tagline")}
                placeholder="e.g. Best for busy clinic practitioners"
                className={inputClass}
              />

              {errors.tagline && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.tagline.message}
                </p>
              )}
            </div>
          </div>

          {/* Pricing and Billing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>
                Price (₹ INR) <span className="text-rose-400">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                  ₹
                </span>

                <input
                  type="number"
                  step="1"
                  min="0"
                  {...register("price")}
                  placeholder="2999"
                  className={`pl-8 pr-3.5 ${inputClass}`}
                />
              </div>

              {errors.price && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>
                Billing Cycle <span className="text-rose-400">*</span>
              </label>

              <select
                {...register("billingCycle")}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="YEARLY">Yearly</option>
                <option value="LIFETIME">Lifetime / One-time</option>
              </select>

              {errors.billingCycle && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.billingCycle.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>
                Plan Status <span className="text-rose-400">*</span>
              </label>

              <select
                {...register("status")}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="ACTIVE">Active (Published)</option>
                <option value="INACTIVE">Inactive (Draft)</option>
              </select>

              {errors.status && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className={labelClass}>
              Description <span className="text-rose-400">*</span>
            </label>

            <textarea
              rows={2}
              {...register("description")}
              placeholder="Provide a concise description of what this tier entails..."
              className={`${inputClass} resize-none`}
            />

            {errors.description && (
              <p className="text-xs text-rose-400 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Popular Plan */}
          <div
            className={`p-4 rounded-xl border space-y-3 ${theme.section}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("isPopular")}
                  className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-0 cursor-pointer accent-primary"
                />

                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${theme.popularLabel}`}
                >
                  <Flame size={14} className="text-amber-400" />
                  Highlight as Popular Plan
                </span>
              </label>

              <div className="flex-1 sm:max-w-xs space-y-1">
                <input
                  type="text"
                  {...register("badgeText")}
                  placeholder={
                    isPopularWatch
                      ? "e.g. Most Popular"
                      : "Badge label (optional)"
                  }
                  className={`w-full px-3 py-1.5 border rounded-lg text-xs outline-none focus:border-primary/60 transition-all ${theme.input}`}
                />
              </div>
            </div>
          </div>

          <div className={`pt-2 border-t ${theme.divider}`}>
            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <SubscriptionFeaturesManager
                  features={field.value as SubscriptionFeature[]}
                  onChange={field.onChange}
                  error={errors.features?.message}
                  isDark={isDark}
                />
              )}
            />
          </div>

          {/* Footer Actions */}
          <div
            className={`pt-4 border-t flex items-center justify-end gap-3 ${theme.divider}`}
          >
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 ${theme.cancelButton}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/35 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  {isEditing ? <Save size={15} /> : <Check size={15} />}
                  {isEditing ? "Save Plan Changes" : "Create Plan"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionFormModal;
