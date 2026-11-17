import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { WalletActivityProps } from "@/types/wallet";
import {
  formatCurrency,
  formatDate,
  getStatusClass,
} from "@/helpers/wallet.helper";

const ITEMS_PER_PAGE = 10;

interface Props extends WalletActivityProps {
  isDark?: boolean;
}

export default function WalletActivity({
  transactions = [],
  isDark = false,
}: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return transactions;

    return transactions.filter((txn) =>
      [
        txn.description,
        txn.referenceId ?? "",
        txn.paymentMethod,
        txn.source,
        txn.status,
        txn.type,
        txn.ownerType,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [transactions, search]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const page = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((previous) =>
      Math.min(Math.max(totalPages, 1), previous + 1),
    );
  };

  const startItem =
    filteredTransactions.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(page * ITEMS_PER_PAGE, filteredTransactions.length);

  return (
    <section
      id="wallet-activity-section"
      className={`
        min-w-0 w-full space-y-5 overflow-hidden
        rounded-2xl border p-3 shadow-sm
        sm:space-y-6 sm:p-5 lg:p-6
        ${
          isDark
            ? "border-white/10 bg-[#0D1A27]"
            : "border-slate-200/80 bg-white"
        }
      `}
    >
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2
            className={`
              text-lg font-bold tracking-tight sm:text-xl
              ${isDark ? "text-white" : "text-[#0D1A27]"}
            `}
          >
            Wallet Activity
          </h2>

          <p
            className={`
              mt-1 text-xs leading-5 sm:text-sm
              ${isDark ? "text-slate-400" : "text-slate-500"}
            `}
          >
            Track your wallet transactions and payments.
          </p>
        </div>

        <div className="relative w-full sm:max-w-64 sm:shrink-0">
          <Search
            size={17}
            aria-hidden="true"
            className={`
              pointer-events-none absolute left-3 top-1/2
              -translate-y-1/2
              ${isDark ? "text-slate-500" : "text-slate-400"}
            `}
          />

          <input
            type="search"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search transactions..."
            aria-label="Search wallet transactions"
            className={`
              w-full rounded-xl border py-3 pl-9 pr-3
              text-sm outline-none transition
              focus:border-primary focus:ring-4 focus:ring-primary/10
              ${
                isDark
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:bg-white/[0.07]"
                  : "border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:bg-white"
              }
            `}
          />
        </div>
      </div>

      <div
        className={`
          min-w-0 divide-y
          ${isDark ? "divide-white/10" : "divide-slate-100"}
        `}
      >
        {paginatedTransactions.map((txn) => {
          const credit = txn.type === "CREDIT";

          return (
            <div
              key={txn.id}
              className="
                flex min-w-0 flex-col gap-3
                py-4 first:pt-1 last:pb-1
                min-[420px]:flex-row
                min-[420px]:items-start
                min-[420px]:justify-between
                sm:gap-4 sm:py-5
              "
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-xl sm:h-11 sm:w-11
                    ${
                      credit
                        ? isDark
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-emerald-50 text-emerald-600"
                        : isDark
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-rose-50 text-rose-600"
                    }
                  `}
                >
                  {credit ? (
                    <ArrowDownLeft size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`
                      break-words text-sm font-semibold leading-5
                      [overflow-wrap:anywhere]
                      ${isDark ? "text-slate-100" : "text-[#0D1A27]"}
                    `}
                  >
                    {txn.description || txn.source || "Wallet transaction"}
                  </p>

                  <div
                    className={`
                      mt-1 flex min-w-0 flex-wrap items-center
                      gap-x-1.5 gap-y-1 text-xs leading-5
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    <span className="break-words">
                      {txn.paymentMethod || "Payment method unavailable"}
                    </span>
                    <span
                      className={isDark ? "text-slate-600" : "text-slate-300"}
                    >
                      ·
                    </span>
                    <span>{formatDate(txn.createdAt?.toString()!)}</span>
                  </div>

                  {txn.referenceId && (
                    <p
                      className={`
                        mt-1 break-all text-xs leading-5
                        ${isDark ? "text-slate-500" : "text-slate-400"}
                      `}
                    >
                      Ref: {txn.referenceId}
                    </p>
                  )}

                  <span
                    className={`
                      mt-2 inline-flex max-w-full rounded-full
                      px-2.5 py-1 text-[10px] font-semibold sm:text-[11px]
                      ${getStatusClass(txn.status || "")}
                    `}
                  >
                    {txn.status || "UNKNOWN"}
                  </span>
                </div>
              </div>

              <div
                className={`
                  flex w-full items-center justify-between gap-2
                  border-t pt-2
                  min-[420px]:w-auto min-[420px]:shrink-0
                  min-[420px]:flex-col min-[420px]:items-end
                  min-[420px]:border-0 min-[420px]:pt-0
                  ${
                    credit
                      ? isDark
                        ? "border-white/10 text-emerald-400"
                        : "border-slate-100 text-emerald-600"
                      : isDark
                        ? "border-white/10 text-rose-400"
                        : "border-slate-100 text-rose-600"
                  }
                `}
              >
                <span
                  className={`
                    text-[11px] font-medium min-[420px]:hidden
                    ${isDark ? "text-slate-500" : "text-slate-400"}
                  `}
                >
                  Transaction amount
                </span>

                <p className="break-words text-sm font-bold tabular-nums sm:text-base">
                  {credit ? "+" : "−"}
                  {formatCurrency(txn.amount, txn.currency)}
                </p>
              </div>
            </div>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="px-3 py-12 text-center sm:py-16">
            <div
              className={`
                mx-auto mb-4 flex h-14 w-14 items-center
                justify-center rounded-2xl
                ${isDark ? "bg-white/5" : "bg-slate-50"}
              `}
            >
              <Wallet
                size={26}
                aria-hidden="true"
                className={isDark ? "text-slate-600" : "text-slate-300"}
              />
            </div>

            <p
              className={`
                text-sm font-semibold
                ${isDark ? "text-slate-200" : "text-slate-700"}
              `}
            >
              No transactions found
            </p>

            <p
              className={`
                mx-auto mt-1 max-w-xs text-xs leading-5 sm:text-sm
                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              {search.trim()
                ? "Try another search term or clear your search."
                : "Your wallet transactions will appear here."}
            </p>

            {search.trim() && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="
                  mt-3 text-sm font-semibold text-primary
                  transition hover:text-primary/80
                "
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className={`
          flex min-w-0 flex-col gap-3 border-t pt-4
          sm:flex-row sm:items-center sm:justify-between
          ${isDark ? "border-white/10" : "border-slate-100"}
        `}
      >
        <p
          className={`
            text-xs leading-5
            ${isDark ? "text-slate-400" : "text-slate-500"}
          `}
        >
          Showing {startItem}–{endItem} of {filteredTransactions.length}{" "}
          transactions
        </p>

        {totalPages > 1 && (
          <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={page <= 1}
              aria-label="Go to previous page"
              className={`
                inline-flex min-h-9 items-center gap-1
                rounded-lg border px-2.5 py-2
                text-xs font-medium transition
                disabled:cursor-not-allowed disabled:opacity-40
                sm:px-3 sm:text-sm
                ${
                  isDark
                    ? "border-white/10 text-slate-300 hover:bg-white/5"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span
              aria-live="polite"
              className={`
                whitespace-nowrap text-xs sm:text-sm
                ${isDark ? "text-slate-400" : "text-slate-600"}
              `}
            >
              {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={page >= totalPages}
              aria-label="Go to next page"
              className={`
                inline-flex min-h-9 items-center gap-1
                rounded-lg border px-2.5 py-2
                text-xs font-medium transition
                disabled:cursor-not-allowed disabled:opacity-40
                sm:px-3 sm:text-sm
                ${
                  isDark
                    ? "border-white/10 text-slate-300 hover:bg-white/5"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
