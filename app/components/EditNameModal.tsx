"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Dialog } from "@/app/components/ui/Dialog";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";

type EditNameModalProps = {
  currentName: string;
  onClose: () => void;
  onSave: (readerName: string) => void;
  open: boolean;
};

export function EditNameModal({ currentName, onClose, onSave, open }: EditNameModalProps) {
  const [readerName, setReaderName] = useState(currentName);
  const [error, setError] = useState("");

  function handleSave() {
    const trimmedName = readerName.trim();

    if (!trimmedName) {
      setError("الاسم لا يكون فارغاً يا صديق الرحلة");
      return;
    }

    onSave(trimmedName);
  }

  return (
    <Dialog onClose={onClose} open={open} titleId="edit-name-title">
      <div className="space-y-5 text-right">
        <h2 className="font-amiri text-3xl font-bold text-navy" id="edit-name-title">
          تعديل اسم القارئ
        </h2>
        <div className="space-y-2">
          <Label htmlFor="edit-reader-name">اسم القارئ</Label>
          <Input
            aria-describedby={error ? "edit-reader-name-error" : undefined}
            autoFocus
            id="edit-reader-name"
            onChange={(event) => setReaderName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }
            }}
            value={readerName}
          />
          {error ? (
            <p className="text-sm font-semibold text-teal-deep" id="edit-reader-name-error">
              {error}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleSave}>حفظ</Button>
          <Button onClick={onClose} variant="ghost">
            إغلاق
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
