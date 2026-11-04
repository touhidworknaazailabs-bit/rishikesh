"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { mainNav } from "@/data/site";
import { hotel } from "@/data/hotel";
import { BookStayButton } from "./CtaButtons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Close the mobile menu on navigation. Adjusted during render (React's
  // recommended pattern) rather than in an effect, to avoid a cascading
  // render from setState-in-effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  // Clicking the logo while already on "/" is a same-route navigation,
  // which Next.js skips entirely — including its usual scroll-to-top —
  // so nothing happens. Scroll up manually in that case.
  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          solid ? "bg-ivory/95 backdrop-blur shadow-[0_2px_16px_rgba(25,24,23,0.06)]" : "bg-transparent"
        )}
      >
      <div className="container-editorial flex items-center justify-between py-4 md:py-5">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 leading-none group">
          {/* The logo mark's colors (navy/gold/blue) are fixed in the
              image itself — unlike the text beside it, it can't adapt to
              the transparent-over-hero vs solid-header states. A subtle
              ivory backing disc keeps it legible over a dark photo without
              looking boxed-in once the header goes solid ivory itself. */}
          <span
            className={clsx(
              "flex size-9 md:size-10 shrink-0 items-center justify-center rounded-full transition-colors",
              solid ? "bg-transparent" : "bg-ivory/90 shadow-sm"
            )}
          >
            <img src="/images/logo/mark.png" alt="" className="size-7 md:size-8 object-contain" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span
              className={clsx(
                "font-display text-lg md:text-xl tracking-[0.18em] transition-colors",
                solid ? "text-charcoal" : "text-ivory"
              )}
            >
              HOTEL
            </span>
            <span
              className={clsx(
                "font-display text-lg md:text-xl tracking-[0.18em] -mt-1 transition-colors",
                solid ? "text-terracotta" : "text-ivory"
              )}
            >
              CHANDRESHWAR
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group relative py-1 text-sm tracking-wide transition-colors",
                  solid ? "text-charcoal" : "text-ivory"
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute left-0 -bottom-0.5 h-px bg-terracotta transition-all duration-300 ease-out",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${hotel.contact.primaryPhoneDial}`}
            className={clsx(
              "flex items-center gap-2 text-sm transition-colors hover:opacity-70",
              solid ? "text-charcoal" : "text-ivory"
            )}
          >
            <img src={solid ? "/icons/phone-charcoal.svg" : "/icons/phone-ivory.svg"} className="size-4" alt="" aria-hidden />
            {hotel.contact.primaryPhone}
          </a>
          <BookStayButton size="md" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "lg:hidden p-2 -mr-2 transition-colors relative z-10",
            solid ? "text-charcoal" : "text-ivory"
          )}
        >
          {open ? (
            <img src={solid ? "/icons/x-charcoal.svg" : "/icons/x-ivory.svg"} className="size-6" alt="" />
          ) : (
            <img src={solid ? "/icons/menu-charcoal.svg" : "/icons/menu-ivory.svg"} className="size-6" alt="" />
          )}
        </button>
      </div>
      </header>

      {/* Full-screen quiet takeover rather than a cramped dropdown — large,
          evenly-spaced serif links, generous whitespace.
          Deliberately a SIBLING of <header>, not nested inside it: the
          header's own `backdrop-blur` (a CSS filter) establishes a
          containing block for its fixed-position descendants, so a `fixed
          inset-0` child rendered inside <header> resolves against the
          header's own ~84px-tall box instead of the viewport — it showed up
          as a thin opaque strip at the top with the page bleeding through
          below it. Keeping this outside the filtered ancestor avoids that.
          z-30 (below the header's z-40) so the header itself — logo and the
          X close button — stays visible and clickable above this overlay
          rather than being covered by it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-30 bg-ivory"
          >
            <nav className="container-editorial flex h-full flex-col justify-center gap-2 pb-20">
              {mainNav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link href={link.href} className="font-display text-4xl text-charcoal block py-2">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + mainNav.length * 0.05, duration: 0.4 }}
                className="mt-8 flex flex-col gap-4"
              >
                <a href={`tel:${hotel.contact.primaryPhoneDial}`} className="flex items-center gap-2 text-charcoal/70">
                  <img src="/icons/phone-charcoal.svg" className="size-4" alt="" aria-hidden />
                  {hotel.contact.primaryPhone}
                </a>
                <BookStayButton size="lg" className="w-fit" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
