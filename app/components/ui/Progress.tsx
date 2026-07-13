type ProgressProps = {
  label: string;
  value: number;
};

export function Progress({ label, value }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={safeValue}
      className="h-4 overflow-hidden rounded-full bg-gold"
      role="progressbar"
    >
      <div className="progress-fill h-full rounded-full bg-teal" style={{ width: `${safeValue}%` }} />
    </div>
  );
}
