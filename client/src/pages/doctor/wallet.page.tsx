import {
  AddMoneyModal,
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
import { useAuthStore } from "@/store";

export const DoctorWalletPage = ({
  roleOverride,
}: {
  roleOverride: RouteRoleProps;
}) => {
  const {
    handleScrollToTransactions,
    handleBalanceUpdate,
    handleDownloadReceipt,
    handleSuccessWithdraw,
    isAddMoneyOpen,
    isPaymentMethodsOpen,
    isStatementsOpen,
    isWithdrawOpen,
    selectedTxn,
    setIsAddMoneyOpen,
    setIsPaymentMethodsOpen,
    setIsStatementsOpen,
    setIsWithdrawOpen,
    setSelectedTxn,
    stats,
    transactions,
    wallet,
    walletHolder,
  } = useWallet(roleOverride);

  const user = useAuthStore((state) => state.users[roleOverride]);
  const isDark = user?.theme === "DARK";

  return (
    <div
      className={`relative min-h-full space-y-6 border p-6 shadow-2xs lg:p-8 ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      <WalletHeader
        roleTitle="My Wallet"
        onAddMoney={() => setIsAddMoneyOpen(true)}
        onOpenStatements={() => setIsStatementsOpen(true)}
        onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
        isDark={isDark}
      />

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
        <div className="flex h-full flex-col lg:col-span-5">
          <WalletBalanceCard
            totalBalance={wallet?.balance ?? 0}
            walletHolder={walletHolder}
            maskedId="•••• 4829"
            trendPercent={stats.earningsTrendPercent}
  
          />
        </div>

        <div className="flex h-full flex-col justify-between lg:col-span-7">
          {wallet && (
            <WalletSummaryCards wallet={wallet} stats={stats} isDark={isDark} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
        <div className="h-full lg:col-span-7">
          <WalletBalanceChart isDark={isDark} />
        </div>

        <div className="h-full lg:col-span-5">
          <WalletQuickActions
            onAddMoney={() => setIsAddMoneyOpen(true)}
            onWithdraw={() => setIsWithdrawOpen(true)}
            onViewTransactions={handleScrollToTransactions}
            onOpenStatements={() => setIsStatementsOpen(true)}
            onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
            isDark={isDark}
          />
        </div>
      </div>

      <WalletActivity transactions={transactions} isDark={isDark} />

      <AddMoneyModal
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        onBalanceUpdate={handleBalanceUpdate}
        roleOverride={roleOverride}
        availableBalance={stats.availableBalance}
        isDark={isDark}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={stats.availableBalance}
        onSuccessWithdraw={handleSuccessWithdraw}
        isDark={isDark}
      />

      <TransactionDetailsModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
        onDownloadReceipt={handleDownloadReceipt}
        isDark={isDark}
      />

      <StatementModal
        isOpen={isStatementsOpen}
        onClose={() => setIsStatementsOpen(false)}
        isDark={isDark}
      />

      <PaymentMethodsModal
        isOpen={isPaymentMethodsOpen}
        onClose={() => setIsPaymentMethodsOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};

export default DoctorWalletPage;
