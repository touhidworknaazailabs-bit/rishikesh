import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CookieConsent from "@/components/CookieConsent";
import EnquiryPopup from "@/components/EnquiryPopup";
import MotionProvider from "@/components/MotionProvider";
import PageTransition from "@/components/PageTransition";
import { HotelStructuredData } from "@/components/StructuredData";
import { hotel } from "@/data/hotel";
import { siteUrl, siteName } from "@/data/site";

// Fraunces: a distinctive variable serif (soft-serif optical sizing, real
// italic) for headlines — replaces Cormorant Garamond, which reads as the
// generic default choice on most boutique-hotel templates. Weight range
// covers the light editorial body copy (300) through bold headline use (700).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Inter: the most extensively hinted, cross-platform-tested UI sans-serif
// available — replaces Manrope for body copy and UI chrome.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${hotel.name} — Your Comfortable Stay in Rishikesh`,
    template: `%s | ${siteName}`,
  },
  description: hotel.shortDescription,
  keywords: [
    "Hotel in Rishikesh",
    "hotels in Rishikesh",
    "affordable hotel in Rishikesh",
    "hotel near Ganga Ghat Rishikesh",
    "hotel in Chandreshwar Nagar",
    "AC hotel in Rishikesh",
    "budget accommodation in Rishikesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: `${hotel.name} — Your Comfortable Stay in Rishikesh`,
    description: hotel.shortDescription,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: hotel.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${hotel.name} — Your Comfortable Stay in Rishikesh`,
    description: hotel.shortDescription,
    images: ["/images/og-image.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#191817",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${body.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <HotelStructuredData />
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingContact />
          <EnquiryPopup />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
