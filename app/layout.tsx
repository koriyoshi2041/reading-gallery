import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ImmersiveBackground } from "@/components/ui/immersive-background";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Reading Gallery | Immersive Narrative Experience",
  description: "Experience reading in a cinematic and high-contrast digital environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-white selection:text-black">
        <ImmersiveBackground />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
