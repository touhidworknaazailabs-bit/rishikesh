/**
 * Well-known Rishikesh landmarks near the hotel's Chandreshwar Nagar
 * location. Order is roughly by how commonly travelers visit each one.
 * `distance` is only set where the owner has directly confirmed a figure
 * (see data/hotel.ts `distances`) — left unset elsewhere rather than
 * estimated or guessed.
 *
 * Photos are NOT hotel-supplied (except Bajrang Setu) — the hotel has no
 * photos of these public landmarks. Two source types are used:
 *   - Wikimedia Commons, CC BY/BY-SA — REQUIRES the `credit` field, shown
 *     as an ⓘ badge by components/PhotoCredit. Do not drop it.
 *   - Pexels/Unsplash — free license, no attribution required, so these
 *     have no `credit` field (a source note is kept in a comment above
 *     each one instead, for provenance only).
 */
export type Attraction = {
  name: string;
  description: string;
  image?: string;
  distance?: string;
  credit?: {
    photographer: string;
    license: string;
    licenseUrl: string;
    sourceUrl: string;
  };
};

export const nearbyAttractions: Attraction[] = [
  {
    name: "Triveni Ghat",
    description:
      "Rishikesh's main ghat on the Ganga, and the site of the evening Ganga Aarti — the most popular spot in town to watch it.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/triveni-ghat.jpg",
    distance: "800 m",
  },
  {
    name: "Laxman Jhula",
    description:
      "An iconic suspension bridge across the Ganga, lined with small shops, cafés and temples on both banks.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/laxman-jhula.jpg",
  },
  {
    name: "Ram Jhula",
    description:
      "The other of Rishikesh's two famous suspension bridges, close to several ashrams including Parmarth Niketan.",
    // Supplied directly by the hotel/owner — no attribution needed. A
    // night light-installation shot (a portrait projected across the
    // bridge's cables), not a plain daytime view.
    image: "/images/attractions/ram-jhula.jpg",
  },
  {
    name: "Parmarth Niketan",
    description:
      "One of Rishikesh's largest ashrams on the riverbank, known for its own evening aarti and yoga programs.",
    // The building's own "PARMARTH" signage is visible in this shot — a
    // clear, unambiguous match, unlike several earlier stock-site
    // candidates that turned out to show a different, unrelated building.
    image: "/images/attractions/parmarth-niketan.jpg",
    credit: {
      photographer: "Sheikh Ershad",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rishikesh_at_night_-_Parmarth_Niketan_Ashram.jpg",
    },
  },
  {
    name: "Beatles Ashram (Chaurasi Kutia)",
    description:
      "The former Maharishi Mahesh Yogi ashram where The Beatles stayed in 1968, now open as a heritage and art space.",
    // Pexels, photographer Tanuj Matta — free license, no attribution required.
    image: "/images/attractions/beatles-ashram.jpg",
  },
  {
    name: "Neelkanth Mahadev Temple",
    description:
      "A Shiva temple in the hills above Rishikesh, popular with pilgrims and reachable by road.",
    image: "/images/attractions/neelkanth-mahadev.jpg",
    credit: {
      photographer: "Anurodhraghuwanshi",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Neelkanth_mahadev_mandir.jpg",
    },
  },
  {
    name: "Rajaji National Park",
    description: "A national park a short drive from town, offering wildlife safaris and forest scenery.",
    // Pexels, photographer Sabik Nisam — free license, no attribution
    // required. A representative Asian elephant shot (the park's
    // best-known resident species), not a geo-verified in-park photo.
    image: "/images/attractions/rajaji-national-park.jpg",
  },
  {
    name: "Swarg Ashram",
    description:
      "A riverside stretch dotted with smaller ashrams, bookshops and cafés — a popular area for an evening walk along the Ganga.",
    image: "/images/attractions/swarg-ashram.jpg",
    credit: {
      photographer: "Ken Wieland",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Temples_across_the_Ganges_near_Swargashram,_Muni_Ki_Reti,_Rishikesh.jpg",
    },
  },
  {
    name: "Trayambakeshwar Temple (Tera Manzil)",
    description:
      "A distinctive 13-storey temple near Laxman Jhula, easy to spot and a common stop while exploring that side of the river.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/trayambakeshwar.jpg",
  },
  {
    name: "Local markets near Ram Jhula & Tapovan",
    description: "Small markets and cafés worth wandering between sightseeing and yoga classes.",
    // Pexels, photographer Aman Gairola — free license, no attribution
    // required. First photo found for this one all session.
    image: "/images/attractions/local-markets.jpg",
  },
  {
    name: "Bajrang Setu",
    description:
      "A newer pedestrian suspension bridge over the Ganga with a glass-floor viewing section, built as an additional crossing near Laxman Jhula.",
    // Supplied directly by the hotel/owner, not sourced from Wikimedia —
    // no CC credit needed, same as the property's own photos.
    image: "/images/attractions/bajrang-setu.jpg",
    distance: "3 km",
  },
  {
    name: "Yog Nagari Railway Station",
    description: "The nearest railway station to the hotel, on the Rishikesh–Karnaprayag line.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/railway-station.jpg",
    distance: "2 km",
  },
  {
    name: "AIIMS Hospital",
    description: "All India Institute of Medical Sciences, Rishikesh — the nearest major hospital.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/aiims-hospital.jpg",
    distance: "4 km",
  },
  {
    name: "Bus Stand",
    description: "Rishikesh's main bus stand, for local and long-distance buses.",
    // Supplied directly by the hotel/owner — no attribution needed.
    image: "/images/attractions/bus-stand.jpg",
    distance: "800 m",
  },
];
