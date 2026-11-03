import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import FloatingContact from "@/components/FloatingContact";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import { HotelStructuredData } from "@/components/StructuredData";
import { hotel } from "@/data/hotel";
import { siteUrl, siteName } from "@/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Manrope({
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
    images: [{ url: "/images/hero/hero-1.jpg", alt: "Hotel Chandreshwar, Rishikesh" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/hero-1.jpg"],
    title: `${hotel.name} — Your Comfortable Stay in Rishikesh`,
    description: hotel.shortDescription,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#191817",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${body.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <HotelStructuredData />
          <ScrollProgress />
          <TopBar />
          <Header />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileActionBar />
          <FloatingContact />
        </MotionProvider>
      </body>
    </html>
  );
}
