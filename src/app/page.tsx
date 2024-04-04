import Hero from "./components/Hero";
import About from "./components/About";
import Coffee from "./components/Coffee";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import GeneralInformation from "./components/GeneralInformation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espresso18",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Coffee />
      <Menu />
      <GeneralInformation />
      <Footer />
    </div>
  );
}
