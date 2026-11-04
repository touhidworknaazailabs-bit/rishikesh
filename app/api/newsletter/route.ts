import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter signup endpoint. No email marketing platform is connected
 * yet — this validates and logs the address server-side so nothing is
 * lost, ready to be wired to a real provider (Mailchimp, Brevo, etc.)
 * later without changing the frontend.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  console.log("[newsletter-signup]", JSON.stringify({ email, receivedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true, message: "Thanks — you're on the list." });
}
