type IslamicBorderProps = {
  className?: string;
};

export function IslamicBorder({ className = "" }: IslamicBorderProps) {
  return (
    <svg aria-hidden="true" className={`h-8 w-full text-gold ${className}`} preserveAspectRatio="none" viewBox="0 0 320 32">
      <defs>
        <pattern height="32" id="geo-pattern" patternUnits="userSpaceOnUse" width="64">
          <path d="M0 16L16 0L32 16L16 32Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M32 16L48 0L64 16L48 32Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" fill="currentColor" r="2" />
          <circle cx="48" cy="16" fill="currentColor" r="2" />
        </pattern>
      </defs>
      <rect fill="url(#geo-pattern)" height="32" width="320" />
    </svg>
  );
}
