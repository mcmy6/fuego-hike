"use client";

import { weeks, ITEMS_PER_WEEK } from "@/data/gear";

export default function UnlockPreview({
  workoutsCompleted,
  onPreview,
}: {
  workoutsCompleted: number;
  onPreview?: () => void;
}) {
  const totalItems = weeks.length * ITEMS_PER_WEEK;

  if (workoutsCompleted >= totalItems) {
    return (
      <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white text-center shadow-lg">
        <p className="text-lg font-bold">All outfits complete! 🎉</p>
        <p className="text-sm opacity-90">You&apos;re ready for the summit!</p>
      </div>
    );
  }

  const nextItemIndex = workoutsCompleted;
  const weekIndex = Math.floor(nextItemIndex / ITEMS_PER_WEEK);
  const itemInWeek = nextItemIndex % ITEMS_PER_WEEK;
  const week = weeks[weekIndex];
  const nextItem = week?.items[itemInWeek];

  if (!nextItem) return null;

  return (
    <button
      type="button"
      onClick={onPreview}
      className="mx-4 mb-4 flex items-center gap-2 w-[calc(100%-2rem)] active:scale-[0.98] transition-transform"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <p className="text-xs text-gray-400 whitespace-nowrap">
        {nextItem.fallbackEmoji} Unlock Tomorrow&apos;s Workout →
      </p>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </button>
  );
}
