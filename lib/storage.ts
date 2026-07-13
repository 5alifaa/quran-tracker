import { createFreshDays, READING_PLAN } from "@/lib/data";
import type { AppState, DayPlan } from "@/types";

const STORAGE_KEY = "quran-khatma-tracker-state";

type StoredDay = Pick<DayPlan, "id" | "completed" | "dateCompleted">;

type StoredState = {
  readerName?: unknown;
  days?: unknown;
  startDate?: unknown;
};

function isStoredDay(value: unknown): value is StoredDay {
  if (!value || typeof value !== "object") {
    return false;
  }

  const day = value as Partial<StoredDay>;
  return typeof day.id === "number" && typeof day.completed === "boolean";
}

function hydrateDays(storedDays: unknown): DayPlan[] | null {
  if (!Array.isArray(storedDays) || storedDays.length !== 40 || !storedDays.every(isStoredDay)) {
    return null;
  }

  const storedById = new Map(storedDays.map((day) => [day.id, day]));
  const hydratedDays: DayPlan[] = [];

  for (const fixedDay of READING_PLAN) {
    const stored = storedById.get(fixedDay.id);

    if (!stored) {
      return null;
    }

    hydratedDays.push({
      ...fixedDay,
      completed: stored.completed,
      dateCompleted: stored.completed ? stored.dateCompleted : undefined,
    });
  }

  return hydratedDays;
}

function parseStoredState(rawValue: string): AppState | null {
  try {
    const parsed = JSON.parse(rawValue) as StoredState;
    const readerName = typeof parsed.readerName === "string" ? parsed.readerName.trim() : "";
    const days = hydrateDays(parsed.days);

    if (!readerName || !days || days.length !== 40) {
      return null;
    }

    return {
      readerName,
      days,
      startDate: typeof parsed.startDate === "string" ? parsed.startDate : undefined,
    };
  } catch {
    return null;
  }
}

export function createInitialState(readerName: string): AppState {
  return {
    readerName: readerName.trim(),
    days: createFreshDays(),
    startDate: new Date().toISOString(),
  };
}

export function loadAppState(): AppState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    return rawValue ? parseStoredState(rawValue) : null;
  } catch {
    // إذا تعذّر الوصول للتخزين نبدأ بهدوء من جديد.
    return null;
  }
}

export function saveAppState(state: AppState): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function resetAppState(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // لا نعرض أخطاء تقنية للقارئ، فالواجهة ستعود للبداية تلقائياً.
  }
}
