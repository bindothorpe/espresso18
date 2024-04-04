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
    icon: "/icon.png",
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
          <main className="text-foreground bg-background">
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
