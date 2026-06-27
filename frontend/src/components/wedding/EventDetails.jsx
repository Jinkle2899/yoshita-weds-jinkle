import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS, MEDIA } from "../../lib/weddingData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function groupByCity(events) {
  const order = [];
  const groups = {};
  for (const e of events) {
    if (!groups[e.city]) {
      groups[e.city] = [];
      order.push(e.city);
    }
    groups[e.city].push(e);
  }
  return order.map((city) => ({ city, events: groups[city] }));
}

export default function EventDetails() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cityGroups = groupByCity(EVENTS);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      gsap.from(".events-heading", {
        opacity: 0,
        y: 30,
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".events-heading", start: "top 85%" },
      });

      gsap.utils.toArray(".city-header").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: prefersReducedMotion ? 0.01 : 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".city-group").forEach((group) => {
        const tiles = group.querySelectorAll(".event-tile");

        gsap.from(tiles, {
          opacity: 0,
          y: 46,
          rotateX: prefersReducedMotion ? 0 : -12,
          scale: 0.94,
          duration: prefersReducedMotion ? 0.01 : 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 82%" },
        });

        if (!prefersReducedMotion) {
          tiles.forEach((tile) => {
            const line = tile.querySelector(".tile-accent-line");
            if (line) {
              gsap.fromTo(
                line,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: tile, start: "top 80%" } }
              );
            }

            // One-time diagonal shine sweep on entry
            const shine = tile.querySelector(".tile-shine");
            if (shine) {
              gsap.fromTo(
                shine,
                { xPercent: -150 },
                { xPercent: 150, duration: 1.1, ease: "power2.inOut", delay: 0.25, scrollTrigger: { trigger: tile, start: "top 80%" } }
              );
            }

            // Continuous idle shimmer on the gold time badge
            const badgeShine = tile.querySelector(".badge-shine");
            if (badgeShine) {
              gsap.fromTo(
                badgeShine,
                { xPercent: -120 },
                {
                  xPercent: 120,
                  duration: 2.2,
                  ease: "power1.inOut",
                  repeat: -1,
                  repeatDelay: 2.4 + Math.random() * 2,
                  delay: Math.random() * 2,
                }
              );
            }
          });
        }

        // Scroll-scrubbed shimmer on the city divider line
        const header = group.querySelector(".city-header .divider-line");
        if (header && !prefersReducedMotion) {
          gsap.fromTo(
            header,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "200% 50%",
              ease: "none",
              scrollTrigger: { trigger: group, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section id="events" ref={sectionRef} className="relative overflow-hidden py-24 md:py-40" data-testid="events-section" style={{ perspective: "1200px" }}>
      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-0">
        <img src={MEDIA.palace_door} alt="" className="h-full w-full scale-110 object-cover opacity-20" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="events-heading mb-16 text-center md:mb-24">
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">The Celebrations</span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            A week of celebration, on the lakes <br />
            of <span className="gold-shimmer">Udaipur</span>.
            {/* Two towns, seven days, <br />
            one <span className="gold-shimmer">forever</span>. */}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm italic text-white/45 md:text-base">
            It begins quietly, at home in Kherwara — then rises into a week of celebration on the lakes of Udaipur.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {cityGroups.map((group) => (
            <div key={group.city} className="city-group">
              <div className="city-header mb-7 flex items-center gap-4 md:mb-10">
                <span className="font-serif-display text-2xl italic text-[#D4AF37] md:text-3xl">{group.city}</span>
                <span
                  className="divider-line h-px flex-1"
                  style={{
                    backgroundImage: "linear-gradient(90deg, transparent, #D4AF37, transparent, #D4AF37, transparent)",
                    backgroundSize: "200% 100%",
                  }}
                />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  {group.events.length === 1 ? "1 event" : `${group.events.length} events`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.events.map((e, i) => (
                  <EventTile key={e.key} event={e} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventTile({ event, index }) {
  return (
    <div
      className="event-tile group relative overflow-hidden rounded-[14px] border border-[#D4AF37]/15 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm"
      style={{ transformStyle: "preserve-3d", boxShadow: "0 18px 40px -18px rgba(0,0,0,0.55)" }}
      data-testid={`event-${event.key}`}
    >
      <div
        className="tile-shine pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(75deg, transparent 40%, rgba(212,175,55,0.18) 50%, transparent 60%)",
          transform: "translateX(-150%)",
        }}
      />

      <div className="tile-accent-line absolute left-6 top-0 h-[2px] w-10 origin-left bg-[#D4AF37]" style={{ transform: "scaleX(0)" }} />

      <div className="relative flex items-start justify-between">
        <span className="font-serif-display text-xl italic text-[#D4AF37]/60">0{index + 1}</span>

        <span className="relative overflow-hidden rounded-full border border-[#D4AF37]/25 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-[#D4AF37]/80">
          <span
            className="badge-shine pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
              transform: "translateX(-120%)",
            }}
          />
          <span className="relative">{event.time}</span>
        </span>
      </div>

      <h3 className="relative mt-5 font-serif-display text-2xl font-light italic text-[#EAEAEA] transition-colors duration-500 group-active:text-[#D4AF37] md:text-[1.7rem]">
        {event.name}
      </h3>

      <div className="relative mt-4 text-[10px] uppercase tracking-[0.3em] text-white/35">Date</div>
      <div className="relative mt-1 text-sm text-white/80">{event.date}</div>

      <div className="relative mt-4 text-[10px] uppercase tracking-[0.3em] text-white/35">Venue</div>
      <div className="relative mt-1 text-sm text-white/80">{event.venue}</div>

      <p className="relative mt-4 text-[13px] italic leading-relaxed text-white/50">{event.note}</p>
    </div>
  );
}