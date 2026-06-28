import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frivassteel.ca"),
  title: {
    default: "Frivas Interior & Steel Framing Ltd. | Edmonton, Alberta",
    template: "%s | Frivas Interior & Steel Framing",
  },
  description:
    "Steel framing, acoustical ceilings, insulation and interior construction specialists serving Edmonton and Alberta. Licensed, insured, and WCB-covered crews.",
  keywords: [
    "steel framing Edmonton",
    "light-gauge steel framing Alberta",
    "acoustical ceilings Edmonton",
    "interior construction Alberta",
    "commercial steel framing",
  ],
  openGraph: {
    title: "Frivas Interior & Steel Framing Ltd.",
    description:
      "Steel framing & ceiling specialists in Edmonton. Full-service interior construction for commercial and residential projects across Alberta.",
    url: "https://frivassteel.ca",
    siteName: "Frivas Interior & Steel Framing",
    locale: "en_CA",
    type: "website",
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
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}