"use client";

import { weeks } from "@/data/gear";
import { getWeekState } from "@/lib/progressStore";
import WeekCard from "./WeekCard";

export default function WeekTimeline({
  workoutsCompleted,
  lastUnlockedId,
}: {
  workoutsCompleted: number;
  lastUnlockedId?: number;
}) {
  return (
    <div className="pb-4">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 px-4 mb-3">
        Outfit Timeline
      </h2>
      {weeks.map((week, idx) => {
        const state = getWeekState(idx, workoutsCompleted);
        // Only show completed and active weeks — skip locked/future ones
        if (state.isLocked) return null;
        // Find next week for the link
        const nextWeek = idx + 1 < weeks.length ? weeks[idx + 1] : null;
        return (
          <WeekCard
            key={week.weekNumber}
            week={week}
            unlockedCount={state.unlockedInWeek}
            isComplete={state.isComplete}
            isLocked={state.isLocked}
            isActive={state.isActive}
            lastUnlockedId={state.isActive ? lastUnlockedId : undefined}
            nextWeek={nextWeek}
          />
        );
      })}
    </div>
  );
}
