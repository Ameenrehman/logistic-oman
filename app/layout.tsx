import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oman Beverage Logistics (OBL) | Cold Chain & FMCG Distribution",
  description: "Oman's premier multi-temperature beverage logistics provider. Delivering Coca-Cola and global FMCG brands nationwide with cold-chain precision and real-time WMS telemetry.",
  keywords: ["beverage logistics Oman", "cold chain Muscat", "FMCG distribution Oman", "refrigerated transport Oman", "automated warehouse Muscat"],
  openGraph: {
    title: "Oman Beverage Logistics (OBL) | Cold Chain & FMCG Distribution",
    description: "Powering Coca-Cola and FMCG brands across Oman with multi-temperature logistics and automated warehousing.",
    type: "website",
    locale: "en_US",
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
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
