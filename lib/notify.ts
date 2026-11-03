import { hotel } from "@/data/hotel";

/**
 * Delivers form submissions to the hotel by email via Resend's HTTP API
 * (free tier: 3,000 emails/month). Needed because Vercel's free tier keeps
 * runtime logs for about an hour, so console.log alone loses leads.
 *
 * Environment variables (set in the Vercel project settings):
 *  - RESEND_API_KEY      required to enable email delivery
 *  - NOTIFY_TO_EMAIL     recipient (defaults to the hotel's email)
 *  - NOTIFY_FROM_EMAIL   sender on a domain verified in Resend
 *                        (defaults to Resend's onboarding address, which can
 *                        only deliver to the Resend account owner's email)
 *
 * Without RESEND_API_KEY this is a no-op and callers fall back to logging.
 */
export async function notifyHotel(subject: string, fields: Record<string, string | undefined>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const text = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM_EMAIL || "Hotel Website <onboarding@resend.dev>",
        to: [process.env.NOTIFY_TO_EMAIL || hotel.contact.email],
        reply_to: fields.email || undefined,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[notify] Resend responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("[notify] failed", err);
    return false;
  }
}
