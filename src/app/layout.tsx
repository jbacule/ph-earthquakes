import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Philippines Earthquakes Map - Real-Time Seismic Activity Monitoring",
  description: "Interactive earthquake monitoring application for the Philippines. Track real-time seismic activity with live USGS data, magnitude filters, and detailed earthquake information. Monitor earthquakes in the Philippines region with our advanced visualization tools.",
  keywords: [
    "Philippines earthquakes",
    "earthquake map",
    "seismic activity Philippines",
    "USGS earthquake data",
    "real-time earthquake monitoring",
    "earthquake tracker",
    "Philippines seismology",
    "earthquake visualization",
    "Philippine fault lines",
    "earthquake alerts Philippines",
    "tsunami warnings",
    "magnitude scale",
    "seismic monitoring",
    "earthquake history Philippines",
    "tectonic activity"
  ],
  authors: [{ name: "Josh Bacule", url: "https://jbacule.dev" }],
  creator: "Josh Bacule",
  publisher: "Josh Bacule",
  metadataBase: new URL("https://ph-earthquakes.jbacule.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Philippines Earthquakes Map - Real-Time Seismic Activity Monitoring",
    description: "Interactive earthquake monitoring for the Philippines. Track real-time seismic activity with live USGS data, magnitude filters, and detailed earthquake information.",
    siteName: "Philippines Earthquakes Map",
    images: [
      {
        url: "/social-image.png",
        width: 1200,
        height: 630,
        alt: "Philippines Earthquakes Map - Interactive seismic activity monitoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Philippines Earthquakes Map - Real-Time Seismic Activity",
    description: "Interactive earthquake monitoring for the Philippines with live USGS data. Track magnitudes, filter by severity, and view detailed seismic information.",
    creator: "@joshbacule",
    images: ["/social-image.png"],
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
  verification: {
    // Add your verification codes here when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://earthquake.usgs.gov" />
        <link rel="dns-prefetch" href="https://earthquake.usgs.gov" />
        <link rel="preconnect" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
