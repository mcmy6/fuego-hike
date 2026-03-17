export interface GearItem {
  id: number;
  name: string;
  imageFile: string;
  fallbackEmoji: string;
  position: string;
}

export interface WeekData {
  weekNumber: number; // 4 = first training week, 7 = final week
  theme: string;
  outfitVibe: string;
  startDate: string; // ISO date
  endDate: string;
  items: GearItem[];
}

export const weeks: WeekData[] = [
  {
    weekNumber: 4,
    theme: "Cobblestone Chic",
    outfitVibe: "Casual explorer look for walking Antigua's cobblestone streets",
    startDate: "2026-03-16",
    endDate: "2026-03-22",
    items: [
      { id: 1, name: "Tube top", imageFile: "w4-tube-top.png", fallbackEmoji: "👙", position: "Torso" },
      { id: 2, name: "Skirt", imageFile: "w4-skirt.png", fallbackEmoji: "👗", position: "Legs" },
      { id: 3, name: "Crossbody bag", imageFile: "w4-crossbody.png", fallbackEmoji: "👜", position: "Shoulder" },
      { id: 4, name: "Sunglasses", imageFile: "w4-sunglasses.png", fallbackEmoji: "🕶️", position: "Face" },
      { id: 5, name: "Sandals", imageFile: "w4-sandals.png", fallbackEmoji: "🥾", position: "Feet" },
    ],
  },
  {
    weekNumber: 5,
    theme: "Lago Life",
    outfitVibe: "Lakeside adventure gear for boat rides and village hopping",
    startDate: "2026-03-23",
    endDate: "2026-03-29",
    items: [
      { id: 6, name: "Bikini", imageFile: "w3-bikini.png", fallbackEmoji: "👙", position: "Torso" },
      { id: 7, name: "Shorts / mini skirt", imageFile: "w3-shorts.png", fallbackEmoji: "🩳", position: "Legs" },
      { id: 8, name: "Sandals", imageFile: "w3-sandals.png", fallbackEmoji: "🥾", position: "Feet" },
      { id: 9, name: "Sunscreen", imageFile: "w3-sunscreen.png", fallbackEmoji: "🧴", position: "Side" },
      { id: 10, name: "Towel", imageFile: "w3-towel.png", fallbackEmoji: "🛁", position: "Draped" },
    ],
  },
  {
    weekNumber: 6,
    theme: "Trail Ready",
    outfitVibe: "Technical hiking layers for trail training",
    startDate: "2026-03-30",
    endDate: "2026-04-05",
    items: [
      { id: 11, name: "Hiking boots", imageFile: "w2-hiking-boots.png", fallbackEmoji: "🥾", position: "Feet" },
      { id: 12, name: "Hydroflask", imageFile: "w2-hydroflask.png", fallbackEmoji: "💧", position: "Side" },
      { id: 13, name: "Hiking pants", imageFile: "w2-hiking-pants.png", fallbackEmoji: "👖", position: "Legs" },
      { id: 14, name: "Hat", imageFile: "w2-hat.png", fallbackEmoji: "🧢", position: "Head" },
      { id: 15, name: "Fleece jacket", imageFile: "w2-fleece.png", fallbackEmoji: "🧥", position: "Torso" },
    ],
  },
  {
    weekNumber: 7,
    theme: "Summit Pack",
    outfitVibe: "Expedition pack items — gear that goes in the bag for summit day",
    startDate: "2026-04-06",
    endDate: "2026-04-12",
    items: [
      { id: 16, name: "Skincare", imageFile: "w1-skincare.png", fallbackEmoji: "🧴", position: "Front pocket" },
      { id: 17, name: "Tech gear", imageFile: "w1-tech-gear.png", fallbackEmoji: "📱", position: "Main compartment" },
      { id: 18, name: "Hydroflask", imageFile: "w1-hydroflask.png", fallbackEmoji: "💧", position: "Side pocket" },
      { id: 19, name: "Medicine", imageFile: "w1-medicine.png", fallbackEmoji: "💊", position: "Top flap" },
      { id: 20, name: "Toothbrush / toothpaste", imageFile: "w1-toothbrush.png", fallbackEmoji: "🪷", position: "Front pocket" },
    ],
  },
];

export const TRIP_DATE = "2026-04-12";
export const ITEMS_PER_WEEK = 5;
