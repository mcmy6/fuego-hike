export interface Exercise {
  name: string;
  sets: string;
  rest: string;
  notes?: string;
}

export interface DayWorkout {
  day: string;
  focus: string;
  warmup: string;
  exercises: Exercise[];
  stairmaster?: string;
  stairmasterNotes?: string;
  warmdown: string;
}

export const workouts: Record<number, DayWorkout> = {
  // Monday = 1
  1: {
    day: "Monday",
    focus: "Heavy Lower (Strength)",
    warmup: "5-10 min light bike/row + dynamic stretching",
    exercises: [
      { name: "Back or Front Squats", sets: "4x4-6", rest: "3-4 min" },
      { name: "Romanian Deadlifts", sets: "3x8-10", rest: "2-3 min" },
      { name: "Leg Press", sets: "3x12", rest: "90 sec" },
      { name: "Hamstring Curls", sets: "3x12-15", rest: "60-90 sec", notes: "Continue progressive overload" },
      { name: "Calf Raises", sets: "4x12-15", rest: "60 sec" },
    ],
    stairmaster: "StairMaster (moderate pace)",
    stairmasterNotes: "20 mins - you got this!",
    warmdown: "5-10 min full lower body stretch",
  },
  // Tuesday = 2
  2: {
    day: "Tuesday",
    focus: "Upper Body (Back & Shoulders)",
    warmup: "5-10 min light cardio + dynamic stretching",
    exercises: [
      { name: "Pull-ups or Lat Pulldowns", sets: "4x8-10", rest: "2-3 min" },
      { name: "Barbell or Dumbbell Rows", sets: "3x10-12", rest: "90 sec" },
      { name: "Overhead Press", sets: "3x8-10", rest: "2-3 min" },
      { name: "Face Pulls", sets: "3x12-15", rest: "60 sec" },
      { name: "Dumbbell Bench Press", sets: "3x10-12", rest: "90 sec" },
      { name: "Plank", sets: "3x45-60 sec", rest: "60 sec" },
    ],
    stairmaster: "StairMaster (light pace)",
    stairmasterNotes: "20 mins - active recovery",
    warmdown: "5-10 min upper body stretch",
  },
  // Wednesday = 3 (Rest Day)
  3: {
    day: "Wednesday",
    focus: "Rest / Active Recovery",
    warmup: "",
    exercises: [],
    warmdown: "",
  },
  // Thursday = 4
  4: {
    day: "Thursday",
    focus: "Endurance Lower (Hiking Prep)",
    warmup: "5-10 min light bike/row + dynamic stretching",
    exercises: [
      { name: "Barbell Walking Lunges", sets: "4x12-16/leg", rest: "60-90 sec" },
      { name: "Bulgarian Split Squats", sets: "3x12-15/leg", rest: "60-90 sec" },
      { name: "Barbell/DB Step-Ups", sets: "4x10-12/leg", rest: "60-90 sec" },
      { name: "Goblet Squats", sets: "3x15-20", rest: "60 sec" },
      { name: "Single Leg RDLs", sets: "3x10-12/leg", rest: "60 sec" },
    ],
    stairmaster: "StairMaster (moderate pace)",
    stairmasterNotes: "20-25 mins - increased from last week!",
    warmdown: "5-10 min full lower body stretch",
  },
  // Friday = 5
  5: {
    day: "Friday",
    focus: "Upper Body (Push & Core)",
    warmup: "5-10 min light cardio + dynamic stretching",
    exercises: [
      { name: "Barbell Bench Press", sets: "4x8-10", rest: "2-3 min" },
      { name: "Seated Cable Rows", sets: "3x10-12", rest: "90 sec" },
      { name: "Incline Dumbbell Press", sets: "3x10-12", rest: "90 sec" },
      { name: "Cable/DB Lateral Raises", sets: "3x12-15", rest: "60 sec" },
      { name: "Dumbbell Bicep Curls", sets: "3x12", rest: "60 sec" },
      { name: "Dead Bugs", sets: "3x15/side", rest: "60 sec" },
      { name: "Russian Twists", sets: "3x24 total", rest: "60 sec" },
    ],
    stairmaster: "StairMaster (moderate pace)",
    stairmasterNotes: "25-30 mins - keep pushing!",
    warmdown: "5-10 min full body stretch",
  },
  // Saturday = 6
  6: {
    day: "Saturday",
    focus: "Full Body",
    warmup: "5-10 min light bike/row + dynamic stretching",
    exercises: [
      { name: "Step-Ups (Hiking Specific)", sets: "3x10-12/leg", rest: "90 sec", notes: "Moderate weight dumbbells" },
      { name: "Trap Bar or Dumbbell Deadlift", sets: "3x6-8", rest: "2 min", notes: "Moderate weight — not maximal" },
      { name: "Pull-ups or Lat Pulldowns", sets: "3x8-10", rest: "90 sec" },
      { name: "Dumbbell Bench Press", sets: "3x12-15", rest: "90 sec" },
      { name: "Farmer's Carry", sets: "3x40-60 sec", rest: "60 sec", notes: "Heavy dumbbells" },
      { name: "Plank or Side Plank", sets: "3x45-60 sec", rest: "60 sec", notes: "Helps with balance on uneven terrain" },
    ],
    stairmaster: "StairMaster (moderate pace)",
    stairmasterNotes: "25 mins - finish strong!",
    warmdown: "5-10 min full body stretch",
  },
  // Sunday = 0 (Rest Day)
  0: {
    day: "Sunday",
    focus: "Rest / Active Recovery",
    warmup: "",
    exercises: [],
    warmdown: "",
  },
};
