import Footer from "../components/Footer";
import BackButton from "../components/page/BackButton";
import FullImageWithText from "../components/page/FullImageWithText";

export default async function Edit() {
  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <BackButton path="/" />
      </div>
      <FullImageWithText imageName="Hero Image" />
      <div className="mb-20"></div>
      <Footer />
    </>
  );
}
