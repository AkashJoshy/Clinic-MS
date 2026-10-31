import type {
  WalletStats,
  WalletTransaction,
  ChartPoint,
  TimeRange,
} from "./types";

export const INITIAL_STATS: WalletStats = {
  totalBalance: 84250.0,
  availableBalance: 72400.0,
  pendingSettlement: 11850.0,
  totalEarnings: 124500.0,
  totalSpent: 40250.0,
  earningsTrendPercent: 12.5,
  currency: "₹",
};


export const CHART_DATA_BY_RANGE: Record<TimeRange, ChartPoint[]> = {
  "7D": [
    { date: "07 Oct", label: "Tue", balance: 74499 },
    { date: "08 Oct", label: "Wed", balance: 75800 },
    { date: "09 Oct", label: "Thu", balance: 77500 },
    { date: "10 Oct", label: "Fri", balance: 77500 },
    { date: "11 Oct", label: "Sat", balance: 82500 },
    { date: "12 Oct", label: "Sun", balance: 81750 },
    { date: "13 Oct", label: "Today", balance: 84250 },
  ],
  "1M": [
    { date: "15 Sep", label: "15 Sep", balance: 62000 },
    { date: "20 Sep", label: "20 Sep", balance: 68500 },
    { date: "25 Sep", label: "25 Sep", balance: 76000 },
    { date: "30 Sep", label: "30 Sep", balance: 88299 },
    { date: "05 Oct", label: "05 Oct", balance: 74499 },
    { date: "10 Oct", label: "10 Oct", balance: 78000 },
    { date: "13 Oct", label: "13 Oct", balance: 84250 },
  ],
  "3M": [
    { date: "Jul", label: "July", balance: 45000 },
    { date: "Aug W1", label: "Aug (E)", balance: 53500 },
    { date: "Aug W3", label: "Aug (L)", balance: 64200 },
    { date: "Sep W1", label: "Sep (E)", balance: 71000 },
    { date: "Sep W3", label: "Sep (L)", balance: 88299 },
    { date: "Oct", label: "October", balance: 84250 },
  ],
  "1Y": [
    { date: "Nov 25", label: "Nov", balance: 28000 },
    { date: "Jan 26", label: "Jan", balance: 35000 },
    { date: "Mar 26", label: "Mar", balance: 48000 },
    { date: "May 26", label: "May", balance: 59000 },
    { date: "Jul 26", label: "Jul", balance: 68000 },
    { date: "Sep 26", label: "Sep", balance: 79000 },
    { date: "Oct 26", label: "Oct", balance: 84250 },
  ],
};

export const SAVED_PAYMENT_METHODS = [
  {
    id: "pm_1",
    type: "UPI",
    title: "Google Pay UPI",
    detail: "doctor.healthixia@okhdfcbank",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "BANK",
    title: "HDFC Bank Payout Account",
    detail: "Account •••• 9842 (IFSC: HDFC0001245)",
    isDefault: false,
  },
  {
    id: "pm_3",
    type: "CARD",
    title: "Visa Business Platinum",
    detail: "Card •••• 5521 (Expires 08/29)",
    isDefault: false,
  },
];
