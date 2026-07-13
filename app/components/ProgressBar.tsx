import { formatPercentage, toArabicNumber } from "@/lib/format";
import { Progress } from "@/app/components/ui/Progress";

type ProgressBarProps = {
  completedCount: number;
  percentage: number;
};

export function ProgressBar({ completedCount, percentage }: ProgressBarProps) {
  return (
    <section aria-labelledby="progress-title" className="rounded-[2rem] border border-gold/40 bg-cream/90 p-4 shadow-lg shadow-navy/10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-amiri text-2xl font-bold text-navy" id="progress-title">
            تقدم الختمة
          </h2>
          <p className="text-sm font-semibold text-teal">أحسنت! كل آية تقرّبك من الختمة</p>
        </div>
        <span className="rounded-full bg-teal px-4 py-2 text-lg font-bold text-cream" aria-label={`التقدم ${formatPercentage(percentage)}`}>
          {formatPercentage(percentage)}
        </span>
      </div>
      <Progress label="نسبة تقدم الختمة" value={percentage} />
      <p className="mt-3 text-sm font-semibold text-navy/70">أنجزت {toArabicNumber(completedCount)} من ٤٠ يوماً</p>
    </section>
  );
}
