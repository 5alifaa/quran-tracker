"use client";

import { useEffect, type ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  describedBy?: string;
  onClose: () => void;
  open: boolean;
  titleId: string;
};

export function Dialog({ children, describedBy, onClose, open, titleId }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        aria-label="إغلاق"
        className="absolute inset-0 h-full w-full cursor-default bg-navy/35"
        onClick={onClose}
        type="button"
      />
      <section
        aria-describedby={describedBy}
        aria-labelledby={titleId}
        aria-modal="true"
        className="modal-fade-in relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-gold/45 bg-cream p-5 text-navy shadow-2xl shadow-navy/20 sm:p-6"
        role="dialog"
      >
        {children}
      </section>
    </div>
  );
}
