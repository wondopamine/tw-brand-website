import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import { DirectEdit } from 'made-refine'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teacher & School — Brand Operating System",
  description:
    "The Teacher & School portfolio's brand operating system. Governance and tools for product builders working on Teacher Workspace and the rest of the T&S portfolio. Kind Utility at the intersection of high utility and high warmth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'development' && <DirectEdit />}
      </body>
    </html>
  );
}
