"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

export default function CelebrationOverlay({
  show,
  isWeekComplete,
  onDone,
}: {
  show: boolean;
  isWeekComplete: boolean;
  onDone: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) return;

    const colors = ["#F59E0B", "#EF4444", "#8B5CF6", "#10B981", "#3B82F6", "#EC4899"];
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onDone();
      setParticles([]);
    }, isWeekComplete ? 3000 : 2000);

    return () => clearTimeout(timer);
  }, [show, isWeekComplete, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: `-${p.size}px`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Center message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl animate-scale-up text-center">
          {isWeekComplete ? (
            <>
              <p className="text-4xl mb-2">🎊</p>
              <p className="text-lg font-bold text-gray-800">Outfit Complete!</p>
              <p className="text-sm text-gray-500 mt-1">You unlocked the full look!</p>
            </>
          ) : (
            <>
              <p className="text-4xl mb-2">⚡</p>
              <p className="text-lg font-bold text-gray-800">Gear Unlocked!</p>
              <p className="text-sm text-gray-500 mt-1">Keep it up!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
