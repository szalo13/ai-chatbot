export const truncateText = (
  text: string,
  maxLength: number,
  addDots = true
): string => {
  if (!text) return "";
  const dots = addDots ? "…" : "";

  return text.length > maxLength ? text.substr(0, maxLength) + dots : text;
};
