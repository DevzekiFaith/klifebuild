import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Life Build • Rebuilding Everywhere You Go & Positioning in the Marketplace | 4Tribe Network & Zeki Ubor",
    template: "%s | Lifebuild",
  },
  description:
    "Official Life Build platform led by Zeki Ubor. Anchored in Isaiah 58:12 to rebuild broken walls, restore identity, repair breaches, and replenish legacy through bi-weekly gatherings & the annual 4T Conference.",
  keywords: [
    "Lifebuild",
    "Zeki Ubor",
    "4Tribe Network",
    "4T Conference",
    "Isaiah 58:12",
    "Rebuilding broken walls",
    "Rebuilding everywhere you go",
    "Positioning in the marketplace",
    "Life Build Vision",
    "Sunday Gathering",
    "Kingdom leadership",
    "Life reconstruction",
    "4T Pillars",
    "Rebuilding Restoring Repairing Replenishing",
    "Kingdom business network",
    "Christian founders network",
    "Kingdom entrepreneurs",
    "Zeki Ubor Lifebuild",
    "Lifebuild center",
    "Sunday pass scanner",
    "Attendance QR pass",
    "Faith and business network",
  ],
  authors: [{ name: "Zeki Ubor", url: "https://www.lifebuildglobal.com.ng" }],
  creator: "Zeki Ubor",
  publisher: "Lifebuild & 4Tribe Network",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.lifebuildglobal.com.ng",
  },
  openGraph: {
    title: "Lifebuild • Rebuilding Everywhere You Go | 4Tribe Network",
    description:
      "Driven by Isaiah 58:12, Lifebuild is a propelling movement led by Zeki Ubor to rebuild broken walls, restore human dignity, and raise up foundations across generations.",
    url: "https://www.lifebuildglobal.com.ng",
    siteName: "Lifebuild",
    images: [
      {
        url: "/images/worship_nigerian_african.png",
        width: 1200,
        height: 630,
        alt: "Lifebuild Sunday Sanctuary Gathering & 4T Conference",
      },
      {
        url: "/images/zeki_ubor_official.png",
        width: 800,
        height: 1000,
        alt: "Zeki Ubor - Founder & Convener of Lifebuild",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifebuild • Rebuilding Everywhere You Go | 4Tribe Network",
    description:
      "Rebuilding broken walls, raising mighties, and transforming communities under Isaiah 58:12. Led by Zeki Ubor.",
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
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
