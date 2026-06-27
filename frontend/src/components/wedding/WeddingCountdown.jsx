import { Play, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WEDDING, MEDIA } from "../../lib/weddingData";
import { useWeddingAudio } from "./WeddingAudioContext";
// import weddingVideo from "../../assets/video/our-story.mp4";

const EASE = [0.16, 1, 0.3, 1];

export default function WeddingCountdown() {
  const weddingDate = new Date(WEDDING.date).getTime();
  const prefersReducedMotion = useReducedMotion();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { isPlaying, progress, toggle } = useWeddingAudio();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const timer = [
    { value: String(time.days).padStart(3, "0"), label: "Days" },
    { value: String(time.hours).padStart(2, "0"), label: "Hours" },
    { value: String(time.minutes).padStart(2, "0"), label: "Minutes" },
    { value: String(time.seconds).padStart(2, "0"), label: "Seconds" },
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
      data-testid="countdown-section"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #D4AF3722 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 12% 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 1.1,
            ease: EASE,
          }}
          className="
            relative overflow-hidden rounded-[28px]
            border border-[#D4AF37]/15
            bg-gradient-to-b from-white/[0.03] to-white/[0.01]
            shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]
            backdrop-blur-sm
            grid md:grid-cols-[1.1fr_0.9fr]
            md:min-h-[420px]
          "
        >
          <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-[#D4AF37]/10 md:inset-4" />

          {/* corner flourishes, echoing the invitation seal's card details
              so this section feels part of the same invitation suite */}
          <CornerFlourish corner="top-left" />
          <CornerFlourish corner="bottom-right" />

          {/* Left — countdown */}
          <div className="relative flex flex-col items-start justify-center px-10 py-16 md:px-16">
            <span className="mb-1 font-serif-display text-sm italic text-white/45">
              until we begin
            </span>
            <h1 className="mb-12 font-serif-display text-3xl italic text-[#EAEAEA] md:text-4xl">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </h1>

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-8">
              {timer.map((item) => (
                <div key={item.label} className="relative">
                  <DigitRoll
                    value={item.value}
                    isSeconds={item.label === "Seconds"}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[3px] text-white/40">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center gap-4">
              <div className="h-px w-16 bg-[#D4AF37]/40" />
              <span className="text-base text-[#D4AF37]">✦</span>
              <p className="text-[11px] uppercase tracking-[3px] text-white/40">
                {WEDDING.dateLabel}
              </p>
            </div>
          </div>

          {/* Right — photo + audio control */}
          <div className="relative h-[320px] overflow-hidden md:h-auto">
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 1.12 }}
              whileInView={{ scale: 1.04 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 3, ease: EASE }}
              className="absolute inset-0"
            >
              <video
                src="https://res.cloudinary.com/df7dpbwpq/video/upload/v1782585905/IMG_6523_vdg4j1.mp4"
                poster={MEDIA.hero_palace}
                autoPlay={!prefersReducedMotion}
                loop={!prefersReducedMotion}
                muted
                playsInline
                preload="auto"
                aria-label={`${WEDDING.bride} and ${WEDDING.groom}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/10 to-transparent" />

            {/* fine grain, matching the texture treatment used on the
                invitation seal overlay, so the photo side doesn't feel
                like a flat stock image dropped next to a styled panel */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
              <button
                onClick={toggle}
                aria-label={isPlaying ? "Pause our song" : "Play our song"}
                className="
                  group relative flex h-20 w-20 items-center justify-center
                  rounded-full transition hover:scale-105
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                "
              >
                <svg
                  viewBox="0 0 84 84"
                  className="absolute inset-0 -rotate-90"
                >
                  <circle
                    cx="42"
                    cy="42"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="42"
                    cy="42"
                    r={radius}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-300 ease-linear"
                  />
                </svg>

                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white">
                  {isPlaying ? (
                    <Pause size={22} fill="white" />
                  ) : (
                    <Play size={22} fill="white" className="ml-0.5" />
                  )}
                </span>
              </button>

              <p className="text-[10px] tracking-[3px] uppercase text-white/80">
                {isPlaying ? "Now Playing — Our Song" : "Play Our Song"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Renders a time value as a column of digits, each of which rolls
 * vertically (like an odometer / flip clock) whenever its own value
 * changes — rather than the whole string snapping to new text every
 * tick. Falls back to a plain, non-animated render if the visitor
 * prefers reduced motion.
 */
function DigitRoll({ value, isSeconds, prefersReducedMotion }) {
  const digits = value.split("");

  if (prefersReducedMotion) {
    return (
      <h2
        className="font-serif-display italic leading-none text-[#EAEAEA] text-[2.6rem] sm:text-[3.2rem] md:text-[3.6rem]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </h2>
    );
  }

  return (
    <h2
      className={`flex font-serif-display italic leading-none text-[#EAEAEA] text-[2.6rem] sm:text-[3.2rem] md:text-[3.6rem] ${
        isSeconds ? "animate-[pulse_1s_ease-in-out_infinite]" : ""
      }`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {digits.map((digit, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden text-center"
          style={{ width: "1ch", height: "1.05em" }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: "70%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-70%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </h2>
  );
}

function CornerFlourish({ corner }) {
  const pos = {
    "top-left": "left-6 top-6",
    "bottom-right": "right-6 bottom-6 -scale-x-100 -scale-y-100",
  }[corner];

  return (
    <svg
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute z-10 h-5 w-5 text-[#D4AF37]/30 ${pos}`}
      fill="none"
    >
      <path
        d="M2 2 C2 9, 2 16, 9 16 M2 2 C9 2, 16 2, 16 9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
