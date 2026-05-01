import { motion } from "framer-motion";
import { MEDIA } from "../../lib/weddingData";

const GRID = [
  { src: MEDIA.palace_arch, span: "md:col-span-5 md:row-span-2", ratio: "aspect-[4/5]" },
  { src: MEDIA.details_curated, span: "md:col-span-4", ratio: "aspect-square" },
  { src: MEDIA.story_floral, span: "md:col-span-3", ratio: "aspect-[3/4]" },
  { src: MEDIA.palace_door, span: "md:col-span-4", ratio: "aspect-[4/5]" },
  { src: MEDIA.hero_palace, span: "md:col-span-3", ratio: "aspect-square" },
];

export default function GalleryCurated() {
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-40"
      data-testid="gallery-curated-section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mb-16 flex flex-col items-start justify-between gap-4 md:mb-24 md:flex-row md:items-end"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Curated
            </span>
            <h2 className="mt-3 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
              A gallery, <br />
              <span className="gold-shimmer">softly</span> kept.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/50 md:text-base">
            A handful of frames we&apos;ve held close. Each one, a small witness
            to what we&apos;re building.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 auto-rows-[180px] gap-3 md:grid-cols-12 md:auto-rows-[220px] md:gap-4 lg:auto-rows-[260px]">
          {GRID.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1, delay: i * 0.08 }}
              className={`relative overflow-hidden ${g.span} row-span-2`}
              data-testid={`gallery-curated-${i}`}
            >
              <img
                src={g.src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-500 hover:border-[#D4AF37]/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
