export function formatPrice(price: number | null | undefined): string {
  if (price == null) {
    return "Contact the hotel for current tariff and availability.";
  }
  return `₹${price.toLocaleString("en-IN")} / night`;
}
