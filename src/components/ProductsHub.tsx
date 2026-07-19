import { motion } from "framer-motion";
import "./ProductsHub.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  {
    name: "Dhurta Browser",
    tagline: "Sovereign privacy browser",
    desc: "Real Tor Ghost Mode, Chakra Shield VPN bundle, Omni self-audit dashboard, fail-closed kill switch. Zero telemetry by architecture.",
    url: "https://browser.dhurta.com",
    cta: "Try Browser",
    accent: "var(--saffron)",
    tag: "FLAGSHIP",
    icon: "🌐",
    num: "01",
  },
  {
    name: "Dhurta Connect",
    tagline: "Server-free encrypted communication",
    desc: "End-to-end encrypted P2P chat, voice and video calls, and file sharing. Pair with a short code — no accounts, no servers, nothing in between.",
    url: "https://connect.dhurta.com",
    cta: "Try Connect",
    accent: "var(--teal)",
    tag: "COMMUNICATION",
    icon: "💬",
    num: "02",
  },
  {
    name: "Dhurta Setu",
    tagline: "First-party private search",
    desc: "A curated web index and first-party search engine that answers to its readers. No ad auctions. No SEO sludge. The web worth keeping.",
    url: "https://setu.dhurta.com",
    cta: "Try Setu",
    accent: "var(--blue)",
    tag: "DISCOVERY",
    icon: "⌕",
    num: "03",
  },
  {
    name: "Dhurta Products",
    tagline: "All products in one place",
    desc: "Explore the full Dhurta product family — current releases, roadmap, and everything coming next for your digital sovereignty.",
    url: "https://products.dhurta.com",
    cta: "Explore All",
    accent: "var(--gold)",
    tag: "HUB",
    icon: "🔱",
    num: "→",
  },
];

export default function ProductsHub() {
  return (
    <section className="hub bg-noise" id="products">
      <div className="container hub__inner">
        <motion.div
          className="hub__header"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="section-label hub__label">Dhurta Products</p>
          <h2 className="section-title hub__title">
            Everything we{" "}
            <span className="text-gradient-gold">build for you</span>
          </h2>
          <p className="hub__sub">
            One family. Three products live today — more on the way.
            Every one is sovereign, privacy-native, and answers to no
            one but you.
          </p>
        </motion.div>

        <div className="hub__grid">
          {PRODUCTS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="hub__card glass-card"
              style={{ "--accent": p.accent } as React.CSSProperties}
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="hub__card-top">
                <span className="hub__num">{p.num}</span>
                <span className="hub__tag">{p.tag}</span>
              </div>
              <div className="hub__icon">{p.icon}</div>
              <h3 className="hub__name">{p.name}</h3>
              <p className="hub__tagline">{p.tagline}</p>
              <p className="hub__desc">{p.desc}</p>
              <div className="hub__footer">
                <span className="hub__cta">
                  {p.cta} <span className="hub__arrow">→</span>
                </span>
                <span className="hub__domain">
                  {p.url.replace("https://", "")}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          className="hub__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          More products coming. All sovereign. All privacy-native. All yours.
        </motion.p>
      </div>
    </section>
  );
}
