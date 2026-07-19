import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import "./Nav.css";

const LINKS = [
  { href: "#browser", label: "Browser" },
  { href: "#connect", label: "Connect" },
  { href: "#setu", label: "Setu" },
];

export default function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <motion.header
      className={`nav ${solid ? "nav--solid" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <img src="/assets/logo.png" alt="Dhurta trishula mark" className="nav__logo" />
          <span className="nav__wordmark">
            DHURTA<span className="nav__tld">.com</span>
          </span>
        </a>
        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <a
            href="https://dhurta.org"
            target="_blank"
            rel="noreferrer"
            className="nav__link nav__link--dim"
          >
            dhurta.org ↗
          </a>
        </nav>
        <motion.a
          href="https://github.com/prashantkeshr/Dhurta/releases"
          target="_blank"
          rel="noreferrer"
          className="nav__cta"
          whileHover={{ scale: 1.045 }}
          whileTap={{ scale: 0.97 }}
        >
          Download Browser
        </motion.a>
      </div>
      <motion.div className="nav__progress" style={{ scaleX: progress }} />
    </motion.header>
  );
}
