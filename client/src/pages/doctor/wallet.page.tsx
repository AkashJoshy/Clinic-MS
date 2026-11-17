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
import {
  WalletDesign02,
  WalletDesign04,
  WalletDesign07,
  WalletDesign08,
  WalletDesign10,
  WalletDesign11,
  WalletDesign12,
  WalletDesign15,
  WalletDesign16,
} from "@/components/shared/wallet/wallet-card-designs.shared";
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

        {/* <div className="mt-4 grid grid-cols-1 gap-6 ">
       
          <div>
            <WalletDesign02
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign04
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign07
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign08
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign10
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign11
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign12
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign15
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>

          <div>
            <WalletDesign16
              totalBalance={125000}
              walletHolder="Dr. Akash Joshy"
              maskedId="•••• 4829"
              trendPercent={12.5}
            />
          </div>
        </div> */}

        <div className="lg:col-span-7 h-full flex flex-col justify-between">
          {wallet && (
            <WalletSummaryCards wallet={wallet} stats={stats} isDark={true} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 h-full">
          <WalletBalanceChart isDark={true} />
        </div>

        <div className="lg:col-span-5 h-full">
          <WalletQuickActions
            onAddMoney={() => setIsAddMoneyOpen(true)}
            onWithdraw={() => setIsWithdrawOpen(true)}
            onViewTransactions={handleScrollToTransactions}
            onOpenStatements={() => setIsStatementsOpen(true)}
            onOpenPaymentMethods={() => setIsPaymentMethodsOpen(true)}
            isDark={true}
          />
        </div>
      </div>

      <WalletActivity transactions={transactions} isDark={true} />

      <AddMoneyModal
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        onBalanceUpdate={handleBalanceUpdate}
        roleOverride={roleOverride}
        availableBalance={stats.availableBalance}
        isDark={true}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={stats.availableBalance}
        onSuccessWithdraw={handleSuccessWithdraw}
        isDark={true}
      />

      <TransactionDetailsModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
        onDownloadReceipt={handleDownloadReceipt}
        isDark={true}
      />

      <StatementModal
        isOpen={isStatementsOpen}
        onClose={() => setIsStatementsOpen(false)}
        isDark={true}
      />

      <PaymentMethodsModal
        isOpen={isPaymentMethodsOpen}
        onClose={() => setIsPaymentMethodsOpen(false)}
        isDark={true}
      />
    </div>
  );
};

export default DoctorWalletPage;
