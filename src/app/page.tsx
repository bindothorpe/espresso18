"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import Coffee from "./components/Coffee";
import Menu from "./components/Menu";
import Footer from "./components/Footer";


export default function Home() {

  return (
    <div>
      <Hero/>
      <About/>
      <Coffee/>
      <Menu/>
      <Footer/>
    </div>
  );
}
