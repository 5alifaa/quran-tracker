import { Button } from "@/app/components/ui/Button";
import { Dialog } from "@/app/components/ui/Dialog";

type ResetConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
};

export function ResetConfirmModal({ onCancel, onConfirm, open }: ResetConfirmModalProps) {
  return (
    <Dialog onClose={onCancel} open={open} titleId="reset-title">
      <div className="space-y-5 text-right">
        <h2 className="font-amiri text-3xl font-bold text-navy" id="reset-title">
          هل تريد البدء من جديد؟
        </h2>
        <p className="leading-7 text-navy/75">سيتم مسح الاسم والتقدم، ويمكنك البدء برحلة جديدة بهدوء.</p>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onConfirm} variant="danger">
            نعم، ابدأ
          </Button>
          <Button onClick={onCancel} variant="ghost">
            إلغاء
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
