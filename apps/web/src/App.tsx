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
import { LegalPage } from "./components/LegalPage";
import { TestimonialsPage } from "./components/TestimonialsPage";
import { TransitionQuote } from "./components/TransitionQuote";
import { WaterfallInvitation } from "./components/WaterfallInvitation";

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
        {/* The free-practice invitation, 2026-10-06. It takes the first
            position after the fold rather than a slot inside the hero, which
            is founder-locked to five elements. See WaterfallInvitation.tsx. */}
        <WaterfallInvitation />
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
  /* In a static preview the route arrives as a hash fragment, because there is
     no server to rewrite unknown paths onto index.html. Falls back to the real
     pathname, so production behaviour is unchanged. */
  const hash = window.location.hash.replace(/^#/, "");
  const pathname = hash.startsWith("/") ? hash : window.location.pathname;

  const isBeginRoute =
    pathname === "/begin" || pathname.startsWith("/begin/");
  const isShalaRoute =
    pathname === "/shala" || pathname.startsWith("/shala/");
  const isOfferingsRoute =
    pathname === "/offerings" || pathname === "/work-with-sheetal";
  const isAboutRoute = pathname === "/about-sheetal";
  const isTestimonialsRoute = pathname === "/testimonials";
  const isLegalRoute = pathname === "/important-information";
  const isDancingWithDurgaRoute = pathname === "/dancing-with-durga";

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

  if (isLegalRoute) {
    return <LegalPage />;
  }

  if (isDancingWithDurgaRoute) {
    return <DancingWithDurgaPage />;
  }

  return <PortalApp />;
}

export default App;
