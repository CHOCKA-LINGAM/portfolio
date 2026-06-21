import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400","500","600","700","800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400","500","700"],
});

export const metadata: Metadata = {
  title: "Chockalingam Balan — Senior Software Engineer · Backend · Fullstack · AI",
  description: "Senior Software Engineer with 5+ years building scalable backend platforms, distributed ETL engines, and AI systems. FastAPI · Django · Databricks · OpenAI · Azure.",
  authors: [{ name: "Chockalingam Balan" }],
  keywords: ["Chockalingam Balan","Senior Software Engineer","Backend","FastAPI","Django","Databricks","PySpark","OpenAI","Azure","Chennai"],
  openGraph: {
    type: "website",
    title: "Chockalingam Balan — Senior Software Engineer",
    description: "Backend · Fullstack · AI Engineer with 5+ years building distributed systems, DAG orchestration engines, and ML platforms across global markets.",
    url: "https://chockalingam.dev",
    images: [{ url: "https://chockalingam.dev/og-preview.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chockalingam Balan — Senior Software Engineer",
    description: "Backend · Fullstack · AI Engineer. FastAPI, Django, Databricks, OpenAI, Azure AKS.",
    images: ["https://chockalingam.dev/og-preview.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="blue">
      <body className={`${manrope.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
