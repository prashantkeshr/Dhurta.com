import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./ConnectSection.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Animated P2P diagram: two peers, packets flying directly between them,
 *  and a crossed-out server in the middle. Pure SVG + Framer Motion. */
function PeerDiagram() {
  return (
    <motion.svg
      viewBox="0 0 640 300"
      className="connect__svg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="p2p-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00d4aa" />
          <stop offset="1" stopColor="#c9a84c" />
        </linearGradient>
      </defs>

      {/* direct encrypted path */}
      <motion.path
        id="peerPath"
        d="M 90 150 C 220 60, 420 60, 550 150"
        fill="none"
        stroke="url(#p2p-line)"
        strokeWidth="1.6"
        strokeDasharray="5 7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* packets travelling both ways */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`ab-${i}`}
          r="4.5"
          fill="#00d4aa"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
          style={{ offsetPath: `path("M 90 150 C 220 60, 420 60, 550 150")` }}
        />
      ))}
      {[0, 1].map((i) => (
        <motion.rect
          key={`ba-${i}`}
          width="8"
          height="8"
          rx="2"
          fill="#c9a84c"
          initial={{ offsetDistance: "100%" }}
          animate={{ offsetDistance: "0%" }}
          transition={{ duration: 3.1, repeat: Infinity, delay: 0.5 + i * 1.4, ease: "easeInOut" }}
          style={{ offsetPath: `path("M 90 150 C 220 60, 420 60, 550 150")` }}
        />
      ))}

      {/* peer A */}
      <g>
        <motion.circle
          cx="90"
          cy="150"
          r="34"
          fill="rgba(0,212,170,0.08)"
          stroke="#00d4aa"
          strokeWidth="1.5"
          animate={{ r: [34, 38, 34] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="74" y="132" width="32" height="36" rx="5" fill="none" stroke="#00d4aa" strokeWidth="1.6" />
        <line x1="82" y1="162" x2="98" y2="162" stroke="#00d4aa" strokeWidth="1.6" />
        <text x="90" y="205" textAnchor="middle" className="connect__svg-label">PEER A</text>
      </g>

      {/* peer B */}
      <g>
        <motion.circle
          cx="550"
          cy="150"
          r="34"
          fill="rgba(201,168,76,0.08)"
          stroke="#c9a84c"
          strokeWidth="1.5"
          animate={{ r: [34, 38, 34] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <rect x="534" y="132" width="32" height="36" rx="5" fill="none" stroke="#c9a84c" strokeWidth="1.6" />
        <line x1="542" y1="162" x2="558" y2="162" stroke="#c9a84c" strokeWidth="1.6" />
        <text x="550" y="205" textAnchor="middle" className="connect__svg-label">PEER B</text>
      </g>

      {/* the server that is not there */}
      <g opacity="0.55">
        <rect x="290" y="200" width="60" height="44" rx="6" fill="none" stroke="#b8c5d6" strokeWidth="1.4" strokeDasharray="4 4" />
        <line x1="300" y1="214" x2="340" y2="214" stroke="#b8c5d6" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="300" y1="226" x2="340" y2="226" stroke="#b8c5d6" strokeWidth="1.2" strokeDasharray="4 4" />
        <motion.line
          x1="284" y1="194" x2="356" y2="250"
          stroke="#ff4500"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.6 }}
        />
        <motion.line
          x1="356" y1="194" x2="284" y2="250"
          stroke="#ff4500"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.9 }}
        />
        <text x="320" y="268" textAnchor="middle" className="connect__svg-label connect__svg-label--dim">
          NO SERVER
        </text>
      </g>
    </motion.svg>
  );
}

/** Pairing code that shuffles digits then settles. */
function PairCode() {
  const FINAL = "72 41 9";
  const [code, setCode] = useState("00 00 0");

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      if (frame > 14) {
        setCode(FINAL);
        clearInterval(id);
        return;
      }
      setCode(
        FINAL.replace(/\d/g, () => String(Math.floor(Math.random() * 10)))
      );
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="connect__pair glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="connect__pair-label">PAIR WITH A SHORT CODE — NO ACCOUNT</p>
      <p className="connect__pair-code">{code}</p>
      <p className="connect__pair-hint">
        Speak it, type it, done. Keys are exchanged directly between devices —
        no sign-up, no phone number, no directory anyone can subpoena.
      </p>
    </motion.div>
  );
}

const CAPABILITIES = [
  { icon: "💬", title: "Messaging", body: "End-to-end encrypted chat, direct device to device." },
  { icon: "🎙", title: "Voice & video", body: "P2P calls with no relay server recording metadata." },
  { icon: "📦", title: "File sharing", body: "Send anything, any size — it never touches a cloud." },
];

export default function ConnectSection() {
  return (
    <section className="connect bg-noise" id="connect">
      <div className="container connect__inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="section-label connect__label">02 · Communication</p>
          <h2 className="section-title">
            Dhurta <span className="connect__accent">Connect</span>
          </h2>
          <p className="connect__lede">
            Zero-server, end-to-end encrypted communication. Two devices, one
            short numeric code, and nothing in between — because the safest
            server is the one that doesn't exist.
          </p>
        </motion.div>

        <PeerDiagram />

        <motion.div
          className="connect__cta-row"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.a
            href="https://connect.dhurta.com"
            target="_blank"
            rel="noreferrer"
            className="connect__try"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            💬 Try Dhurta Connect
          </motion.a>
          <span className="connect__subdomain">connect.dhurta.com</span>
        </motion.div>

        <div className="connect__bottom">
          <PairCode />
          <div className="connect__caps">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                className="connect__cap"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              >
                <span className="connect__cap-icon">{c.icon}</span>
                <div>
                  <h3 className="connect__cap-title">{c.title}</h3>
                  <p className="connect__cap-body">{c.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
