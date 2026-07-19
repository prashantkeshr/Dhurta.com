import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import BrowserSection from "./components/BrowserSection";
import ConnectSection from "./components/ConnectSection";
import SetuSection from "./components/SetuSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <BrowserSection />
        <ConnectSection />
        <SetuSection />
      </main>
      <Footer />
    </>
  );
}
