export type HostedPaymentOption = {
  id: string;
  label: string;
  price: string;
  href: string;
  cta: string;
  detail?: string;
  promo?: string;
  billing: "one-time" | "recurring";
  trial?: string;
};

export const commerceOffers = {
  dancingWithDurga: [
    {
      id: "global",
      label: "Global",
      price: "$150 USD",
      href: "https://buy.stripe.com/7sYfZg0zre8DdUA9ePd7q00",
      cta: "Global · $150 USD",
      billing: "one-time",
    },
    {
      id: "india",
      label: "Indian Citizens",
      price: "₹9,999 INR",
      href: "https://buy.stripe.com/fZu6oGbe5aWr3fWgHhd7q01",
      cta: "Indian Citizens · ₹9,999 INR",
      billing: "one-time",
    },
  ],
  shaktiEmbodiment: [
    {
      id: "shakti-embodiment-single",
      label: "Single Session",
      price: "$175 USD",
      href: "https://buy.stripe.com/14A00igyp0hN03KfDdd7q02",
      cta: "Reserve single session",
      billing: "one-time",
    },
    {
      id: "shakti-embodiment-three",
      label: "3-Session Container",
      price: "$500 USD",
      href: "https://buy.stripe.com/dRm3cu2Hzc0v9Ek9ePd7q04",
      cta: "Reserve 3-session container",
      promo: "Use SHAKTISHALA for $50 off",
      billing: "one-time",
    },
    {
      id: "shakti-embodiment-six",
      label: "6-Session Container",
      price: "$900 USD",
      href: "https://buy.stripe.com/28EeVc2HzaWr9Ek62Dd7q05",
      cta: "Reserve 6-session container",
      promo: "Use SHAKTISHALA for $50 off",
      billing: "one-time",
    },
    {
      id: "shakti-embodiment-nine",
      label: "9-Session Container",
      price: "$1,200 USD",
      href: "https://buy.stripe.com/aFa00i4PH8Oj8Ag1Mnd7q06",
      cta: "Reserve 9-session container",
      promo: "Use SHAKTISHALA for $50 off",
      billing: "one-time",
    },
    {
      id: "shakti-embodiment-twelve",
      label: "12-Session Container",
      price: "$1,500 USD",
      href: "https://buy.stripe.com/5kQ3cu2Hzd4zcQw1Mnd7q03",
      cta: "Reserve 12-session container",
      billing: "one-time",
    },
  ],
  shalaMembership: [
    {
      id: "shala-founding-annual",
      label: "Annual Founding Membership",
      price: "$1,111 USD / year",
      href: "https://buy.stripe.com/dRm28qdmd1lReYE76Hd7q07",
      cta: "Choose annual membership",
      billing: "one-time",
    },
    {
      id: "shala-founding-monthly-global",
      label: "Monthly Founding Membership — Global",
      price: "$111 USD / month",
      detail: "21 days free, then monthly; minimum 6-month commitment",
      href: "https://buy.stripe.com/cNi14maa18OjbMsez9d7q08",
      cta: "Begin global membership trial",
      billing: "recurring",
      trial: "21 days free",
    },
    {
      id: "shala-founding-monthly-india",
      label: "Monthly Founding Membership — Indian Resident",
      price: "₹2,222 INR / month",
      detail: "21 days free, then monthly",
      href: "https://buy.stripe.com/5kQ3cu95XggLcQwgHhd7q09",
      cta: "Begin Indian resident membership trial",
      billing: "recurring",
      trial: "21 days free",
    },
  ],
} as const satisfies {
  dancingWithDurga: readonly HostedPaymentOption[];
  shaktiEmbodiment: readonly HostedPaymentOption[];
  shalaMembership: readonly HostedPaymentOption[];
};
