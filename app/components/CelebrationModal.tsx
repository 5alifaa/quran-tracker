import { Button } from "@/app/components/ui/Button";
import { Dialog } from "@/app/components/ui/Dialog";

type CelebrationModalProps = {
  onClose: () => void;
  onReset: () => void;
  open: boolean;
};

export function CelebrationModal({ onClose, onReset, open }: CelebrationModalProps) {
  return (
    <Dialog onClose={onClose} open={open} titleId="celebration-title">
      <div className="space-y-5 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-3xl">🎉</div>
        <h2 className="font-amiri text-4xl font-bold text-navy" id="celebration-title">
          مبروك! ختمت القرآن في ٤٠ يوم 🎉
        </h2>
        <p className="text-lg font-semibold text-teal">بارك الله فيك، جعلها الله نوراً لقلبك.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={onReset} variant="secondary">
            ابدأ من جديد
          </Button>
          <Button onClick={onClose} variant="ghost">
            إغلاق
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
