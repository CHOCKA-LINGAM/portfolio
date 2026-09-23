"use client";

import React from "react";

// ─── 1. iLINK DIGITAL CORPORATE BRAND LOGO (Official Infinity Loop & "iLink Digital" Typography) ───
export function ILinkLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 210 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red Ribbon Arc (Top-Left to Bottom-Right) */}
      <path
        d="M 6 25 C 12 8, 30 8, 40 25 C 50 42, 68 42, 74 25 C 67 43, 46 43, 38 29 C 30 15, 13 15, 6 25 Z"
        fill="#D32F2F"
      />
      {/* Grey Ribbon Arc (Bottom-Left to Top-Right) */}
      <path
        d="M 6 25 C 12 42, 30 42, 40 25 C 50 8, 68 8, 74 25 C 67 7, 46 7, 38 21 C 30 35, 13 35, 6 25 Z"
        fill="#6B7280"
      />
      {/* "iLink Digital" Red Brand Wordmark */}
      <text
        x="82"
        y="33"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="24"
        fontWeight="600"
        fill="#D32F2F"
        letterSpacing="-0.2"
      >
        iLink Digital
      </text>
    </svg>
  );
}

// ─── 2. TIGER ANALYTICS EXACT CORPORATE BRAND LOGO (Serif A with Orange Swoosh) ───
export function TigerAnalyticsLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Serif "Tiger" text */}
      <text x="5" y="20" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="currentColor">
        Tiger
      </text>
      {/* Serif "Analytics" text */}
      <text x="5" y="42" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="currentColor">
        Analytics
      </text>
      {/* Signature Orange Swoosh over the letter "A" */}
      <path
        d="M 5 44 C 15 34, 25 36, 32 40 C 22 42, 12 45, 5 44 Z"
        fill="#EA580C"
      />
    </svg>
  );
}

// ─── 3. KAARTECH EXACT CORPORATE BRAND LOGO (Ripple Rings + Red Splash Teardrops) ───
export function KaarLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric Ripple Ellipses */}
      <ellipse cx="50" cy="30" rx="38" ry="12" stroke="#991B1B" strokeWidth="2.5" fill="none" />
      <ellipse cx="50" cy="30" rx="24" ry="7" stroke="#DC2626" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="30" rx="10" ry="3" stroke="#DC2626" strokeWidth="1.5" fill="none" />
      
      {/* Dual Red Splash Teardrops at top */}
      <path
        d="M 44 24 C 40 14, 42 6, 45 2 C 48 10, 48 18, 44 24 Z"
        fill="#B91C1C"
      />
      <path
        d="M 54 22 C 52 14, 53 8, 55 4 C 57 10, 57 17, 54 22 Z"
        fill="#EF4444"
      />

      {/* KaarTech Text */}
      <text x="12" y="52" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="900" fontStyle="italic" fill="currentColor">
        KaarTech
      </text>
    </svg>
  );
}

// ─── ORIGINAL TECH BRAND SVG LOGOS ───

export function PythonBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656v2.748H12v.826H3.618S0 5.768 0 11.904c0 6.14 3.16 5.92 3.16 5.92h1.89v-2.668s-.103-3.18 3.13-3.18h5.184s3.027.05 3.027-2.92V3.14S16.92 0 11.914 0zm-2.88 1.83a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16z" fill="#3776AB"/>
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656v-2.748H12v-.826h8.382S24 18.232 24 12.096c0-6.14-3.16-5.92-3.16-5.92h-1.89v2.668s.103 3.18-3.13 3.18h-5.184s-3.027-.05-3.027 2.92v5.908S7.08 24 12.086 24zm2.88-1.83a1.08 1.08 0 1 1 0-2.16 1.08 1.08 0 0 1 0 2.16z" fill="#FFD43B"/>
    </svg>
  );
}

export function FastAPIBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#059669" />
      <path d="M13 4L6 14h6l-1 6 7-10h-6l1-6z" fill="#FFFFFF" />
    </svg>
  );
}

