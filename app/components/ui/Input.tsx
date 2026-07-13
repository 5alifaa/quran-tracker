import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`min-h-11 w-full rounded-2xl border border-gold/50 bg-cream px-4 py-2 text-right text-lg text-navy shadow-inner shadow-gold/10 placeholder:text-navy/45 ${className}`}
      {...props}
    />
  );
}
