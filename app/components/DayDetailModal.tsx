import { Button } from "@/app/components/ui/Button";
import { Dialog } from "@/app/components/ui/Dialog";
import { formatAyahRange, formatDayLabel } from "@/lib/format";
import type { DayPlan } from "@/types";

type DayDetailModalProps = {
  day: DayPlan | null;
  onClose: () => void;
  onToggle: (day: DayPlan) => void;
};

export function DayDetailModal({ day, onClose, onToggle }: DayDetailModalProps) {
  if (!day) {
    return null;
  }

  function handleToggle() {
    if (!day) {
      return;
    }

    onToggle(day);
  }

  return (
    <Dialog describedBy="day-detail-description" onClose={onClose} open={Boolean(day)} titleId="day-detail-title">
      <div className="space-y-5 text-right">
        <div>
          <p className="text-sm font-bold text-teal">ورد مبارك</p>
          <h2 className="font-amiri text-4xl font-bold text-navy" id="day-detail-title">
            {formatDayLabel(day.id)}
          </h2>
        </div>
        <div className="rounded-3xl bg-gold/15 p-4" id="day-detail-description">
          <p className="text-sm font-bold text-navy/65">من</p>
          <p className="font-amiri text-2xl font-bold text-navy">{day.from.surah}</p>
          <p className="mt-3 text-sm font-bold text-navy/65">إلى</p>
          <p className="font-amiri text-2xl font-bold text-navy">{day.to.surah}</p>
          <p className="mt-4 text-base font-semibold leading-8 text-navy">{formatAyahRange(day)}</p>
        </div>
        <div className="grid gap-3">
          <Button className="min-h-14 text-xl" onClick={handleToggle} variant={day.completed ? "secondary" : "primary"}>
            {day.completed ? "✓ تم الإنجاز" : "✓ أَنْجَزْت"}
          </Button>
          <Button onClick={onClose} variant="ghost">
            إغلاق
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
