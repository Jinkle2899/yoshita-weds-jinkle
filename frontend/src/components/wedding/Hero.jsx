import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { WEDDING, MEDIA } from "../../lib/weddingData";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background image — scroll parallax + a near-imperceptible ambient drift on load */}
      <motion.div
        style={{ y, scale }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 3.2, ease: EASE }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={MEDIA.hero_palace}
          alt="Udaipur palace at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0A0A0A_100%)]" />

      {/* A gold seal-line draws itself first — like wax breaking on an invitation */}
      {/* <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        style={{ transformOrigin: "center" }}
        className="absolute left-1/2 top-[14%] z-10 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent md:w-32"
      /> */}

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 pb-8 pt-24 text-center md:pb-12 md:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
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
          <div className="overflow-hidden">
            <motion.h1
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
              className="font-serif-display text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-tighter text-[#EAEAEA]"
              data-testid="hero-couple-names"
            >
              <span className="block italic">{WEDDING.bride}</span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: [1, 1.06, 1] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.8, delay: 1.1 }
                    : {
                        opacity: { duration: 0.8, delay: 1.1 },
                        scale: {
                          duration: 4.5,
                          delay: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
                className="my-2 block origin-center font-serif-display text-[0.6em] italic text-[#D4AF37]"
              >
                weds
              </motion.span>

              <span className="block italic">{WEDDING.groom}</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.3, ease: EASE }}
            className="mt-6 max-w-xl text-xs font-light italic text-white/60 md:text-sm"
          >
            {WEDDING.tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE }}
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
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          {/* <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
            Scroll
          </span> */}
          <div className="relative h-8 w-px overflow-hidden bg-white/10">
            <motion.div
              animate={
                prefersReducedMotion
                  ? { opacity: 0.6 }
                  : { y: ["-100%", "100%"] }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}