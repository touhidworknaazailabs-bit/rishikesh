import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, guardJsonPost, stripControlChars } from "@/lib/apiGuard";
import { notifyHotel } from "@/lib/notify";

/**
 * Booking inquiry endpoint.
 *
 * Today this only validates and logs the inquiry server-side (visible in
 * deployment logs) so there's a record even if a guest only used the
 * website form. WhatsApp remains the primary, reliable delivery channel.
 *
 * To go further later, without touching the frontend:
 *  - send an email via a provider (Resend, SES, Nodemailer) using
 *    process.env-based credentials
 *  - write the inquiry into Supabase/Firebase
 *  - forward to a PMS / CRM webhook
 */

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const guarded = await guardJsonPost(req, "inquiry", { max: 5, windowMs: 10 * 60_000 });
  if ("response" in guarded) return guarded.response;
  const body = guarded.body;

  const bad = (error: string) => NextResponse.json({ ok: false, error }, { status: 400 });

  // Basic sanitization: cap lengths and strip control characters.
  const clean = (value: unknown, max = 200) =>
    isNonEmptyString(value) ? stripControlChars(value).trim().slice(0, max) : undefined;

  const inquiry = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    email: clean(body.email, 100),
    checkIn: clean(body.checkIn, 20),
    checkOut: clean(body.checkOut, 20),
    guests: clean(body.guests, 20),
    roomType: clean(body.roomType, 50),
    message: clean(body.message, 1000),
    receivedAt: new Date().toISOString(),
  };

  if (!inquiry.name) return bad("Name is required");
  if (inquiry.email && !EMAIL_RE.test(inquiry.email)) return bad("Email address is not valid");
  if (inquiry.phone && !/^[0-9+()\-\s]{7,30}$/.test(inquiry.phone)) return bad("Phone number is not valid");
  for (const d of [inquiry.checkIn, inquiry.checkOut]) {
    if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) return bad("Dates must be in yyyy-mm-dd format");
  }
  if (inquiry.checkIn && inquiry.checkOut && inquiry.checkOut <= inquiry.checkIn) {
    return bad("Check-out must be after check-in");
  }

  console.log("[booking-inquiry]", JSON.stringify(inquiry));
  await notifyHotel(`New booking enquiry from ${inquiry.name}`, inquiry);

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your booking enquiry has been received. The hotel team will contact you shortly.",
  });
}
