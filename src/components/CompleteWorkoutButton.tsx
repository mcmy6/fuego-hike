"use client";

import { weeks, ITEMS_PER_WEEK } from "@/data/gear";

export default function CompleteWorkoutButton({
  allChecked,
  workoutCompleted,
  workoutsCompleted,
  onComplete,
  selectedDay,
}: {
  allChecked: boolean;
  workoutCompleted: boolean;
  workoutsCompleted: number;
  onComplete: () => void;
  selectedDay: number;
}) {
  // Find the next week (if current week just completed)
  const currentWeekIndex = Math.min(
    Math.floor(workoutsCompleted / ITEMS_PER_WEEK),
    weeks.length - 1
  );
  const isCurrentWeekDone = workoutsCompleted > 0 && workoutsCompleted % ITEMS_PER_WEEK === 0;
  const nextWeek = currentWeekIndex < weeks.length ? weeks[currentWeekIndex] : null;

  if (workoutCompleted) {
    return (
      <div className="mx-4 mb-8">
        <div className="w-full py-4 rounded-2xl bg-green-100/70 text-green-700 text-center font-semibold text-sm">
          Workout Complete
        </div>
        {/* Show "Week X →" link when a week was just completed */}
        {isCurrentWeekDone && nextWeek && (
          <div className="mt-3 text-right">
            <span className="text-sm font-medium text-orange-500">
              Week {nextWeek.weekNumber} →
            </span>
          </div>
        )}
      </div>
    );
  }

  // Rest days: Sunday (0) and Thursday (4)
  if (selectedDay === 0 || selectedDay === 4) return null;

  return (
    <div className="mx-4 mb-8">
      <button
        type="button"
        onClick={onComplete}
        disabled={!allChecked}
        className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
          allChecked
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg active:scale-[0.97] hover:shadow-xl"
            : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
        }`}
      >
        {allChecked ? "Complete Workout 🔥" : "Workout Complete"}
      </button>
    </div>
  );
}
