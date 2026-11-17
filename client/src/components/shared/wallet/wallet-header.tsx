
import React, { useState } from "react";
import {
  Plus,
  Bell,
  MoreVertical,
  Download,
  CreditCard,
  RefreshCw,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";

interface WalletHeaderProps {
  onAddMoney: () => void;
  onOpenStatements: () => void;
  onOpenPaymentMethods: () => void;
  onRefresh?: () => void;
  roleTitle?: string;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({
  onAddMoney,
  onOpenStatements,
  onOpenPaymentMethods,
  onRefresh,
  roleTitle = "My Wallet",
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      toast.success("All wallet alerts marked as read");
      setUnreadCount(0);
    } else {
      toast("No new notifications", { icon: "🔔" });
    }
  };

  const handleRefresh = () => {
    setShowMenu(false);
    if (onRefresh) onRefresh();
    toast.success("Wallet balance & history refreshed");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-xs">
          <Wallet className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              {roleTitle}
            </h1>

            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
              Live
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Manage your balance, track your earnings, and monitor your transactions.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={handleNotificationClick}
          aria-label="Notifications"
          className="relative p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Bell className="w-5 h-5" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onAddMoney}
          className="flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-sm hover:shadow transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Money</span>
        </button>

        {/* Overflow Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="More actions"
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors shadow-xs"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 text-sm animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onOpenStatements();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary text-left transition-colors"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Export Statement</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onOpenPaymentMethods();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary text-left transition-colors"
              >
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>Payment Methods</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={handleRefresh}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary text-left transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span>Refresh Balance</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
