"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Dialog } from "@/app/components/ui/Dialog";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";

type OnboardingModalProps = {
  onSubmit: (readerName: string) => void;
  open: boolean;
};

export function OnboardingModal({ onSubmit, open }: OnboardingModalProps) {
  const [readerName, setReaderName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const trimmedName = readerName.trim();

    if (!trimmedName) {
      setError("اكتب اسمك الكريم لنبدأ الرحلة معاً");
      return;
    }

    setError("");
    onSubmit(trimmedName);
  }

  return (
    <Dialog onClose={() => undefined} open={open} titleId="onboarding-title">
      <div className="space-y-5 text-right">
        <div>
          <p className="text-sm font-semibold text-teal">بسم الله نبدأ</p>
          <h2 className="font-amiri text-3xl font-bold text-navy" id="onboarding-title">
            أهلاً بك! معاً نختم القرآن في ٤٠ يوم
          </h2>
          <p className="mt-2 text-base leading-7 text-navy/75">اكتب اسمك ليكون وردك اليومي رفيقاً قريباً منك.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reader-name">اسم القارئ</Label>
          <Input
            aria-describedby={error ? "reader-name-error" : undefined}
            autoComplete="name"
            autoFocus
            id="reader-name"
            onChange={(event) => setReaderName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="مثلاً: عبد الله"
            value={readerName}
          />
          {error ? (
            <p className="text-sm font-semibold text-teal-deep" id="reader-name-error">
              {error}
            </p>
          ) : null}
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          ابدأ رحلتك مع القرآن اليوم
        </Button>
      </div>
    </Dialog>
  );
}
