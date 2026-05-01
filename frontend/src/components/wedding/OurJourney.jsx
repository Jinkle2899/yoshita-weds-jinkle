import { motion } from "framer-motion";
import { JOURNEY } from "../../lib/weddingData";

export default function OurJourney() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden py-24 md:py-40"
      data-testid="our-journey-section"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mx-auto mb-20 max-w-2xl text-center md:mb-28"
        >
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Our Journey
          </span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            Seven winters, a thousand <br />
            <span className="gold-shimmer">small moments</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-white/50 md:text-base">
            A timeline of our becoming — the moments we&apos;d relive, if life
            ever gave reruns.
          </p>
        </motion.div>

        <ol className="relative space-y-20 md:space-y-32">
          {JOURNEY.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={m.year}
                className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
                data-testid={`journey-item-${m.year}`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative ${
                    left
                      ? "md:col-span-5 md:col-start-1"
                      : "md:col-span-5 md:col-start-8 md:row-start-1"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 font-serif-display text-6xl italic text-[#D4AF37]/80 md:text-7xl">
                      {m.year}
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className={`flex flex-col justify-center ${
                    left
                      ? "md:col-span-6 md:col-start-7"
                      : "md:col-span-6 md:col-start-1 md:row-start-1"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/80">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-serif-display text-3xl font-light italic leading-tight text-[#EAEAEA] md:text-4xl lg:text-5xl">
                    {m.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
                    {m.note}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
