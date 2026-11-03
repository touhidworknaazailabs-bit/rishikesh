import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Privacy Policy — Hotel Chandreshwar",
  description:
    "How Hotel Chandreshwar, Rishikesh collects, uses and protects the personal information you share through enquiries, WhatsApp and the newsletter.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const { contact } = hotel;
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy Policy"
      path="/privacy-policy"
      updated="3 November 2026"
      intro={`${hotel.name} (“we”, “us”) respects your privacy. This policy explains what personal information we collect through this website, why we collect it and how it is handled.`}
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                When you send a booking enquiry we collect the details you enter: your name,
                phone number, email address, travel dates, number of guests, preferred room
                type and any message. If you subscribe to updates we collect your email address.
              </p>
              <p>
                If you contact us by WhatsApp, phone or email, we receive the information you
                share in that conversation.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use your information only to respond to your enquiry, confirm availability and
              tariff, manage your stay and, if you subscribed, to send you hotel updates. We do
              not sell your personal information.
            </p>
          ),
        },
        {
          heading: "WhatsApp and third-party services",
          body: (
            <p>
              Our enquiry buttons open WhatsApp with a pre-filled message. Once you continue in
              WhatsApp, that conversation is governed by WhatsApp&rsquo;s own terms and privacy
              policy. This website also loads an embedded Google Map on the Location page, which
              may receive technical data such as your IP address.
            </p>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              This website does not use advertising cookies. It may store basic technical data
              needed to function. If analytics tools are added in future, this policy will be
              updated.
            </p>
          ),
        },
        {
          heading: "Retention and security",
          body: (
            <p>
              We keep enquiry details only as long as needed to handle your request and meet
              legal or accounting obligations. We take reasonable steps to protect your
              information, but no method of transmission over the internet is completely secure.
            </p>
          ),
        },
        {
          heading: "Guest records",
          body: (
            <p>
              At check-in, Indian law requires hotels to record identity details of guests. These
              are collected in person, kept as required by law and shared with authorities only
              where legally required.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You may ask us to access, correct or delete the personal information we hold about
              you, or unsubscribe from updates, at any time by contacting us.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              This website is intended for adults. We do not knowingly collect personal
              information from children.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: <p>We may update this policy from time to time. The date above shows the latest revision.</p>,
        },
        {
          heading: "Contact us",
          body: (
            <p>
              {hotel.name}, {hotel.address.full}.<br />
              Phone:{" "}
              <a className="underline hover:text-terracotta" href={`tel:${contact.primaryPhoneDial}`}>
                {contact.primaryPhone}
              </a>
              <br />
              Email:{" "}
              <a className="underline hover:text-terracotta" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
