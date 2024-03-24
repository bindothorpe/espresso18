
"use client";

import Title from "./components/Title";
import Footer from "./components/Footer";
import MenuButton from "./components/MenuButton";
import { NextUIProvider } from "@nextui-org/react";


export default function Home() {

  return (
    <NextUIProvider>
    <div>
      <div
        className={`relative w-full h-screen bg-cover bg-center bg-[url('/images/hero_black_and_white.jpg')]`}
      >
        <div className="absolute top-0 right-0 p-4 pr-5">
        <MenuButton />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <Title/>
        </div>
      </div>
      <Footer/>
    </div>
    </NextUIProvider>
  );
}
