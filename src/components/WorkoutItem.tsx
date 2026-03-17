"use client";

import { useState } from "react";
import { Exercise } from "@/data/workouts";

/* Exercises where weight tracking makes sense */
const WEIGHTED_EXERCISES = new Set([
  // Monday - Heavy Lower
  "Back or Front Squats",
  "Romanian Deadlifts",
  "Leg Press",
  "Hamstring Curls",
  "Calf Raises",
  // Tuesday - Upper Body (Back & Shoulders)
  "Pull-ups or Lat Pulldowns",
  "Barbell or Dumbbell Rows",
  "Overhead Press",
  "Face Pulls",
  "Dumbbell Bench Press",
  // Thursday - Endurance Lower
  "Barbell Walking Lunges",
  "Bulgarian Split Squats",
  "Barbell/DB Step-Ups",
  "Goblet Squats",
  "Single Leg RDLs",
  // Friday - Upper Body (Push & Core)
  "Barbell Bench Press",
  "Seated Cable Rows",
  "Incline Dumbbell Press",
  "Cable/DB Lateral Raises",
  "Dumbbell Bicep Curls",
  // Saturday - Full Body
  "Step-Ups (Hiking Specific)",
  "Trap Bar or Dumbbell Deadlift",
  "Farmer's Carry",
]);

function getLastWeight(name: string): number | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(`fuegohike_weight_${name}`);
  return val ? Number(val) : null;
}

function saveWeight(name: string, weight: number) {
  localStorage.setItem(`fuegohike_weight_${name}`, String(weight));
}

export default function WorkoutItem({
  exercise,
  checked,
  onToggle,
  disabled,
}: {
  exercise: Exercise;
  checked: boolean;
  onToggle: () => void;
  disabled: boolean;
}) {
  const isWeighted = WEIGHTED_EXERCISES.has(exercise.name);
  const lastWeight = isWeighted ? getLastWeight(exercise.name) : null;
  const suggestedWeight = lastWeight ? lastWeight + 5 : null;
  const [weightInput, setWeightInput] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
          disabled
            ? "opacity-50"
            : checked
            ? ""
            : "active:scale-[0.98]"
        }`}
      >
        {/* Checkbox */}
        <div
          className={`w-6 h-6 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            checked
              ? "bg-green-500 border-green-500"
              : "border-gray-300"
          }`}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Exercise info */}
        <div className="flex-1 text-left">
          <p className={`text-sm font-medium ${checked ? "text-gray-800 line-through" : "text-gray-800"}`}>
            {exercise.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">{exercise.sets}</span>
            {exercise.rest !== "-" && (
              <span className="text-xs text-gray-400">• {exercise.rest} rest</span>
            )}
          </div>
          {exercise.notes && (
            <p className="text-xs text-gray-400 mt-0.5 italic">{exercise.notes}</p>
          )}
        </div>
      </button>

      {/* Weight tracking row — visible for weighted exercises before and after checking */}
      {isWeighted && !disabled && (
        <div className="ml-12 mr-3 -mt-1 mb-2 flex items-center gap-2">
          {suggestedWeight && (
            <span className="text-[11px] bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              Try {suggestedWeight}lbs
            </span>
          )}
          {lastWeight && (
            <span className="text-[11px] text-gray-400 whitespace-nowrap">
              Last: {lastWeight}lbs
            </span>
          )}
          {saved && (
            <span className="text-[11px] text-green-600 font-medium whitespace-nowrap">
              Saved
            </span>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            <input
              type="number"
              inputMode="numeric"
              placeholder={suggestedWeight ? String(suggestedWeight) : "lbs"}
              value={weightInput}
              onChange={(e) => { setWeightInput(e.target.value); setSaved(false); }}
              onClick={(e) => e.stopPropagation()}
              className="w-10 text-xs text-center border border-gray-200 rounded-lg py-1 px-1 bg-white focus:border-orange-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const w = Number(weightInput) || suggestedWeight || 0;
                if (w > 0) {
                  saveWeight(exercise.name, w);
                  setWeightInput(String(w));
                  setSaved(true);
                }
              }}
              className={`text-[11px] px-2 py-1 rounded-lg font-medium ${checked ? "bg-gray-300 text-gray-500" : "bg-orange-500 text-white active:scale-95"}`}
            >
              Log
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