export function DjangoBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.233 0v16.14h-2.39V2.13H6.467v14.01c0 5.727 3.513 7.86 7.156 7.86 2.39 0 4.144-.766 5.05-1.579l-1.09-1.928c-.684.582-1.942 1.09-3.418 1.09-2.734 0-4.664-1.636-4.664-5.462V0h1.733z" fill="#092E20"/>
    </svg>
  );
}

export function DatabricksBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF3621">
      <path d="M1.5 6L12 0l10.5 6v12L12 24 1.5 18V6zm3 2.14v7.72L12 20.3l7.5-4.44V8.14L12 12.58 4.5 8.14z"/>
    </svg>
  );
}

export function PySparkBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#E25A1C">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5l-3-2.5 4-4.5-5.5 1.5L11 6l2.5 4.5-3 1.5 4.5 2.5z"/>
    </svg>
  );
}

export function DockerBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.574a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.714h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.953 0h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.146a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.118a.185.185 0 00.186-.186V6.29a.185.185 0 00-.186-.185H5.146a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.93 2.714h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.184-.185h-2.12a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zM.001 12.658c0 4.223 3.09 7.747 9.07 7.747 6.307 0 10.748-3.418 12.18-8.24 1.157-.1 2.378-.857 2.747-1.85-.86.07-1.745-.19-2.316-.62.484-.71.594-1.7.27-2.39-1.226.78-2.61.94-3.765.48-1.508 1.94-3.957 3.03-6.905 3.03H.001z"/>
    </svg>
  );
}

export function KubernetesBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#326CE5">
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 3.2l7.6 4.4v8.8L12 20.8l-7.6-4.4V7.6L12 3.2zm0 3.8l-4 2.3v4.6l4 2.3 4-2.3V9.3l-4-2.3z"/>
    </svg>
  );
}

export function AzureBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0089D6">
      <path d="M5.484 20.892L0 15.65 14.39.54h4.726l-13.632 20.352zm9.108 2.568h9.408L14.7 13.56l-3.324 4.884 3.216 5.016z"/>
    </svg>
  );
}

export function AWSBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF9900">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-4 6h3.5c1.4 0 2.5 1 2.5 2.5S12.9 13 11.5 13H10v3H8V8zm2 3.5h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H10v1zm-8 7.5c4 2.5 10 2.5 14 0l1 1c-5 3-11 3-16 0l1-1z"/>
    </svg>
  );
}

export function ReactBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  );
}

export function AngularBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#DD0031">
      <path d="M12 2L2 5.5l1.5 13L12 22l8.5-3.5 1.5-13L12 2zM12 4.4l5.3 12.6h-2.1l-1.1-2.7H9.9l-1.1 2.7H6.7L12 4.4zm1.4 8.1l-1.4-3.4-1.4 3.4h2.8z"/>
    </svg>
  );
}

export function HTMLCSSBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#E34F26">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 4.5H6l.4 4.5h9.2l-.4 4.5-3.2 1-3.2-1-.2-2.3H6.3l.4 5.3 5.3 1.7 5.3-1.7.7-8H6.4l-.2-2.3h11.8z"/>
    </svg>
  );
}

export function NextjsBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.72 17.66l-5.63-7.85v7.85H10.1V6.34h1.99l5.63 7.84V6.34h1.99v11.32h-1.99z" fill="#000000"/>
    </svg>
  );
}

export function TypeScriptBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#3178C6">
      <rect width="24" height="24" rx="4" />
      <path d="M11.5 13.5v7h-2.5v-7h-3v-2.5h8.5v2.5h-3zm10 2.5c0 2.5-2 4.5-4.5 4.5h-4.5v-9.5h4.5c2.5 0 4.5 2 4.5 4.5v.5zm-2.5 0c0-1.1-.9-2-2-2h-2v4h2c1.1 0 2-.9 2-2v-.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function TailwindBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06B6D4">
      <path d="M12 6c-3.3 0-5.5 1.7-6.6 4.9 1.4-1.4 3-1.8 4.7-1.1 1 0.4 1.7 1.2 2.5 2.1 1.3 1.4 2.8 3.1 6.6 3.1 3.3 0 5.5-1.7 6.6-4.9-1.4 1.4-3 1.8-4.7 1.1-1-0.4-1.7-1.2-2.5-2.1-1.3-1.4-2.8-3.1-6.6-3.1zM5.4 13C2.1 13 0 14.7-1.1 17.9c1.4-1.4 3-1.8 4.7-1.1 1 .4 1.7 1.2 2.5 2.1 1.3 1.4 2.8 3.1 6.6 3.1 3.3 0 5.5-1.7 6.6-4.9-1.4 1.4-3 1.8-4.7 1.1-1-.4-1.7-1.2-2.5-2.1-1.3-1.4-2.8-3.1-6.6-3.1z"/>
    </svg>
  );
}

