import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Terms & Conditions — Hotel Chandreshwar",
  description:
    "Terms and conditions for using the Hotel Chandreshwar website and booking a stay, including enquiries, tariff, occupancy and guest responsibilities.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  const { contact, pricing } = hotel;
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms & Conditions"
      path="/terms-and-conditions"
      updated="3 November 2026"
      intro={`By using this website or booking a stay at ${hotel.name}, you agree to the terms below. Please read them before sending an enquiry.`}
      sections={[
        {
          heading: "Enquiries are not confirmed bookings",
          body: (
            <p>
              Submitting the enquiry form or sending a WhatsApp message is a request only. A booking
              is confirmed only when the hotel team confirms availability, tariff and dates with you
              directly. This website does not show live availability.
            </p>
          ),
        },
        {
          heading: "Tariff",
          body: (
            <p>
              Tariff shown on the website is indicative (currently ₹{pricing.nonAcRoomPrice} per
              night for Non-AC and ₹{pricing.acRoomPrice} per night for AC rooms, double occupancy).
              It may change with season, demand and applicable taxes, and the rate confirmed by the
              hotel at the time of booking applies.
            </p>
          ),
        },
        {
          heading: "Occupancy",
          body: (
            <p>
              Every room is a double-bed room with a maximum of {hotel.rooms.maxGuests} guests.
              Additional guests are subject to the hotel&rsquo;s approval and may be charged extra.
            </p>
          ),
        },
        {
          heading: "Check-in and identification",
          body: (
            <p>
              All guests must present a valid government photo ID at check-in, as required by Indian
              law. The hotel may refuse accommodation where valid ID is not provided. Check-in and
              check-out times will be confirmed by the hotel when you book.
            </p>
          ),
        },
        {
          heading: "Payment, cancellation and changes",
          body: (
            <p>
              Payment terms, any advance amount and the cancellation or refund policy will be
              communicated by the hotel when your booking is confirmed. Please contact us as early as
              possible if you need to change or cancel.
            </p>
          ),
        },
        {
          heading: "Guest conduct and damages",
          body: (
            <p>
              Guests are expected to respect other guests, staff and hotel property. Guests are
              responsible for any damage caused to the room or its contents. Illegal activity on the
              premises is not permitted and may be reported to the authorities.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The hotel is not liable for loss of or damage to personal belongings left unattended,
              or for delays or interruptions caused by events beyond its control, such as weather,
              road closures or utility outages, to the extent permitted by law.
            </p>
          ),
        },
        {
          heading: "Website content",
          body: (
            <p>
              We try to keep information on this website accurate, but photos, distances and
              nearby-attraction details are for general guidance only. Please confirm anything
              important with the hotel before travelling. Content on this site may not be copied
              without permission.
            </p>
          ),
        },
        {
          heading: "Privacy",
          body: (
            <p>
              Your use of this website is also governed by our{" "}
              <Link className="underline hover:text-terracotta" href="/privacy-policy">
                Privacy Policy
              </Link>
              .
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Any dispute is subject to the
              jurisdiction of the courts at Dehradun, Uttarakhand.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Call{" "}
              <a className="underline hover:text-terracotta" href={`tel:${contact.primaryPhoneDial}`}>
                {contact.primaryPhone}
              </a>{" "}
              or email{" "}
              <a className="underline hover:text-terracotta" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
