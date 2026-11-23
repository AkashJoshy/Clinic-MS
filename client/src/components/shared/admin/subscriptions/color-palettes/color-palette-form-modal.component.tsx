
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCcw, Save, Palette } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CALENDAR_STATUS_LABELS,
  CALENDAR_STATUSES,
  DEFAULT_COLORS,
} from "@/constants/color-palette.constant";
import type {
  ColorPalette,
  PaletteColors,
} from "@/types/admin/color-palette.types";
import ColorPalettePreview from "./color-palette-preview.component";
import { ColorRow } from "./color-row.shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorPaletteSchema } from "@/schemas/admin/color-palette.schema";
import type { ColorPaletteFormData } from "@/schemas/admin/admin.schema";
import { getColorPaletteFormModalTheme } from "@/helpers/admin/subscription.helper";

interface ColorPaletteFormModalProps {
  isOpen: boolean;
  isDark: boolean;
  initialData: ColorPalette | null;
  onClose: () => void;
  onSubmit: (data: ColorPaletteFormData) => void;
}

const ColorPaletteFormModal: React.FC<ColorPaletteFormModalProps> = ({
  isOpen,
  isDark,
  initialData,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ColorPaletteFormData>({
    resolver: zodResolver(colorPaletteSchema),
    defaultValues: {
      id: null,
      name: "",
      colors: DEFAULT_COLORS,
      isActive: true,
    },
    mode: "onSubmit",
  });

  const isEditing = Boolean(initialData);
  const colors = watch("colors");

  const theme = getColorPaletteFormModalTheme(isDark);

  useEffect(() => {
    if (!isOpen) return;

    reset({
      id: initialData?.id ?? null,
      name: initialData?.name ?? "",
      colors: initialData?.colors ?? DEFAULT_COLORS,
      isActive: initialData?.isActive ?? true,
    });
  }, [isOpen, initialData, reset]);

  const handleColorChange = (
    status: keyof PaletteColors,
    value: string,
  ) => {
    setValue(`colors.${status}`, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleReset = () => {
    setValue("colors", DEFAULT_COLORS, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleFormSubmit = (data: ColorPaletteFormData) => {
    onSubmit({
      ...data,
      name: data.name.trim(),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-3 sm:p-5 ${theme.overlay}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-modal-title"
            className={`my-auto w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl ${theme.modal}`}
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Palette size={19} />
                  </div>

                  <div>
                    <h2
                      id="palette-modal-title"
                      className={`text-sm font-bold ${theme.heading}`}
                    >
                      {isEditing
                        ? "Edit Color Palette"
                        : "Create Color Palette"}
                    </h2>

                    <p className={`mt-0.5 text-[11px] ${theme.description}`}>
                      Configure your calendar status colors.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors ${theme.iconButton}`}
                >
                  <X size={17} />
                </button>
              </div>

              <div className="max-h-[70vh] scrollbar-none custom-scrollbar scrollbar-dark space-y-5 overflow-y-auto p-5 sm:p-6">
                <div className="space-y-2">
                  <label
                    htmlFor="palette-name"
                    className={`text-xs font-semibold ${theme.heading}`}
                  >
                    Palette name
                  </label>

                  <input
                    id="palette-name"
                    type="text"
                    placeholder="e.g. Primary, Ocean, Rose"
                    maxLength={40}
                    {...register("name", {
                      required: "Please enter a palette name.",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Palette name cannot be empty.",
                    })}
                    className={`w-full rounded-xl border px-3.5 py-3 text-xs outline-none transition-colors focus:border-primary ${theme.input}`}
                  />

                  {errors.name && (
                    <p className="text-[11px] font-medium text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className={`text-xs font-bold ${theme.heading}`}>
                      Status Colors
                    </h3>

                    <p className={`mt-1 text-[11px] ${theme.description}`}>
                      Select a color for each calendar status.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {CALENDAR_STATUSES.map((status) => (
                      <ColorRow
                        key={status}
                        status={status}
                        label={CALENDAR_STATUS_LABELS[status]}
                        color={colors[status]}
                        theme={theme}
                        onCommit={handleColorChange}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className={`text-xs font-bold ${theme.heading}`}>
                      Live Preview
                    </h3>

                    <p className={`mt-1 text-[11px] ${theme.description}`}>
                      Preview how these colors appear in your calendar.
                    </p>
                  </div>

                  <div className={`rounded-xl border p-4 ${theme.section}`}>
                    <ColorPalettePreview
                      colors={colors}
                      isDark={isDark}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors ${theme.secondaryButton}`}
                >
                  <RotateCcw size={13} />
                  Reset Colors
                </button>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${theme.secondaryButton}`}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Save size={14} />
                    {isEditing ? "Save Changes" : "Create Palette"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPaletteFormModal;
