import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Palette, Layers, Trash2, AlertTriangle, X } from "lucide-react";
import ColorPaletteCard from "./color-palette-card.component";
import ColorPaletteFormModal from "./color-palette-form-modal.component";
import type { ColorPalette } from "@/types/admin/color-palette.types";
import { INITIAL_PALETTES } from "@/constants/color-palette.constant";
import type { SkeletonCardProps } from "@/types/common";
import { useMutate } from "@/hooks/use-mutate.hook";
import {
  createColorPalette,
  editColorPalette,
  getAllColorPalettes,
  toggleColorPaletteStatus,
} from "@/services/admin.service";
import toast from "react-hot-toast";
import type { ColorPaletteFormData } from "@/schemas/admin/admin.schema";
import DeleteConfirmationalModal from "@/components/shared/delete-confirmational-modal.shared";

const ColorPaletteManagement: React.FC<SkeletonCardProps> = ({ isDark }) => {
  const [palettes, setPalettes] = useState<ColorPalette[]>(INITIAL_PALETTES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<ColorPalette | null>(
    null,
  );
  const [deletingPalette, setDeletingPalette] = useState<ColorPalette | null>(
    null,
  );

  const fetchColorPalettes = async () => {
    try {
      const res = await getAllColorPalettes();

      console.log("Response from Color Palette API:", res);

      if (res.data) {
        setPalettes(res.data);
      } else {
        toast.error(res?.message ?? "Error fetching color palettes");
      }
    } catch (error) {
      toast.error("Error while fetching color palettes");
    }
  };

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const { mutate: createMutate, isPending: isCreateMutate } = useMutate(
    createColorPalette,
    {
      onSuccess(data) {
        const { updatedAt, ...rest } = data.data;

        if (data.data) {
          setPalettes((prev) => [...prev, rest]);
          handleCloseForm();
        }
      },
    },
  );

  const { mutate: editMutate, isPending: isEditMutate } = useMutate(
    editColorPalette,
    {
      onSuccess(data) {
        if (data.data) {
          setPalettes((prev) =>
            prev.map((p) =>
              p.id === editingPalette?.id ? { ...p, ...data.data } : p,
            ),
          );
          handleCloseForm();
        }
      },
    },
  );

  const { mutate: toggleMutate, isPending: isToggleMutate } = useMutate(
    toggleColorPaletteStatus,
    {
      onSuccess(data) {
        console.log(`Data in Toggle`);
        console.log(data);
        if (data.data) {
          setPalettes((previous) =>
            previous.map((palette) =>
              palette.id === deletingPalette?.id
                ? { ...palette, isActive: data.data.isActive }
                : palette,
            ),
          );
          setDeletingPalette(null);
        }
      },
    },
  );

  const theme = {
    heading: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    section: isDark
      ? "border-white/10 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",
    secondaryButton: isDark
      ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100",
    dangerButton: "bg-red-500 text-white hover:bg-red-600",
  };

  const handleOpenCreate = () => {
    setEditingPalette(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (palette: ColorPalette) => {
    setEditingPalette(palette);
    setIsFormOpen(true);
    console.log("Palette:", palette);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPalette(null);
  };

  const handleSubmit = (data: ColorPaletteFormData) => {
    if (editingPalette) {
      editMutate(data);
    } else {
      const { id, ...rest } = data;
      createMutate(rest);
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingPalette) return;

    toggleMutate(deletingPalette?.id);
  };

  const handleRequestDelete = (palette: ColorPalette) => {
    setDeletingPalette(palette);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Palette size={19} className="text-primary" />

            <h2 className={`text-base font-bold ${theme.heading}`}>
              Calendar Color Palettes
            </h2>
          </div>

          <p
            className={`max-w-xl text-xs leading-relaxed ${theme.description}`}
          >
            Create reusable color schemes for calendar statuses and assign them
            to your subscription plans.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create Palette
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className={`rounded-xl border p-4 ${theme.section}`}>
          <div className="flex items-center gap-2">
            <Layers size={15} className="text-primary" />
            <span className={`text-[11px] font-medium ${theme.description}`}>
              Total Palettes
            </span>
          </div>

          <p className={`mt-2 text-2xl font-bold ${theme.heading}`}>
            {palettes.length}
          </p>
        </div>

        <div
          className={`col-span-2 rounded-xl border p-4 sm:col-span-1 ${theme.section}`}
        >
          <div className="flex items-center gap-2">
            <Layers size={15} className="text-primary" />
            <span className={`text-[11px] font-medium ${theme.description}`}>
              Configurable Statuses
            </span>
          </div>

          <p className={`mt-2 text-2xl font-bold ${theme.heading}`}>6</p>
        </div>
      </div>

      {palettes.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-16 text-center ${theme.section}`}
        >
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border ${theme.secondaryButton}`}
          >
            <Palette size={25} />
          </div>

          <h3 className={`text-sm font-bold ${theme.heading}`}>
            No color palettes yet
          </h3>

          <p className={`mt-1 max-w-sm text-xs ${theme.description}`}>
            Create your first calendar color palette to get started.
          </p>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus size={14} />
            Create Palette
          </button>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
          >
            {palettes.map((palette) => (
              <ColorPaletteCard
                key={palette.id}
                palette={palette}
                isDark={isDark}
                onEdit={handleOpenEdit}
                onDelete={handleRequestDelete}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <ColorPaletteFormModal
        isOpen={isFormOpen}
        isDark={isDark}
        initialData={editingPalette}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />

      <AnimatePresence>
        {deletingPalette && (
          <DeleteConfirmationalModal
            id={deletingPalette.id}
            name={deletingPalette.name}
            type="Color Palette"
            action={deletingPalette.isActive === true ? "BLOCK" : "RESTORE"}
            status={deletingPalette.isActive === true ? "ACTIVE" : "INACTIVE"}
            service={handleConfirmDelete}
            closeDeleteBox={() => setDeletingPalette(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPaletteManagement;
