import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING, MEDIA } from "../../lib/weddingData";

function useCountdown(target) {
  const [time, setTime] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}
function diff(target) {
  const t = new Date(target).getTime() - Date.now();
  const clamp = Math.max(0, t);
  const days = Math.floor(clamp / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamp / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamp / (1000 * 60)) % 60);
  const seconds = Math.floor((clamp / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const { days, hours, minutes, seconds } = useCountdown(WEDDING.date);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={MEDIA.hero_palace}
          alt="Udaipur palace at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0A0A0A_100%)]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 pb-8 pt-24 text-center md:pb-12 md:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/90 md:text-xl">
            Save the Date
          </span>
          <span className="ornament-line text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
            Udaipur · Rajasthan
          </span>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-tighter text-[#EAEAEA]"
            data-testid="hero-couple-names"
          >
            <span className="block italic">{WEDDING.bride}</span>
            <span className="my-2 block text-[#D4AF37] font-serif-display text-[0.6em] italic">
              weds
            </span>
            <span className="block italic">{WEDDING.groom}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.2 }}
            className="mt-6 max-w-xl text-xs font-light italic text-white/60 md:text-sm"
          >
            {WEDDING.tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              The Union of
            </div>
            <div className="mt-2 font-serif-display text-xl italic text-[#D4AF37] md:text-2xl">
              {WEDDING.dateLabel}
            </div>
            <div className="mt-1 text-xs font-light tracking-widest text-white/50 md:text-sm">
              {WEDDING.venue.toUpperCase()} · {WEDDING.city.toUpperCase()}
            </div>
          </div>

          <div
            className="flex items-center gap-3 md:gap-6"
            data-testid="hero-countdown"
          >
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((t) => (
              <div
                key={t.label}
                className="flex w-16 flex-col items-center md:w-20"
                data-testid={`countdown-${t.label.toLowerCase()}`}
              >
                <div className="font-serif-display text-3xl font-light text-white md:text-4xl">
                  {String(t.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/40">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-px bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
