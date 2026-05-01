import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MEDIA } from "../../lib/weddingData";

export default function OurStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-40"
      data-testid="our-story-section"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        {/* Text column */}
        <motion.div
          style={{ y: textY }}
          className="md:col-span-6 md:col-start-1 md:pt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
                Our Story
              </span>
            </div>
            <h2 className="font-serif-display text-4xl font-light italic leading-[1.05] text-[#EAEAEA] md:text-5xl lg:text-6xl">
              A chapter that began <br />
              <span className="gold-shimmer">quietly</span>, and never <br />
              stopped being written.
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-white/60 md:text-[17px]">
              <p>
                It started as a glance across a crowded courtyard in Jaipur — the
                kind you pretend you didn&apos;t steal. It grew through letters
                written at 2 AM, shared playlists that somehow always knew,
                and a hundred small silences that said more than words.
              </p>
              <p>
                Somewhere between the monsoons and the mountains, between
                laughter and the kind of fights you forgive before they end, we
                became a <em className="text-[#D4AF37] not-italic">we</em>.
              </p>
              <p className="font-serif-display text-xl italic text-white/80">
                &ldquo;And now, we bring our favourite people to the city that
                feels most like us — Udaipur — to witness the beginning of
                forever.&rdquo;
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image column with overlap */}
        <motion.div
          style={{ y: imgY }}
          className="relative md:col-span-6 md:col-start-7"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={MEDIA.story_floral}
              alt="Dark moody floral"
              className="h-full w-full object-cover grayscale-[30%]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
          </div>

          {/* Overlapping accent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute -bottom-12 -left-6 hidden aspect-square w-48 overflow-hidden border border-[#D4AF37]/30 md:block lg:w-60"
          >
            <img
              src={MEDIA.details_curated}
              alt="Vintage bridal jewelry"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
