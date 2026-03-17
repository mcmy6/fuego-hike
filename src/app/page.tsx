"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Header from "@/components/Header";
import CountdownCard from "@/components/CountdownCard";
import WeekTimeline from "@/components/WeekTimeline";
import DaySelector from "@/components/DaySelector";
import UnlockPreview from "@/components/UnlockPreview";
import WorkoutChecklist from "@/components/WorkoutChecklist";
import CompleteWorkoutButton from "@/components/CompleteWorkoutButton";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import { workouts } from "@/data/workouts";
import { ITEMS_PER_WEEK } from "@/data/gear";
import {
  getWorkoutsCompleted,
  getTodayChecks,
  setTodayChecks,
  isWorkoutCompletedToday,
  completeWorkout,
} from "@/lib/progressStore";

export default function Home() {
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [workoutDone, setWorkoutDone] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isWeekComplete, setIsWeekComplete] = useState(false);
  const [lastUnlockedId, setLastUnlockedId] = useState<number | undefined>();
  const [mounted, setMounted] = useState(false);
  const [previewDay, setPreviewDay] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorkoutsCompleted(getWorkoutsCompleted());
    setChecks(getTodayChecks());
    setWorkoutDone(isWorkoutCompletedToday());
    setMounted(true);
  }, []);

  const dayOfWeek = new Date().getDay();
  const todayWorkout = workouts[dayOfWeek];
  const exerciseCount = (todayWorkout?.exercises.length || 0) + (todayWorkout?.stairmaster ? 1 : 0);

  const allChecked =
    exerciseCount > 0 &&
    Array.from({ length: exerciseCount }, (_, i) => String(i)).every(
      (key) => checks[key]
    );

  const handleToggle = useCallback(
    (index: number) => {
      if (workoutDone) return;
      const key = String(index);
      const newChecks = { ...checks, [key]: !checks[key] };
      setChecks(newChecks);
      setTodayChecks(newChecks);
    },
    [checks, workoutDone]
  );

  const handleComplete = useCallback(() => {
    if (!allChecked || workoutDone) return;
    const newCount = completeWorkout();
    setWorkoutsCompleted(newCount);
    setWorkoutDone(true);

    const weekComplete = newCount % ITEMS_PER_WEEK === 0;
    setIsWeekComplete(weekComplete);
    setLastUnlockedId(newCount);

    // Scroll to timeline first, then show celebration after scroll completes
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setShowCelebration(true);
    }, 600);
  }, [allChecked, workoutDone]);

  const handleCelebrationDone = useCallback(() => {
    setShowCelebration(false);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">🌋</div>
      </div>
    );
  }

  return (
    <>
      <CelebrationOverlay
        show={showCelebration}
        isWeekComplete={isWeekComplete}
        onDone={handleCelebrationDone}
      />

      <Header />
      <CountdownCard />
      <div ref={timelineRef}>
        <WeekTimeline
          workoutsCompleted={workoutsCompleted}
          lastUnlockedId={lastUnlockedId}
        />
      </div>
      <DaySelector
        selectedDay={previewDay ?? dayOfWeek}
        onSelect={(day) => setPreviewDay(day === dayOfWeek ? null : day)}
      />
      {previewDay !== null ? (
        <WorkoutChecklist
          checks={{}}
          onToggle={() => {}}
          workoutCompleted={false}
          previewDay={previewDay}
          onBack={() => {
            const prev = (previewDay + 6) % 7;
            setPreviewDay(prev === dayOfWeek ? null : prev);
          }}
          onForward={() => {
            const next = (previewDay + 1) % 7;
            setPreviewDay(next === dayOfWeek ? null : next);
          }}
        />
      ) : (
        <>
          <WorkoutChecklist
            checks={checks}
            onToggle={handleToggle}
            workoutCompleted={workoutDone}
            onBack={() => setPreviewDay((dayOfWeek + 6) % 7)}
            onForward={() => setPreviewDay((dayOfWeek + 1) % 7)}
          />
          <CompleteWorkoutButton
            allChecked={allChecked}
            workoutCompleted={workoutDone}
            workoutsCompleted={workoutsCompleted}
            onComplete={handleComplete}
          />
          <UnlockPreview
            workoutsCompleted={workoutsCompleted}
            onPreview={() => setPreviewDay((dayOfWeek + 1) % 7)}
          />
        </>
      )}

      <div className="h-8" />
    </>
  );
}
