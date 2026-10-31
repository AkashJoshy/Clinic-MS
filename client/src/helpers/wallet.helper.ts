export const formatCurrency = (
  amount: number,
  currency: string = "₹"
): string => {
  return `${currency}${" "}${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const copyToClipboard = async (
  text: string,
  onSuccess?: () => void
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    if (onSuccess) onSuccess();
    return true;
  } catch {
    return false;
  }
};

// const formatCurrency = (amount: number, currency = "INR") =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);

export const formatDate = (value: string | null) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const getStatusClass = (status: string) => {
  switch (status.toUpperCase()) {
    case "COMPLETED":
    case "SUCCESS":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";

    case "PENDING":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";

    case "FAILED":
    case "CANCELLED":
    case "REJECTED":
      return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";

    default:
      return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  }
};

export const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);