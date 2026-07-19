import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./SetuSection.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const QUERY = "sovereign privacy tools";

/** Search bar that types its own query, then reveals first-party results. */
function SearchDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(QUERY.slice(0, i));
      if (i >= QUERY.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 55);
    return () => clearInterval(id);
  }, [inView]);

  const results = [
    { title: "Dhurta Browser — Ghost Mode explained", host: "dhurta.com", tag: "official" },
    { title: "Why fail-closed kill switches matter", host: "curated · privacy", tag: "curated" },
    { title: "Self-hosting an onion service, step by step", host: "curated · guides", tag: "curated" },
  ];

  return (
    <div className="setu__demo glass-card" ref={ref}>
      <div className="setu__searchbar">
        <span className="setu__search-glyph">⌕</span>
        <span className="setu__search-text">
          {typed}
          <motion.span
            className="setu__caret"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </span>
        <span className="setu__search-scope">setu · first-party</span>
      </div>
      <div className="setu__results">
        {results.map((r, i) => (
          <motion.div
            key={r.title}
            className="setu__result"
            initial={{ opacity: 0, y: 16 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
          >
            <div>
              <p className="setu__result-title">{r.title}</p>
              <p className="setu__result-host">{r.host}</p>
            </div>
            <span className={`setu__result-tag setu__result-tag--${r.tag}`}>{r.tag}</span>
          </motion.div>
        ))}
      </div>
      <p className="setu__demo-note">
        No ad auctions. No SEO sludge. A hand-curated index, searched on
        first-party infrastructure.
      </p>
    </div>
  );
}

/** Bridge arc: shore "you" → shore "the web worth reading". */
function BridgeArc() {
  return (
    <motion.svg
      viewBox="0 0 640 180"
      className="setu__bridge"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="setu-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a9eff" />
          <stop offset="0.5" stopColor="#c9a84c" />
          <stop offset="1" stopColor="#00d4aa" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 40 150 Q 320 -40 600 150"
        fill="none"
        stroke="url(#setu-arc)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {/* suspension cables */}
      {Array.from({ length: 11 }, (_, i) => {
        const t = (i + 1) / 12;
        const x = 40 + t * 560;
        const y = 150 - 4 * 95 * t * (1 - t); // quadratic bezier height
        return (
          <motion.line
            key={i}
            x1={x}
            y1={y}
            x2={x}
            y2={150}
            stroke="rgba(201,168,76,0.35)"
            strokeWidth="1"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            style={{ originY: "150px" }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.06 }}
          />
        );
      })}
      <line x1="20" y1="150" x2="620" y2="150" stroke="rgba(184,197,214,0.25)" strokeWidth="1.4" />
      {/* traveller dot */}
      <motion.circle
        r="5"
        fill="#e8d5a3"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ offsetPath: `path("M 40 150 Q 320 -40 600 150")` }}
      />
      <text x="40" y="172" textAnchor="middle" className="setu__bridge-label">YOU</text>
      <text x="600" y="172" textAnchor="middle" className="setu__bridge-label">THE WEB WORTH KEEPING</text>
    </motion.svg>
  );
}

export default function SetuSection() {
  return (
    <section className="setu bg-noise" id="setu">
      <div className="container setu__inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="section-label setu__label">03 · Discovery</p>
          <h2 className="section-title">
            Dhurta <span className="setu__accent">Setu</span>
          </h2>
          <p className="setu__lede">
            <em>Setu</em> — Sanskrit for “bridge”. A curated index of the web
            and a first-party search that answers to its readers, not to
            advertisers. The information bridge for the rest of the Dhurta
            family.
          </p>
        </motion.div>

        <BridgeArc />
        <SearchDemo />
      </div>
    </section>
  );
}
