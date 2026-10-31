import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store";
import { fetchWallet } from "@/services/shared.service";
import { INITIAL_STATS } from "@/components/shared/wallet/mock-data";
import type { Wallet, WalletStats, WalletTransaction } from "@/types/wallet";

const useWallet = (roleOverride: "doctor" | "patient" | "admin") => {
  const location = useLocation();

  const isDoctorRoute =
    roleOverride === "doctor" || location.pathname.startsWith("/doctor");

  const users = useAuthStore((state) => state.users);

  const userId = users[roleOverride]?.id;

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const [stats, setStats] = useState<WalletStats>(INITIAL_STATS);

  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isStatementsOpen, setIsStatementsOpen] = useState(false);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);

  const [selectedTxn, setSelectedTxn] = useState<WalletTransaction | null>(
    null,
  );

  const loadWallet = useCallback(async () => {
    if (!userId) return;

    const data = await fetchWallet({
      id: userId,
      ownerRole: roleOverride,
    });

    if (data.data) {
      setWallet(data.data.wallet);
      setTransactions(data.data.walletTransactions);
    }
  }, [userId]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        if (!userId) return;

        const data = await fetchWallet({
          id: userId,
          ownerRole: roleOverride,
        });

        if (cancelled) return;

        if (data.data) {
          setWallet(data.data.wallet);
          setTransactions(data.data.walletTransactions);
        }
      } catch (error: unknown) {
        if (cancelled) return;

        const message =
          error instanceof Error ? error.message : "Failed to load wallet";

        toast.error(message);
      }
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const walletHolder = isDoctorRoute
    ? users?.doctor?.fullName
      ? `Dr. ${users.doctor.fullName}`
      : "Doctor Wallet"
    : users[roleOverride]?.fullName || "Patient Wallet";

  const handleSuccessDeposit = useCallback(
    (newTxn: WalletTransaction, amount: number) => {
      setTransactions((prev) => [newTxn, ...prev]);

      setStats((prev) => ({
        ...prev,
        totalBalance: prev.totalBalance + amount,
        availableBalance: prev.availableBalance + amount,
        totalEarnings: prev.totalEarnings + amount,
      }));
    },
    [],
  );

  const handleSuccessWithdraw = useCallback(
    (newTxn: WalletTransaction, amount: number) => {
      setTransactions((prev) => [newTxn, ...prev]);

      setStats((prev) => ({
        ...prev,
        totalBalance: Math.max(0, prev.totalBalance - amount),
        availableBalance: Math.max(0, prev.availableBalance - amount),
        totalSpent: prev.totalSpent + amount,
      }));
    },
    [],
  );

  const handleBalanceUpdate = useCallback(
    (newBalance: string, walletTransaction: WalletTransaction) => {
      setWallet((current) => {
        if (!current) return null;

        return {
          ...current,
          balance: Number(newBalance),
        };
      });

      setTransactions((previousTransactions) => [
        walletTransaction,
        ...previousTransactions,
      ]);
    },
    [],
  );

  const handleDownloadReceipt = useCallback((txn: WalletTransaction) => {
    toast.success(`Receipt for ${txn.referenceId} downloaded successfully!`, {
      icon: "🧾",
    });
  }, []);

  const handleScrollToTransactions = useCallback(() => {
    document
      .getElementById("wallet-activity-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return {
    wallet,
    setWallet,
    transactions,
    setTransactions,
    stats,
    setStats,
    walletHolder,
    isDoctorRoute,
    loadWallet,
    handleSuccessDeposit,
    handleSuccessWithdraw,
    handleBalanceUpdate,
    handleDownloadReceipt,
    handleScrollToTransactions,
    isAddMoneyOpen,
    setIsAddMoneyOpen,
    isWithdrawOpen,
    setIsWithdrawOpen,
    isStatementsOpen,
    setIsStatementsOpen,
    isPaymentMethodsOpen,
    setIsPaymentMethodsOpen,
    selectedTxn,
    setSelectedTxn,
  };
};

export default useWallet;
