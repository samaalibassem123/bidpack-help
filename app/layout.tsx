import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBarMenu from "@/components/SideBarMenu";
import SmoothScrollWrapper from "@/components/animation/SmoothScrollWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BidPack — VFX Outsourcing & Project Management",
  description:
    "BidPack connects VFX studios with trusted vendors to streamline outsourcing: manage bids, contracts, asset delivery and project workflows securely and transparently.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "BidPack",
    "VFX outsourcing platform",
    "VFX project management",
    "VFX studio collaboration",
    "VFX vendor marketplace",
    "visual effects outsourcing",
    "post-production management",
    "film production outsourcing",
    "secure asset delivery",
    "vendor management platform",
  ],
  openGraph: {
    type: "website",
    title: " — VFX Outsourcing & Project Management",
    url: "https://bidpack-app/",
    siteName: "BidPack",
    description:
      "BidPack connects VFX studios with trusted vendors to streamline outsourcing: manage bids, contracts, asset delivery and project workflows securely and transparently.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollWrapper />

        <SideBarMenu>{children}</SideBarMenu>
      </body>
    </html>
  );
}
