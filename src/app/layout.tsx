import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FuegoHike — Train for Acatenango",
  description: "Gamified workout tracker for climbing Volcán de Acatenango",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f2f0eb]">
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#f2f0eb] relative overflow-hidden">
          {/* Decorative geometric shapes — editorial collage background */}
          <div className="absolute top-16 -right-12 w-48 h-48 rounded-full bg-[#d6e4ec]/60 pointer-events-none" />
          <div className="absolute top-[420px] -left-16 w-36 h-36 rounded-full bg-[#d6e4ec]/40 pointer-events-none" />
          <div className="absolute top-[280px] right-4 w-64 h-64 rounded-full border-[20px] border-[#d6e4ec]/30 pointer-events-none" />
          <div className="absolute top-[700px] -right-8 w-24 h-24 rounded-full bg-orange-200/30 pointer-events-none" />
          <div className="absolute top-[900px] -left-10 w-40 h-40 rounded-full border-[16px] border-orange-200/20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
