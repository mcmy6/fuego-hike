"use client";

import { WeekData } from "@/data/gear";
import CharacterDisplay from "./CharacterDisplay";

// Washi tape accent — rendered as a small decorative strip
function WashiTape({ className, color }: { className?: string; color: string }) {
  return (
    <div
      className={`absolute w-12 h-3 rounded-sm opacity-60 ${className}`}
      style={{
        background: color,
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    />
  );
}

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
      <div className="mx-4 mb-3 rounded-2xl shadow-sm overflow-hidden relative scrapbook-card">
        {/* Washi tape accents */}
        <WashiTape className="-top-1 left-4 -rotate-3" color="#c5cfc0" />
        <WashiTape className="-top-1 right-6 rotate-2" color="#d4cdc4" />

        <div className="p-3 flex items-center gap-3 border-b border-gray-200/40">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
            ✅
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{weekLabel}</p>
            <p className="text-xs text-green-600">Complete! All 5 items unlocked</p>
          </div>
        </div>
        {/* Theme name in scrapbook handwriting */}
        <div className="text-center pt-2">
          <p className="scrapbook-title text-lg text-gray-700">{week.theme}</p>
        </div>
        {/* Compact dressed character */}
        <div className="h-36 flex items-center justify-center">
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
    <div className="mx-4 mb-3 rounded-2xl shadow-md overflow-hidden ring-1 ring-orange-300/60 relative scrapbook-card">
      {/* Washi tape accents */}
      <WashiTape className="-top-1 left-6 -rotate-2" color="#c5cfc0" />
      <WashiTape className="-top-1 right-4 rotate-3" color="#d4cdc4" />

      <div className="p-3 flex items-center justify-between border-b border-orange-100/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm animate-pulse">
            🔥
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{weekLabel}</p>
            <p className="text-xs text-gray-400">{week.outfitVibe}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-orange-500">{unlockedCount}/5</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">items</p>
        </div>
      </div>

      {/* Theme name in scrapbook handwriting style */}
      <div className="text-center pt-3 pb-1">
        <p className="scrapbook-title text-lg text-gray-700">{week.theme}</p>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mt-1">
        <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
            style={{ width: `${(unlockedCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Character with floating gear */}
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
