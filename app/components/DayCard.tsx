import type { KeyboardEvent } from "react";
import { Card } from "@/app/components/ui/Card";
import { formatCompactRange, formatDayLabel, toArabicNumber, truncateSurahName } from "@/lib/format";
import type { DayPlan } from "@/types";

type DayCardProps = {
  day: DayPlan;
  isSuggested: boolean;
  onToggle: (day: DayPlan) => void;
};

export function DayCard({ day, isSuggested, onToggle }: DayCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(day);
    }
  }

  const toggleLabel = day.completed ? "اضغط لإلغاء الإنجاز" : "اضغط لتسجيل الإنجاز";

  if (isSuggested) {
    return (
      <Card
        aria-checked={day.completed}
        aria-label={`${formatDayLabel(day.id)} ${day.from.surah}. ${toggleLabel}`}
        className={`cursor-pointer overflow-hidden ${day.completed ? "opacity-75" : "ring-2 ring-gold"}`}
        onClick={() => onToggle(day)}
        onKeyDown={handleKeyDown}
        role="checkbox"
        tabIndex={0}
      >
        <div className="bg-teal px-4 py-3 text-cream">
          <p className="font-amiri text-3xl font-bold">اليوم {toArabicNumber(day.id)}</p>
        </div>
        <div className="space-y-3 p-4 text-right">
          <div>
            <p className="text-sm font-bold text-gold">ورد اليوم</p>
            <h3 className="font-amiri text-2xl font-bold text-navy">{day.from.surah}</h3>
            <p className="text-sm font-semibold text-navy/70">الآيات: {formatCompactRange(day)}</p>
          </div>
          <div className={`rounded-2xl px-4 py-3 text-center text-base font-bold ${day.completed ? "bg-gold text-navy" : "bg-teal text-cream"}`}>
            {day.completed ? <span className="checkmark-bounce">✓ تم الإنجاز</span> : "اضغط للتسجيل"}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      aria-checked={day.completed}
      aria-label={`${formatDayLabel(day.id)} ${day.from.surah}. ${toggleLabel}`}
      className={`cursor-pointer p-3 transition-transform hover:-translate-y-0.5 ${day.completed ? "opacity-70" : ""}`}
      onClick={() => onToggle(day)}
      onKeyDown={handleKeyDown}
      role="checkbox"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 text-right">
          <h3 className="font-amiri text-xl font-bold text-navy">
            اليوم {toArabicNumber(day.id)} / {truncateSurahName(day.from.surah)}
          </h3>
          <p className="mt-1 text-xs font-semibold leading-5 text-navy/65">{formatCompactRange(day)}</p>
        </div>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${day.completed ? "bg-teal text-cream" : "bg-gold/35 text-navy"}`}>
          {day.completed ? "✓" : toArabicNumber(day.id)}
        </span>
      </div>
    </Card>
  );
}
