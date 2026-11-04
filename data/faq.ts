import { hotel } from "./hotel";
import { formatPrice } from "@/lib/format";

export type FaqItem = {
  question: string;
  answer: string;
};

// Only confirmed information. Do not add speculative Q&A here.
// Counts, prices and occupancy are pulled from data/hotel.ts and
// data/rooms.ts so this never drifts out of sync with the rest of the site.
export const faqs: FaqItem[] = [
  {
    question: "Does Hotel Chandreshwar have AC rooms?",
    answer: `Yes. Hotel Chandreshwar has ${hotel.rooms.ac} air-conditioned (AC) Double Bed Rooms, each with an attached bathroom and hot water.`,
  },
  {
    question: "How many rooms does Hotel Chandreshwar have?",
    answer: `Hotel Chandreshwar has ${hotel.rooms.total} rooms in total — ${hotel.rooms.ac} AC rooms and ${hotel.rooms.nonAc} Non-AC rooms, all double-bed rooms with attached bathrooms.`,
  },
  {
    question: "Does Hotel Chandreshwar have Non-AC rooms?",
    answer: `Yes. There are ${hotel.rooms.nonAc} Non-AC Double Bed Rooms — the majority of the hotel's rooms — offering the same attached bathroom and hot water as the AC rooms, at a more budget-friendly rate.`,
  },
  {
    question: "How many guests can stay in a room?",
    answer: `Every room — AC and Non-AC — is a double-bed room for double occupancy (max ${hotel.rooms.maxGuests} guests per room).`,
  },
  {
    question: "What is the room tariff?",
    answer: `AC Double Bed Rooms are ${formatPrice(hotel.pricing.acRoomPrice)}, and Non-AC Double Bed Rooms are ${formatPrice(hotel.pricing.nonAcRoomPrice)}. Contact the hotel directly by phone or WhatsApp to confirm current availability.`,
  },
  {
    question: "Do the rooms have attached bathrooms?",
    answer: "Yes, every room at Hotel Chandreshwar — AC and Non-AC — has its own attached bathroom.",
  },
  {
    question: "Is hot water available?",
    answer: "Yes, hot water is available in all rooms.",
  },
  {
    question: "How can I contact Hotel Chandreshwar?",
    answer: `You can call ${hotel.contact.primaryPhone} or ${hotel.contact.secondaryPhone}, use the landline ${hotel.contact.landline}, message on WhatsApp, or email ${hotel.contact.email}.`,
  },
  {
    question: "How can I book directly?",
    answer:
      "You can book directly by calling the hotel, messaging on WhatsApp, or sending a booking enquiry through the website's booking form. Direct booking means no third-party commission and faster, personal replies from the hotel team.",
  },
  {
    question: "Where is Hotel Chandreshwar located?",
    answer: `The hotel is located ${hotel.address.line1}, on ${hotel.address.line2}, in ${hotel.address.locality}, ${hotel.address.city}, ${hotel.address.district}, ${hotel.address.state} – ${hotel.address.postalCode}.`,
  },
  {
    question: "Can I enquire through WhatsApp?",
    answer:
      "Yes. You can send your check-in and check-out dates, number of guests and room preference on WhatsApp, and the hotel team will confirm availability and tariff.",
  },
  {
    question: "Does Hotel Chandreshwar have WiFi?",
    answer: "Yes, the hotel offers free WiFi, along with a travel desk and pickup & drop assistance.",
  },
];
