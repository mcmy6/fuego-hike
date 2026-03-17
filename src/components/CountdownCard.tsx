"use client";

import { useEffect, useState } from "react";
import { getDaysUntilTrip } from "@/lib/progressStore";

export default function CountdownCard() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getDaysUntilTrip());
  }, []);

  if (days === null) return null;

  return (
    <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">
            Days until summit
          </p>
          <p className="text-3xl font-bold">{days}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium opacity-90">April 12, 2026</p>
          <p className="text-xs opacity-70">Volcán de Acatenango</p>
        </div>
      </div>
    </div>
  );
}
