import { NextRequest, NextResponse } from "next/server";

/**
 * Shared protections for the public form endpoints: same-origin check,
 * body-size cap and a small per-IP rate limit.
 *
 * The rate limiter is in-memory, so it is per server instance — fine for a
 * single-node deploy and a useful brake on casual spam. On serverless /
 * multi-instance hosting, back it with a shared store (Upstash, Redis, ...).
 */

const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_BODY_BYTES = 8 * 1024;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Returns a rejection response, or `{ body }` with the parsed JSON object.
 */
export async function guardJsonPost(
  req: NextRequest,
  scope: string,
  limit: { max: number; windowMs: number }
): Promise<{ response: NextResponse } | { body: Record<string, unknown> }> {
  if (!sameOrigin(req)) return { response: fail("Forbidden", 403) };

  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  const key = `${scope}:${clientIp(req)}`;
  const bucket = buckets.get(key) ?? { count: 0, resetAt: now + limit.windowMs };
  bucket.count += 1;
  buckets.set(key, bucket);
  if (bucket.count > limit.max) {
    return { response: fail("Too many requests. Please try again later.", 429) };
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return { response: fail("Request too large", 413) };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { response: fail("Invalid JSON body", 400) };
    }
    return { body: parsed as Record<string, unknown> };
  } catch {
    return { response: fail("Invalid JSON body", 400) };
  }
}

export function stripControlChars(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (!(code <= 31 || code === 127)) out += value[i];
  }
  return out;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
