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
  getDayChecks,
  setDayChecks,
  isDayCompleted,
  markDayCompleted,
  completeWorkout,
  getCompletedDays,
} from "@/lib/progressStore";

export default function Home() {
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [workoutDone, setWorkoutDone] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isWeekComplete, setIsWeekComplete] = useState(false);
  const [lastUnlockedId, setLastUnlockedId] = useState<number | undefined>();
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [resumeDay, setResumeDay] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Load state and check for in-progress workout
  useEffect(() => {
    setWorkoutsCompleted(getWorkoutsCompleted());
    setMounted(true);

    // Check if there's an in-progress workout on any day
    const completedDays = getCompletedDays();
    const workoutDays = [1, 2, 3, 5, 6]; // Mon, Tue, Wed, Fri, Sat
    for (const day of workoutDays) {
      if (completedDays.has(day)) continue;
      const dayChecks = getDayChecks(day);
      const hasProgress = Object.values(dayChecks).some((v) => v === true);
      if (hasProgress) {
        setResumeDay(day);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setChecks(getDayChecks(selectedDay));
    setWorkoutDone(isDayCompleted(selectedDay));
  }, [selectedDay, mounted]);

  const dayWorkout = workouts[selectedDay];
  const exerciseCount = (dayWorkout?.exercises.length || 0) + (dayWorkout?.stairmaster ? 1 : 0);

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
      setDayChecks(selectedDay, newChecks);
    },
    [checks, workoutDone, selectedDay]
  );

  const handleComplete = useCallback(() => {
    if (!allChecked || workoutDone) return;
    markDayCompleted(selectedDay);
    const newCount = completeWorkout();
    setWorkoutsCompleted(newCount);
    setWorkoutDone(true);

    const weekComplete = newCount % ITEMS_PER_WEEK === 0;
    setIsWeekComplete(weekComplete);
    setLastUnlockedId(newCount);

    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setShowCelebration(true);
    }, 600);
  }, [allChecked, workoutDone, selectedDay]);

  const handleCelebrationDone = useCallback(() => {
    setShowCelebration(false);
  }, []);

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
  };

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

      {/* Resume banner */}
      {resumeDay !== null && (
        <div className="mx-4 mb-3 rounded-xl bg-orange-50 border border-orange-200 p-3 flex items-center justify-between">
          <p className="text-sm text-orange-700">
            Pick up where you left off?{" "}
            <span className="font-semibold">{workouts[resumeDay]?.day}&apos;s workout</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setSelectedDay(resumeDay); setResumeDay(null); }}
              className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-medium active:scale-95"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={() => setResumeDay(null)}
              className="text-xs text-orange-400 px-2 py-1.5 font-medium active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <CountdownCard />
      <div ref={timelineRef}>
        <WeekTimeline
          workoutsCompleted={workoutsCompleted}
          lastUnlockedId={lastUnlockedId}
        />
      </div>
      <DaySelector
        selectedDay={selectedDay}
        onSelect={handleDayChange}
      />
      <WorkoutChecklist
        checks={checks}
        onToggle={handleToggle}
        workoutCompleted={workoutDone}
        selectedDay={selectedDay}
        onBack={() => handleDayChange((selectedDay + 6) % 7)}
        onForward={() => handleDayChange((selectedDay + 1) % 7)}
      />
      <CompleteWorkoutButton
        allChecked={allChecked}
        workoutCompleted={workoutDone}
        workoutsCompleted={workoutsCompleted}
        onComplete={handleComplete}
        selectedDay={selectedDay}
      />
      <UnlockPreview
        workoutsCompleted={workoutsCompleted}
        onPreview={() => handleDayChange((selectedDay + 1) % 7)}
      />

      <div className="h-8" />
    </>
  );
}
