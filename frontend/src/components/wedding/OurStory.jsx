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

  // Parent container for stagger effect
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  // Individual paragraph animation
  const item = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-40"
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
              A chapter written in <br />
              <span className="gold-shimmer">tradition</span>, and <br />
              discovered in love.
            </h2>

            {/* Animated paragraphs */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 space-y-6 text-base leading-relaxed text-white/60 md:text-[17px]"
            >
              
              <motion.p variants={item}>
                In November 2025, in the quiet warmth of Kherwara, Rajasthan,
                our paths were gently brought together — not by chance, but by
                something older, something deeper… a promise woven through
                families, faith, and time.
              </motion.p>

              <motion.p variants={item}>
                What began as a meeting of two strangers soon turned into
                lingering conversations, shy smiles, and moments that stayed
                long after they passed. In the pauses between words, in the
                comfort of being understood, something beautiful began to take
                shape.
              </motion.p>

              <motion.p variants={item}>
                Like the desert meeting the monsoon, unexpected yet meant to be,
                our worlds slowly intertwined — steady, certain, and full of
                grace.
              </motion.p>

              <motion.p variants={item}>
                Somewhere between tradition and choice, between what was planned
                and what was felt, we became a{" "}
                <em className="text-[#D4AF37] not-italic">we</em>.
              </motion.p>

              <motion.p
                variants={item}
                className="font-serif-display text-xl italic text-white/80"
              >
                &ldquo;And now, with hearts full and hands entwined, we invite our
                beloved people to Udaipur — to witness the beginning of our
                forever.&rdquo;
              </motion.p>

              <motion.p
                variants={item}
                className="font-serif-display text-lg italic text-[#D4AF37]/80"
              >
                A love that was arranged… and then, truly found.
              </motion.p>

            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image column */}
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