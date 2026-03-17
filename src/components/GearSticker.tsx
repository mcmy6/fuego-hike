"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GearItem } from "@/data/gear";

// Fixed positions for gear items around the character
const POSITION_MAP: Record<string, { top: string; left: string }> = {
  Head: { top: "2%", left: "50%" },
  Face: { top: "12%", left: "65%" },
  Torso: { top: "28%", left: "50%" },
  Shoulder: { top: "22%", left: "75%" },
  Legs: { top: "52%", left: "50%" },
  Feet: { top: "78%", left: "50%" },
  Side: { top: "38%", left: "80%" },
  Draped: { top: "20%", left: "25%" },
  "Front pocket": { top: "45%", left: "30%" },
  "Main compartment": { top: "35%", left: "55%" },
  "Side pocket": { top: "40%", left: "75%" },
  "Top flap": { top: "18%", left: "50%" },
};

// Deterministic tilt based on item id
function getTilt(id: number): number {
  const tilts = [-8, 5, -4, 7, -6, 3, -5, 8, -3, 6];
  return tilts[id % tilts.length];
}

export default function GearSticker({
  item,
  unlocked,
  isNew,
}: {
  item: GearItem;
  unlocked: boolean;
  isNew?: boolean;
}) {
  const [imageExists, setImageExists] = useState(false);
  const position = POSITION_MAP[item.position] || { top: "50%", left: "50%" };
  const tilt = getTilt(item.id);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
    img.src = `/gear/${item.imageFile}`;
  }, [item.imageFile]);

  if (!unlocked) return null;

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
        isNew ? "animate-bounce-in" : ""
      }`}
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
        zIndex: 10,
      }}
    >
      <div className="relative">
        {/* Y2K sticker styling: white border, drop shadow */}
        <div
          className={`rounded-xl shadow-lg ${
            imageExists
              ? "bg-white p-1"
              : "bg-white/90 p-2 flex items-center justify-center"
          }`}
          style={{
            filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.15))",
          }}
        >
          {imageExists ? (
            <Image
              src={`/gear/${item.imageFile}`}
              alt={item.name}
              width={56}
              height={56}
              className="rounded-lg object-contain"
            />
          ) : (
            <span className="text-3xl">{item.fallbackEmoji}</span>
          )}
        </div>
        <p className="text-[10px] text-center mt-1 font-medium text-gray-600 whitespace-nowrap">
          {item.name}
        </p>
      </div>
    </div>
  );
}
