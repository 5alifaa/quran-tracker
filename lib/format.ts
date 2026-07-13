import type { AyahReference, DayPlan } from "@/types";

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicNumber(value: number): string {
  return String(value).replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
}

export function formatPercentage(value: number): string {
  return `${toArabicNumber(value)}٪`;
}

export function formatDayLabel(dayId: number): string {
  return `اليوم ${toArabicNumber(dayId)}`;
}

export function formatTodayShortcut(dayId: number | null): string {
  return dayId === null ? "اكتملت الختمة" : `اليوم: ${toArabicNumber(dayId)}`;
}

function formatReference(reference: AyahReference): string {
  const ayah = reference.isEndOfSurah || reference.ayah === undefined ? "النهاية" : toArabicNumber(reference.ayah);
  return `السورة ${reference.surah} الآية ${ayah}`;
}

export function formatAyahRange(day: DayPlan): string {
  return `${formatReference(day.from)} ← ${formatReference(day.to)}`;
}

export function formatCompactRange(day: DayPlan): string {
  const fromAyah = day.from.ayah === undefined ? "" : toArabicNumber(day.from.ayah);
  const toAyah = day.to.isEndOfSurah || day.to.ayah === undefined ? "النهاية" : toArabicNumber(day.to.ayah);
  return `${day.from.surah} ${fromAyah} ← ${day.to.surah} ${toAyah}`;
}

export function truncateSurahName(surah: string, maxLength = 15): string {
  return surah.length > maxLength ? `${surah.slice(0, maxLength)}…` : surah;
}
