import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lifebuildglobal.com.ng"),
  title: {
    default: "LifeBuild Global | Rebuilding Everywhere You Go",
    template: "%s | LifeBuild Global",
  },
  description:
    "LifeBuild Global is a faith-driven movement helping people rebuild broken foundations, develop their God-given capacity and create transformation in lives, families and communities.",
  keywords: [
    "LifeBuild Global",
    "LifeBuild",
    "Zeki Ubor",
    "4Tribe Network",
    "4T Conference",
    "Isaiah 58:12",
    "Rebuilding broken walls",
    "Rebuilding everywhere you go",
    "LifeBuild Vision",
    "Bi-weekly Gathering",
    "Kingdom leadership",
    "Life reconstruction",
    "4T Pillars",
    "Rebuilding Restoring Repairing Replenishing",
    "Kingdom business network",
    "Christian founders network",
    "Kingdom entrepreneurs",
    "Zeki Ubor LifeBuild Global",
    "LifeBuild center",
    "Sunday pass scanner",
    "Attendance QR pass",
    "Faith and business movement",
  ],
  authors: [{ name: "Zeki Ubor", url: "https://www.lifebuildglobal.com.ng" }],
  creator: "Zeki Ubor",
  publisher: "LifeBuild Global & 4Tribe Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.lifebuildglobal.com.ng",
  },
  openGraph: {
    title: "LifeBuild Global | Rebuilding Everywhere You Go",
    description:
      "LifeBuild Global is a faith-driven movement helping people rebuild broken foundations, develop their God-given capacity and create transformation in lives, families and communities.",
    url: "https://www.lifebuildglobal.com.ng",
    siteName: "LifeBuild Global",
    images: [
      {
        url: "/images/worship_nigerian_african.png",
        width: 1200,
        height: 630,
        alt: "LifeBuild Global Gathering & 4T Conference",
      },
      {
        url: "/images/zeki_ubor_official.jpg",
        width: 800,
        height: 1000,
        alt: "Zeki Ubor - Founder & Convener of LifeBuild Global",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeBuild Global | Rebuilding Everywhere You Go",
    description:
      "LifeBuild Global is a faith-driven movement helping people rebuild broken foundations, develop their God-given capacity and create transformation in lives, families and communities.",
    creator: "@zekiubor",
    images: ["/images/worship_nigerian_african.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/lifebuild_icon.svg", type: "image/svg+xml" },
      { url: "/images/lifebuild_official_logo.png", type: "image/png" },
    ],
    shortcut: "/lifebuild_icon.svg",
    apple: "/images/lifebuild_official_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/lifebuild_icon.svg" />
        <link rel="alternate icon" type="image/png" href="/images/lifebuild_official_logo.png" />
        <link rel="shortcut icon" href="/lifebuild_icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/lifebuild_official_logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#09090b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <JsonLd />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
