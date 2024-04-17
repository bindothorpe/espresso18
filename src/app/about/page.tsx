import Footer from "../components/Footer";
import BackButton from "../components/page/BackButton";
import FullImageWithText from "../components/page/FullImageWithText";
import ImageWithText from "../components/page/ImageWithText";
import AboutHero from "./components/AboutHero";

export default async function Edit() {
  const parographText: string =
    "At Espresso 18, we provide not only excellent coffee, but also a charming environment and stunning mountain vistas, which together make the ideal backdrop for you to unwind and savor a delightful cup of coffee. At Espresso 18, we provide not only excellent coffee, but also a charming environment and stunning mountain vistas, which together make the ideal backdrop for you to unwind and savor a delightful cup of coffee. At Espresso 18, we provide not only excellent coffee, but also a charming environment and stunning mountain vistas, which together make the ideal backdrop for you to unwind and savor a delightful cup of coffee.";

  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <BackButton path="/" />
      </div>
      <FullImageWithText imageName="Hero Image" />
      <div className="mb-20"></div>
      {/* <AboutHero />
      <ImageWithText
        imageName="Hero Image"
        hasButton={true}
        buttonLabel="Learn More"
        buttonUrl="/about"
        parographText={parographText}
        titleLabel="Information"
      />
      <ImageWithText
        imageName="Hero Image"
        hasButton={false}
        parographText={parographText}
        titleLabel="Information"
        reverse={true}
      /> */}
      <Footer />
    </>
  );
}
