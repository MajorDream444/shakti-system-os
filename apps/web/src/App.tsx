import { lazy, Suspense } from "react";
import { AuthorityStrip } from "./components/AuthorityStrip";
import { AboutSheetalPage } from "./components/AboutSheetalPage";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { FounderPresence } from "./components/FounderPresence";
import { GodRays } from "./components/GodRays";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { OfferingsPage } from "./components/OfferingsPage";
import { OfferPathGateway } from "./components/OfferPathGateway";
import { Pathway } from "./components/Pathway";
import { Philosophy } from "./components/Philosophy";
import { ReadinessMap } from "./components/ReadinessMap";
import { RetreatVision } from "./components/RetreatVision";
import { TestimonialsPage } from "./components/TestimonialsPage";
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
        <OfferPathGateway />
        <FounderPresence />
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
  const isOfferingsRoute =
    window.location.pathname === "/offerings" ||
    window.location.pathname === "/work-with-sheetal";
  const isAboutRoute = window.location.pathname === "/about-sheetal";
  const isTestimonialsRoute = window.location.pathname === "/testimonials";

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

  if (isOfferingsRoute) {
    return <OfferingsPage />;
  }

  if (isAboutRoute) {
    return <AboutSheetalPage />;
  }

  if (isTestimonialsRoute) {
    return <TestimonialsPage />;
  }

  return <PortalApp />;
}

export default App;
