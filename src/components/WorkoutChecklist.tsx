"use client";

import { workouts } from "@/data/workouts";
import WorkoutItem from "./WorkoutItem";

function getDateForDay(dayIndex: number): string {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = dayIndex - currentDay;
  const target = new Date(today);
  target.setDate(today.getDate() + diff);
  return `${target.getMonth() + 1}/${target.getDate()}`;
}

export default function WorkoutChecklist({
  checks,
  onToggle,
  workoutCompleted,
  previewDay,
  onBack,
  onForward,
}: {
  checks: Record<string, boolean>;
  onToggle: (exerciseIndex: number) => void;
  workoutCompleted: boolean;
  previewDay?: number | null;
  onBack?: () => void;
  onForward?: () => void;
}) {
  const dayOfWeek = previewDay ?? new Date().getDay();
  const isPreview = previewDay != null;
  const todayWorkout = workouts[dayOfWeek];
  const dateLabel = getDateForDay(dayOfWeek);

  if (!todayWorkout || todayWorkout.exercises.length === 0) {
    return (
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1" />
          <h2 className="text-sm font-semibold text-gray-800 text-center">
            {dateLabel} <span className="text-gray-400 font-normal">· Rest / Active Recovery</span>
          </h2>
          <div className="flex-1 flex justify-end gap-1">
            {onBack && (
              <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium active:scale-95 transition-transform">←</button>
            )}
            {onForward && (
              <button
                type="button"
                onClick={onForward}
                className={`text-sm text-orange-500 font-medium active:scale-95 transition-transform ${dayOfWeek === 6 ? "opacity-20 pointer-events-none" : ""}`}
              >→</button>
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-blue-50/60 p-6 text-center">
          <p className="text-3xl mb-2">🧘</p>
          <p className="text-sm font-semibold text-blue-800">Rest Day</p>
          <p className="text-xs text-blue-600 mt-1">
            Active recovery — go for a walk, stretch, or just relax!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          {!isPreview && workoutCompleted ? (
            <span className="text-xs bg-green-100/80 text-green-700 px-2 py-1 rounded-full font-medium">
              Done ✓
            </span>
          ) : null}
        </div>
        <h2 className="text-sm font-semibold text-gray-800 text-center">
          {dateLabel} <span className="text-gray-400 font-normal">· {todayWorkout.focus}</span>
        </h2>
        <div className="flex-1 flex justify-end gap-1">
          {onBack && (
            <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium active:scale-95 transition-transform">←</button>
          )}
          {onForward && (
            <button
              type="button"
              onClick={onForward}
              className={`text-sm text-orange-500 font-medium active:scale-95 transition-transform ${dayOfWeek === 6 ? "opacity-20 pointer-events-none" : ""}`}
            >→</button>
          )}
        </div>
      </div>

      {/* Warmup */}
      <div className="rounded-xl bg-amber-50/70 backdrop-blur-sm p-3 mb-2">
        <p className="text-xs font-medium text-amber-700">🔥 Warm-up</p>
        <p className="text-xs text-amber-600 mt-0.5">{todayWorkout.warmup}</p>
      </div>

      {/* Exercises */}
      <div className="space-y-1">
        {todayWorkout.exercises.map((exercise, idx) => (
          <WorkoutItem
            key={idx}
            exercise={exercise}
            checked={!!checks[String(idx)]}
            onToggle={() => onToggle(idx)}
            disabled={workoutCompleted || isPreview}
          />
        ))}
      </div>

      {/* StairMaster — checkable */}
      {todayWorkout.stairmaster && (
        <div className="mt-1">
          <WorkoutItem
            exercise={{
              name: todayWorkout.stairmaster,
              sets: "",
              rest: "-",
              notes: todayWorkout.stairmasterNotes || "You got this!",
            }}
            checked={!!checks[String(todayWorkout.exercises.length)]}
            onToggle={() => onToggle(todayWorkout.exercises.length)}
            disabled={workoutCompleted || isPreview}
          />
        </div>
      )}

      {/* Warmdown */}
      <div className="rounded-xl bg-blue-50/60 backdrop-blur-sm p-3 mt-2">
        <p className="text-xs font-medium text-blue-700">🧊 Warm-down</p>
        <p className="text-xs text-blue-600 mt-0.5">{todayWorkout.warmdown}</p>
      </div>
    </div>
  );
}
