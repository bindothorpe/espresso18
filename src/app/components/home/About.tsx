import Image from "next/image";
import { getImageUrlByName, getTextDataByGroup } from "../../edit/actions";
import { playfair } from "@/app/fonts";
import NavigationButton from "./NavigationButton";
import { Group } from "@/app/edit/constants";
import toast from "react-hot-toast";
import parse from "html-react-parser";

export default async function About() {
  const response = await getImageUrlByName("About Us Image");
  const textResponse = await getTextDataByGroup(Group.HomeAbout);

  if (response.type === "error" || textResponse.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
    return (
      <>There was an error loading the about us image. Please try again.</>
    );
  }

  const parsedTitle = parse(textResponse.data[0].text);
  const parsedParagraph = parse(textResponse.data[1].text);
  const parsedButtonLabel = parse(textResponse.data[2].text);

  return (
    <section className="flex flex-col md:flex-row bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-32">
      <div className="md:w-1/2 relative">
        <div className="w-full h-0 pb-[100%]">
          <div className="absolute inset-0">
            <Image
              src={response.data.url}
              alt={response.data.altText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="gap-10 flex flex-col">
          <h2
            className={`text-7xl font-bold leading-none ${playfair.className}`}
          >
            {parsedTitle}
          </h2>
          <p className="text-sm">{parsedParagraph}</p>
          <div>
            <NavigationButton
              label={parsedButtonLabel}
              path="/about"
              arrowRight={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
