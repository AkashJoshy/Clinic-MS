import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, SearchX, RotateCcw, Layers, Palette } from "lucide-react";
import { useAuthStore } from "@/store";
import {
  SubscriptionHeader,
  SubscriptionStatsSection,
  SubscriptionCard,
  SubscriptionFormModal,
  ColorPaletteManagement,
} from "@/components/shared/admin/subscriptions";
import SubscriptionStatusModal from "@/components/shared/admin/subscriptions/subscription-status.modal";
import { useSubscriptions } from "@/hooks/use-subscriptions.hook";
import { getSubscriptionsPageTheme } from "@/helpers/admin/subscription.helper";
import { Pagination } from "@/components/layout/pagination.layout";

type SubscriptionTab = "PLANS" | "PALETTES";

const SubscriptionsPage = () => {
  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const [activeTab, setActiveTab] = useState<SubscriptionTab>("PLANS");

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
    isLoading,
    currentPage,
    currentTotalPages,
    currentTotalItems,
    handlePageChange,
    itemsPerPage,
  } = useSubscriptions();

  const theme = getSubscriptionsPageTheme(isDark);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [currentPage]);

  return (
    <div
      className={`min-h-full space-y-6 rounded border p-4 shadow-2xs sm:p-6 lg:p-8 ${theme.container}`}
    >
      <div
        className={`inline-flex w-full max-w-md items-center gap-1 rounded-xl border p-1 ${theme.tabContainer}`}
      >
        <button
          type="button"
          onClick={() => setActiveTab("PLANS")}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
            activeTab === "PLANS" ? theme.activeTab : theme.inactiveTab
          }`}
        >
          <Layers size={15} />
          Subscription Plans
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PALETTES")}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
            activeTab === "PALETTES" ? theme.activeTab : theme.inactiveTab
          }`}
        >
          <Palette size={15} />
          Color Palettes
        </button>
      </div>

      {activeTab === "PLANS" && (
        <>
          <SubscriptionHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onOpenCreateModal={handleOpenCreateModal}
            counts={counts}
            isDark={isDark}
          />

          <SubscriptionStatsSection stats={stats} isDark={isDark} />

          {isLoading ? (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3 2xl:gap-6">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <div
                  key={i}
                  className={`h-72 animate-pulse rounded-2xl border ${
                    isDark
                      ? "border-slate-800 bg-slate-900/50"
                      : "border-slate-200 bg-slate-100/50"
                  }`}
                />
              ))}
            </div>
          ) : filteredPlans.length === 0 ? (
            <div
              className={`space-y-4 rounded-2xl border border-dashed px-4 py-16 text-center ${theme.emptyContainer}`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${theme.iconWrapper}`}
              >
                <SearchX size={26} />
              </div>

              <div className="space-y-1">
                <h3 className={`text-base font-semibold ${theme.heading}`}>
                  No subscription plans match your filter
                </h3>

                <p className={`mx-auto max-w-sm text-xs ${theme.description}`}>
                  Try adjusting your search query or switching the status filter
                  to see other plans.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${theme.resetButton}`}
                >
                  <RotateCcw size={14} />
                  Reset Filters
                </button>

                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-md transition-all ${theme.createButton}`}
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
                      isDark={isDark}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {currentTotalPages >= 1 && !isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={currentTotalPages}
              totalItems={currentTotalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              isDark={isDark}
            />
          )}

          <SubscriptionFormModal
            isOpen={isFormModalOpen}
            onClose={handleCloseFormModal}
            onSubmit={handleSubmitForm}
            initialData={editingPlan}
            isDark={isDark}
          />

          {isStatusModalOpen && statusPlan && (
            <SubscriptionStatusModal
              plan={statusPlan}
              onClose={handleCloseStatusModal}
              onConfirm={handleConfirmStatusChange}
              isUpdating={isUpdatingStatus}
              isDark={isDark}
            />
          )}
        </>
      )}

      {activeTab === "PALETTES" && <ColorPaletteManagement isDark={isDark} />}
    </div>
  );
};

export default SubscriptionsPage;
