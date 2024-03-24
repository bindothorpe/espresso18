
"use client";

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Coffee from "./components/Coffee";


export default function Home() {

  return (
    <div>
      <Hero/>
      <About/>
      <Coffee/>
      <Footer/>
    </div>
  );
}
