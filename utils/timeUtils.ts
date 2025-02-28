/**
 * Saniye cinsinden verilen süreyi "00:00" formatında biçimlendirir
 * @param seconds Biçimlendirilecek saniye değeri
 * @returns "00:00" formatında zaman dizgisi
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}; 