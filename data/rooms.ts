import { hotel } from "./hotel";

export type RoomImage = {
  /** Path under /public. Currently all point at placeholder art — see
   * /public/images/README.md for how to swap in real photography. */
  src: string;
  alt: string;
};

export type Room = {
  slug: string;
  name: string;
  shortName: string;
  type: "AC" | "Non-AC";
  count: number;
  heading: string;
  summary: string;
  description: string[];
  features: string[];
  price: number | null;
  images: RoomImage[];
};

export const rooms: Room[] = [
  {
    slug: "ac-double-bed-room",
    name: "AC Double Bed Room",
    shortName: "AC Room",
    type: "AC",
    count: hotel.rooms.ac,
    heading: "AC Double Bed Room",
    summary: `A comfortable, air-conditioned double-bed room with an attached bathroom and hot water — ${hotel.rooms.ac} rooms available, double occupancy.`,
    description: [
      "Hotel Chandreshwar's AC Double Bed Rooms are built around the essentials that matter on a Rishikesh trip: a comfortable double bed for two guests, a private attached bathroom, round-the-clock hot water, and air conditioning to help you rest well after a day of travel, sightseeing or the ghats.",
      `There are ${hotel.rooms.ac} AC rooms in the property, each kept simple and clean, with straightforward direct booking through the hotel — no middlemen, no hidden steps.`,
    ],
    features: ["Double bed", "Double occupancy", "Attached bathroom", "Hot water", "Air conditioning"],
    price: hotel.pricing.acRoomPrice,
    images: [
      { src: "/images/rooms/ac-room-1.jpg", alt: "AC Double Bed Room at Hotel Chandreshwar, Rishikesh" },
      { src: "/images/rooms/ac-room-2.jpg", alt: "AC Double Bed Room with wall-mounted air conditioner and TV" },
      { src: "/images/rooms/ac-room-3.jpg", alt: "Interior view of an AC Double Bed Room at Hotel Chandreshwar" },
    ],
  },
  {
    slug: "non-ac-double-bed-room",
    name: "Non-AC Double Bed Room",
    shortName: "Non-AC Room",
    type: "Non-AC",
    count: hotel.rooms.nonAc,
    heading: "Non-AC Double Bed Room",
    summary: `A comfortable double-bed room with an attached bathroom and hot water, at a budget-friendly rate — ${hotel.rooms.nonAc} rooms available, double occupancy.`,
    description: [
      "For travelers who don't need air conditioning or prefer a more budget-friendly rate, Hotel Chandreshwar's Non-AC Double Bed Rooms offer the same core comfort: a double bed for two guests, an attached bathroom, and hot water, in the same convenient Chandreshwar Nagar location.",
      `There are ${hotel.rooms.nonAc} Non-AC rooms in the property — the majority of the hotel's rooms — with straightforward direct booking by phone or WhatsApp.`,
    ],
    features: ["Double bed", "Double occupancy", "Attached bathroom", "Hot water"],
    price: hotel.pricing.nonAcRoomPrice,
    images: [
      { src: "/images/rooms/non-ac-room-1.jpg", alt: "Non-AC Double Bed Room at Hotel Chandreshwar, Rishikesh" },
      { src: "/images/rooms/non-ac-room-2.jpg", alt: "Non-AC Double Bed Room interior at Hotel Chandreshwar" },
      { src: "/images/rooms/non-ac-room-3.jpg", alt: "Double bed and furnishings in a Non-AC room at Hotel Chandreshwar" },
    ],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
