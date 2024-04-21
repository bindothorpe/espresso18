import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MenuButton from "./components/MenuButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Espresso 18",
  description: "Amazing coffee and delicious sweets",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <main className="text-foreground bg-background selection:text-white selection:bg-black">
            <div className="fixed top-0 right-0 p-4 pr-5 z-10">
              <MenuButton />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
