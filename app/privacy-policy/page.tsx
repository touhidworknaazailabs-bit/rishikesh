import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Hotel Chandreshwar collects, uses and protects personal information, in line with India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

// Kept in one place so the "last updated" date shown to visitors and the
// one used by search engines (in the page body) never drift apart.
const lastUpdated = "14 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-editorial max-w-3xl">
        <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />

        <Reveal className="mt-6 mb-12">
          <p className="eyebrow">LEGAL</p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal text-balance">Privacy Policy</h1>
          <p className="mt-5 text-charcoal/70 leading-relaxed">
            Last updated: {lastUpdated}. This policy explains what personal
            information {hotel.name} collects through this website, why, and
            what rights you have over it under Indian law.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="space-y-10 text-charcoal/75 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">1. Who this policy covers</h2>
            <p>
              This policy applies to {hotel.name} ({hotel.address.locality},{" "}
              {hotel.address.city}, {hotel.address.state}), referred to here as
              &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;the hotel&rdquo;, and to
              visitors of this website. It is written to meet the requirements
              of India&rsquo;s{" "}
              <strong className="text-charcoal">
                Digital Personal Data Protection Act, 2023 (DPDP Act)
              </strong>{" "}
              and the applicable rules under the{" "}
              <strong className="text-charcoal">Information Technology Act, 2000</strong>. Under the
              DPDP Act, the hotel acts as the &ldquo;Data Fiduciary&rdquo; for
              personal data you choose to share with us, and you are the
              &ldquo;Data Principal&rdquo;.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">2. What we collect</h2>
            <p>We only collect what you choose to give us, through:</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>The booking enquiry form on this site (name, phone number, email, check-in/check-out dates, guest count, room preference, and any message you add).</li>
              <li>The newsletter sign-up form (email address only).</li>
              <li>Direct contact by phone, WhatsApp, or email, at your initiative.</li>
            </ul>
            <p className="mt-3">
              We do not use tracking analytics, advertising pixels, or any
              third-party marketing cookies on this site today. The only
              browser storage this site sets is a small, strictly necessary
              record of your cookie-consent choice itself (see Section 6).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">3. Why we collect it</h2>
            <p>Personal data submitted through this site is used only to:</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>Respond to your booking enquiry and confirm availability and tariff.</li>
              <li>Contact you about your stay, by phone, WhatsApp, or email.</li>
              <li>Send occasional updates, if you specifically opted in via the newsletter form.</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal data to any third
              party for their own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">4. How your enquiry is handled</h2>
            <p>
              When you submit the booking form, the details are sent to the
              hotel&rsquo;s own inbox and, at the same time, opened as a
              pre-filled message in WhatsApp for you to send directly to the
              hotel&rsquo;s WhatsApp number — this is how a &ldquo;booking&rdquo;
              is actually confirmed today, since there is no automated payment
              or reservation system in place. That means your message also
              passes through WhatsApp (operated by Meta Platforms, Inc.) and,
              if you choose to send it, is stored there under WhatsApp&rsquo;s
              own privacy policy as well as ours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">5. Location map</h2>
            <p>
              The Location and Contact pages embed a Google Maps view so you
              can see the hotel&rsquo;s location and get directions. Loading
              that map may allow Google to set its own cookies or collect
              usage data, under Google&rsquo;s own privacy policy — this is not
              controlled by the hotel.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">6. Cookies</h2>
            <p>
              This site uses a single strictly-necessary cookie/local-storage
              entry to remember whether you accepted or rejected the
              cookie-consent banner, so it doesn&rsquo;t reappear on every
              visit. This is essential to the site&rsquo;s basic operation and
              is not an advertising or tracking cookie. Beyond this, the site
              currently sets no analytics or advertising cookies of its own.
              If that changes in the future — for example, if analytics is
              added to understand site traffic — this policy and the cookie
              banner will be updated first, and any non-essential cookies will
              only load if you choose &ldquo;Accept&rdquo;.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">7. How long we keep it</h2>
            <p>
              Booking enquiries and contact details are kept only for as long
              as needed to handle your stay and for the hotel&rsquo;s own
              reasonable record-keeping. Newsletter email addresses are kept
              until you unsubscribe or ask us to remove them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">8. Your rights</h2>
            <p>Under the DPDP Act, 2023, you have the right to:</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>Ask what personal data of yours we hold, and why.</li>
              <li>Ask us to correct inaccurate or incomplete data.</li>
              <li>Ask us to erase your data, where we&rsquo;re not required to keep it for a legal reason.</li>
              <li>Withdraw consent at any time (for example, unsubscribe from the newsletter).</li>
              <li>Nominate another individual to exercise these rights on your behalf in the event of your death or incapacity.</li>
              <li>Register a complaint if you believe your data has been mishandled.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these, contact us using the details in
              Section 10 below. We will respond within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">9. Children&rsquo;s data</h2>
            <p>
              This site is not directed at children, and the booking form is
              intended to be filled in by an adult booking a stay. We do not
              knowingly collect personal data from children through this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">10. Contact us / grievance redressal</h2>
            <p>
              For any question about this policy, or to exercise your rights
              over your personal data, contact the hotel directly:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>Phone: <a href={`tel:${hotel.contact.primaryPhoneDial}`} className="text-terracotta underline">{hotel.contact.primaryPhone}</a></li>
              <li>Email: <a href={`mailto:${hotel.contact.email}`} className="text-terracotta underline">{hotel.contact.email}</a></li>
              <li>Address: {hotel.address.line1}, {hotel.address.line2}, {hotel.address.locality}, {hotel.address.city}, {hotel.address.state} – {hotel.address.postalCode}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">11. Governing law</h2>
            <p>
              This policy is governed by the laws of India. Any dispute
              relating to it is subject to the jurisdiction of the courts at{" "}
              {hotel.address.district}, {hotel.address.state}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charcoal mb-3">12. Changes to this policy</h2>
            <p>
              We may update this policy from time to time — for example, if
              the site starts using analytics or a new booking system. Any
              changes will be posted on this page with an updated date at the
              top.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
