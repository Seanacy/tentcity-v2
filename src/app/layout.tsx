import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TentCity — Real-time resources for community care",
  description:
    "Find shelters, food, medical services, and community resources for people experiencing homelessness in Minneapolis.",
  openGraph: {
    title: "TentCity",
    description: "Real-time resources & strategies for community care",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[#000000] text-white">{children}</body>
    </html>
  );
}
