import type { ReactNode } from "react";
import { LivingForm } from "./LivingPortal";

type CeremonialFormProps = {
  children: ReactNode;
  className?: string;
  tone?: "sanctuary" | "durga";
  variant: number;
};

export function CeremonialForm({
  children,
  className = "",
  tone = "sanctuary",
  variant,
}: CeremonialFormProps) {
  return (
    <article
      className={`ceremonial-form ceremonial-form--${tone} ${className}`.trim()}
      data-form-variant={variant}
    >
      <LivingForm variant={variant} tone={tone} />
      <div className="ceremonial-form__content">{children}</div>
    </article>
  );
}
