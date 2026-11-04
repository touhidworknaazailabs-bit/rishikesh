/**
 * CENTRAL HOTEL CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every verified fact about Hotel Chandreshwar lives here. Nothing in the
 * rest of the codebase should hard-code a phone number, address line, room
 * count, or price — it should import from this file instead.
 *
 * When new facts are confirmed (room prices, exact distances, amenities,
 * awards, founding year, etc.) update them HERE ONLY and the whole site
 * updates automatically.
 */

export const hotel = {
  name: "Hotel Chandreshwar",
  legalName: "Hotel Chandreshwar",
  owner: "Mr. Dharampal",
  tagline: "Your Comfortable Stay in Rishikesh",
  shortDescription:
    "AC & Non-AC double-bed rooms in Chandreshwar Nagar, Rishikesh — with attached bathrooms, hot water and easy direct booking.",

  contact: {
    primaryPhone: "+91 94107 07392",
    primaryPhoneDial: "+919410707392",
    secondaryPhone: "+91 94561 02050",
    secondaryPhoneDial: "+919456102050",
    landline: "0135-2434232",
    landlineDial: "+911352434232",
    email: "chandreshwarhotel2008@gmail.com",
    // WhatsApp CTAs use the primary phone number, in international format
    // without symbols, as required by the WhatsApp click-to-chat API.
    whatsappNumber: "919410707392",
  },

  address: {
    line1: "Near Durga Mandir",
    line2: "Dayanand Ashram Road",
    locality: "Chandreshwar Nagar",
    city: "Rishikesh",
    district: "Dehradun",
    state: "Uttarakhand",
    postalCode: "249201",
    country: "India",
    // One-line and multi-line formatted versions for reuse in UI / schema.org
    full: "Near Durga Mandir, Dayanand Ashram Road, Chandreshwar Nagar, Rishikesh, Dehradun, Uttarakhand – 249201, India",
    lines: [
      "Near Durga Mandir",
      "Dayanand Ashram Road, Chandreshwar Nagar",
      "Rishikesh, Dehradun, Uttarakhand – 249201",
    ],
  },

  // Straight-line/road distances from the hotel, as given directly by the
  // owner. Kept as simple, verified name+distance pairs rather than
  // invented walking times or routes.
  distances: [
    { name: "Triveni Ghat", distance: "800 m" },
    { name: "Jankipur", distance: "800 m" },
    { name: "Bajrang Setu", distance: "3 km" },
    { name: "AIIMS Hospital", distance: "4 km" },
    { name: "Bus Stand", distance: "800 m" },
    { name: "Yog Nagari Railway Station", distance: "2 km" },
  ],

  // Google Maps share link supplied by the client. Do not replace with an
  // invented / geocoded link — this is the verified source of truth.
  googleMapsUrl: "https://maps.app.goo.gl/XyuTpGKEpUZuWLUj9",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Hotel+Chandreshwar,+Near+Durga+Mandir,+Dayanand+Ashram+Road,+Chandreshwar+Nagar,+Rishikesh,+Uttarakhand+249201&output=embed",

  /**
   * Geo-coordinates are NOT independently verified from the Google Maps
   * share link (short links can't be resolved to lat/lng without a live
   * network request at data-authoring time). These are Rishikesh-area
   * approximate coordinates used only as a safe fallback for the
   * embedded map and structured data, and are intentionally kept
   * configurable here. Replace with the exact pin coordinates once
   * confirmed by the owner.
   */
  geo: {
    latitude: 30.1246,
    longitude: 78.3168,
    verified: false,
  },

  rooms: {
    total: 10,
    ac: 3,
    nonAc: 7,
    // Every room — AC and Non-AC — is a double-bed room for two guests.
    occupancy: "Double occupancy (max 2 guests per room)",
    maxGuests: 2,
  },

  // Confirmed tariff. Every room card, detail page, and structured-data
  // price range picks these up automatically.
  pricing: {
    currency: "INR",
    acRoomPrice: 1000 as number | null,
    nonAcRoomPrice: 600 as number | null,
    priceNote: "Per night, double occupancy. Contact the hotel to confirm current tariff and availability.",
  },

  amenitiesConfirmed: [
    "Double bed",
    "Double occupancy",
    "Attached bathroom",
    "Hot water",
  ],

  // Printed on the hotel's own business card (supplied by the owner), so
  // treated as owner-confirmed even though not in the original written
  // brief. Kept separate from amenitiesConfirmed (the room-level basics)
  // since these are property/service-level, not per-room.
  servicesConfirmed: ["Free WiFi", "Travel Desk", "Pickup & Drop"],

  socials: {
    // No verified social profiles supplied yet.
  },
} as const;

export type Hotel = typeof hotel;
