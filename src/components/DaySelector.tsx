"use client";

const DAYS = [
  { label: "S", day: 0 },
  { label: "M", day: 1 },
  { label: "T", day: 2 },
  { label: "W", day: 3 },
  { label: "T", day: 4 },
  { label: "F", day: 5 },
  { label: "S", day: 6 },
];

export default function DaySelector({
  selectedDay,
  onSelect,
}: {
  selectedDay: number;
  onSelect: (day: number) => void;
}) {
  const today = new Date().getDay();

  return (
    <div className="mx-4 mb-3 flex justify-between">
      {DAYS.map(({ label, day }) => {
        const isSelected = day === selectedDay;
        const isToday = day === today;
        return (
          <button
            key={day}
            type="button"
            onClick={() => onSelect(day)}
            className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all active:scale-90 ${
              isSelected
                ? "bg-orange-500 text-white shadow-md"
                : isToday
                ? "bg-orange-100 text-orange-600 border border-orange-300"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
