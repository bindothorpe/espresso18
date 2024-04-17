import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Coffee from "./components/home/Coffee";
import Menu from "./components/home/Menu";
import Footer from "./components/Footer";
import GeneralInformation from "./components/home/GeneralInformation";

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
