import { motion } from "framer-motion";
import { Heart, Gift, Sparkles } from "lucide-react";

const TILES = [
  {
    icon: Heart,
    title: "Your Presence",
    body:
      "Truly, your blessing is the only gift we ask for. That you travel, laugh, dance, and stay — that is everything.",
  },
  {
    icon: Gift,
    title: "A Shagun Envelope",
    body:
      "Should you wish to bring something, a hand-written note or a shagun in an envelope is the most cherished of all.",
  },
  {
    icon: Sparkles,
    title: "Our Honeymoon Fund",
    body:
      "For those who prefer, contributions towards our first journey as a married couple can be made discreetly at the reception desk.",
  },
];

export default function Registry() {
  return (
    <section
      id="gifts"
      className="relative py-24 md:py-40"
      data-testid="registry-section"
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Gifts &amp; Registry
          </span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            Your presence <br />
            is our <span className="gold-shimmer">present</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base text-white/55 md:text-lg">
            We&apos;ve been so fortunate to build a home filled with the things we
            love. What we really need, now, is everyone we love — in one place,
            under one very royal sky.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 text-left md:mt-24 md:grid-cols-3">
          {TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="group relative bg-[#141010] p-8 transition-colors duration-500 hover:bg-[#1a1414]"
                data-testid={`registry-tile-${i}`}
              >
                <div className="pointer-events-none absolute inset-0 border border-white/5 transition-colors duration-500 group-hover:border-[#D4AF37]/30" />
                <div className="flex h-12 w-12 items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37]">
                  <Icon size={20} strokeWidth={1.2} />
                </div>
                <h3 className="mt-6 font-serif-display text-2xl italic text-[#EAEAEA]">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {t.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
