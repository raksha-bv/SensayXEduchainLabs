import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OCConnectWrapper from "@/components/OCConnectWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sensay Labs",
  description: "Empowering Web3 Explorers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opts = {
    clientId: "<Does_Not_Matter_For_Sandbox_mode>",
    redirectUri: `${process.env.WEBSITE_URL}/redirect`,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}
