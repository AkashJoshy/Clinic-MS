
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import type {
  SubscriptionPlan,
  PlanStatus,
  SubscriptionStats,
} from "@/types/subscription";
import type { SubscriptionFormValues } from "@/schemas/admin/subscription.schema";

import { useMutate } from "@/hooks/use-mutate.hook";
import {
  createNewSubscriptionPlan,
  editSubscriptionPlan,
  getAllSubscriptionPlans,
  updateSubscriptionPlanStatus,
} from "@/services/admin.service";

export const useSubscriptions = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PlanStatus>("ALL");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(
    null,
  );

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusPlan, setStatusPlan] = useState<SubscriptionPlan | null>(null);

  const fetchSubscriptionPlans = useCallback(async () => {
    try {
      const response = await getAllSubscriptionPlans();
      setPlans(response.data ?? []);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch subscription plans",
      );
    }
  }, []);

  useEffect(() => {
    void fetchSubscriptionPlans();
  }, [fetchSubscriptionPlans]);

  const { mutate: createPlan, isPending: isCreating } = useMutate(
    createNewSubscriptionPlan,
    {
      onSuccess(data) {
        if (data.data) {
          setPlans((prev) => [data.data, ...prev]);
        }
      },
    },
  );

  const { mutate: editPlan, isPending: isEditing } = useMutate(
    editSubscriptionPlan,
    {
      onSuccess(data) {
        const updatedPlan = data.data;
        if (!updatedPlan) return;

        setPlans((prev) =>
          prev.map((plan) =>
            String(plan.id) === String(updatedPlan.id)
              ? updatedPlan
              : plan,
          ),
        );

        setEditingPlan((current) =>
          current && String(current.id) === String(updatedPlan.id)
            ? updatedPlan
            : current,
        );
      },
    },
  );

  const { mutate: updatePlanStatus, isPending: isUpdatingStatus } = useMutate(
    updateSubscriptionPlanStatus,
    {
      onSuccess(data) {
        const updatedStatus = data.data;

        if (updatedStatus) {
          setPlans((prev) =>
            prev.map((plan) =>
              String(plan.id) === String(updatedStatus.id)
                ? { ...plan, status: updatedStatus.status }
                : plan,
            ),
          );
        }

        setIsStatusModalOpen(false);
        setStatusPlan(null);
      },
    },
  );

  const stats: SubscriptionStats = useMemo(() => {
    const totalPlans = plans.length;

    const activePlans = plans.filter(
      (plan) => plan.status === "ACTIVE",
    ).length;

    const totalSubscribers = plans.reduce(
      (total, plan) => total + (plan.activeSubscribersCount || 0),
      0,
    );

    const estimatedMonthlyRevenue = plans.reduce((total, plan) => {
      if (plan.status !== "ACTIVE") return total;

      const subscriberCount = plan.activeSubscribersCount || 0;
      let monthlyEquivalent = plan.price;

      if (plan.billingCycle === "YEARLY") {
        monthlyEquivalent = plan.price / 12;
      } else if (plan.billingCycle === "QUARTERLY") {
        monthlyEquivalent = plan.price / 3;
      } else if (plan.billingCycle === "LIFETIME") {
        monthlyEquivalent = 0;
      }

      return total + monthlyEquivalent * subscriberCount;
    }, 0);

    return {
      totalPlans,
      activePlans,
      totalSubscribers,
      estimatedMonthlyRevenue: Math.round(estimatedMonthlyRevenue),
    };
  }, [plans]);

  const counts = useMemo(
    () => ({
      all: plans.length,
      active: plans.filter((plan) => plan.status === "ACTIVE").length,
      inactive: plans.filter((plan) => plan.status === "INACTIVE").length,
    }),
    [plans],
  );

  const filteredPlans = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return plans.filter((plan) => {
      if (statusFilter !== "ALL" && plan.status !== statusFilter) {
        return false;
      }

      if (!query) return true;

      return (
        plan.name.toLowerCase().includes(query) ||
        (plan.tagline?.toLowerCase().includes(query) ?? false) ||
        plan.description.toLowerCase().includes(query) ||
        plan.features.some((feature) =>
          feature.name.toLowerCase().includes(query),
        )
      );
    });
  }, [plans, searchQuery, statusFilter]);

  const handleOpenCreateModal = useCallback(() => {
    setEditingPlan(null);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingPlan(null);
  }, []);

  const handleOpenStatusModal = useCallback((plan: SubscriptionPlan) => {
    setStatusPlan(plan);
    setIsStatusModalOpen(true);
  }, []);

  const handleCloseStatusModal = useCallback(() => {
    setIsStatusModalOpen(false);
    setStatusPlan(null);
  }, []);

  const handleConfirmStatusChange = useCallback(() => {
    if (!statusPlan) return;

    updatePlanStatus({
      id: statusPlan.id,
      status: statusPlan.status,
    });
  }, [statusPlan, updatePlanStatus]);

  const handleSubmitForm = useCallback(
    (values: SubscriptionFormValues) => {
      if (editingPlan) {
        editPlan({
          ...values,
          id: editingPlan.id,
          activeSubscribersCount: editingPlan.activeSubscribersCount,
        });
      } else {
        const newPlan: SubscriptionPlan = {
          id: `sub-${Date.now()}`,
          ...values,
          features: values.features.map((feature) => ({
            id: feature.id,
            name: feature.name,
            isIncluded: feature.isIncluded ?? true,
          })),
          activeSubscribersCount: 0,
        };

        createPlan(newPlan);
      }

      handleCloseFormModal();
    },
    [editingPlan, editPlan, createPlan, handleCloseFormModal],
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("ALL");
  }, []);

  return {
    plans,
    filteredPlans,
    stats,
    counts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    handleResetFilters,
    isFormModalOpen,
    editingPlan,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseFormModal,
    handleSubmitForm,
    isStatusModalOpen,
    statusPlan,
    handleOpenStatusModal,
    handleCloseStatusModal,
    handleConfirmStatusChange,
    isCreating,
    isEditing,
    isUpdatingStatus,
    fetchSubscriptionPlans,
  };
};
