import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`rounded-3xl border border-gold/35 bg-cream shadow-md shadow-navy/10 ${className}`} {...props}>
      {children}
    </div>
  );
}
