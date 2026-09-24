export const formatUtcOffset = (offsetNumber: number): string => {
  const sign = offsetNumber >= 0 ? "+" : "−";
  
  const absoluteHours = Math.abs(offsetNumber);
  const hours = Math.floor(absoluteHours);
  
  const minutes = Math.round((absoluteHours - hours) * 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `UTC ${sign}${formattedHours}:${formattedMinutes}`;
};