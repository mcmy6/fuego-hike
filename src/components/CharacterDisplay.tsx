"use client";

import { GearItem } from "@/data/gear";
import GearSticker from "./GearSticker";

// Placeholder character SVG — simple silhouette
function PlaceholderCharacter({ theme }: { theme: string }) {
  const themeColors: Record<string, string> = {
    "Antigua Outfit": "#F59E0B",
    "Lake Atitlán Outfit": "#3B82F6",
    "Hiking Outfit": "#10B981",
    "Backpack to Fill": "#8B5CF6",
  };
  const color = themeColors[theme] || "#9CA3AF";

  return (
    <svg viewBox="0 0 200 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="35" fill="#E5E7EB" />
      {/* Body */}
      <ellipse cx="100" cy="160" rx="45" ry="70" fill="#E5E7EB" />
      {/* Legs */}
      <rect x="70" y="220" width="20" height="80" rx="10" fill="#E5E7EB" />
      <rect x="110" y="220" width="20" height="80" rx="10" fill="#E5E7EB" />
      {/* Arms */}
      <rect x="35" y="110" width="18" height="70" rx="9" fill="#E5E7EB" transform="rotate(-10 44 145)" />
      <rect x="147" y="110" width="18" height="70" rx="9" fill="#E5E7EB" transform="rotate(10 156 145)" />
      {/* Theme accent */}
      <circle cx="100" cy="160" r="12" fill={color} opacity="0.3" />
    </svg>
  );
}

function DressedCharacter({ theme }: { theme: string }) {
  const themeData: Record<string, { color: string; icon: string }> = {
    "Antigua Outfit": { color: "#F59E0B", icon: "🏛️" },
    "Lake Atitlán Outfit": { color: "#3B82F6", icon: "🌊" },
    "Hiking Outfit": { color: "#10B981", icon: "🥾" },
    "Backpack to Fill": { color: "#8B5CF6", icon: "🎒" },
  };
  const data = themeData[theme] || { color: "#9CA3AF", icon: "✨" };

  return (
    <svg viewBox="0 0 200 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="35" fill="#FBBF24" />
      {/* Hair */}
      <ellipse cx="100" cy="42" rx="38" ry="25" fill="#92400E" />
      {/* Body with outfit color */}
      <ellipse cx="100" cy="160" rx="45" ry="70" fill={data.color} />
      {/* Legs */}
      <rect x="70" y="220" width="20" height="80" rx="10" fill={data.color} opacity="0.8" />
      <rect x="110" y="220" width="20" height="80" rx="10" fill={data.color} opacity="0.8" />
      {/* Arms */}
      <rect x="35" y="110" width="18" height="70" rx="9" fill="#FBBF24" transform="rotate(-10 44 145)" />
      <rect x="147" y="110" width="18" height="70" rx="9" fill="#FBBF24" transform="rotate(10 156 145)" />
      {/* Face */}
      <circle cx="88" cy="58" r="3" fill="#1F2937" />
      <circle cx="112" cy="58" r="3" fill="#1F2937" />
      <path d="M 92 70 Q 100 78 108 70" stroke="#1F2937" strokeWidth="2" fill="none" />
      {/* Theme icon area */}
      <text x="100" y="170" fontSize="36" textAnchor="middle" dominantBaseline="central">{data.icon}</text>
    </svg>
  );
}

export default function CharacterDisplay({
  theme,
  items,
  unlockedCount,
  isComplete,
  lastUnlockedId,
}: {
  theme: string;
  items: GearItem[];
  unlockedCount: number;
  isComplete: boolean;
  lastUnlockedId?: number;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "5/8" }}>
      {/* Character */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {isComplete ? (
          <DressedCharacter theme={theme} />
        ) : (
          <PlaceholderCharacter theme={theme} />
        )}
      </div>

      {/* Floating gear stickers (only when not complete) */}
      {!isComplete &&
        items.map((item, idx) => (
          <GearSticker
            key={item.id}
            item={item}
            unlocked={idx < unlockedCount}
            isNew={item.id === lastUnlockedId}
          />
        ))}
    </div>
  );
}
