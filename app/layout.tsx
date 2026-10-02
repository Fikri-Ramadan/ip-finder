import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";
const siteName = "Kompas IP";
const description =
  "Find the location, timezone, and ISP of any IP address or domain. Kompas IP is a free IP address tracker with an interactive map.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kompas IP | IP Address Tracker & Lookup",
    template: "%s | Kompas IP",
  },
  description,
  applicationName: siteName,
  keywords: [
    "IP address tracker",
    "IP lookup",
    "IP geolocation",
    "domain lookup",
    "IP location",
    "find ISP",
    "timezone lookup",
  ],
  authors: [{ name: "Fikri Ramadan" }],
  creator: "Fikri Ramadan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "Kompas IP | IP Address Tracker & Lookup",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompas IP | IP Address Tracker & Lookup",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f5fc4",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteName,
  url: siteUrl,
  description,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
