import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteClosedScreen from "@/components/SiteClosedScreen";

const readableFont = localFont({
  src: "../../public/Font/nagel-font/nagel.otf",
  variable: "--f-readable",
});

export const metadata: Metadata = {
  title: "SECRETLY | Temporarily Closed",
  description: "Secretly is temporarily closed.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

/* Enables env(safe-area-inset-*) for fixed bottom nav on iOS / notched devices */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children: _children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={readableFont.variable}>
      <body>
        <SiteClosedScreen />
      </body>
    </html>
  );
}
