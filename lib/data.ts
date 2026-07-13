import type { DayPlan } from "@/types";

type FixedRange = Omit<DayPlan, "completed" | "dateCompleted">;

export const READING_PLAN: FixedRange[] = [
  { id: 1, from: { surah: "الفَاتِحة", ayah: 1 }, to: { surah: "البَقَرَة", ayah: 105 } },
  { id: 2, from: { surah: "البَقَرَة", ayah: 106 }, to: { surah: "البَقَرَة", ayah: 202 } },
  { id: 3, from: { surah: "البَقَرَة", ayah: 203 }, to: { surah: "البَقَرَة", ayah: 271 } },
  { id: 4, from: { surah: "البَقَرَة", ayah: 272 }, to: { surah: "آل عِمران", ayah: 92 } },
  { id: 5, from: { surah: "آل عِمران", ayah: 93 }, to: { surah: "آل عِمران", ayah: 200 } },
  { id: 6, from: { surah: "النِّسَاء", ayah: 1 }, to: { surah: "النِّسَاء", ayah: 87 } },
  { id: 7, from: { surah: "النِّسَاء", ayah: 88 }, to: { surah: "النِّسَاء", ayah: 176 } },
  { id: 8, from: { surah: "المَائدة", ayah: 1 }, to: { surah: "المَائدة", ayah: 81 } },
  { id: 9, from: { surah: "المَائدة", ayah: 82 }, to: { surah: "الأنعَام", ayah: 73 } },
  { id: 10, from: { surah: "الأنعَام", ayah: 74 }, to: { surah: "الأنعَام", ayah: 165 } },
  { id: 11, from: { surah: "الأعرَاف", ayah: 1 }, to: { surah: "الأعرَاف", ayah: 141 } },
  { id: 12, from: { surah: "الأعرَاف", ayah: 142 }, to: { surah: "الأنفَال", ayah: 40 } },
  { id: 13, from: { surah: "الأنفَال", ayah: 41 }, to: { surah: "التوبَة", ayah: 59 } },
  { id: 14, from: { surah: "التوبَة", ayah: 60 }, to: { surah: "يُونس", ayah: 25 } },
  { id: 15, from: { surah: "يُونس", ayah: 26 }, to: { surah: "هُود", ayah: 40 } },
  { id: 16, from: { surah: "هُود", ayah: 41 }, to: { surah: "يُوسُف", ayah: 52 } },
  { id: 17, from: { surah: "يُوسُف", ayah: 53 }, to: { surah: "إبراهِيم", ayah: 9 } },
  { id: 18, from: { surah: "إبراهِيم", ayah: 10 }, to: { surah: "النَّحل", ayah: 50 } },
  { id: 19, from: { surah: "النَّحل", ayah: 51 }, to: { surah: "الإسرَاء", ayah: 49 } },
  { id: 20, from: { surah: "الإسرَاء", ayah: 50 }, to: { surah: "الكَهف", ayah: 74 } },
  { id: 21, from: { surah: "الكَهف", ayah: 75 }, to: { surah: "طه", ayah: 82 } },
  { id: 22, from: { surah: "طه", ayah: 83 }, to: { surah: "الأنبيَاء", ayah: 112 } },
  { id: 23, from: { surah: "الحج", ayah: 1 }, to: { surah: "المؤمنُون", ayah: 74 } },
  { id: 24, from: { surah: "المؤمنُون", ayah: 75 }, to: { surah: "الفُرقَان", ayah: 20 } },
  { id: 25, from: { surah: "الفُرقَان", ayah: 21 }, to: { surah: "الشعراء", ayah: 227 } },
  { id: 26, from: { surah: "النَّمل", ayah: 1 }, to: { surah: "القَصَص", ayah: 50 } },
  { id: 27, from: { surah: "القَصَص", ayah: 51 }, to: { surah: "الرُّوم", ayah: 30 } },
  { id: 28, from: { surah: "الرُّوم", ayah: 31 }, to: { surah: "الأحزَاب", ayah: 30 } },
  { id: 29, from: { surah: "الأحزَاب", ayah: 31 }, to: { surah: "فَاطِر", ayah: 14 } },
  { id: 30, from: { surah: "فَاطِر", ayah: 15 }, to: { surah: "الصَّافَات", ayah: 144 } },
  { id: 31, from: { surah: "الصَّافَات", ayah: 145 }, to: { surah: "الزُّمَر", ayah: 75 } },
  { id: 32, from: { surah: "غَافِر", ayah: 1 }, to: { surah: "فُصِّلَت", ayah: 46 } },
  { id: 33, from: { surah: "فُصِّلَت", ayah: 47 }, to: { surah: "الدُّخان", ayah: 16 } },
  { id: 34, from: { surah: "الدُّخان", ayah: 17 }, to: { surah: "الفَتح", ayah: 17 } },
  { id: 35, from: { surah: "الفَتح", ayah: 18 }, to: { surah: "النَّجم", ayah: 25 } },
  { id: 36, from: { surah: "النَّجم", ayah: 26 }, to: { surah: "الحدِيد", ayah: 29 } },
  { id: 37, from: { surah: "المُجَادلة", ayah: 1 }, to: { surah: "التغَابُن", ayah: 18 } },
  { id: 38, from: { surah: "الطَّلَاق", ayah: 1 }, to: { surah: "نُوح", ayah: 28 } },
  { id: 39, from: { surah: "الجِن", ayah: 1 }, to: { surah: "التَّكوير", ayah: 29 } },
  { id: 40, from: { surah: "الانفِطَار", ayah: 1 }, to: { surah: "النَّاس", isEndOfSurah: true } },
];

export function createFreshDays(): DayPlan[] {
  return READING_PLAN.map((day) => ({ ...day, completed: false }));
}
