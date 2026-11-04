/**
 * Site-wide config not specific to hotel facts (URLs, nav, SEO defaults).
 * NEXT_PUBLIC_SITE_URL should be set in the deployment environment once a
 * domain is chosen. Falls back to a placeholder during local development.
 */
// The hotel's business card lists www.chandreshwarhotel.in as its site —
// used as the default here. Override with NEXT_PUBLIC_SITE_URL once the
// actual deployment domain is confirmed.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.chandreshwarhotel.in";

export const siteName = "Hotel Chandreshwar";

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rishikesh Guide", href: "/guide" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
