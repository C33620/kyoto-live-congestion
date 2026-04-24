// Zone × Tag profiles — shown in ZoneInfoCard when tags are active
// Structure: ZONE_TAG_PROFILES[zoneId][tagId] = { tip, bestTime?, district?, website?, googleMaps? }

export interface ZoneTagProfile {
  tip: string;
  bestTime?: string;
  district?: string;
  website?: string;
  googleMaps?: string;
}

export const ZONE_TAG_PROFILES: Record<
  string,
  Partial<Record<string, ZoneTagProfile>>
> = {
  // ── TEMPLES & SHRINES ────────────────────────────────────────────────────
  "gion-kiyomizudera": {
    temples: {
      tip: "Iconic wooden stage temple built without a single nail — stunning views over Kyoto.",
      bestTime: "Before 8am or after 4:30pm",
      district: "Higashiyama",
      website: "https://www.kiyomizudera.or.jp/en/",
      googleMaps: "https://maps.google.com/?q=Kiyomizudera+Temple+Kyoto",
    },
    traditional: {
      tip: "The approach streets (Ninenzaka, Sannenzaka) are lined with traditional machiya shops.",
      district: "Ninenzaka",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    photography: {
      tip: "The wooden stage and three-storey pagoda are world-class photography subjects.",
      bestTime: "Golden hour or blue hour",
      googleMaps: "https://maps.google.com/?q=Kiyomizudera+Temple+Kyoto",
    },
    food: {
      tip: "The approach lanes (Ninenzaka, Sannenzaka) are lined with wagashi, yudofu, and matcha shops.",
      bestTime: "Late morning before crowds peak",
      googleMaps: "https://maps.google.com/?q=Sannenzaka+Kyoto",
    },
    market: {
      tip: "Craft shops along Ninenzaka sell quality Kiyomizu-yaki ceramics, fans, and lacquerware.",
      district: "Ninenzaka",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    matcha: {
      tip: "Several traditional tea houses on Ninenzaka serve ceremonial-grade matcha with wagashi.",
      district: "Ninenzaka",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    geisha: {
      tip: "The Gion district below is Kyoto's main geisha quarter — chance sightings in early evening.",
      bestTime: "6pm–8pm on weekdays",
      district: "Gion",
      googleMaps: "https://maps.google.com/?q=Hanamikoji+Street+Gion+Kyoto",
    },
    "hidden-gem": {
      tip: "Slip into the backstreets of Ishibei-koji just below — one of Kyoto's most photogenic hidden lanes.",
      district: "Ishibei-koji",
      googleMaps: "https://maps.google.com/?q=Ishibei-koji+Kyoto",
    },
  },

  "fushimi-inari": {
    temples: {
      tip: "Thousands of vermillion torii gates climbing Mount Inari — a Shinto shrine, free to enter at all hours.",
      bestTime: "Before 7am",
      website: "https://inari.jp/en/",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
    hiking: {
      tip: "Full summit hike is 4km round trip with 250m elevation — most tourists stop at the first plateau.",
      bestTime: "Early morning, weekdays only",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
    photography: {
      tip: "The tunnel of gates at dawn with no crowds is one of Japan's most iconic shots.",
      bestTime: "Sunrise",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
    food: {
      tip: "The stalls outside the main gate sell inari sushi and fox-shaped snacks — try them before entering.",
      bestTime: "Morning",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
    nature: {
      tip: "The forested upper mountain has streams, mossy stones, and ancient cedar — deeply atmospheric.",
      bestTime: "Early morning",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
    "hidden-gem": {
      tip: "Hike past the 2nd plateau — crowds drop by 80% and the atmosphere becomes genuinely mystical.",
      bestTime: "Weekday mornings",
      googleMaps: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto",
    },
  },

  kinkakuji: {
    temples: {
      tip: "The Gold Pavilion is covered in real gold leaf — dazzling on sunny mornings reflected in Kyokochi Pond.",
      bestTime: "When it opens at 9am",
      website: "https://www.shokoku-ji.jp/en/kinkakuji/",
      googleMaps: "https://maps.google.com/?q=Kinkakuji+Temple+Kyoto",
    },
    photography: {
      tip: "Best shot from the main viewing platform — morning light hits the gold facade directly.",
      bestTime: "9–10am on clear days",
      googleMaps: "https://maps.google.com/?q=Kinkakuji+Temple+Kyoto",
    },
    nature: {
      tip: "The stroll garden surrounding the pond is beautifully maintained — walk the full circuit.",
      googleMaps: "https://maps.google.com/?q=Kinkakuji+Temple+Kyoto",
    },
    matcha: {
      tip: "The tea house inside the grounds serves traditional matcha with sweets overlooking the pond.",
      googleMaps: "https://maps.google.com/?q=Kinkakuji+Temple+Kyoto",
    },
  },

  ryoanji: {
    temples: {
      tip: "Home to Japan's most famous rock garden — 15 stones arranged so one is always hidden from view.",
      bestTime: "Opening time (8am)",
      website: "https://www.ryoanji.jp/smph/eng/",
      googleMaps: "https://maps.google.com/?q=Ryoanji+Temple+Kyoto",
    },
    nature: {
      tip: "The large pond garden surrounding the rock garden is beautiful and largely ignored by tourists.",
      googleMaps: "https://maps.google.com/?q=Ryoanji+Temple+Kyoto",
    },
    photography: {
      tip: "The karesansui rock garden is minimalist perfection — shoot from the veranda at opening.",
      bestTime: "Early morning, low angle",
      googleMaps: "https://maps.google.com/?q=Ryoanji+Temple+Kyoto",
    },
    matcha: {
      tip: "The garden café serves matcha while you look out over the reflecting pond — very peaceful.",
      googleMaps: "https://maps.google.com/?q=Ryoanji+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Most visitors skip the pond garden entirely — walk the full circuit for a very different experience.",
      googleMaps: "https://maps.google.com/?q=Ryoanji+Temple+Kyoto",
    },
  },

  "nijo-castle": {
    history: {
      tip: "Built in 1603 for Shogun Tokugawa Ieyasu — the 'nightingale floors' creak to detect intruders.",
      bestTime: "Weekday mornings",
      website: "https://nijo-jocastle.city.kyoto.lg.jp/en",
      googleMaps: "https://maps.google.com/?q=Nijo+Castle+Kyoto",
    },
    temples: {
      tip: "Nijo-jin'ya nearby is a hidden ninja-era house — guided tours only, book well in advance.",
      website: "https://nijojin-ya.com/",
      googleMaps: "https://maps.google.com/?q=Nijo+Castle+Kyoto",
    },
    photography: {
      tip: "Karamon gate and the Ninomaru Palace exteriors are stunning — no photography inside the palace.",
      googleMaps: "https://maps.google.com/?q=Nijo+Castle+Kyoto",
    },
    traditional: {
      tip: "The palace interiors contain the finest surviving Momoyama period paintings on screens.",
      website: "https://nijo-jocastle.city.kyoto.lg.jp/en",
      googleMaps: "https://maps.google.com/?q=Nijo+Castle+Kyoto",
    },
    nature: {
      tip: "The castle gardens have 400 cherry trees — spectacular in late March to early April.",
      bestTime: "Late March–early April",
      googleMaps: "https://maps.google.com/?q=Nijo+Castle+Kyoto",
    },
  },

  tofukuji: {
    temples: {
      tip: "One of Kyoto's five great Zen temples — the Tsutenkyo bridge over a maple gorge is stunning.",
      bestTime: "Mid-November for autumn leaves",
      website: "https://tofukuji.jp/en/",
      googleMaps: "https://maps.google.com/?q=Tofukuji+Temple+Kyoto",
    },
    nature: {
      tip: "The checkerboard moss and stone garden (Hasso Garden) is a masterpiece of modern Zen design.",
      googleMaps: "https://maps.google.com/?q=Tofukuji+Temple+Kyoto",
    },
    photography: {
      tip: "The Tsutenkyo covered bridge framed by maples is one of Kyoto's best autumn shots.",
      bestTime: "Mid-November, early morning",
      googleMaps: "https://maps.google.com/?q=Tofukuji+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Visit in summer — the moss gardens are green, crowds are minimal, and entry is cheaper.",
      bestTime: "June–September",
      googleMaps: "https://maps.google.com/?q=Tofukuji+Temple+Kyoto",
    },
  },

  daitokuji: {
    temples: {
      tip: "A vast Zen complex with 24 sub-temples — only a handful are open to the public at any time.",
      bestTime: "Weekday mornings",
      district: "Murasakino",
      website: "https://www.daitokuji.org/",
      googleMaps: "https://maps.google.com/?q=Daitokuji+Temple+Kyoto",
    },
    matcha: {
      tip: "Sen no Rikyu, the master of the Japanese tea ceremony, is buried here — the connection to chado is profound.",
      district: "Daitokuji",
      googleMaps: "https://maps.google.com/?q=Daitokuji+Temple+Kyoto",
    },
    traditional: {
      tip: "The dry landscape gardens here are considered the purest examples of Zen aesthetic in Japan.",
      googleMaps: "https://maps.google.com/?q=Daitokuji+Temple+Kyoto",
    },
    photography: {
      tip: "Zuiho-in sub-temple has a stunning Christian-influenced rock garden rarely photographed.",
      googleMaps: "https://maps.google.com/?q=Zuihoin+Daitokuji+Kyoto",
    },
    "hidden-gem": {
      tip: "Korin-in opens rarely — check schedule. Kotoin is the most beautiful and always open.",
      district: "Kotoin",
      website: "https://kotoin.com/",
      googleMaps: "https://maps.google.com/?q=Kotoin+Daitokuji+Kyoto",
    },
  },

  "kurama-temple": {
    temples: {
      tip: "Mountain temple dedicated to Mao-son, a cosmic deity — spiritual atmosphere unlike city temples.",
      bestTime: "Weekday, avoid autumn leaf season",
      district: "Kurama",
      website: "https://www.kuramadera.or.jp/",
      googleMaps: "https://maps.google.com/?q=Kurama+Temple+Kyoto",
    },
    hiking: {
      tip: "Classic hike: Kurama → Kibune over the mountain (2.5km, 400m elevation) through cedar forest.",
      bestTime: "Spring or autumn weekdays",
      googleMaps: "https://maps.google.com/?q=Kurama+Temple+Kyoto",
    },
    nature: {
      tip: "Ancient cedar forest with streams — the trail through the valley is extraordinarily peaceful.",
      googleMaps: "https://maps.google.com/?q=Kurama+Temple+Kyoto",
    },
    photography: {
      tip: "The cedar forest path and mountain gate are dramatic — misty mornings are spectacular.",
      bestTime: "Autumn mornings",
      googleMaps: "https://maps.google.com/?q=Kurama+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Few tourists make it to the summit area — you'll often have the forest paths to yourself.",
      googleMaps: "https://maps.google.com/?q=Kurama+Temple+Kyoto",
    },
  },

  "kamigamo-shrine": {
    temples: {
      tip: "One of Kyoto's oldest shrines (678 AD) — UNESCO listed, set in a quiet residential neighborhood.",
      bestTime: "Early morning",
      district: "Kamigamo",
      website: "https://www.kamigamojinja.jp/english/",
      googleMaps: "https://maps.google.com/?q=Kamigamo+Shrine+Kyoto",
    },
    nature: {
      tip: "The stream and willow-lined approach path feel like a hidden garden in the middle of the city.",
      googleMaps: "https://maps.google.com/?q=Kamigamo+Shrine+Kyoto",
    },
    traditional: {
      tip: "The Aoi Matsuri festival in May is one of Kyoto's three great festivals — starts here.",
      bestTime: "May 15th",
      googleMaps: "https://maps.google.com/?q=Kamigamo+Shrine+Kyoto",
    },
    photography: {
      tip: "The long approach path along the stream with weeping willows is beautiful and rarely photographed.",
      bestTime: "Morning light",
      googleMaps: "https://maps.google.com/?q=Kamigamo+Shrine+Kyoto",
    },
    "hidden-gem": {
      tip: "Almost no foreign tourists come here despite its UNESCO status — a genuine local shrine.",
      googleMaps: "https://maps.google.com/?q=Kamigamo+Shrine+Kyoto",
    },
  },

  "fushimi-momoyama-castle": {
    history: {
      tip: "Toyotomi Hideyoshi built the original castle here in 1594 — the current structure is a 1964 replica.",
      bestTime: "Weekdays",
      district: "Fushimi",
      googleMaps: "https://maps.google.com/?q=Fushimi+Momoyama+Castle+Kyoto",
    },
    temples: {
      tip: "Meiji-tennō's mausoleum is on the adjacent hill — a serene, rarely visited imperial site.",
      googleMaps:
        "https://maps.google.com/?q=Meiji+Tenno+Fushimi+Momoyama+Mausoleum+Kyoto",
    },
    "hidden-gem": {
      tip: "The entire hilltop area is essentially tourist-free — extraordinary given its historical importance.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Momoyama+Castle+Kyoto",
    },
    photography: {
      tip: "The white castle against a forested hillside with no crowds makes for dramatic, clean shots.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Momoyama+Castle+Kyoto",
    },
    nature: {
      tip: "The surrounding Momoyama hills have pleasant walking trails through bamboo and cedar.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Momoyama+Castle+Kyoto",
    },
  },

  "jojakko-ji": {
    temples: {
      tip: "Intimate moss-covered temple with stone steps winding up through bamboo — deeply peaceful.",
      bestTime: "Morning",
      district: "Sagano",
      website: "https://jojakko-ji.or.jp/",
      googleMaps: "https://maps.google.com/?q=Jojakko-ji+Temple+Kyoto",
    },
    nature: {
      tip: "The moss garden and pagoda above Arashiyama are breathtaking in autumn and after rain.",
      googleMaps: "https://maps.google.com/?q=Jojakko-ji+Temple+Kyoto",
    },
    photography: {
      tip: "The moss steps, stone lanterns, and bamboo create a layered composition found nowhere else.",
      bestTime: "Morning after rain",
      googleMaps: "https://maps.google.com/?q=Jojakko-ji+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Five minutes walk from Arashiyama's crowds — most tourists walk straight past the entrance.",
      googleMaps: "https://maps.google.com/?q=Jojakko-ji+Temple+Kyoto",
    },
  },

  "nison-in": {
    temples: {
      tip: "A double-Buddha temple (Amida and Shakyamuni) tucked in the Sagano hills — rarely visited.",
      bestTime: "Autumn for the maple approach",
      district: "Sagano",
      website: "https://nison-in.or.jp/",
      googleMaps: "https://maps.google.com/?q=Nison-in+Temple+Kyoto",
    },
    nature: {
      tip: "Set deep in the Sagano hills — the surrounding forest walk to Jojakko-ji is magical.",
      googleMaps: "https://maps.google.com/?q=Nison-in+Temple+Kyoto",
    },
    photography: {
      tip: "The long maple-tree avenue approach in autumn is one of Kyoto's most beautiful hidden corridors.",
      bestTime: "November, early morning",
      googleMaps: "https://maps.google.com/?q=Nison-in+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "The maple-lined approach path in November rivals Eikan-do but with a fraction of the visitors.",
      bestTime: "Mid-November",
      googleMaps: "https://maps.google.com/?q=Nison-in+Temple+Kyoto",
    },
  },

  "konkai-komyoji": {
    temples: {
      tip: "Enormous Jodo sect temple complex on a hill — commanding views over Kyoto with almost no tourists.",
      bestTime: "Autumn for maples",
      district: "Kurodani",
      googleMaps: "https://maps.google.com/?q=Konkai+Komyoji+Temple+Kyoto",
    },
    photography: {
      tip: "The panoramic city views from the hilltop cemetery and the three-storey pagoda are exceptional.",
      googleMaps: "https://maps.google.com/?q=Konkai+Komyoji+Temple+Kyoto",
    },
    nature: {
      tip: "The maple-covered hillside cemetery in autumn is one of Kyoto's most atmospheric hidden spots.",
      bestTime: "Mid-November",
      googleMaps: "https://maps.google.com/?q=Konkai+Komyoji+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Locals call it Kurodani — one of Kyoto's largest temples and almost entirely tourist-free.",
      googleMaps: "https://maps.google.com/?q=Konkai+Komyoji+Temple+Kyoto",
    },
  },

  // ── NATURE & GARDENS ─────────────────────────────────────────────────────
  "arashiyama-sagano": {
    nature: {
      tip: "The bamboo grove, Oi River, and forested mountains make this Kyoto's most scenic natural area.",
      bestTime: "7am before tour groups arrive",
      district: "Arashiyama",
      googleMaps: "https://maps.google.com/?q=Arashiyama+Bamboo+Grove+Kyoto",
    },
    temples: {
      tip: "Tenryu-ji (UNESCO) and Jojakko-ji are both within walking distance and outstanding.",
      website: "https://www.tenryuji.com/en/",
      googleMaps: "https://maps.google.com/?q=Tenryuji+Temple+Kyoto",
    },
    photography: {
      tip: "The bamboo grove at dawn with side light filtering through is one of Japan's iconic images.",
      bestTime: "Sunrise, weekday",
      googleMaps: "https://maps.google.com/?q=Arashiyama+Bamboo+Grove+Kyoto",
    },
    food: {
      tip: "Tofu kaiseki restaurants along the river are an Arashiyama specialty — book ahead.",
      bestTime: "Lunch",
      googleMaps: "https://maps.google.com/?q=Arashiyama+Kyoto",
    },
    traditional: {
      tip: "The Sagano Romantic Train runs through the Hozu River gorge — a spectacular scenic ride.",
      website: "https://www.sagano-kanko.co.jp/en/",
      googleMaps: "https://maps.google.com/?q=Sagano+Scenic+Railway+Kyoto",
    },
    hiking: {
      tip: "Trails lead up into the Sagano hills — the path to Jojakko-ji and Nison-in is excellent.",
      bestTime: "Morning",
      googleMaps: "https://maps.google.com/?q=Arashiyama+Kyoto",
    },
    "hidden-gem": {
      tip: "Walk 10 minutes past the bamboo grove — the Sagano hillside trails are almost deserted.",
      googleMaps: "https://maps.google.com/?q=Arashiyama+Bamboo+Grove+Kyoto",
    },
  },

  "philosopher-path": {
    nature: {
      tip: "A 2km canal-side path lined with 500 cherry trees — quintessential Kyoto in spring.",
      bestTime: "Late March–early April for cherry blossoms",
      district: "Okazaki",
      googleMaps: "https://maps.google.com/?q=Philosopher%27s+Path+Kyoto",
    },
    temples: {
      tip: "Ginkakuji (Silver Pavilion) and Nanzenji are at either end of the path — both exceptional.",
      website: "https://www.nanzenji.or.jp/english/",
      googleMaps: "https://maps.google.com/?q=Nanzenji+Temple+Kyoto",
    },
    matcha: {
      tip: "Several small tea shops and cafés along the path serve excellent matcha and local sweets.",
      district: "Nanzenji end",
      googleMaps: "https://maps.google.com/?q=Philosopher%27s+Path+Kyoto",
    },
    photography: {
      tip: "Cherry blossoms reflected in the canal with temple roofs behind — stunning in all light.",
      bestTime: "Dawn during cherry season",
      googleMaps: "https://maps.google.com/?q=Philosopher%27s+Path+Kyoto",
    },
    food: {
      tip: "The Nanzenji end of the path has excellent tofu restaurants and small cafés.",
      googleMaps: "https://maps.google.com/?q=Nanzenji+Tofu+Restaurant+Kyoto",
    },
    "hidden-gem": {
      tip: "The northern half of the path past Ginkakuji is quieter — most visitors turn back early.",
      googleMaps: "https://maps.google.com/?q=Ginkakuji+Temple+Kyoto",
    },
  },

  "fushimi-momoyama": {
    nature: {
      tip: "The canal walk lined with weeping willows is one of Kyoto's most romantic and peaceful walks.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Sake+District+Kyoto",
    },
    food: {
      tip: "Fushimi is Kyoto's sake district — brewery tours and sake tasting along the canal are unmissable.",
      bestTime: "Weekday afternoons",
      district: "Fushimi",
      googleMaps:
        "https://maps.google.com/?q=Gekkeikan+Okura+Sake+Museum+Kyoto",
    },
    traditional: {
      tip: "Gekkeikan Okura Sake Museum traces 350 years of brewing history — excellent exhibits.",
      website: "https://www.gekkeikan.co.jp/enjoy/museum/",
      googleMaps:
        "https://maps.google.com/?q=Gekkeikan+Okura+Sake+Museum+Kyoto",
    },
    "hidden-gem": {
      tip: "The sake breweries, canal, and weeping willows feel entirely untouched by mass tourism.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Sake+District+Kyoto",
    },
  },

  "kibune-village": {
    nature: {
      tip: "A cedar-forested river valley 30 minutes north of Kyoto — extraordinary peace and natural beauty.",
      bestTime: "June–September for kawadoko dining",
      district: "Kibune",
      googleMaps: "https://maps.google.com/?q=Kibune+Village+Kyoto",
    },
    food: {
      tip: "Kawadoko dining — restaurants build platforms over the river for summer meals. Book weeks ahead.",
      bestTime: "June–September",
      googleMaps: "https://maps.google.com/?q=Kibune+Kawadoko+Dining+Kyoto",
    },
    hiking: {
      tip: "The Kibune–Kurama mountain trail (2.5km) is one of Kyoto's best short hikes.",
      bestTime: "Spring or autumn weekdays",
      googleMaps: "https://maps.google.com/?q=Kibune+Village+Kyoto",
    },
    "hidden-gem": {
      tip: "In winter, the lantern-lit snow path to Kibune Shrine is one of Japan's most magical sights.",
      bestTime: "Winter evenings",
      website: "https://kifune.or.jp/en/",
      googleMaps: "https://maps.google.com/?q=Kibune+Shrine+Kyoto",
    },
  },

  "kyoto-imperial-park": {
    nature: {
      tip: "A vast open park in central Kyoto — locals picnic and jog here, almost no tourists.",
      bestTime: "Morning or late afternoon",
      district: "Kamigyō",
      googleMaps: "https://maps.google.com/?q=Kyoto+Imperial+Park",
    },
    history: {
      tip: "The palace interior requires a free advance reservation from the Imperial Household Agency.",
      website: "https://sankan.kunaicho.go.jp/english/",
      googleMaps: "https://maps.google.com/?q=Kyoto+Imperial+Palace",
    },
    "hidden-gem": {
      tip: "One of central Kyoto's best-kept secrets — 65 hectares of open green space in the city center.",
      googleMaps: "https://maps.google.com/?q=Kyoto+Imperial+Park",
    },
  },

  "katsura-imperial-villa": {
    nature: {
      tip: "Considered the finest example of Japanese garden design in existence — a profound aesthetic experience.",
      bestTime: "Morning tour slot",
      district: "Katsura",
      website: "https://sankan.kunaicho.go.jp/english/",
      googleMaps: "https://maps.google.com/?q=Katsura+Imperial+Villa+Kyoto",
    },
    traditional: {
      tip: "The teahouses scattered through the garden represent the purest expression of wabi-sabi aesthetics.",
      website: "https://sankan.kunaicho.go.jp/english/",
      googleMaps: "https://maps.google.com/?q=Katsura+Imperial+Villa+Kyoto",
    },
    photography: {
      tip: "Photography permitted in the garden — every angle is a composed frame of water, stone, and maple.",
      bestTime: "Autumn morning tour",
      googleMaps: "https://maps.google.com/?q=Katsura+Imperial+Villa+Kyoto",
    },
    "hidden-gem": {
      tip: "Entry requires a free reservation from the Imperial Household Agency — most tourists skip this step.",
      website: "https://sankan.kunaicho.go.jp/english/",
      googleMaps: "https://maps.google.com/?q=Katsura+Imperial+Villa+Kyoto",
    },
  },

  // ── MARKETS & SHOPPING ───────────────────────────────────────────────────
  "nishiki-market": {
    market: {
      tip: "400 years of food history in a single narrow alley — over 100 specialty stalls.",
      bestTime: "Weekday mornings",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    food: {
      tip: "Kyoto's famous covered food market — try yudofu, tsukemono pickles, and fresh tamago on skewers.",
      bestTime: "Weekday mornings before 10am",
      district: "Nishiki",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    traditional: {
      tip: "Long-established Kyoto food culture — many stalls have been family-run for generations.",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    matcha: {
      tip: "Several specialist tea shops sell ceremonial-grade Uji matcha direct from producers.",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
  },

  "teramachi-sanjo": {
    market: {
      tip: "The best antique and craft shopping in Kyoto — kakejiku scrolls, ceramics, and vintage kimono.",
      bestTime: "Weekday mornings",
      district: "Teramachi",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    traditional: {
      tip: "Teramachi is lined with traditional craft shops — lacquerware, fans, incense, and washi paper.",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    matcha: {
      tip: "Urasenke tea school is nearby — the neighborhood is deeply connected to the tea ceremony tradition.",
      website: "https://www.urasenke.or.jp/textd/index.html",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    food: {
      tip: "Sanjo-dori has some of Kyoto's best old-school kissaten (coffee shops) — try Inoda Coffee.",
      district: "Sanjo",
      googleMaps: "https://maps.google.com/?q=Inoda+Coffee+Kyoto",
    },
    "hidden-gem": {
      tip: "The covered Teramachi shotengai arcade has barely changed since the 1950s — completely local.",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    photography: {
      tip: "The mix of Meiji-era storefronts, antique dealers, and old signage is rich visual territory.",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    history: {
      tip: "Tokugawa Ieyasu had all of Kyoto's temples moved to this street in 1590 — hence the name.",
      googleMaps: "https://maps.google.com/?q=Teramachi+Shopping+Street+Kyoto",
    },
    nightlife: {
      tip: "Teramachi and Sanjo turn into a lively evening district with late-open bars, cocktail spots, and easy access to Kiyamachi.",
      bestTime: "After 7pm",
      district: "Teramachi / Sanjo",
      googleMaps: "https://maps.google.com/?q=Teramachi+Sanjo+Kyoto",
    },
  },

  pontocho: {
    geisha: {
      tip: "Geiko and maiko from the Pontocho okiya walk this alley to their appointments in early evening.",
      bestTime: "6pm–7:30pm weekdays",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
    nightlife: {
      tip: "Excellent sake bars and craft cocktail bars tucked into tiny spaces — very local feel.",
      bestTime: "After 8pm",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
    food: {
      tip: "Kyoto's most atmospheric dining alley — izakayas, kaiseki, and yakitori in a lantern-lit corridor.",
      bestTime: "7pm–9pm",
      district: "Pontocho",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
    photography: {
      tip: "The narrow alley with red lanterns and glimpses of the Kamogawa River is endlessly photogenic.",
      bestTime: "Dusk / blue hour",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
    traditional: {
      tip: "In summer, restaurants build wooden decks (yuka) over the Kamogawa River — magical dining.",
      bestTime: "May–September evenings",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
    "hidden-gem": {
      tip: "The tiny bars and counters at the river end of the alley are where locals drink — not tourists.",
      district: "South Pontocho",
      googleMaps: "https://maps.google.com/?q=Pontocho+Alley+Kyoto",
    },
  },

  "toji-market": {
    market: {
      tip: "The largest antique flea market in Japan — held on the 21st of each month at Toji Temple.",
      bestTime: "Before 9am on the 21st",
      district: "Toji",
      googleMaps: "https://maps.google.com/?q=Toji+Temple+Flea+Market+Kyoto",
    },
    traditional: {
      tip: "The best place in Kyoto to find genuine antique kimono, obi, and traditional crafts at fair prices.",
      googleMaps: "https://maps.google.com/?q=Toji+Temple+Flea+Market+Kyoto",
    },
    history: {
      tip: "Toji Temple was founded in 796 AD — its pagoda at 57m is Japan's tallest wooden structure.",
      website: "https://toji.or.jp/en/",
      googleMaps: "https://maps.google.com/?q=Toji+Temple+Kyoto",
    },
    "hidden-gem": {
      tip: "Over 1,000 vendors selling ceramics, textiles, tools, kimono, and oddities — arrive early.",
      bestTime: "Dawn to 10am",
      googleMaps: "https://maps.google.com/?q=Toji+Temple+Flea+Market+Kyoto",
    },
    photography: {
      tip: "The stalls spread around the UNESCO-listed five-storey pagoda — extraordinary visual context.",
      bestTime: "Early morning with soft light",
      googleMaps: "https://maps.google.com/?q=Toji+Temple+Flea+Market+Kyoto",
    },
  },

  // ── DISTRICTS & CULTURE ──────────────────────────────────────────────────
  "central-kawaramachi": {
    food: {
      tip: "The highest density of restaurants in Kyoto — from conveyor-belt sushi to Michelin kaiseki.",
      district: "Kawaramachi",
      googleMaps: "https://maps.google.com/?q=Kawaramachi+Kyoto",
    },
    market: {
      tip: "Takashimaya and Daimaru department stores have outstanding basement food halls (depachika).",
      googleMaps: "https://maps.google.com/?q=Takashimaya+Kyoto",
    },
    nightlife: {
      tip: "Kawaramachi and Kiyamachi streets are the center of Kyoto nightlife — bars, clubs, and live music.",
      bestTime: "After 9pm",
      district: "Kiyamachi",
      googleMaps: "https://maps.google.com/?q=Kiyamachi+Street+Kyoto",
    },
    traditional: {
      tip: "The Karasuma corridor has several long-established wagashi (Japanese sweets) shops.",
      googleMaps: "https://maps.google.com/?q=Karasuma+Street+Kyoto",
    },
    matcha: {
      tip: "Ippodo Tea, Kyoto's most famous tea merchant since 1717, has its flagship store nearby.",
      district: "Teramachi",
      website: "https://www.ippodo-tea.co.jp/en/",
      googleMaps: "https://maps.google.com/?q=Ippodo+Tea+Kyoto",
    },
  },

  higashiyama: {
    traditional: {
      tip: "The best-preserved historic streetscape in Kyoto — stone-paved lanes with machiya townhouses.",
      bestTime: "Early morning before 8am or evening",
      district: "Higashiyama",
      googleMaps: "https://maps.google.com/?q=Higashiyama+District+Kyoto",
    },
    temples: {
      tip: "Chion-in (largest temple gate in Japan) and Shoren-in are both in this district and often missed.",
      website: "https://www.chion-in.or.jp/en/",
      googleMaps: "https://maps.google.com/?q=Chion-in+Temple+Kyoto",
    },
    photography: {
      tip: "Ninenzaka and Sannenzaka stone steps are iconic — misty mornings transform them completely.",
      bestTime: "Dawn or after rain",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    food: {
      tip: "The lane from Kiyomizudera towards Gion has excellent yudofu, kaiseki, and wagashi shops.",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    geisha: {
      tip: "Walk south towards Gion along Hanamikoji-dori in early evening for the best chance of sightings.",
      bestTime: "6pm–8pm weekday evenings",
      district: "Gion",
      googleMaps: "https://maps.google.com/?q=Hanamikoji+Street+Gion+Kyoto",
    },
    market: {
      tip: "Craft shops along Ninenzaka sell quality Kiyomizu-yaki ceramics, fans, and lacquerware.",
      googleMaps: "https://maps.google.com/?q=Ninenzaka+Kyoto",
    },
    matcha: {
      tip: "En tea house on Ninenzaka serves matcha with a moss garden view — one of Kyoto's best tea stops.",
      district: "Ninenzaka",
      googleMaps: "https://maps.google.com/?q=En+Cafe+Ninenzaka+Kyoto",
    },
    "hidden-gem": {
      tip: "Ishibei-koji lane just off Ninenzaka is arguably Kyoto's most beautiful hidden alley — no shops, pure atmosphere.",
      district: "Ishibei-koji",
      googleMaps: "https://maps.google.com/?q=Ishibei-koji+Kyoto",
    },
  },

  "nishiki-koji-backstreets": {
    traditional: {
      tip: "Narrow residential lanes with tofu shops, sake merchants, and Kyoto machiya that haven't changed in decades.",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    food: {
      tip: "Small family-run obanzai (Kyoto home cooking) restaurants tucked into these lanes — no English menus.",
      bestTime: "Lunch",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    "hidden-gem": {
      tip: "The residential lanes behind Nishiki Market are entirely local — laundry, tofu shops, and silence.",
      district: "Nakagyo",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    photography: {
      tip: "Weathered machiya facades, utility poles, and narrow alleys — classic quiet Kyoto street photography.",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    market: {
      tip: "Small family-run craft and specialty shops hide in these lanes — incense, tofu, pickles, and kitchen goods.",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
    matcha: {
      tip: "Small tea shops and hidden counters nearby serve Uji matcha, sencha, and tea sweets — a quieter stop than the main market.",
      bestTime: "Morning or mid-afternoon",
      googleMaps: "https://maps.google.com/?q=Nishiki+Market+Kyoto",
    },
  },

  "fushimi-neighborhood": {
    traditional: {
      tip: "Real working-class Kyoto life — sake culture, old shotengai, and zero tourist infrastructure.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Kyoto",
    },
    food: {
      tip: "Fushimi's working-class shotengai has excellent value ramen, izakayas, and local lunch spots.",
      bestTime: "Lunch or early evening",
      district: "Fushimi",
      googleMaps: "https://maps.google.com/?q=Fushimi+Kyoto",
    },
    nature: {
      tip: "The canal walk south of Fushimi Inari along the Horikawa is peaceful and entirely tourist-free.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Kyoto",
    },
    "hidden-gem": {
      tip: "Real working-class Kyoto — sake culture, old shotengai, and zero tourist infrastructure.",
      googleMaps: "https://maps.google.com/?q=Fushimi+Kyoto",
    },
    nightlife: {
      tip: "Local izakayas around Kintetsu-Momoyama station are excellent — very cheap, very authentic.",
      bestTime: "Early evening",
      googleMaps: "https://maps.google.com/?q=Kintetsu+Momoyama+Station+Kyoto",
    },
  },

  // ── TRANSPORT HUB ────────────────────────────────────────────────────────
  "kyoto-station": {
    food: {
      tip: "The station basement (Porta) and 10th floor (The Cube) have over 100 restaurants — ramen to kaiseki.",
      district: "Kyoto Station",
      googleMaps: "https://maps.google.com/?q=Kyoto+Station",
    },
    market: {
      tip: "Isetan department store inside the station has an outstanding depachika food basement.",
      website: "https://kyoto.wjr-isetan.co.jp/",
      googleMaps: "https://maps.google.com/?q=Isetan+Kyoto+",
    },
  },
};
