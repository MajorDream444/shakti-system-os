import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { GodRays } from "./GodRays";
import { Nav } from "./Nav";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <>
      <Nav />
      <main className={`app-shell public-page ${className}`}>
        <GodRays />
        {children}
      </main>
      <Footer />
    </>
  );
}
