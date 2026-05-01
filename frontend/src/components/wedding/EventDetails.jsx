import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EVENTS, MEDIA } from "../../lib/weddingData";

export default function EventDetails() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="events"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-40"
      data-testid="events-section"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <img
          src={MEDIA.palace_door}
          alt=""
          className="h-full w-full object-cover opacity-20"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mb-20 text-center"
        >
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            The Celebrations
          </span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            Five nights. One <br />
            <span className="gold-shimmer">royal</span> beginning.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/5 border-y border-white/5">
          {EVENTS.map((e, i) => (
            <motion.article
              key={e.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: i * 0.08 }}
              className="group grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-6 md:py-14"
              data-testid={`event-${e.key}`}
            >
              <div className="md:col-span-1 md:pt-1">
                <span className="font-serif-display text-3xl italic text-[#D4AF37]/70">
                  0{i + 1}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif-display text-3xl font-light italic text-[#EAEAEA] transition-colors duration-500 group-hover:text-[#D4AF37] md:text-4xl lg:text-5xl">
                  {e.name}
                </h3>
              </div>
              <div className="md:col-span-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Date &amp; Time
                </div>
                <div className="mt-2 text-white/80">{e.date}</div>
                <div className="text-sm text-[#D4AF37]">{e.time}</div>
              </div>
              <div className="md:col-span-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Venue
                </div>
                <div className="mt-2 text-white/80">{e.venue}</div>
                <p className="mt-3 text-sm italic text-white/50">{e.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
