import { NextRequest, NextResponse } from "next/server";

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

type InquiryBody = {
  name?: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function stripControlChars(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const isControl = (code >= 0 && code <= 31) || code === 127;
    if (!isControl) out += value[i];
  }
  return out;
}

export async function POST(req: NextRequest) {
  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isNonEmptyString(body.name)) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }

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

  console.log("[booking-inquiry]", JSON.stringify(inquiry));

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your booking enquiry has been received. The hotel team will contact you shortly.",
  });
}
