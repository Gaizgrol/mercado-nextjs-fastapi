export const idFormat = (id: number | string): string =>
  String(id).padStart(8, "0");

export const toCurrency = (cents: number): string =>
  `R$ ${(cents / 100).toFixed(2)}`;
