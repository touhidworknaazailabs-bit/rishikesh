/**
 * Site-wide config not specific to hotel facts (URLs, nav, SEO defaults).
 * NEXT_PUBLIC_SITE_URL should be set in the deployment environment once a
 * domain is chosen. Falls back to a placeholder during local development.
 */
// The site is actually live at www.chandreshwarhotelrishikesh.in (confirmed
// by a GEO/SEO audit of the deployed site — the canonical URL, sitemap and
// robots.txt all need to match this exact domain, or AI/search engines may
// credit citations to the wrong URL). NEXT_PUBLIC_SITE_URL should be set to
// this same value in the Vercel project's environment variables — this
// fallback only covers local dev and a misconfigured deployment.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.chandreshwarhotelrishikesh.in";

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
