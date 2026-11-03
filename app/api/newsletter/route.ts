import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, guardJsonPost, stripControlChars } from "@/lib/apiGuard";
import { notifyHotel } from "@/lib/notify";

/**
 * Newsletter signup endpoint. No email marketing platform is connected
 * yet — this validates and logs the address server-side so nothing is
 * lost, ready to be wired to a real provider (Mailchimp, Brevo, etc.)
 * later without changing the frontend.
 */
export async function POST(req: NextRequest) {
  const guarded = await guardJsonPost(req, "newsletter", { max: 5, windowMs: 10 * 60_000 });
  if ("response" in guarded) return guarded.response;

  const raw = guarded.body.email;
  const email = typeof raw === "string" ? stripControlChars(raw).trim().slice(0, 200) : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();
  console.log("[newsletter-signup]", JSON.stringify({ email, receivedAt }));
  await notifyHotel("New newsletter signup", { email, receivedAt });

  return NextResponse.json({ ok: true, message: "Thanks — you're on the list." });
}
