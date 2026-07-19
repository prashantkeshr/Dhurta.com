import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroScene from "../three/HeroScene";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  // Pause the WebGL loop entirely once the hero has scrolled out of view.
  const heroVisible = useInView(ref, { amount: 0.05 });

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__scene" style={{ scale: sceneScale }}>
        <HeroScene active={heroVisible} />
      </motion.div>
      <div className="hero__vignette" />

      <motion.div className="hero__content container" style={{ y: textY, opacity: fade }}>
        <motion.p
          className="hero__kicker section-label"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          धूर्त · Sanskrit for “clever”
        </motion.p>

        <h1 className="hero__title">
          {["Software that", "answers to"].map((line, i) => (
            <span className="hero__line" key={line}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="hero__line">
            <motion.span
              className="text-gradient-gold"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.49, ease: EASE }}
            >
              no one but you.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
        >
          Dhurta builds sovereign, privacy-native software: a browser with real
          Tor Ghost Mode and zero telemetry, serverless encrypted communication,
          and a curated index of the web worth keeping.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        >
          <motion.a
            href="https://github.com/prashantkeshr/Dhurta/releases"
            target="_blank"
            rel="noreferrer"
            className="hero__cta hero__cta--primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hero__cta-glyph">🔱</span> Get Dhurta Browser
          </motion.a>
          <motion.a
            href="#browser"
            className="hero__cta hero__cta--ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore the products ↓
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__pillars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
        >
          {["Trust", "Technology", "Culture"].map((p, i) => (
            <span key={p} className="hero__pillar">
              {i > 0 && <span className="hero__pillar-dot">·</span>}
              {p}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-hint"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <motion.span
          className="hero__scroll-line"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        scroll
      </motion.div>
    </section>
  );
}
