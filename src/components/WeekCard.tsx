"use client";

import { WeekData } from "@/data/gear";
import CharacterDisplay from "./CharacterDisplay";

export default function WeekCard({
  week,
  unlockedCount,
  isComplete,
  isLocked,
  isActive,
  lastUnlockedId,
  nextWeek,
}: {
  week: WeekData;
  unlockedCount: number;
  isComplete: boolean;
  isLocked: boolean;
  isActive: boolean;
  lastUnlockedId?: number;
  nextWeek?: WeekData | null;
}) {
  const weekLabel = `Week ${week.weekNumber}`;

  // Locked weeks are filtered out in WeekTimeline, but just in case
  if (isLocked) return null;

  if (isComplete) {
    return (
      <div className="mx-4 mb-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="p-3 flex items-center gap-3 border-b border-gray-200/60">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
            ✅
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{weekLabel} — {week.theme}</p>
            <p className="text-xs text-green-600">Complete! All 5 items unlocked</p>
          </div>
        </div>
        {/* Compact dressed character — 20% shorter */}
        <div className="h-36 bg-gradient-to-b from-white/40 to-white/20 flex items-center justify-center">
          <div className="h-32 w-24">
            <CharacterDisplay
              theme={week.theme}
              items={week.items}
              unlockedCount={5}
              isComplete={true}
            />
          </div>
        </div>
      </div>
    );
  }

  // Active (in-progress) week
  return (
    <div className="mx-4 mb-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md overflow-hidden ring-1 ring-orange-300/60">
      <div className="p-3 flex items-center justify-between border-b border-orange-100/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm animate-pulse">
            🔥
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{weekLabel} — {week.theme}</p>
            <p className="text-xs text-gray-400">{week.outfitVibe}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-orange-500">{unlockedCount}/5</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">items</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mt-3">
        <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
            style={{ width: `${(unlockedCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Character with floating gear — 20% shorter */}
      <div className="px-4 py-1">
        <div className="max-w-[200px] mx-auto">
          <CharacterDisplay
            theme={week.theme}
            items={week.items}
            unlockedCount={unlockedCount}
            isComplete={false}
            lastUnlockedId={lastUnlockedId}
          />
        </div>
      </div>

      {/* Gear item dots — grayscale until unlocked */}
      <div className="px-4 pb-4 flex justify-center gap-2">
        {week.items.map((item, idx) => (
          <div
            key={item.id}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
              idx < unlockedCount
                ? "bg-orange-100 scale-110"
                : "bg-gray-200/40"
            }`}
            style={idx >= unlockedCount ? { filter: "grayscale(1) opacity(0.4)" } : undefined}
          >
            {item.fallbackEmoji}
          </div>
        ))}
      </div>
    </div>
  );
}
