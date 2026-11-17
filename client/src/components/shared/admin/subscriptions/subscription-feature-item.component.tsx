import React from "react";
import { Check, X } from "lucide-react";
import type { SubscriptionFeature } from "@/types/subscription";

interface SubscriptionFeatureItemProps {
  feature: SubscriptionFeature;
  isDark: boolean
}

export const SubscriptionFeatureItem: React.FC<SubscriptionFeatureItemProps> = ({
  feature,
  isDark
}) => {

  return (
    <li
      className={`flex items-start gap-2.5 text-xs leading-relaxed ${
        isDark ? "text-[#b8c6d8]" : "text-gray-700"
      }`}
    >
      {feature.isIncluded ? (
        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#1dc465]/15 text-[#1dc465]">
          <Check size={11} strokeWidth={3} />
        </span>
      ) : (
        <span
          className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
            isDark
              ? "bg-white/5 text-gray-500"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <X size={11} strokeWidth={2.5} />
        </span>
      )}

      <span
        className={
          feature.isIncluded
            ? isDark
              ? "text-[#c9d5e4]"
              : "text-gray-700"
            : "text-gray-500 line-through"
        }
      >
        {feature.name}
      </span>
    </li>
  );
};

export default SubscriptionFeatureItem;