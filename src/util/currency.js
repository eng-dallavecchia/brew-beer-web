import formatCurrency from "format-currency";

export const toBRL = val => {
  const formatOptions = { format: "%s%v", symbol: "R$ ", maxFraction: 2 };
  return formatCurrency(val, formatOptions)
    .replace(",", "|")
    .replace(".", ",")
    .replace("|", ".");
};

export const toPercentage = val => {
  const formatOptions = { format: "%v%c", code: " %", maxFraction: 2 };
  return formatCurrency(val, formatOptions);
};
