import { hotel } from "@/data/hotel";

/**
 * BOOKING / INQUIRY SERVICE LAYER
 * ---------------------------------------------------------------------------
 * There is no live PMS, channel manager, or payment integration yet. Every
 * "booking" today is really a direct inquiry sent to the hotel over
 * WhatsApp, phone, or email, which the owner confirms personally.
 *
 * The functions below are written as the stable interface the rest of the
 * app calls (`sendInquiry`, `checkAvailability`, `createBooking`) so that
 * swapping in a real booking engine (Supabase/Firebase for storage, a PMS
 * for inventory, Razorpay/UPI for payment) later means rewriting the
 * implementation of these functions only — no page or component needs to
 * change.
 */

export type RoomTypeId = "ac" | "non-ac" | "any";

export type InquiryPayload = {
  name: string;
  phone?: string;
  email?: string;
  checkIn?: string; // ISO date string, yyyy-mm-dd
  checkOut?: string; // ISO date string, yyyy-mm-dd
  guests?: string;
  roomType?: RoomTypeId | string;
  message?: string;
};

const roomTypeLabels: Record<string, string> = {
  ac: "AC Double Bed Room",
  "non-ac": "Non-AC Double Bed Room",
  any: "No preference",
};

export function roomTypeLabel(roomType?: string): string {
  if (!roomType) return "Not specified";
  return roomTypeLabels[roomType] ?? roomType;
}

function formatDate(value?: string): string {
  if (!value) return "Not specified";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Builds the standard WhatsApp inquiry message text (unencoded).
 */
export function buildWhatsAppMessage(payload: Partial<InquiryPayload>): string {
  const lines = [
    "Hello Hotel Chandreshwar,",
    "",
    "I would like to enquire about booking a room.",
    "",
    `Name: ${payload.name || "-"}`,
    `Check-in: ${formatDate(payload.checkIn)}`,
    `Check-out: ${formatDate(payload.checkOut)}`,
    `Guests: ${payload.guests || "-"}`,
    `Room: ${roomTypeLabel(payload.roomType)}`,
  ];
  if (payload.message) {
    lines.push("", `Message: ${payload.message}`);
  }
  lines.push("", "Please let me know the availability and tariff.");
  return lines.join("\n");
}

/**
 * Returns a wa.me deep link that opens WhatsApp with the inquiry
 * pre-filled. Works on mobile (app) and desktop (WhatsApp Web).
 */
export function buildWhatsAppLink(payload: Partial<InquiryPayload> = {}): string {
  const text = buildWhatsAppMessage(payload);
  return `https://wa.me/${hotel.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildTelLink(dialNumber: string = hotel.contact.primaryPhoneDial): string {
  return `tel:${dialNumber}`;
}

/**
 * Placeholder for a real-time availability check against a PMS / channel
 * manager. There is no live inventory system today, so this always
 * resolves to "unknown" — callers should treat this as "please enquire",
 * never as a live yes/no.
 */
export async function checkAvailability(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { checkIn?: string; checkOut?: string; roomType?: RoomTypeId | string }
): Promise<{ status: "unknown"; message: string }> {
  return {
    status: "unknown",
    message:
      "Live availability isn't connected yet — send an inquiry and the hotel team will confirm availability and tariff directly.",
  };
}

/**
 * Placeholder for a future real booking creation call (PMS + payment).
 * Today it just delegates to sendInquiry so the UI can already be built
 * against the final shape of this call.
 */
export async function createBooking(payload: InquiryPayload) {
  return sendInquiry(payload);
}

/**
 * Sends a booking inquiry. Today this resolves to a WhatsApp deep link the
 * client opens, and (best-effort) posts to the local /api/inquiry route so
 * the hotel also has an email/record trail. It never claims a confirmed
 * booking — only that the inquiry was sent/received.
 */
export async function sendInquiry(
  payload: InquiryPayload
): Promise<{ ok: boolean; whatsappUrl: string }> {
  const whatsappUrl = buildWhatsAppLink(payload);

  try {
    await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-fatal: WhatsApp remains the reliable path even if the API route
    // is unreachable (e.g. static export, offline).
  }

  return { ok: true, whatsappUrl };
}
