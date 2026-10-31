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
}

export const SubscriptionFormModal: React.FC<SubscriptionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
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

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/10 bg-[#0c141f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/30 flex items-center justify-center text-[#1dc465]">
              {isEditing ? <CreditCard size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isEditing
                  ? "Edit Subscription Plan"
                  : "Create New Subscription"}
              </h2>
              <p className="text-xs text-[#8b9ab0]">
                {isEditing
                  ? "Update subscription terms, pricing, and feature set"
                  : "Define plan tier details, pricing, and dynamic features"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                Subscription Plan Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="e.g. Professional Practice"
                className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                Tagline / Sub-heading
              </label>
              <input
                type="text"
                {...register("tagline")}
                placeholder="e.g. Best for busy clinic practitioners"
                className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all"
              />
              {errors.tagline && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.tagline.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
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
                  className="w-full pl-8 pr-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-rose-400 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                Billing Cycle <span className="text-rose-400">*</span>
              </label>
              <select
                {...register("billingCycle")}
                className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all cursor-pointer"
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
              <label className="text-xs font-semibold text-gray-300">
                Plan Status <span className="text-rose-400">*</span>
              </label>
              <select
                {...register("status")}
                className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all cursor-pointer"
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              {...register("description")}
              placeholder="Provide a concise description of what this tier entails..."
              className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all resize-none"
            />
            {errors.description && (
              <p className="text-xs text-rose-400 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("isPopular")}
                  className="w-4 h-4 rounded text-[#1dc465] bg-[#080d14] border-white/20 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
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
                  className="w-full px-3 py-1.5 bg-[#080d14] border border-white/10 rounded-lg text-white text-xs placeholder:text-gray-500 focus:border-[#1dc465]/60 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/8">
            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <SubscriptionFeaturesManager
                  features={field.value as SubscriptionFeature[]}
                  onChange={field.onChange}
                  error={errors.features?.message}
                />
              )}
            />
          </div>

          <div className="pt-4 border-t border-white/8 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1dc465] hover:bg-[#15a050] text-[#080d14] text-xs font-bold transition-all shadow-lg shadow-[#1dc465]/20 hover:shadow-[#1dc465]/35 cursor-pointer active:scale-[0.98]"
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
