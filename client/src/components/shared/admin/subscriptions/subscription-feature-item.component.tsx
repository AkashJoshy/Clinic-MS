import React from "react";
import { Check, X } from "lucide-react";
import type { SubscriptionFeature } from "@/types/subscription";

interface SubscriptionFeatureItemProps {
  feature: SubscriptionFeature;
}

export const SubscriptionFeatureItem: React.FC<SubscriptionFeatureItemProps> = ({
  feature,
}) => {
  return (
    <li className="flex items-start gap-2.5 text-xs text-[#b8c6d8] leading-relaxed">
      {feature.isIncluded ? (
        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[#1dc465]/15 text-[#1dc465] flex items-center justify-center">
          <Check size={11} strokeWidth={3} />
        </span>
      ) : (
        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-white/5 text-gray-500 flex items-center justify-center">
          <X size={11} strokeWidth={2.5} />
        </span>
      )}
      <span
        className={
          feature.isIncluded ? "text-[#c9d5e4]" : "text-gray-500 line-through"
        }
      >
        {feature.name}
      </span>
    </li>
  );
};

export default SubscriptionFeatureItem;
