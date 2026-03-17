import { weeks, ITEMS_PER_WEEK } from "@/data/gear";

const KEYS = {
  workoutsCompleted: "fuegohike_workouts_completed",
  lastCompletedDate: "fuegohike_last_completed_date",
  todayChecks: "fuegohike_today_checks",
  completedDays: "fuegohike_completed_days",
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getWorkoutsCompleted(): number {
  if (!isBrowser()) return 0;
  return parseInt(localStorage.getItem(KEYS.workoutsCompleted) || "0", 10);
}

export function setWorkoutsCompleted(count: number) {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.workoutsCompleted, String(count));
}

export function getLastCompletedDate(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(KEYS.lastCompletedDate);
}

export function setLastCompletedDate(date: string) {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.lastCompletedDate, date);
}

export function getTodayChecks(): Record<string, boolean> {
  if (!isBrowser()) return {};
  const stored = localStorage.getItem(KEYS.todayChecks);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    // Reset if it's a different day
    if (parsed._date !== getTodayISO()) return {};
    return parsed;
  } catch {
    return {};
  }
}

export function setTodayChecks(checks: Record<string, boolean>) {
  if (!isBrowser()) return;
  localStorage.setItem(
    KEYS.todayChecks,
    JSON.stringify({ ...checks, _date: getTodayISO() })
  );
}

/** Per-day checks keyed by day of week (0-6) */
export function getDayChecks(dayOfWeek: number): Record<string, boolean> {
  if (!isBrowser()) return {};
  const stored = localStorage.getItem(`fuegohike_day_${dayOfWeek}_checks`);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function setDayChecks(dayOfWeek: number, checks: Record<string, boolean>) {
  if (!isBrowser()) return;
  localStorage.setItem(`fuegohike_day_${dayOfWeek}_checks`, JSON.stringify(checks));
}

/** Track which days of the week have been completed */
export function getCompletedDays(): Set<number> {
  if (!isBrowser()) return new Set();
  const stored = localStorage.getItem(KEYS.completedDays);
  if (!stored) return new Set();
  try {
    return new Set(JSON.parse(stored));
  } catch {
    return new Set();
  }
}

export function markDayCompleted(dayOfWeek: number) {
  if (!isBrowser()) return;
  const days = getCompletedDays();
  days.add(dayOfWeek);
  localStorage.setItem(KEYS.completedDays, JSON.stringify([...days]));
}

export function isDayCompleted(dayOfWeek: number): boolean {
  return getCompletedDays().has(dayOfWeek);
}

export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function isWorkoutCompletedToday(): boolean {
  return getLastCompletedDate() === getTodayISO();
}

/**
 * Given total workouts completed, determine which week's items are currently active
 * and how many items in that week are unlocked.
 */
export function getProgressState(workoutsCompleted: number) {
  // Which week index (0-based) is the user working on?
  const currentWeekIndex = Math.min(
    Math.floor(workoutsCompleted / ITEMS_PER_WEEK),
    weeks.length - 1
  );
  const itemsInCurrentWeek = workoutsCompleted - currentWeekIndex * ITEMS_PER_WEEK;
  const allComplete = workoutsCompleted >= weeks.length * ITEMS_PER_WEEK;

  return {
    currentWeekIndex,
    itemsInCurrentWeek: Math.min(itemsInCurrentWeek, ITEMS_PER_WEEK),
    allComplete,
    totalUnlocked: workoutsCompleted,
  };
}

/**
 * Get the state for a specific week
 */
export function getWeekState(weekIndex: number, workoutsCompleted: number) {
  const weekStart = weekIndex * ITEMS_PER_WEEK;
  const weekEnd = weekStart + ITEMS_PER_WEEK;
  const unlockedInWeek = Math.max(0, Math.min(workoutsCompleted - weekStart, ITEMS_PER_WEEK));
  const isComplete = unlockedInWeek >= ITEMS_PER_WEEK;
  const isLocked = workoutsCompleted < weekStart;
  const isActive = !isLocked && !isComplete;

  return { unlockedInWeek, isComplete, isLocked, isActive };
}

export function getDaysUntilTrip(): number {
  const trip = new Date("2026-04-12T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = trip.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function completeWorkout(): number {
  const current = getWorkoutsCompleted();
  const next = Math.min(current + 1, weeks.length * ITEMS_PER_WEEK);
  setWorkoutsCompleted(next);
  setLastCompletedDate(getTodayISO());
  return next;
}
