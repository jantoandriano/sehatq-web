export function generatePriceDisplay(price = 0, currency = "Rp") {
  return price === 0
    ? ""
    : `${currency} ${price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
}
