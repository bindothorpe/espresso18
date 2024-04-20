import toast from "react-hot-toast";
import Footer from "../components/Footer";
import BackButton from "../components/page/BackButton";
import FullImageWithText from "../components/page/FullImageWithText";
import { getTextDataByGroup } from "../edit/actions";
import { Group } from "../edit/constants";
import { playfair } from "../fonts";
import parse from "html-react-parser";

export default async function Coffee() {
  const textResponse = await getTextDataByGroup(Group.Coffee);

  if (textResponse.type === "error") {
    try {
      toast.error(textResponse.message);
    } catch (error) {
      console.error(error);
    }
    return <>There was an error loading the text. Please try again.</>;
  }

  const parsedTitle = parse(textResponse.data[0].text);
  const parsedColumn1 = parse(textResponse.data[1].text);
  const parsedColumn2 = parse(textResponse.data[2].text);
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
                {parsedTitle}
              </h2>
              <div className="flex flex-col md:flex-row gap-16">
                {/* Column 1 */}
                <div className="md:w-1/2">
                  <p className="text-base font-bold">{parsedColumn1}</p>
                </div>
                {/* Column 2 */}
                <div className="md:w-1/2">
                  <p className="text-base">{parsedColumn2}</p>
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
