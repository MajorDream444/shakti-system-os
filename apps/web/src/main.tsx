import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { env } from "./config/env";
import { installAnonymousAnalytics } from "./services/AnonymousAnalytics";
import "./styles/globals.css";
import "./styles/living-grammar.css";
import "./styles/sanctuary-system.css";

installAnonymousAnalytics(env.analyticsEnabled);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
