import type { DayPlan, KhatmaProgress } from "@/types";

export function getKhatmaProgress(days: DayPlan[]): KhatmaProgress {
  const completedCount = days.filter((day) => day.completed).length;
  const suggestedCurrentDay = days.find((day) => !day.completed);

  return {
    completedCount,
    percentage: Math.round((completedCount / 40) * 100),
    suggestedCurrentDayId: suggestedCurrentDay?.id ?? null,
    isComplete: completedCount === 40,
  };
}
