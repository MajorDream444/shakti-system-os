import { lazy, Suspense } from "react";
import { AboutSheetalPage } from "./components/AboutSheetalPage";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { FounderPresence } from "./components/FounderPresence";
import { GodRays } from "./components/GodRays";
import { Hero } from "./components/Hero";
import { PortalImageGallery } from "./components/PortalImageSlots";
/* Removed from the home page on 2026-09-25; re-import and re-add to <main>
   to restore: AuthorityStrip, ReadinessMap, RetreatVision, WaterfallDoctrine. */
import { Nav } from "./components/Nav";
import { DancingWithDurgaPage } from "./components/DancingWithDurgaPage";
import { OfferingsPage } from "./components/OfferingsPage";
import { OfferPathGateway } from "./components/OfferPathGateway";
import { Pathway } from "./components/Pathway";
import { Philosophy } from "./components/Philosophy";
import { SeasonalOffering } from "./components/SeasonalOffering";
import { TestimonialsPage } from "./components/TestimonialsPage";
import { TransitionQuote } from "./components/TransitionQuote";

const BeginApp = lazy(() => import("./begin/BeginApp"));
const ShalaApp = lazy(() => import("./shala/ShalaApp"));

function PortalApp() {
  return (
    <>
      <Nav />
      <main className="app-shell">
        {/* Home was 14,720px at 1440 and 23,029px on a phone — roughly 27
            screens — which is what the founder's clients meant by
            "repetitive". Three sections were removed rather than shortened:

            WaterfallDoctrine  covered the same ground as Philosophy.
            ReadinessMap       restated the journey Pathway already lays out.
            RetreatVision      described work that is not bookable, and the
                               retreat is no longer a navigation item.
            AuthorityStrip     repeated Philosophy's five pillars (Shakti,
                               Shadow, Sensuality, Somatics, Sovereignty)
                               with the wording changed.

            Their components are kept in the tree so any of them can be put
            back with a single line. */}
        <GodRays />
        <Hero />
        {/* The founder-selected frames used to be the largest block inside the
            hero. They keep their place on the page, just below the first
            screen rather than in front of it. */}
        <section className="section home-atmosphere" aria-label="Sri Shakti Shala visual atmosphere">
          <div className="container">
            <PortalImageGallery />
          </div>
        </section>
        {/* Order below is the founder-selected "Guided Path" (option 2 of two,
            chosen 2026-09-26): explain the work, then route, then show what is
            open, and only then introduce the woman holding it.

            Two changes from the previous order. Pathway now comes before
            FounderPresence, so a visitor understands how the work deepens
            before meeting Sheetal — "they should come because of the vision."
            And SeasonalOffering is new: the one bookable thing was previously
            invisible below the first screen. */}
        <Philosophy />
        <OfferPathGateway />
        <Pathway />
        <SeasonalOffering />
        <FounderPresence />
        <TransitionQuote />
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
  const isDancingWithDurgaRoute =
    window.location.pathname === "/dancing-with-durga";

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

  if (isDancingWithDurgaRoute) {
    return <DancingWithDurgaPage />;
  }

  return <PortalApp />;
}

export default App;
