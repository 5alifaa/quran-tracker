"use client";

import { useEffect, useState } from "react";
import { CelebrationModal } from "@/app/components/CelebrationModal";
import { DayCard } from "@/app/components/DayCard";
import { EditNameModal } from "@/app/components/EditNameModal";
import { Header } from "@/app/components/Header";
import { IslamicBorder } from "@/app/components/IslamicBorder";
import { OnboardingModal } from "@/app/components/OnboardingModal";
import { ProgressBar } from "@/app/components/ProgressBar";
import { ResetConfirmModal } from "@/app/components/ResetConfirmModal";
import { Button } from "@/app/components/ui/Button";
import { formatTodayShortcut } from "@/lib/format";
import { getKhatmaProgress } from "@/lib/progress";
import { createInitialState, loadAppState, resetAppState, saveAppState } from "@/lib/storage";
import type { AppState, DayPlan } from "@/types";

export default function Home() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAppState(loadAppState());
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const progress = appState ? getKhatmaProgress(appState.days) : null;
  const suggestedDay = appState?.days.find((day) => day.id === progress?.suggestedCurrentDayId) ?? null;
  const shouldShowCelebration = isCelebrationOpen || Boolean(progress?.isComplete && !celebrationDismissed);

  function persistState(nextState: AppState) {
    setAppState(nextState);
    saveAppState(nextState);
  }

  function handleStart(readerName: string) {
    persistState(createInitialState(readerName));
    setCelebrationDismissed(false);
  }

  function handleSaveName(readerName: string) {
    if (!appState) {
      return;
    }

    persistState({ ...appState, readerName });
    setIsEditingName(false);
  }

  function handleToggleDay(day: DayPlan) {
    if (!appState) {
      return;
    }

    const nextDays = appState.days.map((item) => {
      if (item.id !== day.id) {
        return item;
      }

      const completed = !item.completed;
      return {
        ...item,
        completed,
        dateCompleted: completed ? new Date().toISOString() : undefined,
      };
    });
    const nextState = { ...appState, days: nextDays };
    const nextProgress = getKhatmaProgress(nextDays);

    persistState(nextState);

    if (!nextProgress.isComplete) {
      setCelebrationDismissed(false);
      setIsCelebrationOpen(false);
    } else {
      setCelebrationDismissed(false);
      setIsCelebrationOpen(true);
    }
  }

  function handleReset() {
    resetAppState();
    setAppState(null);
    setIsResetOpen(false);
    setIsCelebrationOpen(false);
    setCelebrationDismissed(false);
  }

  if (!isReady) {
    return <main className="min-h-screen bg-cream" />;
  }

  return (
    <main className="min-h-screen overflow-hidden px-3 py-4 text-navy sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <IslamicBorder />

        {appState && progress ? (
          <>
            <Header onEditName={() => setIsEditingName(true)} readerName={appState.readerName} />

            <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-stretch">
              <ProgressBar completedCount={progress.completedCount} percentage={progress.percentage} />
              <div className="grid gap-3 rounded-[2rem] border border-teal/25 bg-teal/10 p-4 shadow-lg shadow-navy/10 lg:min-w-72">
                <Button
                  className="min-h-14 text-lg"
                  onClick={() => {
                    if (suggestedDay) {
                      handleToggleDay(suggestedDay);
                    }
                  }}
                  variant="secondary"
                >
                  {suggestedDay?.completed ? "تراجع عن ورد اليوم" : formatTodayShortcut(progress.suggestedCurrentDayId)}
                </Button>
                <Button onClick={() => setIsResetOpen(true)} variant="ghost">
                  ابدأ من جديد
                </Button>
              </div>
            </section>

            <section aria-label="خطة الأربعين يوماً" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
              {appState.days.map((day) => (
                <DayCard
                  day={day}
                  key={day.id}
                  onToggle={handleToggleDay}
                />
              ))}
            </section>
          </>
        ) : (
          <section className="grid min-h-[65vh] place-items-center rounded-[2rem] border border-gold/40 bg-cream/75 p-8 text-center shadow-xl shadow-navy/10">
            <div className="max-w-md space-y-4">
              <p className="text-sm font-bold text-teal">رفيقك اليومي</p>
              <h1 className="font-amiri text-5xl font-bold leading-tight text-navy">ختمة القرآن في ٤٠ يوم</h1>
              <p className="text-lg leading-8 text-navy/75">ابدأ رحلتك مع القرآن اليوم، خطوة هادئة وورد مبارك.</p>
            </div>
          </section>
        )}

        <IslamicBorder />
      </div>

      <OnboardingModal onSubmit={handleStart} open={!appState} />
      {isEditingName ? <EditNameModal currentName={appState?.readerName ?? ""} onClose={() => setIsEditingName(false)} onSave={handleSaveName} open /> : null}
      <ResetConfirmModal onCancel={() => setIsResetOpen(false)} onConfirm={handleReset} open={isResetOpen} />
      <CelebrationModal
        onClose={() => {
          setCelebrationDismissed(true);
          setIsCelebrationOpen(false);
        }}
        onReset={handleReset}
        open={shouldShowCelebration}
      />
    </main>
  );
}
