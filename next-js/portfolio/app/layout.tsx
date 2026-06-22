import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://chockalingam.dev"),
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
    type: "website",
    title: "Chockalingam Balan — Senior Software Engineer",
    description:
      "Backend, full-stack, data platform, and AI engineer building reliable production systems.",
    url: "/",
    images: [{ url: "/og-preview.png" }],
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
  return (
    <html lang="en" data-theme="blue" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
