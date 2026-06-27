import { motion } from "framer-motion";
import { EVENTS } from "../../lib/weddingData";

// NOTE ON TIMES: entries marked with a (~) in their `time` field are
// reasonable placeholders, not confirmed times — swap them out once
// exact times are finalized. Times without (~) are already confirmed.
const SCHEDULE = [
  {
    day: "Day One",
    date: "15 Nov 2026",
    label: "Sunday · Ring Ceremony",
    city: "Kherwara",
    items: [
      { time: "11:00 AM ~", title: "Ring Ceremony", venue: "Kherwara, Rajasthan" },
    ],
  },
  {
    day: "Day Two",
    date: "23 Nov 2026",
    label: "Monday · Mehendi",
    city: "Kherwara",
    items: [
      { time: "5:00 PM ~", title: "Mehendi", venue: "Kherwara (Hometown)" },
    ],
  },
  {
    day: "Day Three",
    date: "25 Nov 2026",
    label: "Wednesday",
    city: "Udaipur",
    items: [
      { time: "11:00 AM", title: "Haldi Ceremony", venue: "Aashish Vatika" },
      { time: "2:00 PM ~", title: "Dev Darshan", venue: "Aashish Vatika" },
      { time: "7:30 PM", title: "Sangeet & Cocktails", venue: "Aashish Vatika" },
    ],
  },
  {
    day: "Day Four",
    date: "26 Nov 2026",
    label: "Thursday · The Wedding",
    city: "Udaipur",
    items: [
      { time: "10:00 AM ~", title: "Baraat at the Gate", venue: "Aashish Vatika" },
      { time: "11:30 AM ~", title: "Vows & Pheras", venue: "Aashish Vatika" },
      { time: "8:00 PM", title: "Reception — Black Tie", venue: "Aashish Vatika" },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-24 md:py-40" data-testid="schedule-section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="mb-16 text-center md:mb-24"
        >
          <span className="ornament-line text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">The Schedule</span>
          <h2 className="mt-6 font-serif-display text-4xl font-light italic leading-tight text-[#EAEAEA] md:text-5xl lg:text-6xl">
            An order of <span className="gold-shimmer">moments</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm italic text-white/45 md:text-base">
            Two towns, five days — from a quiet ring ceremony in Kherwara to a week of celebration on the lakes of Udaipur.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {SCHEDULE.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-12"
              data-testid={`schedule-${d.day.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="md:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/80">{d.day}</span>
                    <span className="rounded-full border border-[#D4AF37]/25 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]/70">
                      {d.city}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif-display text-3xl italic text-[#EAEAEA] md:text-4xl">{d.date}</h3>
                  <p className="mt-1 text-sm text-white/50">{d.label}</p>
                </div>
              </div>
              <ol className="md:col-span-8">
                {d.items.map((it, idx) => (
                  <li key={idx} className="group grid grid-cols-1 gap-2 border-b border-white/5 py-6 md:grid-cols-12 md:gap-6 md:py-8">
                    <div className="md:col-span-3">
                      <span className="font-serif-display text-2xl italic text-[#D4AF37]">{it.time}</span>
                    </div>
                    <div className="md:col-span-6">
                      <div className="text-lg text-white/90 transition-colors duration-500 group-hover:text-[#D4AF37] md:text-xl">
                        {it.title}
                      </div>
                    </div>
                    <div className="text-sm text-white/50 md:col-span-3">{it.venue}</div>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-24 border border-[#D4AF37]/20 bg-[#141010] p-8 text-center md:p-16"
        >
          <p className="font-serif-display text-2xl italic leading-relaxed text-white/70 md:text-3xl">
            &ldquo;All of this, together. And you —
            <span className="text-[#D4AF37]"> right there</span> with us.&rdquo;
          </p>
          <div className="mt-6 text-xs uppercase tracking-[0.3em] text-white/40">
            {EVENTS.length} ceremonies · 2 towns · 1 lifetime
          </div>
        </motion.div>
      </div>
    </section>
  );
}