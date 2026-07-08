import { AuthorityStrip } from "./components/AuthorityStrip";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { GodRays } from "./components/GodRays";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Pathway } from "./components/Pathway";
import { Philosophy } from "./components/Philosophy";
import { ReadinessMap } from "./components/ReadinessMap";
import { RetreatVision } from "./components/RetreatVision";
import { TransitionQuote } from "./components/TransitionQuote";

function App() {
  return (
    <>
      <Nav />
      <main className="app-shell">
        <GodRays />
        <Hero />
        <Philosophy />
        <AuthorityStrip />
        <TransitionQuote />
        <ReadinessMap />
        <Pathway />
        <RetreatVision />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
