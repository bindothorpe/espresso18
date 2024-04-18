import Footer from "../components/Footer";
import BackButton from "../components/page/BackButton";
import FullImageWithText from "../components/page/FullImageWithText";
import { playfair } from "../fonts";

export default async function Coffee() {
  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <BackButton path="/" />
      </div>
      <FullImageWithText
        imageName="Coffee Image"
        component={
          <div className="md:w-1/2 p-8 md:p-16 flex items-center">
            <div>
              <h2 className={`text-9xl font-bold mb-8 ${playfair.className}`}>
                Our coffee.
              </h2>
              <div className="flex flex-col md:flex-row gap-16">
                {/* Column 1 */}
                <div className="md:w-1/2">
                  <p className="text-base font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    mollitia hic, aliquid corrupti cumque natus error debitis in
                    doloribus assumenda nobis quo possimus, earum libero,
                    tempora excepturi animi porro incidunt.
                  </p>
                </div>
                {/* Column 2 */}
                <div className="md:w-1/2">
                  <p className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Illum ab qui autem obcaecati odit esse temporibus provident
                    sit culpa similique!<br></br>
                    <br></br>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa tempore vel perspiciatis quas atque, illo est ipsam
                    sequi eaque impedit!
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <div className="mb-20"></div>
      <Footer />
    </>
  );
}
