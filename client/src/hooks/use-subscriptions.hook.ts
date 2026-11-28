import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import type {
  SubscriptionPlan,
  PlanStatus,
  SubscriptionStats,
} from "@/types/subscription";
import type { SubscriptionFormValues } from "@/schemas/admin/subscription.schema";
import type { PaginatedData } from "@/types/common";

import { useMutate } from "@/hooks/use-mutate.hook";
import {
  createNewSubscriptionPlan,
  editSubscriptionPlan,
  getAllSubscriptionPlans,
  updateSubscriptionPlanStatus,
} from "@/services/admin.service";

const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

const emptyPaginated: PaginatedData<SubscriptionPlan> = {
  data: [],
  hasNextPage: false,
  hasPreviousPage: false,
  limit: ITEMS_PER_PAGE,
  page: 1,
  total: 0,
  totalPages: 0,
};

const initialStats: SubscriptionStats = {
  totalPlans: 0,
  activePlans: 0,
  totalSubscribers: 0,
  estimatedMonthlyRevenue: 0,
};

export const useSubscriptions = () => {
  const [all, setAll] = useState<PaginatedData<SubscriptionPlan>>(emptyPaginated);
  const [active, setActive] = useState<PaginatedData<SubscriptionPlan>>(emptyPaginated);
  const [inactive, setInactive] = useState<PaginatedData<SubscriptionPlan>>(emptyPaginated);
  const [serverStats, setServerStats] = useState<SubscriptionStats>(initialStats);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PlanStatus>("ALL");

  const [allPage, setAllPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [inactivePage, setInactivePage] = useState(1);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusPlan, setStatusPlan] = useState<SubscriptionPlan | null>(null);

  // Debounce search so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedSearch(searchQuery.trim()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      limit: ITEMS_PER_PAGE,
      allPage,
      activePage,
      inactivePage,
    }),
    [debouncedSearch, allPage, activePage, inactivePage],
  );

  const fetchSubscriptionPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllSubscriptionPlans(queryParams);
      const data = response.data;

      setAll(data?.all ?? emptyPaginated);
      setActive(data?.active ?? emptyPaginated);
      setInactive(data?.inactive ?? emptyPaginated);

      if (data?.stats) {
        setServerStats(data.stats);
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch subscription plans",
      );
      setAll(emptyPaginated);
      setActive(emptyPaginated);
      setInactive(emptyPaginated);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    void fetchSubscriptionPlans();
  }, [fetchSubscriptionPlans]);

  const { mutate: createPlan, isPending: isCreating } = useMutate(
    createNewSubscriptionPlan,
    {
      onSuccess() {
        void fetchSubscriptionPlans();
      },
    },
  );

  const { mutate: editPlan, isPending: isEditing } = useMutate(
    editSubscriptionPlan,
    {
      onSuccess() {
        void fetchSubscriptionPlans();
      },
    },
  );

  const { mutate: updatePlanStatus, isPending: isUpdatingStatus } = useMutate(
    updateSubscriptionPlanStatus,
    {
      onSuccess() {
        setIsStatusModalOpen(false);
        setStatusPlan(null);
        void fetchSubscriptionPlans();
      },
    },
  );

  const counts = useMemo(
    () => ({
      all: all.total,
      active: active.total,
      inactive: inactive.total,
    }),
    [all.total, active.total, inactive.total],
  );

  const filteredPlans = useMemo(() => {
    if (statusFilter === "ACTIVE") return active.data;
    if (statusFilter === "INACTIVE") return inactive.data;
    return all.data;
  }, [statusFilter, all.data, active.data, inactive.data]);

  const currentPage =
    statusFilter === "ACTIVE"
      ? activePage
      : statusFilter === "INACTIVE"
        ? inactivePage
        : allPage;

  const currentTotalPages =
    statusFilter === "ACTIVE"
      ? active.totalPages
      : statusFilter === "INACTIVE"
        ? inactive.totalPages
        : all.totalPages;

  const currentTotalItems =
    statusFilter === "ACTIVE"
      ? active.total
      : statusFilter === "INACTIVE"
        ? inactive.total
        : all.total;

  const handlePageChange = (newPage: number) => {
    if (statusFilter === "ACTIVE") {
      setActivePage(newPage);
    } else if (statusFilter === "INACTIVE") {
      setInactivePage(newPage);
    } else {
      setAllPage(newPage);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setAllPage(1);
    setActivePage(1);
    setInactivePage(1);
  };

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
    setAllPage(1);
    setActivePage(1);
    setInactivePage(1);
  }, []);

  return {
    all,
    active,
    inactive,
    filteredPlans,
    stats: serverStats,
    counts,
    searchQuery,
    setSearchQuery: handleSearchChange,
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
    isLoading,
    allPage,
    setAllPage,
    activePage,
    setActivePage,
    inactivePage,
    setInactivePage,
    currentPage,
    currentTotalPages,
    currentTotalItems,
    handlePageChange,
    itemsPerPage: ITEMS_PER_PAGE,
    fetchSubscriptionPlans,
  };
};
