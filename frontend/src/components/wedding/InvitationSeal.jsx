import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WEDDING } from "../../lib/weddingData";

const EASE = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

// ---- Palette -----------------------------------------------------------
// Ivory cardstock exterior + a deep jewel-tone liner inside the flap +
// an oxblood wax seal. The liner color is the "wow" beat: a flash of
// saturated color the instant the flap lifts, exactly like a real
// lined envelope reveals when opened.
const PAPER = "#EDE3D3"; // warm ivory cardstock
const PAPER_SHADOW = "#D9C9AE"; // shaded paper fold
const INK = "#3A2A20"; // warm charcoal-brown, for printed text
const LINER = "#9C2B2B"; // deep oxblood/marigold liner, revealed on open
const LINER_DARK = "#6E1D1D";
const SEAL = "#8B2635"; // oxblood wax
const SEAL_LIGHT = "#B6475A";
const SEAL_DARK = "#5C1620";
const GOLD = "#B8893E"; // muted antique gold, used sparingly for foil detail

const STAGE = {
  CLOSED: "closed",
  CRACKING: "cracking",
  FLAP_OPEN: "flap_open",
  CARD_OUT: "card_out",
  DONE: "done",
};

export default function InvitationSeal({ children, onOpen, guestName }) {
  const [stage, setStage] = useState(STAGE.CLOSED);
  const prefersReducedMotion = useReducedMotion();
  const hasFiredOpen = useRef(false);

  const handleOpen = () => {
    if (stage !== STAGE.CLOSED) return;

    if (!hasFiredOpen.current) {
      hasFiredOpen.current = true;
      onOpen?.();
    }

    if (prefersReducedMotion) {
      setStage(STAGE.DONE);
      return;
    }

    setStage(STAGE.CRACKING);
    window.setTimeout(() => setStage(STAGE.FLAP_OPEN), 450);
    window.setTimeout(() => setStage(STAGE.CARD_OUT), 900);
    // Card's own rise animation is 0.55s, finishing at ~1450ms. DONE now
    // fires a full 1.3s after that, so the guest has time to actually
    // read the card before the cut to the hero underneath.
    window.setTimeout(() => setStage(STAGE.DONE), 2750);
  };

  const isDone = stage === STAGE.DONE;

  return (
    <>
      {children}

      <AnimatePresence>
        {!isDone && (
          <motion.div
            key="invitation-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#1A1411] px-6"
          >
            {/* warm ambient glow behind the card, so the ivory card has
                somewhere to glow against rather than flat black */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.35, 0.6, 0.35] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)` }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="relative z-10"
              style={{ perspective: "1400px" }}
            >
              <Envelope stage={stage} onOpen={handleOpen} guestName={guestName} />

              <motion.span
                animate={{ opacity: stage === STAGE.CLOSED ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-7 block text-center font-serif-display text-sm italic tracking-wide text-white/50"
              >
                Tap the seal to open
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ENV_WIDTH = 320;
const ENV_HEIGHT = 210;
const FLAP_HEIGHT = 118;

function Envelope({ stage, onOpen, guestName }) {
  const isCracking = stage === STAGE.CRACKING;
  const flapOpen = stage === STAGE.FLAP_OPEN || stage === STAGE.CARD_OUT;
  const cardOut = stage === STAGE.CARD_OUT;

  return (
    <div className="relative" style={{ width: ENV_WIDTH, height: ENV_HEIGHT + 30 }}>
      {/* ===== Envelope body — ivory cardstock ===== */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-[3px]"
        style={{
          height: ENV_HEIGHT,
          background: `linear-gradient(180deg, ${PAPER} 0%, ${PAPER_SHADOW} 100%)`,
          boxShadow: `0 22px 44px -14px rgba(0,0,0,0.55), inset 0 0 0 1px ${GOLD}33`,
        }}
      >
        {/* shadowed pocket where the card sits before it's pulled out */}
        <div
          className="absolute inset-x-3 bottom-3 top-3 rounded-[2px]"
          style={{ background: "rgba(0,0,0,0.12)" }}
        />
      </div>

      {/* ===== Invitation card — rises out from inside the envelope =====
            z-index switches above the flap/pocket once flapOpen is true,
            so the card visually clears the envelope as it rises instead
            of staying tucked behind the open flap. */}
      <motion.div
        initial={false}
        animate={
          cardOut
            ? { y: -ENV_HEIGHT * 1.05, scale: 1.28, opacity: 1 }
            : { y: 6, scale: 0.92, opacity: flapOpen ? 1 : 0 }
        }
        transition={{ duration: 0.55, ease: EASE_BACK }}
        className="absolute inset-x-4 bottom-4 flex flex-col items-center justify-center rounded-[3px] px-6 py-10 text-center"
        style={{
          height: ENV_HEIGHT - 20,
          zIndex: flapOpen ? 50 : 10,
          background: `linear-gradient(180deg, #FBF6EC 0%, ${PAPER} 100%)`,
          boxShadow: `0 10px 30px -8px rgba(0,0,0,0.5), inset 0 0 0 1px ${GOLD}55`,
        }}
      >
        <span className="text-[8px] uppercase tracking-[0.4em]" style={{ color: `${INK}99` }}>
          {guestName ? `For ${guestName}` : "You're Cordially Invited"}
        </span>

        <span className="mt-5 font-serif-display text-2xl italic" style={{ color: INK }}>
          {WEDDING?.bride ?? "Ananya"}
          <span className="mx-2 text-base not-italic" style={{ color: SEAL }}>
            &amp;
          </span>
          {WEDDING?.groom ?? "Rohan"}
        </span>

        <span className="mt-4 text-[10px] tracking-[0.3em]" style={{ color: GOLD }}>
          {WEDDING?.dateLabel ?? ""}
        </span>
      </motion.div>

      {/* ===== Front pocket triangle — same ivory tone as the body, just
            a touch darker so its fold edge reads ===== */}
      <div
        className="absolute inset-x-0 bottom-0 z-20"
        style={{
          height: ENV_HEIGHT,
          clipPath: `polygon(0 100%, 100% 100%, 100% 38%, 50% 68%, 0 38%)`,
          background: `linear-gradient(180deg, ${PAPER_SHADOW} 0%, #C9B998 100%)`,
          boxShadow: `inset 0 0 0 1px ${GOLD}33`,
        }}
      >
        <span
          className="absolute left-5 top-[78%] text-[8px] uppercase tracking-[0.3em]"
          style={{ color: `${INK}66` }}
        >
          Udaipur · Rajasthan
        </span>
      </div>

      {/* ===== Flap — ivory on the outside face, a deep jewel-tone liner
            revealed on the inside the moment it lifts open ===== */}
      <motion.div
        initial={false}
        animate={flapOpen ? { rotateX: 168 } : { rotateX: 0 }}
        transition={{ duration: 0.8, ease: EASE_BACK }}
        className="absolute inset-x-0 top-0 z-30"
        style={{
          height: FLAP_HEIGHT,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
        }}
      >
        {/* outside face — ivory, what you see while closed */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, #F6EFE2 0%, ${PAPER} 55%, ${PAPER_SHADOW} 100%)`,
            backfaceVisibility: "hidden",
            boxShadow: `inset 0 0 0 1px ${GOLD}33`,
          }}
        />
        {/* inside face — the liner, only visible once flipped past 90deg */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(200deg, ${LINER} 0%, ${LINER_DARK} 100%)`,
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>

      {/* ===== Wax seal — oxblood, sits at the flap's tip ===== */}
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open your invitation"
        disabled={stage !== STAGE.CLOSED}
        className="absolute left-1/2 z-40 -translate-x-1/2 focus:outline-none disabled:pointer-events-none"
        style={{ top: FLAP_HEIGHT - 38 }}
      >
        <SealDisc isCracking={isCracking} fading={flapOpen} />
      </button>
    </div>
  );
}

function SealDisc({ isCracking, fading }) {
  const prefersReducedMotion = useReducedMotion();
  const brideInitial = WEDDING?.bride?.[0] ?? "A";
  const groomInitial = WEDDING?.groom?.[0] ?? "R";

  return (
    <motion.div
      initial={false}
      animate={
        fading
          ? { scale: 0.6, opacity: 0 }
          : isCracking
          ? { scale: [1, 1.08, 0.92], opacity: [1, 1, 1] }
          : { scale: 1, opacity: 1 }
      }
      transition={
        fading
          ? { duration: 0.4, ease: EASE }
          : isCracking
          ? { duration: 0.45, times: [0, 0.4, 1], ease: EASE }
          : { duration: 0.3 }
      }
      whileHover={!isCracking && !fading ? { scale: 1.05 } : undefined}
      whileTap={!isCracking && !fading ? { scale: 0.96 } : undefined}
      className="relative flex h-16 w-16 items-center justify-center rounded-full"
      style={{ boxShadow: "0 8px 16px -4px rgba(0,0,0,0.45)" }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${SEAL_LIGHT} 0%, ${SEAL} 35%, ${SEAL_DARK} 75%, #3D0E14 100%)`,
        }}
      />
      <div
        className="absolute left-[5px] top-[5px] h-5 w-5 rounded-full opacity-60 blur-[1.5px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-[5px] rounded-full" style={{ border: `1px solid ${SEAL_DARK}99` }} />

      {!prefersReducedMotion && !isCracking && !fading && (
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
          className="absolute inset-0 overflow-hidden rounded-full"
        >
          <div className="h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      )}

      <span
        className="relative font-serif-display text-sm italic"
        style={{ color: "#F3E3D6", textShadow: "0 1px 1px rgba(0,0,0,0.35)" }}
      >
        {brideInitial}
        <span className="px-0.5 text-xs not-italic" style={{ color: "#F3E3D699" }}>
          ·
        </span>
        {groomInitial}
      </span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isCracking ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="absolute left-1/2 top-1/2 h-[140%] w-[1.5px] -translate-x-1/2 -translate-y-1/2 rotate-[10deg]"
        style={{
          background: "#2A0A0F",
          clipPath:
            "polygon(48% 0, 52% 0, 58% 35%, 44% 55%, 56% 70%, 48% 100%, 44% 100%, 52% 65%, 40% 45%, 54% 30%)",
        }}
      />
    </motion.div>
  );
}