import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./BrowserSection.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    title: "Ghost Mode",
    accent: "var(--magenta)",
    tag: "REAL TOR",
    body: "One click bootstraps a bundled Tor binary and routes the session through real onion circuits. In-memory session, spoofed fingerprint, nothing survives the window.",
  },
  {
    title: "Chakra Shield",
    accent: "var(--teal)",
    tag: "ONE-SWITCH BUNDLE",
    body: "VPN, anti-fingerprint, WebRTC block, cookie guard and ad blocking bundled behind a single switch. Everyday protection that doesn't break the everyday web.",
  },
  {
    title: "Omni Dashboard",
    accent: "var(--gold)",
    tag: "SELF-AUDIT",
    body: "A live control deck that audits the browser itself: real IP vs. masked IP side by side, fingerprint scanner, and a live feed of every request leaving the machine.",
  },
  {
    title: "Fail-Closed Kill Switch",
    accent: "var(--saffron)",
    tag: "ZERO LEAKS",
    body: "If the protected tunnel drops, traffic stops — it never silently falls back to your ISP. Fail-closed by design, not by promise.",
  },
  {
    title: "Zero Telemetry",
    accent: "var(--blue)",
    tag: "LOCAL-ONLY",
    body: "No analytics, no crash uploads, no phone-home. The transparency dashboard exists so you can verify that claim, not take it on faith.",
  },
  {
    title: "Sovereign by Default",
    accent: "var(--gold-light)",
    tag: "YOURS",
    body: "Your profiles, history and settings live on your disk in readable formats. No account, no cloud sync you didn't ask for, no landlord.",
  },
];

const SHOTS = [
  { id: "omni", src: "/assets/shots/omni.png", label: "Omni control deck" },
  { id: "ghost", src: "/assets/shots/ghost-tor.png", label: "Ghost Mode · Tor" },
  { id: "home", src: "/assets/shots/home.png", label: "Home" },
  { id: "privacy", src: "/assets/shots/privacy-tools.png", label: "Privacy tools" },
  { id: "transparency", src: "/assets/shots/transparency.png", label: "Transparency" },
];

const FEED_LINES = [
  { host: "cdn.dhurta.setu", verdict: "allow", type: "document" },
  { host: "tracker.adnet.io", verdict: "block", type: "beacon" },
  { host: "fonts.local.cache", verdict: "allow", type: "font" },
  { host: "fingerprint.js.cdn", verdict: "block", type: "script" },
  { host: "api.weather.onion", verdict: "tor", type: "xhr" },
  { host: "pixel.social.com", verdict: "block", type: "img" },
  { host: "news.sovereign.net", verdict: "tor", type: "document" },
  { host: "webrtc.stun.probe", verdict: "block", type: "stun" },
];

type FeedRow = (typeof FEED_LINES)[number] & { id: number };

function OmniDemo() {
  const [shieldOn, setShieldOn] = useState(true);
  const [rows, setRows] = useState<FeedRow[]>(() =>
    FEED_LINES.slice(0, 4).map((l, i) => ({ ...l, id: i }))
  );
  const tick = useRef(4);

  useEffect(() => {
    const id = setInterval(() => {
      tick.current += 1;
      const next: FeedRow = {
        ...FEED_LINES[tick.current % FEED_LINES.length],
        id: tick.current,
      };
      setRows((prev) => [...prev.slice(-4), next]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="omni glass-card"
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="omni__titlebar">
        <span className="omni__dot" />
        <span className="omni__addr">dhurta://omni</span>
        <span className="omni__badge">LOCAL-ONLY · ZERO TELEMETRY</span>
      </div>

      <div className="omni__grid">
        <div className="omni__panel">
          <p className="omni__panel-label">REAL IP — forced direct</p>
          <p className="omni__ip omni__ip--real">184.181.217.194</p>
          <p className="omni__meta">United States · Cox Communications</p>
        </div>
        <div className="omni__arrow">
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ⇄
          </motion.span>
        </div>
        <div className="omni__panel">
          <p className="omni__panel-label">WHAT SITES SEE NOW</p>
          {shieldOn ? (
            <motion.p
              key="masked"
              className="omni__ip omni__ip--masked"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              185.220.101.47
            </motion.p>
          ) : (
            <motion.p
              key="leak"
              className="omni__ip omni__ip--real"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              184.181.217.194
            </motion.p>
          )}
          <p className="omni__meta">
            {shieldOn ? "Tor exit · Germany · masked ✓" : "EXPOSED — enable Ghost Mode"}
          </p>
        </div>
      </div>

      <div className="omni__feed">
        <p className="omni__panel-label">LIVE REQUEST FEED</p>
        <ul>
          {rows.map((r) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`omni__row omni__row--${r.verdict}`}
            >
              <span className="omni__row-verdict">
                {r.verdict === "block" ? "✕ BLOCK" : r.verdict === "tor" ? "◉ TOR" : "→ ALLOW"}
              </span>
              <span className="omni__row-host">{r.host}</span>
              <span className="omni__row-type">{r.type}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="omni__killswitch">
        <div>
          <p className="omni__ks-title">Fail-closed kill switch</p>
          <p className="omni__meta">
            {shieldOn ? "Armed — tunnel drop stops all traffic" : "Disarmed — demo only, try it"}
          </p>
        </div>
        <button
          className={`omni__toggle ${shieldOn ? "omni__toggle--on" : ""}`}
          onClick={() => setShieldOn((v) => !v)}
          aria-label="Toggle shield demo"
        >
          <motion.span
            className="omni__toggle-knob"
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
          />
        </button>
      </div>
    </motion.div>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery__frame glass-card">
        <motion.img
          key={SHOTS[active].id}
          src={SHOTS[active].src}
          alt={`Dhurta Browser — ${SHOTS[active].label}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          loading="lazy"
        />
      </div>
      <div className="gallery__tabs">
        {SHOTS.map((s, i) => (
          <button
            key={s.id}
            className={`gallery__tab ${i === active ? "gallery__tab--active" : ""}`}
            onClick={() => setActive(i)}
          >
            {s.label}
            {i === active && (
              <motion.span className="gallery__tab-underline" layoutId="gallery-underline" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BrowserSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section className="browser bg-noise" id="browser" ref={ref}>
      <motion.div className="browser__glow" style={{ y: glowY }} />
      <div className="container browser__inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="section-label browser__label">01 · Flagship</p>
          <h2 className="section-title">
            Dhurta <span className="browser__accent">Browser</span>
          </h2>
          <p className="browser__lede">
            A sovereign privacy browser that treats anonymity as infrastructure.
            Real Tor onion routing, a one-switch protection bundle, and a
            dashboard that audits the browser itself — because trust should be
            verifiable.
          </p>
        </motion.div>

        <OmniDemo />

        <div className="browser__features">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              className="feature glass-card"
              style={{ "--accent": f.accent } as CSSProperties}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: EASE }}
              whileHover={{ y: -5 }}
            >
              <span className="feature__tag">{f.tag}</span>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__body">{f.body}</p>
            </motion.article>
          ))}
        </div>

        <Gallery />

        <motion.div
          className="browser__cta-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.a
            href="https://github.com/prashantkeshr/Dhurta/releases"
            target="_blank"
            rel="noreferrer"
            className="browser__download"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            ⬇ Download from GitHub Releases
          </motion.a>
          <a
            href="https://github.com/prashantkeshr/Dhurta"
            target="_blank"
            rel="noreferrer"
            className="browser__source"
          >
            Read the source ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
