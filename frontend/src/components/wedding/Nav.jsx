import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "../../lib/weddingData";

const NAV_ITEMS = [
  { label: "Story", href: "#story" },
  { label: "Journey", href: "#journey" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  // { label: "Gallery", href: "#gallery" },
  { label: "Raw", href: "#raw" },
  { label: "Her Words", href: "#her-words" },
  { label: "Gifts", href: "#gifts" },
  { label: "Venue", href: "#venue" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open, so the page
  // behind it can't scroll underneath the overlay (a separate, common
  // mobile-nav bug from the background-color one below).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // The header bar's own background previously only reacted to `scrolled`,
  // not to whether the mobile menu was open. That meant tapping the
  // hamburger near the very top of the page (before scrolling past 40px)
  // left the header strip transparent while the full-screen menu beneath
  // it was opaque — producing a visible seam/mismatch at the top of the
  // screen. The header bar must go solid whenever EITHER condition is
  // true, not just on scroll.
  const headerIsSolid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-500 ${
        headerIsSolid
          ? "border-b border-white/5"
          : ""
      }`}
      style={{
        backgroundColor: headerIsSolid ? "rgba(0,0,0,0.85)" : "transparent",
      }}
      data-testid="main-nav"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => go("#top")}
          className="group flex items-center gap-3"
          data-testid="nav-logo"
        >
          <span className="font-serif-display text-xl tracking-wide text-[#EAEAEA] md:text-2xl">
            <span className="italic">{WEDDING.groom[0]}</span>
            <span className="mx-1 text-[#D4AF37]">&amp;</span>
            <span className="italic">{WEDDING.bride[0]}</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-white/40 md:block">
            26 · 11 · 2026
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="group relative text-[11px] uppercase tracking-[0.24em] text-white/60 transition hover:text-[#D4AF37]"
              data-testid={`nav-${item.label.toLowerCase()}-link`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`h-px w-6 bg-white transition-all ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-all ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-all ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Solid background color carries the obscuring on its own —
            // backdrop-blur is now purely decorative on top, not load-
            // bearing. Some mobile browsers fail to composite
            // backdrop-filter correctly (it can silently no-op), which
            // was letting the Hero content show through almost fully
            // visible underneath what should have been an opaque menu.
            // `h-[100dvh] w-screen` + `fixed inset-0` guarantees full
            // viewport coverage even with mobile browser chrome
            // (address bar) resizing the viewport during scroll.
            className="fixed inset-0 z-40 flex h-[100dvh] w-screen flex-col items-center justify-center gap-8 overflow-y-auto bg-[#0A0A0A] py-20 backdrop-blur-2xl md:hidden"
            style={{ backgroundColor: "#0A0A0A" }}
            data-testid="mobile-menu"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => go(item.href)}
                className="font-serif-display text-3xl italic text-white/80 transition hover:text-[#D4AF37]"
                data-testid={`mobile-nav-${item.label.toLowerCase()}-link`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}