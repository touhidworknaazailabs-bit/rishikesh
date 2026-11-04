"use client";

import { useState } from "react";
import { hotel } from "@/data/hotel";

export default function CopyAddressButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hotel.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — fail silently, address is visible on page
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-5 py-3 text-sm text-charcoal hover:border-charcoal transition-colors"
    >
      {copied ? (
        <img src="/icons/check-sage.svg" className="size-4" alt="" aria-hidden />
      ) : (
        <img src="/icons/copy-charcoal.svg" className="size-4" alt="" aria-hidden />
      )}
      {copied ? "Address Copied" : "Copy Address"}
    </button>
  );
}
