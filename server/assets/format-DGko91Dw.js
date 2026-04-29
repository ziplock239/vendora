function formatNaira(kobo) {
  const value = Number(kobo ?? 0) / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}
function nairaToKobo(naira) {
  return Math.round(naira * 100);
}
export {
  formatNaira as f,
  nairaToKobo as n
};
