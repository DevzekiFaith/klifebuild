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
      { url: "/images/logo_icon_nobg.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/logo_icon_nobg.png",
    apple: "/images/logo_icon_nobg.png",
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
        <link rel="icon" type="image/png" href="/images/logo_icon_nobg.png" sizes="any" />
        <link rel="shortcut icon" href="/images/logo_icon_nobg.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo_icon_nobg.png" />
        <JsonLd />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
