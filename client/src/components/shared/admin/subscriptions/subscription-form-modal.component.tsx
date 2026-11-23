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
import { getSubscriptionFormModalTheme } from "@/helpers/admin/subscription.helper";

interface SubscriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: SubscriptionFormValues) => void;
  initialData?: SubscriptionPlan | null;
  isSubmitting?: boolean;
  isDark: boolean;
}

const DEFAULT_COLOR = "#10B981";

const isValidHexColor = (color?: string) =>
  Boolean(color && /^#[0-9A-F]{6}$/i.test(color));

const getPlanColor = (color?: string) =>
  isValidHexColor(color) ? color!.toUpperCase() : DEFAULT_COLOR;

const getDefaultValues = (
  data?: SubscriptionPlan | null,
): SubscriptionFormValues => ({
  name: data?.name ?? "",
  tagline: data?.tagline ?? "",
  description: data?.description ?? "",
  price: data?.price ?? 2999,
  currency: data?.currency ?? "INR",
  billingCycle: data?.billingCycle ?? "MONTHLY",
  status: data?.status ?? "ACTIVE",
  isPopular: data?.isPopular ?? false,
  badgeText: data?.badgeText ?? "",
  colorTheme: getPlanColor(data?.colorTheme),
  features: data?.features ?? [],
});

export const SubscriptionFormModal: React.FC<SubscriptionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  isDark,
}) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubscriptionFormInput, any, SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: getDefaultValues(initialData),
  });

  const isPopularWatch = watch("isPopular");

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(initialData));
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const theme = getSubscriptionFormModalTheme(isDark)

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
              {isEditing ? <CreditCard size={20} /> : <Sparkles size={20} />}
            </div>

            <div>
              <h2
                className={`text-lg font-bold tracking-tight ${theme.heading}`}
              >
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
                Subscription Plan Name <span className="text-rose-400">*</span>
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
                  className={`pl-8 ${inputClass}`}
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

          <Controller
            name="colorTheme"
            control={control}
            render={({ field }) => {
              const color = isValidHexColor(field.value)
                ? field.value
                : DEFAULT_COLOR;

              return (
                <div className="space-y-1.5">
                  <label className={labelClass}>Plan Color</label>

                  <div
                    className={`flex items-center gap-3 p-2.5 rounded-xl border ${theme.section}`}
                  >
                    {/* Color Picker */}
                    <label
                      className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden cursor-pointer border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                      title="Choose plan color"
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(event) =>
                          field.onChange(event.target.value.toUpperCase())
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Choose subscription plan color"
                      />
                    </label>

                    {/* HEX Input */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <p
                        className={`text-[11px] font-medium ${theme.description}`}
                      >
                        Selected color
                      </p>

                      <input
                        type="text"
                        value={field.value ?? DEFAULT_COLOR}
                        onChange={(event) =>
                          field.onChange(event.target.value.toUpperCase())
                        }
                        placeholder="#10B981"
                        maxLength={7}
                        className={`w-full bg-transparent text-sm font-semibold tracking-wide outline-none ${theme.heading}`}
                      />
                    </div>

                    {/* Color Indicator */}
                    <div
                      className="w-7 h-7 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {errors.colorTheme && (
                    <p className="text-xs text-rose-400 font-medium">
                      {errors.colorTheme.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Popular Plan */}
          <div className={`p-4 rounded-xl border space-y-3 ${theme.section}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("isPopular")}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />

                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${theme.popularLabel}`}
                >
                  <Flame size={14} className="text-amber-400" />
                  Highlight as Popular Plan
                </span>
              </label>

              <input
                type="text"
                {...register("badgeText")}
                placeholder={
                  isPopularWatch
                    ? "e.g. Most Popular"
                    : "Badge label (optional)"
                }
                className={`w-full sm:max-w-xs px-3 py-1.5 border rounded-lg text-xs outline-none focus:border-primary/60 ${theme.input}`}
              />
            </div>
          </div>

          {/* Features */}
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
