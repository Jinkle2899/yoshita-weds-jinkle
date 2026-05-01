import { motion } from "framer-motion";
import { MEDIA } from "../../lib/weddingData";

const RAWS = [
  { src: MEDIA.raw1, caption: "First holiday · Ladakh, 2022", rotate: -3, offset: "md:translate-y-10" },
  { src: MEDIA.raw2, caption: "His terrace, the golden hour", rotate: 2, offset: "md:-translate-y-6" },
  { src: MEDIA.raw3, caption: "A boat at sunset · Alibaug", rotate: -2, offset: "md:translate-y-4" },
  { src: MEDIA.story_floral, caption: "Her mother's garden", rotate: 3, offset: "md:-translate-y-10" },
  { src: MEDIA.details_curated, caption: "The ring — still unworn", rotate: -1, offset: "md:translate-y-8" },
  { src: MEDIA.palace_arch, caption: "Udaipur, the day we decided", rotate: 1, offset: "md:-translate-y-2" },
];

export default function GalleryRaw() {
  return (
    <section
      id="raw"
      className="relative overflow-hidden py-24 md:py-40"
      data-testid="gallery-raw-section"
    >
      {/* Texture background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${MEDIA.cinematic_texture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
        >
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Raw &amp; Unfiltered
          </span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            The <span className="gold-shimmer">unedited</span> us.
          </h2>
          <p className="mt-6 text-sm text-white/50 md:text-base">
            Grainy, off-centre, beautifully imperfect. The photographs we never
            meant to post — and love the most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RAWS.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: r.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className={`group relative bg-[#141010] p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ${r.offset}`}
              data-testid={`raw-photo-${i}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={r.src}
                  alt={r.caption}
                  className="h-full w-full object-cover grayscale-[20%] contrast-[1.05]"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.4)_100%)]" />
              </div>
              <figcaption className="mt-4 px-2 pb-2 font-serif-display text-lg italic text-white/70 transition-colors duration-500 group-hover:text-[#D4AF37]">
                {r.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
