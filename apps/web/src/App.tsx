import { lazy, Suspense } from "react";
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

const ShalaApp = lazy(() => import("./shala/ShalaApp"));

function PortalApp() {
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

function App() {
  const isShalaRoute =
    window.location.pathname === "/shala" ||
    window.location.pathname.startsWith("/shala/");

  if (isShalaRoute) {
    return (
      <Suspense
        fallback={<div style={{ minHeight: "100vh", background: "#090707" }} />}
      >
        <ShalaApp />
      </Suspense>
    );
  }

  return <PortalApp />;
}

export default App;
