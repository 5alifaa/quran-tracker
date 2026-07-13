export interface AyahReference {
  surah: string;
  ayah?: number;
  isEndOfSurah?: boolean;
}

export interface DayPlan {
  id: number;
  from: AyahReference;
  to: AyahReference;
  completed: boolean;
  dateCompleted?: string;
}

export interface AppState {
  readerName: string;
  days: DayPlan[];
  startDate?: string;
}

export interface KhatmaProgress {
  completedCount: number;
  percentage: number;
  suggestedCurrentDayId: number | null;
  isComplete: boolean;
}
