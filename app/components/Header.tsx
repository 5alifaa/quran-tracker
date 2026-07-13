import { Button } from "@/app/components/ui/Button";

type HeaderProps = {
  onEditName: () => void;
  readerName: string;
};

export function Header({ onEditName, readerName }: HeaderProps) {
  return (
    <header className="space-y-4 text-center">
      <div className="flex items-start justify-between gap-3 text-right">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-teal">أهلاً بك في رحلتك المباركة</p>
          <h1 className="font-amiri text-4xl font-bold leading-tight text-navy sm:text-5xl">ختمة القرآن في ٤٠ يوم</h1>
        </div>
        <Button aria-label="تعديل الاسم" className="min-h-11 min-w-11 rounded-full px-0 text-xl" onClick={onEditName} variant="ghost">
          ⚙️
        </Button>
      </div>
      <p className="rounded-2xl bg-gold/20 px-4 py-3 text-lg font-semibold text-navy">الورد اليومي — {readerName}</p>
    </header>
  );
}
