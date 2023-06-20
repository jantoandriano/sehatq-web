export function priceFormat(price = 0, currency = "Rp") {
  if (price !== null) {
    const newPrice = price
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return `${currency} ${newPrice}`;
  }
  return "";
}
