import { motion } from "framer-motion";
import { WEDDING } from "../../lib/weddingData";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-24 md:pt-40"
      data-testid="footer-section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6 }}
          className="text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            With all our love
          </span>
          <h2
            className="mt-8 font-serif-display text-[clamp(4rem,18vw,18rem)] font-light leading-[0.9] tracking-tighter text-[#EAEAEA]"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="italic">{WEDDING.groom}</span>
            <span className="mx-2 text-[#D4AF37] md:mx-6">&amp;</span>
            <span className="italic">{WEDDING.bride}</span>
          </h2>
          <div className="mt-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
            <span>{WEDDING.dateLong}</span>
            <span className="text-[#D4AF37]">•</span>
            <span>
              {WEDDING.venue} · {WEDDING.city}
            </span>
          </div>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-[11px] uppercase tracking-[0.3em] text-white/30 md:flex-row">
          <div>© 2026 · Jinkle &amp; Yoshita</div>
          <div className="flex items-center gap-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${WEDDING.mapsQuery}`}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#D4AF37]"
              data-testid="footer-map-link"
            >
              Map
            </a>
            <button
              onClick={() =>
                document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition hover:text-[#D4AF37]"
              data-testid="back-to-top"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
