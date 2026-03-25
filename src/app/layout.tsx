import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteFont = localFont({
  src: "../../fonts/populaz-display-font/populaz.otf",
  variable: "--f-site",
});

export const metadata: Metadata = {
  title: "SECRETLY",
  description: "Secretly",
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={siteFont.variable}>
      <body>
        <div className="app-frame">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
