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

  return (
    <div className="relative min-h-full space-y-6 border border-white/10 bg-white/[0.02] p-6 shadow-2xs lg:p-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 h-full">
          <WalletBalanceChart />
        </div>

        <div className="lg:col-span-5 h-full">
          <WalletQuickActions
            onAddMoney={() => setIsAddMoneyOpen(true)}
            onWithdraw={() => setIsWithdrawOpen(true)}
            onViewTransactions={handleScrollToTransactions}
            onOpenStatements={() => setIsStatementsOpen(true)}
            onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
          />
        </div>
      </div>

      <WalletActivity transactions={transactions} />

      <AddMoneyModal
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        onBalanceUpdate={handleBalanceUpdate}
        roleOverride={roleOverride}
        availableBalance={stats.availableBalance}
      />

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
  );
};

export default DoctorWalletPage;
