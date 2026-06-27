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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

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
      className="relative overflow-hidden py-20 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
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

            {/* Hardcoded <br> tags removed on mobile — line breaks chosen
                for a wide desktop column read awkwardly once wrapped into
                a narrow phone width. Below `md`, the heading wraps
                naturally; from `md` up, the original three-line break
                is restored via responsive <br> elements that only render
                at that breakpoint. */}
            <h2 className="font-serif-display text-[2.1rem] font-light italic leading-[1.15] text-[#EAEAEA] sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
              A chapter written in{" "}
              <br className="hidden md:inline" />
              <span className="gold-shimmer">tradition</span>, and{" "}
              <br className="hidden md:inline" />
              discovered in love.
            </h2>

            {/* Animated paragraphs */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 space-y-6 text-[15px] leading-relaxed text-white/60 md:mt-10 md:text-[17px]"
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
                className="font-serif-display text-lg italic text-white/80 md:text-xl"
              >
                &ldquo;And now, with hearts full and hands entwined, we invite our
                beloved people to Udaipur — to witness the beginning of our
                forever.&rdquo;
              </motion.p>

              <motion.p
                variants={item}
                className="font-serif-display text-base italic text-[#D4AF37]/80 md:text-lg"
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
              src={MEDIA.ourStoryImg}
              alt="Dark moody floral"
              className="h-full w-full object-cover grayscale-[30%]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
          </div>

          {/* On mobile, the floating jewelry detail moves from an
              absolutely-positioned overlap (which only worked at desktop
              proportions) into a normal inline element directly below the
              main image — same content, no overflow risk, instead of
              disappearing entirely below `md`. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mx-auto mt-5 aspect-square w-36 overflow-hidden border border-[#D4AF37]/30 sm:w-44 md:absolute md:-bottom-12 md:-left-6 md:mt-0 md:w-48 lg:w-60"
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