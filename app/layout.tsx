import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "../app/globals.css";
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "لست وحدك | laste Wahdek",
  description:
    "A specialized support platform connecting mothers with pediatricians and psychologists for comprehensive family care.",
};

export const viewport: Viewport = {
  themeColor: "#004c80",
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        className={`${cairo.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
