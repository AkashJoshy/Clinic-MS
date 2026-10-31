import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, SearchX, RotateCcw } from "lucide-react";
import {
  SubscriptionHeader,
  SubscriptionStatsSection,
  SubscriptionCard,
  SubscriptionFormModal,
} from "@/components/shared/admin/subscriptions";
import SubscriptionStatusModal from "@/components/shared/admin/subscriptions/subscription-status.modal";
import { useSubscriptions } from "@/hooks/use-subscriptions.hook";
import type { RouteRoleProps } from "@/types/auth";

const SubscriptionsPage = () => {
  const {
    counts,
    editingPlan,
    filteredPlans,
    handleCloseFormModal,
    handleCloseStatusModal,
    handleConfirmStatusChange,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleOpenStatusModal,
    handleResetFilters,
    handleSubmitForm,
    isFormModalOpen,
    isStatusModalOpen,
    isUpdatingStatus,
    searchQuery,
    setSearchQuery,
    setStatusFilter,
    stats,
    statusFilter,
    statusPlan,
  } = useSubscriptions();

  return (
    <div className="min-h-full space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xs sm:p-6 lg:p-8">
      <SubscriptionHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onOpenCreateModal={handleOpenCreateModal}
        counts={counts}
      />

      <SubscriptionStatsSection stats={stats} />

      {filteredPlans.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] px-4 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400">
            <SearchX size={26} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              No subscription plans match your filter
            </h3>
            <p className="mx-auto max-w-sm text-xs text-[#8b9ab0]">
              Try adjusting your search query or switching the status filter to
              see other plans.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1dc465] px-4 py-2 text-xs font-bold text-[#080d14] shadow-md transition-all hover:bg-[#15a050]"
            >
              <Plus size={14} strokeWidth={2.5} />
              Create Plan
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3 2xl:gap-6"
          >
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="min-w-0"
              >
                <SubscriptionCard
                  plan={plan}
                  onEdit={handleOpenEditModal}
                  onToggleStatus={handleOpenStatusModal}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <SubscriptionFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitForm}
        initialData={editingPlan}
      />

      {isStatusModalOpen && statusPlan && (
        <SubscriptionStatusModal
          plan={statusPlan}
          onClose={handleCloseStatusModal}
          onConfirm={handleConfirmStatusChange}
          isUpdating={isUpdatingStatus}
        />
      )}
    </div>
  );
};

export default SubscriptionsPage;
