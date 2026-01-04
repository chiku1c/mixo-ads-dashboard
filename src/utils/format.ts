export const formatCurrency = (
  value?: number | null
): string => {
  if (typeof value !== "number") return "$0";
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (
  value?: number | null
): string => {
  if (typeof value !== "number") return "0";
  return value.toLocaleString();
};
