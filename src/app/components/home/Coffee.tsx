import Image from "next/image";
import { Button } from "@nextui-org/react";
import { getImageUrlByName } from "../../edit/actions";
import { playfair } from "@/app/fonts";
import NavigationButton from "./NavigationButton";

export default async function Coffee() {
  const response = await getImageUrlByName("Our Coffee Image");
  return (
    <section className="flex flex-col-reverse md:flex-row bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-32">
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="gap-10 flex flex-col">
          <h2
            className={`text-7xl font-bold leading-none ${playfair.className}`}
          >
            Our coffee and where it came from.
          </h2>
          <p className="text-sm">
            At Espresso 18, we provide not only excellent coffee, but also a
            charming environment and stunning mountain vistas, which together
            make the ideal backdrop for you to unwind and savor a delightful cup
            of coffee.
          </p>
          <div>
            <NavigationButton arrowRight path="/coffee" />
          </div>
        </div>
      </div>
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
    </section>
  );
}