export function OpenAIBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.28 9.82a6 6 0 0 0-.53-5.26 6.07 6.07 0 0 0-6.62-2.76 6 6 0 0 0-4.72-2.28 6.06 6.06 0 0 0-5.78 4.1 6.06 6.06 0 0 0-4.13 2.95 6 6 0 0 0 .74 7.15 6 6 0 0 0 .53 5.26 6.07 6.07 0 0 0 6.62 2.76 6 6 0 0 0 4.72 2.28 6.06 6.06 0 0 0 5.78-4.1 6.06 6.06 0 0 0 4.13-2.95 6 6 0 0 0-.74-7.15z" fill="#10A37F"/>
    </svg>
  );
}

export function PostgresBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#4169E1">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
    </svg>
  );
}

export function AirflowBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#017CEE">
      <path d="M12 0L2 12h8v12l10-12h-8L12 0z"/>
    </svg>
  );
}

// ─── DYNAMIC TECH LOGO RESOLVER ───
export function getOriginalTechIcon(techName: string, className = "w-4 h-4") {
  const lower = techName.toLowerCase();

  if (lower.includes("python")) return <PythonBrandIcon className={className} />;
  if (lower.includes("fastapi")) return <FastAPIBrandIcon className={className} />;
  if (lower.includes("django")) return <DjangoBrandIcon className={className} />;
  if (lower.includes("databricks")) return <DatabricksBrandIcon className={className} />;
  if (lower.includes("spark") || lower.includes("pyspark")) return <PySparkBrandIcon className={className} />;
  if (lower.includes("docker")) return <DockerBrandIcon className={className} />;
  if (lower.includes("kubernetes") || lower.includes("k8s") || lower.includes("aks")) return <KubernetesBrandIcon className={className} />;
  if (lower.includes("azure")) return <AzureBrandIcon className={className} />;
  if (lower.includes("aws") || lower.includes("bedrock")) return <AWSBrandIcon className={className} />;
  if (lower.includes("react")) return <ReactBrandIcon className={className} />;
  if (lower.includes("angular")) return <AngularBrandIcon className={className} />;
  if (lower.includes("html") || lower.includes("css")) return <HTMLCSSBrandIcon className={className} />;
  if (lower.includes("next")) return <NextjsBrandIcon className={className} />;
  if (lower.includes("typescript") || lower.includes("js") || lower.includes("javascript")) return <TypeScriptBrandIcon className={className} />;
  if (lower.includes("tailwind")) return <TailwindBrandIcon className={className} />;
  if (lower.includes("openai") || lower.includes("claude") || lower.includes("llm")) return <OpenAIBrandIcon className={className} />;
  if (lower.includes("postgres") || lower.includes("sql")) return <PostgresBrandIcon className={className} />;
  if (lower.includes("airflow")) return <AirflowBrandIcon className={className} />;

  // Default fallback SVG badge
  return (
    <span className="w-4 h-4 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
      {techName.substring(0, 2).toUpperCase()}
    </span>
  );
}

// ─── DYNAMIC COMPANY LOGO RESOLVER ───
export function getOriginalCompanyIcon(companyName: string, className = "w-8 h-4") {
  const lower = companyName.toLowerCase();
  if (lower.includes("ilink")) return <ILinkLogoIcon className={className} />;
  if (lower.includes("tiger")) return <TigerAnalyticsLogoIcon className={className} />;
  if (lower.includes("kaar")) return <KaarLogoIcon className={className} />;

  return (
    <span className="w-5 h-5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
      {companyName.substring(0, 2).toUpperCase()}
    </span>
  );
}
