export interface ActivityTag {
  id: string;
  label: string;
  emoji: string;
}

export const ACTIVITY_TAGS: ActivityTag[] = [
  { id: "geisha", emoji: "🪭", label: "Geisha & Maiko" },
  { id: "temples", emoji: "⛩️", label: "Temples & Shrines" },
  { id: "nature", emoji: "🌿", label: "Nature & Gardens" },
  { id: "hiking", emoji: "🥾", label: "Hiking" },
  { id: "food", emoji: "🍜", label: "Food & Dining" },
  { id: "market", emoji: "🛒", label: "Markets & Shopping" },
  { id: "nightlife", emoji: "🍺", label: "Nightlife & Bars" },
  { id: "history", emoji: "🏯", label: "History & Castles" },
  { id: "traditional", emoji: "👘", label: "Traditional Culture" },
  { id: "photography", emoji: "📸", label: "Photography Spots" },
  { id: "matcha", emoji: "🍵", label: "Matcha & Tea" },
  { id: "hidden-gem", emoji: "💎", label: "Hidden Gems" },
];
