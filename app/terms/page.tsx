import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of this website and direct booking enquiries with Hotel Chandreshwar, Rishikesh.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

// Kept in one place so the "last updated" date shown to visitors and the
// one used by search engines (in the page body) never drift apart.
const lastUpdated = "24 September 2026";

export default function TermsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial max-w-3xl">
        <Breadcrumbs items={[{ name: "Terms & Conditions", url: "/terms" }]} />

        <Reveal className="mt-6 mb-12">
          <p className="eyebrow">LEGAL</p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal text-balance">Terms &amp; Conditions</h1>
          <p className="mt-5 text-charcoal/70 leading-relaxed">
            Last updated: {lastUpdated}. These terms govern your use of this
            website and any booking enquiry you send to {hotel.name} through it.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="space-y-10 text-charcoal/75 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">1. About this site</h2>
            <p>
              This website is operated by {hotel.legalName} ({hotel.address.locality},{" "}
              {hotel.address.city}, {hotel.address.state}), referred to here as
              &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;the hotel&rdquo;. By using this
              site, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">2. Booking enquiries, not confirmed reservations</h2>
            <p>
              This site does not take online payments or issue automated
              booking confirmations. Submitting the booking form, or
              messaging the hotel by phone, WhatsApp or email, sends a
              booking <em>enquiry</em> — a reservation is only confirmed once
              the hotel replies directly to confirm availability, tariff and
              dates. Room availability and the tariff shown on this site are
              indicative and subject to confirmation with the hotel at the
              time of your enquiry.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">3. Pricing</h2>
            <p>
              Room rates shown on this site ({hotel.pricing.priceNote}) may
              change without notice. The rate confirmed directly by the hotel
              at the time of booking applies, not necessarily the rate last
              displayed on the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">4. Cancellations and changes</h2>
            <p>
              Since bookings are confirmed directly with the hotel rather
              than through an automated system, cancellation, refund and
              date-change terms are set and confirmed by the hotel at the
              time of booking. Contact the hotel directly using the details
              in Section 8 to cancel or change a reservation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">5. Accuracy of information</h2>
            <p>
              We try to keep room details, photos, pricing and distances to
              nearby landmarks accurate and up to date. Distances are
              straight-line/road estimates rather than exact walking times.
              If anything on this site is unclear or you need it confirmed
              before booking, contact the hotel directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">6. Acceptable use</h2>
            <p>
              You agree not to misuse this site — for example, by attempting
              to disrupt it, scrape it at disruptive volume, or submit the
              booking or newsletter forms with false or malicious content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">7. Governing law</h2>
            <p>
              These terms are governed by the laws of India. Any dispute
              relating to them is subject to the jurisdiction of the courts
              at {hotel.address.district}, {hotel.address.state}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">8. Contact us</h2>
            <p>For any question about these terms, or about an existing enquiry or booking, contact the hotel directly:</p>
            <ul className="mt-3 space-y-1.5">
              <li>Phone: <a href={`tel:${hotel.contact.primaryPhoneDial}`} className="text-terracotta underline">{hotel.contact.primaryPhone}</a></li>
              <li>Email: <a href={`mailto:${hotel.contact.email}`} className="text-terracotta underline">{hotel.contact.email}</a></li>
              <li>Address: {hotel.address.line1}, {hotel.address.line2}, {hotel.address.locality}, {hotel.address.city}, {hotel.address.state} – {hotel.address.postalCode}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">9. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Any changes will
              be posted on this page with an updated date at the top.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
