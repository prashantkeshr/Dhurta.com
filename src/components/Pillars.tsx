import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import "./Pillars.css";

const PILLARS = [
  {
    title: "Trust",
    accent: "var(--gold)",
    body: "Zero telemetry is a design constraint, not a settings toggle. Every claim the software makes about itself can be audited live, on your machine.",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M24 4 40 11v11c0 10.5-6.8 17.9-16 22C14.8 39.9 8 32.5 8 22V11l16-7Z" />
        <motion.path
          d="m16 24 6 6 10-11"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        />
      </svg>
    ),
  },
  {
    title: "Technology",
    accent: "var(--teal)",
    body: "Real Tor circuits, real end-to-end cryptography, real peer-to-peer transport. No mock switches, no privacy theatre — engineering you can read.",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="24" r="18" />
        <motion.circle
          cx="24"
          cy="24"
          r="10"
          initial={{ pathLength: 0, rotate: -90 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Culture",
    accent: "var(--saffron)",
    body: "Named in Sanskrit, built for the world. Digital sovereignty rooted in a civilisation that has always prized cleverness in service of dharma.",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <motion.path
          d="M24 6v36M24 6c-5 4-8 6-14 6 0 8 5 10 14 10M24 6c5 4 8 6 14 6 0 8-5 10-14 10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4 }}
        />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="pillars bg-noise">
      <div className="container">
        <motion.p
          className="section-label pillars__label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          The Dhurta doctrine
        </motion.p>
        <div className="pillars__grid">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              className="pillars__card glass-card"
              style={{ "--accent": p.accent } as CSSProperties}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="pillars__glyph">{p.glyph}</div>
              <h3 className="pillars__title">{p.title}</h3>
              <p className="pillars__body">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
