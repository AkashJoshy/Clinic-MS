import React, { useEffect, useState } from "react";
import {
  AddMoneyModal,
  INITIAL_STATS,
  PaymentMethodsModal,
  StatementModal,
  TransactionDetailsModal,
  WalletBalanceCard,
  WalletBalanceChart,
  WalletHeader,
  WalletQuickActions,
  WalletSummaryCards,
  WithdrawModal,
} from "@/components/shared/wallet";
import WalletActivity from "@/components/shared/wallet/wallet-activity";
import type { RouteRoleProps } from "@/types/auth";
import useWallet from "@/hooks/use-wallet.hook";

export const PatientWalletPage = ({
  roleOverride,
}: {
  roleOverride: RouteRoleProps;
}) => {
  const {
    handleScrollToTransactions,
    handleBalanceUpdate,
    handleDownloadReceipt,
    handleSuccessDeposit,
    handleSuccessWithdraw,
    isAddMoneyOpen,
    isDoctorRoute,
    isPaymentMethodsOpen,
    isStatementsOpen,
    isWithdrawOpen,
    loadWallet,
    selectedTxn,
    setIsAddMoneyOpen,
    setIsPaymentMethodsOpen,
    setIsStatementsOpen,
    setIsWithdrawOpen,
    setSelectedTxn,
    setStats,
    setTransactions,
    setWallet,
    stats,
    transactions,
    wallet,
    walletHolder,
  } = useWallet(roleOverride);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <div className="space-y-6 bg-white p-6 border border-gray-200 shadow-sm">
        <WalletHeader
          roleTitle="My Wallet"
          onAddMoney={() => setIsAddMoneyOpen(true)}
          onOpenStatements={() => setIsStatementsOpen(true)}
          onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 h-full flex flex-col">
            <WalletBalanceCard
              totalBalance={wallet?.balance ?? 0}
              walletHolder={walletHolder}
              maskedId="•••• 4829"
              trendPercent={stats.earningsTrendPercent}
            />
          </div>

          <div className="lg:col-span-7 h-full flex flex-col justify-between">
            {wallet && <WalletSummaryCards wallet={wallet} stats={stats} />}
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:gap-5 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-7">
            <WalletBalanceChart />
          </div>

          <div className="min-w-0 xl:col-span-5">
            <WalletQuickActions
              onAddMoney={() => setIsAddMoneyOpen(true)}
              onWithdraw={() => setIsWithdrawOpen(true)}
              onViewTransactions={handleScrollToTransactions}
              onOpenStatements={() => setIsStatementsOpen(true)}
              onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
            />
          </div>
        </div>

        {transactions && <WalletActivity transactions={transactions} />}

        {wallet && (
          <AddMoneyModal
            isOpen={isAddMoneyOpen}
            onClose={() => setIsAddMoneyOpen(false)}
            onBalanceUpdate={handleBalanceUpdate}
            availableBalance={wallet.balance}
            roleOverride={roleOverride}
          />
        )}

        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={() => setIsWithdrawOpen(false)}
          availableBalance={stats.availableBalance}
          onSuccessWithdraw={handleSuccessWithdraw}
        />

        <TransactionDetailsModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
          onDownloadReceipt={handleDownloadReceipt}
        />

        <StatementModal
          isOpen={isStatementsOpen}
          onClose={() => setIsStatementsOpen(false)}
        />

        <PaymentMethodsModal
          isOpen={isPaymentMethodsOpen}
          onClose={() => setIsPaymentMethodsOpen(false)}
        />
      </div>
    </div>
  );
};

export default PatientWalletPage;
