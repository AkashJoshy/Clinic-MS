import React, { useState } from "react";
import { Plus, Check, X, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import type { SubscriptionFeature } from "@/types/subscription";

interface SubscriptionFeaturesManagerProps {
  features: SubscriptionFeature[];
  onChange: (features: SubscriptionFeature[]) => void;
  error?: string;
}

export const SubscriptionFeaturesManager: React.FC<SubscriptionFeaturesManagerProps> = ({
  features,
  onChange,
  error,
}) => {
  const [newFeatureText, setNewFeatureText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAddFeature = () => {
    const trimmed = newFeatureText.trim();
    if (!trimmed) {
      setInputError("Please enter feature text.");
      return;
    }
    if (trimmed.length < 2) {
      setInputError("Feature text must be at least 2 characters.");
      return;
    }

    const newFeature: SubscriptionFeature = {
      id: `feat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      isIncluded: true,
    };

    onChange([...features, newFeature]);
    setNewFeatureText("");
    setInputError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const startEditing = (feature: SubscriptionFeature) => {
    setEditingId(feature.id);
    setEditingText(feature.name);
  };

  const saveEditing = (id: string) => {
    const trimmed = editingText.trim();
    if (!trimmed) return;

    const updated = features.map((f) =>
      f.id === id ? { ...f, name: trimmed } : f
    );
    onChange(updated);
    setEditingId(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const toggleIncluded = (id: string) => {
    const updated = features.map((f) =>
      f.id === id ? { ...f, isIncluded: !f.isIncluded } : f
    );
    onChange(updated);
  };

  const removeFeature = (id: string) => {
    const updated = features.filter((f) => f.id !== id);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <span>Plan Features</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300">
            {features.length}
          </span>
        </label>
        <span className="text-xs text-[#8b9ab0]">
          Add and edit individual features below
        </span>
      </div>

      {/* Add new feature input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={newFeatureText}
            onChange={(e) => {
              setNewFeatureText(e.target.value);
              if (inputError) setInputError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Unlimited Video Consultations or EMR integration..."
            className="w-full px-3.5 py-2.5 bg-[#0a111a] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/30 outline-none transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleAddFeature}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1dc465] hover:bg-[#15a050] text-[#080d14] rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg flex-shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Feature
        </button>
      </div>

      {inputError && (
        <p className="text-xs text-rose-400 font-medium">{inputError}</p>
      )}

      {/* Feature list */}
      {features.length === 0 ? (
        <div className="text-center py-6 px-4 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
          <p className="text-xs text-gray-400">
            No features added yet. Type a feature above and click &quot;Add Feature&quot;.
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
          {features.map((feature, index) => {
            const isEditing = editingId === feature.id;

            return (
              <div
                key={feature.id}
                className={`group flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all ${
                  isEditing
                    ? "bg-[#132233] border-[#1dc465]/50 shadow-inner"
                    : "bg-[#0c1622] border-white/8 hover:border-white/15"
                }`}
              >
                {isEditing ? (
                  /* Inline Edit Mode */
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          saveEditing(feature.id);
                        } else if (e.key === "Escape") {
                          cancelEditing();
                        }
                      }}
                      autoFocus
                      className="flex-1 px-3 py-1.5 bg-[#0a111a] border border-[#1dc465]/50 rounded-lg text-white text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => saveEditing(feature.id)}
                      className="p-1.5 rounded-lg bg-[#1dc465] text-[#080d14] hover:bg-[#15a050] transition-colors"
                      title="Save change"
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                      title="Cancel edit"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  /* Normal Display Mode */
                  <>
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => toggleIncluded(feature.id)}
                        title={feature.isIncluded ? "Mark as excluded" : "Mark as included"}
                        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          feature.isIncluded
                            ? "bg-[#1dc465]/15 text-[#1dc465] hover:bg-[#1dc465]/25"
                            : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        }`}
                      >
                        {feature.isIncluded ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                      </button>
                      <span className="text-xs text-gray-500 select-none">
                        #{index + 1}
                      </span>
                      <span
                        className={`text-xs truncate ${
                          feature.isIncluded
                            ? "text-gray-200"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => startEditing(feature)}
                        title="Edit feature text"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature.id)}
                        title="Delete feature"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
};

export default SubscriptionFeaturesManager;
