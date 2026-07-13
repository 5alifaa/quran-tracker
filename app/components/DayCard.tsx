import type { KeyboardEvent } from "react";
import { Card } from "@/app/components/ui/Card";
import { formatCompactRange, formatDayLabel, toArabicNumber } from "@/lib/format";
import type { DayPlan } from "@/types";

type DayCardProps = {
  day: DayPlan;
  onToggle: (day: DayPlan) => void;
};

export function DayCard({ day, onToggle }: DayCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(day);
    }
  }

  const toggleLabel = day.completed ? "اضغط لإلغاء الإنجاز" : "اضغط لتسجيل الإنجاز";

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
          <h3 className="font-amiri text-2xl font-bold leading-tight text-navy">{formatDayLabel(day.id)}</h3>
        </div>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${day.completed ? "bg-teal text-cream" : "bg-gold/35 text-navy"}`}>
          {day.completed ? "✓" : toArabicNumber(day.id)}
        </span>
      </div>
      <p className="mt-2 w-full whitespace-nowrap text-right text-[0.7rem] font-semibold leading-5 text-navy/65">{formatCompactRange(day)}</p>
    </Card>
  );
}
