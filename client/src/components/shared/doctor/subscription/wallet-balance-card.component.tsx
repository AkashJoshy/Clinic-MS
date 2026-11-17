import React from "react";
import { Wallet } from "lucide-react";

interface WalletBalanceCardProps {
  balance: number;
  unavailable: boolean;
}

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  unavailable,
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/[0.04] to-transparent p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-medium text-gray-400">
          Available wallet balance
        </p>

        <p className="mt-2 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {formatINR(balance)}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              unavailable ? "bg-amber-400" : "bg-primary"
            }`}
          />

          <span className="text-xs text-gray-400">
            {unavailable ? "Wallet unavailable" : "Wallet active"}
          </span>
        </div>
      </div>

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Wallet size={24} />
      </div>
    </div>
  </div>
);

export default WalletBalanceCard;
