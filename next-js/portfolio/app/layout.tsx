import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { PERSONAL } from "@/data/index";

const SITE_URL = "https://chocka-devfolio.vercel.app";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["italic"],
  // Only used for small accents below the fold; do not compete with critical fonts
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#06080f",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Chockalingam Balan — Senior Software Engineer",
  description:
    "Senior software engineer with 5+ years building scalable backend platforms, distributed data systems, and production AI workflows.",
  authors: [{ name: "Chockalingam Balan" }],
  keywords: [
    "Chockalingam Balan",
    "Senior Software Engineer",
    "Backend Engineer",
    "FastAPI",
    "Django",
    "Databricks",
    "PySpark",
    "OpenAI",
    "Azure",
    "Chennai",
  ],
  openGraph: {
    type: "profile",
    siteName: "CHOCKA.dev",
    locale: "en_US",
    title: "Chockalingam Balan — Senior Software Engineer",
    description:
      "Backend, full-stack, data platform, and AI engineer building reliable production systems.",
    url: "/",
    images: [{ url: "/og-preview.png", alt: "Chockalingam Balan — Senior Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chockalingam Balan — Senior Software Engineer",
    description: "Backend, full-stack, data platform, and AI engineer.",
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL.name,
    jobTitle: "Senior Software Engineer",
    url: SITE_URL,
    email: `mailto:${PERSONAL.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
    sameAs: [PERSONAL.github, PERSONAL.linkedin],
    knowsAbout: ["Python", "FastAPI", "Django", "PySpark", "Databricks", "LLM workflows", "Azure"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
