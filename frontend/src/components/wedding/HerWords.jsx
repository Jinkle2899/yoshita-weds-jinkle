import { HER_PHOTOS } from "@/lib/weddingData";
import { motion, useReducedMotion } from "framer-motion";

// Swap these with your actual photo imports/paths, e.g.:
//   import herPhoto1 from "../../assets/photos/her-1.jpg";
// Each entry can optionally include a short caption.

// Slight rotation + vertical offset per photo, hand-tuned so the
// scatter feels casual rather than mechanically random. Only used on
// desktop — mobile falls back to a clean 2-column grid (see below).
const SCATTER_TRANSFORMS = [
  { rotate: -6, y: 10, x: 0 },
  { rotate: 4, y: -14, x: 0 },
  { rotate: -3, y: 18, x: 0 },
  { rotate: 7, y: -6, x: 0 },
  { rotate: -8, y: 4, x: 0 },
  { rotate: 5, y: 14, x: 0 },
];

const EASE = [0.16, 1, 0.3, 1];

// Her actual words, lightly broken into paragraphs for readability on a
// page. Wording is preserved as written — only line/paragraph structure
// has been adjusted for the web.
const LETTER_PARAGRAPHS = [
  "Before you came into my life, I believed happiness was found in moments. But after you entered my life, I realised happiness can also be found in a person.",
  "You became the calm in my chaos.",
  "Since you came into my life, I've changed in ways I never imagined. I smile a little more because I know I have someone who believes in me.",
  "You turned my fears into hope, my doubts into confidence, and my loneliness into companionship.",
  "You didn't change who I am — you helped me become the best version of myself. You showed me that true love is not about changing someone; it's about inspiring them to grow while holding their hand through every season of life.",
  "As I stand on the threshold of a new chapter with you, my heart is filled with gratitude. Thank you for entering my life when I needed love the most. Thank you for making my world brighter simply by being in it.",
  "I love you today, I will love you tomorrow, and I will love you for every tomorrow that follows.",
];

export default function HerWords() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="her-words"
      className="relative w-full overflow-hidden bg-[#FBF8F3] py-24 md:py-36"
      data-testid="her-words-section"
    >
      {/* a much quieter ambient treatment than the rest of the site —
          this section is meant to feel like a letter, not an invitation */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF3715 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B8893E]">
            In Her Words
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.1, ease: EASE, delay: 0.1 }}
          className="rounded-[4px] bg-white/70 px-7 py-10 shadow-[0_30px_60px_-30px_rgba(60,42,32,0.25)] backdrop-blur-sm md:px-14 md:py-16"
        >
          <p className="font-serif-display text-2xl italic text-[#3A2A20] md:text-3xl">
            Hey Jinkle,
          </p>

          <div className="mt-7 space-y-5">
            {LETTER_PARAGRAPHS.map((para, i) => (
              <LetterLine key={i} index={i} prefersReducedMotion={prefersReducedMotion}>
                {para}
              </LetterLine>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: 0.3 }}
            className="mt-9 text-right font-serif-display text-lg italic text-[#3A2A20]/70"
          >
            — Yoshita
          </motion.p>
        </motion.div>

        {/* His reply — visually distinct: a different weight and a
            slightly indented, separate card, like a second hand writing
            back rather than a continuation of the same letter. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1, ease: EASE, delay: 0.2 }}
          className="ml-auto mt-10 max-w-[88%] rounded-[4px] border border-[#D4AF37]/20 bg-[#FBF8F3] px-7 py-7 md:max-w-[80%] md:px-10 md:py-9"
        >
          <p className="font-serif-display text-lg italic leading-relaxed text-[#3A2A20] md:text-xl">
            "You call me your calm — I didn't know peace could have a name
            until it was yours."
          </p>
          <p className="mt-4 text-right text-sm tracking-wide text-[#3A2A20]/60">
            — Jinkle
          </p>
        </motion.div>
        </div>

        {/* Photo scatter — a casual, polaroid-style cluster of photos of
            her. Deliberately looser and less "designed" than the letter
            above, since this is meant to feel like a handful of favorite
            snapshots, not a curated gallery. */}
        <div className="mt-20 md:mt-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: EASE }}
            className="mb-10 text-center font-serif-display text-xl italic text-[#3A2A20]/80 md:mb-16 md:text-2xl"
          >
            Some pics of her I love the most
          </motion.p>

          {/* Mobile: clean 2-column grid, no rotation — scatter layouts
              don't translate well to narrow screens. Desktop: a loose,
              hand-placed scatter using SCATTER_TRANSFORMS. */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-x-2 md:gap-y-10">
            {HER_PHOTOS.map((photo, i) => (
              <PolaroidPhoto
                key={i}
                photo={photo}
                transform={SCATTER_TRANSFORMS[i % SCATTER_TRANSFORMS.length]}
                index={i}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PolaroidPhoto({ photo, transform, index, prefersReducedMotion }) {
  const { rotate, y } = prefersReducedMotion ? { rotate: 0, y: 0 } : transform;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      whileInView={{ opacity: 1, y, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={prefersReducedMotion ? undefined : { rotate: 0, scale: 1.05, zIndex: 10 }}
      whileTap={prefersReducedMotion ? undefined : { rotate: 0, scale: 1.05, zIndex: 10 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: index * 0.07, ease: EASE }}
      className="relative w-full md:w-[180px]"
    >
      <div className="rounded-[3px] bg-white p-2.5 pb-5 shadow-[0_18px_30px_-12px_rgba(60,42,32,0.35)]">
        <div className="aspect-[4/5] w-full overflow-hidden bg-[#EDE3D3]">
          <img
            src={photo.src}
            alt={photo.caption || "A photo of her"}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        {photo.caption ? (
          <p className="mt-2 px-1 text-center font-serif-display text-xs italic text-[#3A2A20]/60">
            {photo.caption}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function LetterLine({ children, index, prefersReducedMotion }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.8,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
      className="text-[15px] leading-relaxed text-[#3A2A20]/85 md:text-base"
    >
      {children}
    </motion.p>
  );
}