export interface ZoneTagContext {
  district?: string;
  tip: string;
  bestTime?: string;
  // ❌ crowdLevel removed — use live congestionData instead
}

export const TAG_CONTEXT_PROFILES: Record<
  string,
  Record<string, ZoneTagContext>
> = {
  geisha: {
    higashiyama: {
      district: "Miyagawa-cho",
      tip: "Quieter sibling of Gion — authentic sightings near Kamo River at dusk",
      bestTime: "5:00–6:30 PM",
    },
    pontocho: {
      district: "Pontocho Alley",
      tip: "Maiko pass through heading to evening engagements — stay at the edges",
      bestTime: "5:00–6:00 PM",
    },
    daitokuji: {
      district: "Kamishichiken",
      tip: "Kyoto's oldest hanamachi (1444) — fewest tourists, most authentic atmosphere",
      bestTime: "5:00–6:00 PM",
    },
    "central-kawaramachi": {
      district: "Gion Higashi",
      tip: "Smaller, less-visited counterpart to main Gion — intimate streets near Yasaka Shrine",
      bestTime: "Early evening",
    },
    "gion-kiyomizudera": {
      district: "Gion Kobu / Hanamikoji",
      tip: "Photo restrictions in place. Skip Hanamikoji — try the Shirakawa canal side street instead",
      bestTime: "Weekday early morning only",
    },
  },

  temples: {
    "gion-kiyomizudera": {
      tip: "Go at sunrise (6 AM) — the wooden stage view over Kyoto is worth it",
      bestTime: "6:00–7:30 AM",
    },
    "fushimi-inari": {
      tip: "Hike past the first fork (20 min) and crowds drop dramatically",
      bestTime: "Early morning or post-4 PM",
    },
    kinkakuji: {
      tip: "Consider Ryoanji next door as a genuinely quieter alternative",
      bestTime: "Opening time (9 AM)",
    },
    ryoanji: {
      tip: "Often overlooked despite a world-class rock garden — best mid-week",
      bestTime: "Weekday morning",
    },
    "nijo-castle": {
      tip: "Listen carefully to the nightingale floors during low-traffic morning hours",
      bestTime: "9:00–10:30 AM",
    },
    tofukuji: {
      tip: "Stunning autumn maples with a fraction of Kiyomizudera crowds",
      bestTime: "Autumn mornings",
    },
    daitokuji: {
      tip: "22 sub-temples — spend half a day here in near-total peace",
      bestTime: "Any time",
    },
    "kurama-temple": {
      tip: "Mountain temple via scenic Eizan Railway — forest trails from the gate",
      bestTime: "Morning, allow 3–4 hrs",
    },
    "kamigamo-shrine": {
      tip: "UNESCO-listed with a stream running through grounds — locals only most days",
      bestTime: "Weekday anytime",
    },
    "fushimi-momoyama-castle": {
      tip: "Castle replica in a quiet hillside park — almost no international tourists",
      bestTime: "Anytime",
    },
    "jojakko-ji": {
      tip: "Moss-covered stone steps above Arashiyama — uphill past Nonomiya Shrine",
      bestTime: "Morning",
    },
    "nison-in": {
      tip: "Beautiful maple-lined approach road — virtually empty even in high season",
      bestTime: "Autumn mornings",
    },
    "konkai-komyoji": {
      tip: "Massive complex with panoramic city views — barely on any tourist map",
      bestTime: "Anytime",
    },
    "arashiyama-sagano": {
      tip: "Buy the garden-only ticket at Tenryu-ji (¥500) to skip the interior queue",
      bestTime: "Before 9 AM",
    },
    "philosopher-path": {
      tip: "Visit Nanzen-ji and Eikan-do first, then walk north — less busy up there",
      bestTime: "Weekday morning",
    },
  },

  nature: {
    "arashiyama-sagano": {
      tip: "Walk further into Sagano past the bamboo grove for silence and rice fields",
      bestTime: "7:00–8:30 AM",
    },
    "philosopher-path": {
      tip: "Less busy at northern end near Ginkakuji — magical in cherry blossom season",
      bestTime: "Early morning",
    },
    "kibune-village": {
      tip: "Cedar forest river valley — summer kawadoko dining platforms are unique",
      bestTime: "June–September evenings",
    },
    "kyoto-imperial-park": {
      tip: "Vast open lawns used by locals — no tour groups ever come here",
      bestTime: "Anytime",
    },
    "katsura-imperial-villa": {
      tip: "World-class stroll garden — book free via Imperial Household Agency",
      bestTime: "Advance reservation required",
    },
    "fushimi-momoyama": {
      tip: "Willow-lined sake district canals — peaceful walks between breweries",
      bestTime: "Weekday afternoon",
    },
    "fushimi-inari": {
      tip: "Summit trail through cedar forest is mostly tourist-free past the halfway pt",
      bestTime: "Early morning",
    },
    "jojakko-ji": {
      tip: "Moss garden and panoramic Arashiyama views — fewer than 50 visitors/day",
      bestTime: "Morning",
    },
    "kurama-temple": {
      tip: "Trail connects Kurama → Kibune through cedar forest — Kyoto's best hike",
      bestTime: "Full day trip",
    },
  },

  hiking: {
    "fushimi-inari": {
      tip: "Full summit loop (4 km, ~2 hrs) — crowds thin past Yotsutsuji viewpoint",
      bestTime: "Early morning",
    },
    "kurama-temple": {
      tip: "Kurama → Kibune trail (3 km) through old-growth forest — hidden gem",
      bestTime: "Weekday morning",
    },
    "arashiyama-sagano": {
      tip: "Trails into Sagano hills beyond the bamboo grove see almost no visitors",
      bestTime: "Morning",
    },
    "jojakko-ji": {
      tip: "Short uphill hike rewards with incredible forest and cityscape views",
      bestTime: "Morning",
    },
  },

  food: {
    "nishiki-market": {
      tip: "Go at 10 AM opening — freshest pickles and least congestion",
      bestTime: "10:00–11:00 AM",
    },
    pontocho: {
      tip: "Kaiseki restaurants — reserve 2–3 weeks ahead for riverside window seats",
      bestTime: "Dinner reservations",
    },
    higashiyama: {
      tip: "Duck into side alleys off Ninenzaka for local soba and tofu spots",
      bestTime: "Early lunch (11 AM)",
    },
    "kibune-village": {
      tip: "Summer kawadoko dining over the river — book in advance, pure magic",
      bestTime: "June–September",
    },
    "fushimi-momoyama": {
      tip: "Sake district izakayas — authentic Kyoto dining away from the tourist trail",
      bestTime: "Afternoon–evening",
    },
    tofukuji: {
      tip: "Neighbourhood south of temple has excellent affordable soba restaurants",
      bestTime: "Lunch",
    },
    "central-kawaramachi": {
      tip: "Kiyamachi-dori runs parallel to Pontocho — more local, cheaper drinks",
      bestTime: "Dinner 7–9 PM",
    },
    "philosopher-path": {
      tip: "Cosy independent matcha cafés and tofu restaurants line the canal path",
      bestTime: "Late morning",
    },
  },

  market: {
    "nishiki-market": {
      tip: "Only 5 m wide, 400 m long — go early or after 4 PM to avoid single-file crowds",
      bestTime: "Opening (10 AM) or late afternoon",
    },
    "teramachi-sanjo": {
      tip: "Best antique street in Kyoto — old coins, ceramics, tansu chests",
      bestTime: "Weekend morning",
    },
    "toji-market": {
      tip: "1,200+ antique stalls — only open on the 21st of each month",
      bestTime: "21st of the month, morning",
    },
    higashiyama: {
      tip: "Skip Ninenzaka shops — better crafts on the quieter Ishibei Koji lane",
      bestTime: "Morning",
    },
    "central-kawaramachi": {
      tip: "Takashimaya depachika basement is ideal for food gifts — weekday is calmer",
      bestTime: "Weekday afternoon",
    },
    "nishiki-koji-backstreets": {
      tip: "Local Kyoto shops with no English menus — genuine neighbourhood feel",
      bestTime: "Anytime",
    },
  },

  nightlife: {
    pontocho: {
      tip: "Lantern-lit alley — izakayas and cocktail bars hidden behind unmarked doors",
      bestTime: "8:00–11:00 PM",
    },
    "central-kawaramachi": {
      tip: "Kiyamachi-dori is Kyoto's main bar street — more local, cheaper than Pontocho",
      bestTime: "9 PM onwards",
    },
    "fushimi-momoyama": {
      tip: "Sakagura tastings at Gekkeikan and Kizakura — walkable from the station",
      bestTime: "Afternoon–evening",
    },
  },

  history: {
    "nijo-castle": {
      tip: "Don't miss the nightingale floors (uguisubari) — an ingenious intruder detection system",
      bestTime: "9:00–10:30 AM",
    },
    "fushimi-momoyama-castle": {
      tip: "Site of Toyotomi Hideyoshi's castle — quiet hillside park, sweeping city views",
      bestTime: "Anytime",
    },
    "toji-market": {
      tip: "Toji pagoda is Japan's tallest wooden tower — free to walk around outside",
      bestTime: "21st of the month",
    },
    "kyoto-imperial-park": {
      tip: "Walk past the old imperial palace walls — the park itself is free and open 24/7",
      bestTime: "Anytime",
    },
    daitokuji: {
      tip: "Founded 1315 — wander sub-temples like Daisen-in for samurai-era garden design",
      bestTime: "Morning",
    },
  },

  traditional: {
    higashiyama: {
      tip: "Ishibei Koji cobblestone lane is the most preserved street in Kyoto",
      bestTime: "Morning",
    },
    daitokuji: {
      tip: "Multiple tea ceremony venues — Urasenke school nearby for authentic experiences",
      bestTime: "Morning",
    },
    "nishiki-market": {
      tip: "Watch tofu and yudofu being made fresh — go early before tourist rush",
      bestTime: "Opening time",
    },
    "gion-kiyomizudera": {
      tip: "Ninenzaka machiya shops sell genuine Kyoto crafts — pottery, fans, textiles",
      bestTime: "Morning",
    },
    "philosopher-path": {
      tip: "Café-lined canal path connects to Nanzen-ji — rent a kimono nearby",
      bestTime: "Morning",
    },
    "arashiyama-sagano": {
      tip: "Sagano tofu restaurants and bamboo craft shops in the quieter backstreets",
      bestTime: "Morning",
    },
    "nishiki-koji-backstreets": {
      tip: "Unspoiled residential lanes — local life unchanged for decades",
      bestTime: "Anytime",
    },
    "fushimi-neighborhood": {
      tip: "Sake culture, local shotengai shopping streets — zero tourist infrastructure",
      bestTime: "Weekday",
    },
  },

  photography: {
    "fushimi-inari": {
      tip: "Hike above the first fork for an empty torii gate tunnel shot",
      bestTime: "6:00–7:30 AM",
    },
    "arashiyama-sagano": {
      tip: "Bamboo grove is best at dawn — shaft light through the canopy is stunning",
      bestTime: "7:00 AM",
    },
    higashiyama: {
      tip: "Ishibei Koji at dusk with paper lanterns on — the most photogenic street",
      bestTime: "Dusk",
    },
    pontocho: {
      tip: "Shoot the lantern reflections on the river from Shijo Bridge",
      bestTime: "8–10 PM",
    },
    "philosopher-path": {
      tip: "Cherry blossoms over the canal in late March — go at 6 AM for zero crowds",
      bestTime: "Late March dawn",
    },
    "jojakko-ji": {
      tip: "Moss and pagoda framing at the top — completely empty most mornings",
      bestTime: "Morning",
    },
    "konkai-komyoji": {
      tip: "City panorama almost no one photographs — bring a wide lens",
      bestTime: "Golden hour",
    },
    kinkakuji: {
      tip: "Reflection of the gold pavilion is best in still morning air",
      bestTime: "Opening (9 AM)",
    },
    "nijo-castle": {
      tip: "Curved castle walls and sakura in spring — interior sliding screens are stunning",
      bestTime: "Spring morning",
    },
  },

  matcha: {
    daitokuji: {
      tip: "Authentic tea ceremony in a 700-year-old sub-temple — book Urasenke or Omotesenke",
      bestTime: "Morning",
    },
    "philosopher-path": {
      tip: "Junsei and Omen are local matcha café classics on the canal path",
      bestTime: "Late morning",
    },
    "nishiki-market": {
      tip: "Try fresh matcha soft serve and sample ceremonial-grade matcha at local stalls",
      bestTime: "Morning",
    },
    "teramachi-sanjo": {
      tip: "Ippodo Tea flagship store — one of Japan's oldest matcha retailers since 1717",
      bestTime: "Weekday",
    },
    higashiyama: {
      tip: "Matcha sweets shops on Ninenzaka — look for kuzukiri and matcha pudding",
      bestTime: "Morning",
    },
    kinkakuji: {
      tip: "Tea ceremony at Sekkatei teahouse inside the grounds — included with entry",
      bestTime: "9:00–11:00 AM",
    },
    "arashiyama-sagano": {
      tip: "Otoyo and Sagano-ya serve excellent matcha sets near Togetsukyo Bridge",
      bestTime: "Late morning",
    },
  },

  "hidden-gem": {
    daitokuji: {
      tip: "22 sub-temples, most tourists never venture in — a half-day discovery zone",
      bestTime: "Any time",
    },
    "kurama-temple": {
      tip: "Only 30 min from central Kyoto on the Eizan Railway — feels like another world",
      bestTime: "Weekday morning",
    },
    "kamigamo-shrine": {
      tip: "UNESCO-listed, river-flanked, locals only — take bus 4 from Kyoto Station",
      bestTime: "Weekday",
    },
    "kibune-village": {
      tip: "15 ryokan and restaurants in a cedar valley — fewer than 500 visitors on quiet days",
      bestTime: "Weekday",
    },
    "kyoto-imperial-park": {
      tip: "Enormous park in the city centre, totally ignored by guidebooks",
      bestTime: "Anytime",
    },
    "fushimi-momoyama-castle": {
      tip: "Concrete replica but the hilltop views of southern Kyoto are exceptional",
      bestTime: "Anytime",
    },
    "jojakko-ji": {
      tip: "Moss-covered stone steps and a tilting pagoda — maybe 20 visitors on a typical day",
      bestTime: "Morning",
    },
    "nison-in": {
      tip: "Beautiful dual-Buddha halls in autumn — maple-lined approach road with near zero crowds",
      bestTime: "Autumn",
    },
    "konkai-komyoji": {
      tip: "Hilltop temple with panoramic views and graves of Aizu samurai — utterly overlooked",
      bestTime: "Anytime",
    },
    "toji-market": {
      tip: "Monthly flea market on the 21st — locals, antiques, street food, no tourist pricing",
      bestTime: "21st of the month, morning",
    },
    "nishiki-koji-backstreets": {
      tip: "The real Kyoto behind the covered market — local grocers, tofu makers, shotengai life",
      bestTime: "Weekday morning",
    },
    "fushimi-neighborhood": {
      tip: "Sake culture, working-class shotengai, zero international tourists",
      bestTime: "Weekday",
    },
  },
};
