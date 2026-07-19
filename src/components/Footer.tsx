import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-noise">
      <div className="container footer__inner">
        <motion.div
          className="footer__brand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <img src="/assets/dhurta-logo.png" alt="Dhurta trishula mark" className="footer__logo" />
          <p className="footer__tagline text-gradient-gold">
            Sovereign · Privacy-Native · Yours
          </p>
          <p className="footer__blurb">
            Dhurta — धूर्त, “clever”. Products built on Trust, Technology and
            Culture.
          </p>
        </motion.div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__col-title">Products</h4>
            <a href="https://products.dhurta.com" target="_blank" rel="noreferrer">All Products ↗</a>
            <a href="https://browser.dhurta.com" target="_blank" rel="noreferrer">Dhurta Browser ↗</a>
            <a href="https://connect.dhurta.com" target="_blank" rel="noreferrer">Dhurta Connect ↗</a>
            <a href="https://setu.dhurta.com" target="_blank" rel="noreferrer">Dhurta Setu ↗</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Open Source</h4>
            <a href="https://github.com/prashantkeshr/Dhurta" target="_blank" rel="noreferrer">
              Browser source ↗
            </a>
            <a href="https://github.com/prashantkeshr/Dhurta/releases" target="_blank" rel="noreferrer">
              Releases ↗
            </a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Dhurta Group</h4>
            <a href="https://dhurta.org" target="_blank" rel="noreferrer">dhurta.org ↗</a>
            <a href="https://dhurta.com" target="_blank" rel="noreferrer">dhurta.com</a>
          </div>
        </div>
      </div>
      <div className="footer__legal">
        <div className="container footer__legal-inner">
          <span>© {new Date().getFullYear()} Dhurta. Built without trackers — this page phones no one.</span>
          <span className="footer__trident">🔱</span>
        </div>
      </div>
    </footer>
  );
}
