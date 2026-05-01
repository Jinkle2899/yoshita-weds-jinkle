import { motion } from "framer-motion";
import { MapPin, Plane, Hotel, ExternalLink } from "lucide-react";
import { WEDDING } from "../../lib/weddingData";

const MAP_SRC = `https://www.google.com/maps?q=${WEDDING.mapsQuery}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${WEDDING.mapsQuery}`;

const TIPS = [
  {
    icon: Plane,
    title: "Fly In",
    body: "Maharana Pratap Airport (UDR) · 25 min drive to venue. Daily direct flights from Delhi, Mumbai, Bengaluru.",
  },
  {
    icon: Hotel,
    title: "Stay",
    body: "Aashish Vatika hosts on-site accommodations for close family. Curated partner hotels within 10 minutes, with full details shared in your personalised travel pack.",
  },
  {
    icon: MapPin,
    title: "Arrive",
    body: "Aashish Vatika, off Delhi Highway, Udaipur. The gates open at 3 PM. Valet awaits.",
  },
];

export default function LocationMap() {
  return (
    <section
      id="venue"
      className="relative py-24 md:py-40"
      data-testid="location-section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
              The Venue
            </span>
            <h2 className="mt-3 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
              Aashish Vatika, <br />
              <span className="gold-shimmer">Udaipur</span>.
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/55 md:text-base">
              A garden palace on the outskirts of the City of Lakes — where
              marble halls open onto marigold-lit courtyards.
            </p>
          </div>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-[#D4AF37]/40 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] transition-all duration-500 hover:bg-[#D4AF37] hover:text-black"
            data-testid="directions-btn"
          >
            Get Directions
            <ExternalLink size={14} strokeWidth={1.3} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#141010] lg:col-span-8"
            data-testid="venue-map"
          >
            <iframe
              title="Aashish Vatika Udaipur Map"
              src={MAP_SRC}
              className="h-full w-full"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) contrast(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/20" />
          </motion.div>

          {/* Tips */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {TIPS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="group flex-1 bg-[#141010] p-6"
                  data-testid={`venue-tip-${i}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37]">
                      <Icon size={18} strokeWidth={1.3} />
                    </div>
                    <div>
                      <div className="font-serif-display text-xl italic text-[#EAEAEA]">
                        {t.title}
                      </div>
                      <p className="mt-2 text-sm text-white/55">{t.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
