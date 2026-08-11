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

const BeginApp = lazy(() => import("./begin/BeginApp"));
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
  const isBeginRoute =
    window.location.pathname === "/begin" ||
    window.location.pathname.startsWith("/begin/");
  const isShalaRoute =
    window.location.pathname === "/shala" ||
    window.location.pathname.startsWith("/shala/");

  if (isBeginRoute) {
    return (
      <Suspense
        fallback={<div style={{ minHeight: "100vh", background: "#0a0a0a" }} />}
      >
        <BeginApp />
      </Suspense>
    );
  }

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
