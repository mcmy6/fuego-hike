"use client";

import Image from "next/image";
import { GearItem } from "@/data/gear";
import GearSticker from "./GearSticker";

// Map week themes to their complete outfit character images
const COMPLETE_IMAGES: Record<string, string> = {
  "Cobblestone Chic": "/character-w4-complete.png",
  "Lago Life": "/character-w5-complete.png",
  "Trail Ready": "/character-w6-complete.png",
  "Summit Pack": "/character-w7-complete.png",
};

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
  const completeImage = COMPLETE_IMAGES[theme];

  return (
    <div className="relative w-full" style={{ aspectRatio: "5/8" }}>
      {/* Character */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Image
          src={isComplete && completeImage ? completeImage : "/character-base.png"}
          alt={isComplete ? `Character in ${theme} outfit` : "Character"}
          fill
          className="object-contain"
          priority
        />
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
