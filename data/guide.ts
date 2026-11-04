import { hotel } from "./hotel";

// Same shape as data/attractions.ts's Attraction credit — required
// attribution for a CC BY/CC BY-SA photo, rendered as PhotoCredit's ⓘ
// badge. Omit entirely for the hotel's own property photos or a CC0 image,
// which need no attribution.
export type ImageCredit = {
  photographer: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  image?: string;
  imageAlt?: string;
  credit?: ImageCredit;
};

export type GuideArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  updated: string; // ISO date
  // Lead image shown under the intro. Reuses the same already-licensed
  // landmark/property photos as data/attractions.ts and the homepage —
  // no new images invented for the guide.
  heroImage?: string;
  heroImageAlt?: string;
  heroCredit?: ImageCredit;
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "things-to-do-in-rishikesh",
    title: "Things to Do in Rishikesh",
    seoTitle: "Things to Do in Rishikesh — A Practical Guide",
    description:
      "From Ganga aarti at the ghats to yoga, white-water rafting and the Beatles Ashram — a practical guide to what to actually do in Rishikesh.",
    intro:
      "Rishikesh packs an unusual amount of variety into a small town on the banks of the Ganga — spiritual, adventurous, and simply relaxing, often in the same day. Here's a practical rundown of what most travelers spend their time doing.",
    // Supplied directly by the hotel/owner — no attribution needed.
    heroImage: "/images/attractions/triveni-ghat.jpg",
    heroImageAlt: "Aerial view of Triveni Ghat and the Ganga, Rishikesh",
    sections: [
      {
        heading: "Watch the Ganga Aarti",
        paragraphs: [
          "The evening Ganga Aarti — a ceremony of lamps, chanting and bells performed as the sun sets over the river — is one of the most-repeated Rishikesh experiences for a reason. Triveni Ghat is the most well-known spot for it, drawing both pilgrims and travelers to the riverbank each evening.",
          "Arrive a little early to find a good spot by the water, and dress modestly out of respect for what is, first and foremost, a religious ritual rather than a show.",
        ],
      },
      {
        heading: "Walk across Laxman Jhula and Ram Jhula",
        paragraphs: [
          "These two suspension bridges over the Ganga are as much a Rishikesh landmark as the river itself. Both connect the town's two banks and are lined with small shops, cafés and temples — a good way to get a feel for the town on foot.",
        ],
        // Supplied directly by the hotel/owner — no attribution needed.
        image: "/images/attractions/laxman-jhula.jpg",
        imageAlt: "Laxman Jhula suspension bridge over the Ganga, Rishikesh",
      },
      {
        heading: "Try yoga and meditation",
        paragraphs: [
          "Rishikesh is widely known as a center for yoga, with everything from single drop-in classes to multi-week teacher training courses on offer at ashrams and studios across town. Even travelers with no prior practice can usually find a beginner-friendly class.",
        ],
        image: "/images/attractions/yoga-practice.jpg",
        imageAlt: "A yoga class in progress at a yoga school in Rishikesh",
        credit: {
          photographer: "Shivatattvayoga",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Yoga_Teacher_Training_India_-_Shiva_Tattva_Yoga,_Rishikesh_.jpg",
        },
      },
      {
        heading: "Go white-water rafting",
        paragraphs: [
          "The stretch of the Ganga around Rishikesh is a popular white-water rafting spot, with operators offering runs of varying length and difficulty depending on the season and water levels. Rafting is typically available outside the monsoon months — check current conditions and choose a licensed operator.",
        ],
        image: "/images/attractions/rafting.jpg",
        imageAlt: "White-water rafting on the Ganga near Rishikesh",
        credit: {
          photographer: "Ritikamaheshwari58",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rapid_ahead!.jpg",
        },
      },
      {
        heading: "Visit the Beatles Ashram (Chaurasi Kutia)",
        paragraphs: [
          "The former ashram where The Beatles famously stayed in 1968 is now open to visitors as a heritage and art space inside the Rajaji National Park buffer zone, with murals, old meditation cells and forest walking paths.",
        ],
        // Pexels, photographer Tanuj Matta — free license, no attribution required.
        image: "/images/attractions/beatles-ashram.jpg",
        imageAlt: "The 'Let It Be' mural at the Beatles Ashram, Rishikesh",
      },
      {
        heading: "Explore local markets and cafés",
        paragraphs: [
          "Between activities, Rishikesh's laid-back café culture and small markets around Ram Jhula and Tapovan are worth wandering — a good way to slow down between more structured sightseeing.",
        ],
        // Pexels, photographer Aman Gairola — free license, no attribution required.
        image: "/images/attractions/local-markets.jpg",
        imageAlt: "Riverside food stalls and vendors near Ram Jhula, Rishikesh",
      },
    ],
    updated: "2026-01-01",
  },
  {
    slug: "best-time-to-visit-rishikesh",
    title: "Best Time to Visit Rishikesh",
    seoTitle: "Best Time to Visit Rishikesh — Season by Season",
    description:
      "A season-by-season look at Rishikesh's weather, so you can plan your trip around yoga, rafting, or a quieter riverside stay.",
    intro:
      "Rishikesh has a distinct seasonal rhythm — hot summers, a monsoon that changes the character of the river, and a long, pleasant stretch of autumn and winter that suits most travelers best. Here's what to expect through the year.",
    // CC0 (public domain) — no attribution required, unlike the CC BY-SA
    // landmark photos used elsewhere in the guide.
    heroImage: "/images/property/rishikesh-ganga-sunset.jpg",
    heroImageAlt: "Sunset over a Ganga ghat near Rishikesh, Uttarakhand",
    sections: [
      {
        heading: "October to February — generally the most comfortable",
        paragraphs: [
          "Days are mild and sunny, nights turn cool to cold (carry a warm layer, especially in December–January), and this stretch is generally considered the most comfortable time to explore the town, do outdoor yoga sessions and walk around the ghats.",
        ],
      },
      {
        heading: "March to June — warmer, active season",
        paragraphs: [
          "Temperatures climb through this period, with peak summer heat in May–June. Mornings and evenings remain pleasant, and this season also overlaps with popular yoga festivals and events in Rishikesh.",
        ],
      },
      {
        heading: "July to September — monsoon",
        paragraphs: [
          "The monsoon brings heavy rain and a fast, swollen Ganga. River activities like rafting are typically paused during this period, and travel in the surrounding hills can be affected by landslides — worth checking conditions before planning a monsoon trip.",
        ],
        image: "/images/attractions/monsoon-ganga.jpg",
        imageAlt: "Monsoon storm clouds over the Ganga valley at Rishikesh",
        credit: {
          photographer: "Pranav Kumar",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Monsoon_in_rishikesh.jpg",
        },
      },
      {
        heading: "Choosing dates around your plans",
        paragraphs: [
          "If rafting or trekking is the priority, aim for the post-monsoon and winter/spring windows. If yoga and a quieter riverside stay is the goal, October through March tends to work well for most travelers.",
        ],
      },
    ],
    updated: "2026-01-01",
  },
  {
    slug: "rishikesh-trip-guide",
    title: "Rishikesh Trip Guide",
    seoTitle: "Rishikesh Trip Guide — Planning the Basics",
    description:
      "How to plan a Rishikesh trip: how long to stay, getting there, getting around, and choosing where to base yourself.",
    intro:
      "Planning a first trip to Rishikesh mostly comes down to a few practical questions: how long to stay, how to get there, how to move around once you're there, and where to base yourself. Here's a straightforward run-through.",
    // Not the hotel's own exterior — the only exterior photo supplied was a
    // low-quality crop from the hotel's printed business card, removed
    // sitewide (see public/images/README.md). A general Rishikesh landmark
    // shot instead, same as the other guide articles' hero images.
    // Supplied directly by the hotel/owner — no attribution needed.
    heroImage: "/images/attractions/trayambakeshwar.jpg",
    heroImageAlt: "Trayambakeshwar Temple (13-storey Tera Manzil) near Laxman Jhula, Rishikesh",
    sections: [
      {
        heading: "How long to stay",
        paragraphs: [
          "Two to four nights is enough to cover the main ghats, a yoga class or two, and one activity like rafting or a short trek. Travelers combining Rishikesh with a longer yoga course or a Char Dham trip often stay considerably longer.",
        ],
      },
      {
        heading: "Getting there",
        paragraphs: [
          "Rishikesh is well connected by road and rail from Delhi and other North Indian cities, with the nearest major airport at Dehradun (Jolly Grant). Overnight trains and buses from Delhi are a common, budget-friendly option.",
          `Hotel Chandreshwar itself is close to both: Yog Nagari Rishikesh Railway Station is about ${
            hotel.distances.find((d) => d.name === "Yog Nagari Railway Station")?.distance
          } away, and the main bus stand is about ${
            hotel.distances.find((d) => d.name === "Bus Stand")?.distance
          } away.`,
        ],
      },
      {
        heading: "Getting around once you're there",
        paragraphs: [
          "Central Rishikesh — the ghats, Ram Jhula, Laxman Jhula area — is largely walkable. Auto-rickshaws and local taxis cover longer distances, including out to Neelkanth Mahadev or the Beatles Ashram.",
        ],
      },
      {
        heading: "Choosing where to stay",
        paragraphs: [
          "Location matters more in Rishikesh than in many towns, since so much of the experience revolves around proximity to the river and the ghats. A comfortable, well-located room with reliable basics — hot water, a clean attached bathroom, and (if you need it) air conditioning — goes a long way after a day of walking, yoga or rafting.",
        ],
        image: "/images/property/intro-1.jpg",
        imageAlt: "A double bed room with air conditioning at Hotel Chandreshwar, Rishikesh",
      },
    ],
    updated: "2026-01-01",
  },
  {
    slug: "places-to-visit-in-rishikesh",
    title: "Places to Visit in Rishikesh",
    seoTitle: "Places to Visit in Rishikesh",
    description:
      "The essential list of ghats, temples, bridges and nearby spots that make up a Rishikesh itinerary.",
    intro:
      "Beyond the well-known highlights, Rishikesh has a handful of specific spots worth building an itinerary around. Here's the essential list — the same places covered in more depth, with directions, on the Location page.",
    // Supplied directly by the hotel/owner — no attribution needed.
    heroImage: "/images/attractions/ram-jhula.jpg",
    heroImageAlt: "Ram Jhula at night with a light installation across the bridge, Rishikesh",
    sections: [
      {
        heading: "Triveni Ghat",
        paragraphs: [
          "The main ghat in Rishikesh and the site of the evening Ganga Aarti — usually the busiest and most atmospheric riverside spot in town.",
        ],
        // Supplied directly by the hotel/owner — no attribution needed.
        image: "/images/attractions/triveni-ghat.jpg",
        imageAlt: "Aerial view of Triveni Ghat and the Ganga, Rishikesh",
      },
      {
        heading: "Laxman Jhula and Ram Jhula",
        paragraphs: [
          "Two iconic suspension bridges across the Ganga, each surrounded by temples, shops and cafés on both banks.",
        ],
        // Supplied directly by the hotel/owner — no attribution needed.
        image: "/images/attractions/laxman-jhula.jpg",
        imageAlt: "Laxman Jhula suspension bridge over the Ganga, Rishikesh",
      },
      {
        heading: "Bajrang Setu",
        paragraphs: [
          "A newer pedestrian suspension bridge over the Ganga with a glass-floor viewing section, built as an additional crossing near Laxman Jhula.",
        ],
        // Supplied directly by the hotel/owner, not sourced from
        // Wikimedia — no CC credit needed, same as the property's own
        // photos. (The other photo of this bridge is used on the
        // Location page's Nearby Attractions card.)
        image: "/images/attractions/bajrang-setu-glass-floor.jpg",
        imageAlt: "Glass floor viewing section of Bajrang Setu, Rishikesh",
      },
      {
        heading: "Parmarth Niketan",
        paragraphs: [
          "One of Rishikesh's largest ashrams, on the banks of the Ganga near Ram Jhula, known for its own evening aarti and yoga programs.",
        ],
        image: "/images/attractions/parmarth-niketan.jpg",
        imageAlt: "Parmarth Niketan ashram lit up at night on the Ganga, Rishikesh",
        credit: {
          photographer: "Sheikh Ershad",
          license: "CC BY-SA 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Rishikesh_at_night_-_Parmarth_Niketan_Ashram.jpg",
        },
      },
      {
        heading: "Neelkanth Mahadev Temple",
        paragraphs: [
          "A Shiva temple in the hills above Rishikesh, reachable by road or on foot, popular with pilgrims and offering views over the surrounding forest.",
        ],
        image: "/images/attractions/neelkanth-mahadev.jpg",
        imageAlt: "Neelkanth Mahadev Temple near Rishikesh",
        credit: {
          photographer: "Anurodhraghuwanshi",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Neelkanth_mahadev_mandir.jpg",
        },
      },
      {
        heading: "Beatles Ashram (Chaurasi Kutia)",
        paragraphs: [
          "The former Maharishi Mahesh Yogi ashram, now a heritage site with Beatles-themed murals inside the Rajaji National Park buffer area.",
        ],
        // Pexels, photographer Tanuj Matta — free license, no attribution required.
        image: "/images/attractions/beatles-ashram.jpg",
        imageAlt: "The 'Let It Be' mural at the Beatles Ashram, Rishikesh",
      },
      {
        heading: "Rajaji National Park",
        paragraphs: [
          "A short drive from town, this national park offers wildlife safaris and is one of the easier nature escapes near Rishikesh.",
        ],
        // Pexels, photographer Sabik Nisam — free license, no attribution
        // required. A representative Asian elephant shot, not a
        // geo-verified in-park photo.
        image: "/images/attractions/rajaji-national-park.jpg",
        imageAlt: "An Asian elephant in forest habitat near Rajaji National Park",
      },
    ],
    updated: "2026-01-01",
  },
  {
    slug: "rishikesh-for-families",
    title: "Rishikesh for Families",
    seoTitle: "Rishikesh Travel Guide for Families",
    description:
      "Practical tips for visiting Rishikesh with family — what to plan around, easier activities, and choosing a comfortable place to stay.",
    intro:
      "Rishikesh isn't only a backpacker or yoga-retreat destination — it also works well for family trips, as long as you plan around a few practical things.",
    // Supplied directly by the hotel/owner — no attribution needed.
    heroImage: "/images/attractions/laxman-jhula.jpg",
    heroImageAlt: "Laxman Jhula suspension bridge over the Ganga, Rishikesh",
    sections: [
      {
        heading: "Easier, family-friendly activities",
        paragraphs: [
          "Walking across Ram Jhula or Laxman Jhula, watching the evening Ganga Aarti, and gentle riverside walks are all low-effort, high-impact experiences that work for most ages. Milder rafting stretches are also offered by some operators for families with older children — check age and safety requirements directly with the operator.",
        ],
      },
      {
        heading: "Pace the trip",
        paragraphs: [
          "Rishikesh's terrain is hilly in parts and the town can get crowded, especially near the main ghats in the evening. Building in rest time between activities tends to work better with families than a packed itinerary.",
        ],
      },
      {
        heading: "What to look for in a place to stay",
        paragraphs: [
          "For families, a straightforward double-bed room with an attached bathroom and reliable hot water covers the essentials without unnecessary complexity — and a location that isn't too far from the ghats cuts down on daily travel time with kids in tow.",
        ],
        image: "/images/property/intro-1.jpg",
        imageAlt: "A double bed room with air conditioning at Hotel Chandreshwar, Rishikesh",
      },
    ],
    updated: "2026-01-01",
  },
  {
    slug: "rishikesh-travel-guide",
    title: "Rishikesh Travel Guide",
    seoTitle: "Rishikesh Travel Guide — Everything to Know Before You Go",
    description:
      "A general overview of Rishikesh for first-time visitors — what the town is known for, when to go, and how to plan around it.",
    intro:
      "Rishikesh, on the banks of the Ganga in Uttarakhand, is known internationally as a center for yoga and meditation, and locally as a pilgrimage town and gateway to the Himalayas. This overview pulls together the essentials for a first visit.",
    heroImage: "/images/attractions/swarg-ashram.jpg",
    heroImageAlt: "Riverside temples across the Ganga near Swarg Ashram, Muni Ki Reti, Rishikesh",
    heroCredit: {
      photographer: "Ken Wieland",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Temples_across_the_Ganges_near_Swargashram,_Muni_Ki_Reti,_Rishikesh.jpg",
    },
    sections: [
      {
        heading: "What Rishikesh is known for",
        paragraphs: [
          "The Ganga runs through the middle of town, and much of daily life — the aartis, the ghats, the ashrams — is built around it. Rishikesh is also one of India's best-known yoga destinations, and a starting point for the Char Dham pilgrimage route and various Himalayan treks.",
        ],
      },
      {
        heading: "When to go",
        paragraphs: [
          "October to March is generally the most comfortable window for sightseeing and yoga; the monsoon (July–September) is better avoided if river activities are the priority. See our dedicated guide on the best time to visit Rishikesh for a full seasonal breakdown.",
        ],
      },
      {
        heading: "Where to base yourself",
        paragraphs: [
          "Areas like Chandreshwar Nagar, Tapovan and around Ram Jhula/Laxman Jhula are common places for travelers to base themselves, generally within reasonable reach of the main ghats and markets.",
        ],
        // No image — the only exterior photo of the hotel itself was a
        // low-quality crop from its printed business card, removed
        // sitewide (see public/images/README.md), and this section is
        // about neighbourhoods generally, not the hotel specifically.
      },
      {
        heading: "Planning your stay",
        paragraphs: [
          "Whatever the reason for the trip — the Ganga, yoga, family time, or simply a break — most travelers are looking for the same basics from where they stay: a comfortable double-bed room, a clean attached bathroom, hot water, and straightforward direct booking with the hotel.",
        ],
      },
    ],
    updated: "2026-01-01",
  },
];

export function getGuideArticleBySlug(slug: string) {
  return guideArticles.find((a) => a.slug === slug);
}
