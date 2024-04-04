import Image from "next/image";
import { Button } from "@nextui-org/react";
import { getImageUrlByName } from "../edit/actions";

export default async function About() {
  const response = await getImageUrlByName("About Us Image");
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
          <h2 className="text-3xl md:text-5xl font-bold">
            Experience the Cozy Charm and Breathtaking Views at Espresso 18
          </h2>
          <p>
            At Espresso 18, we provide not only excellent coffee, but also a
            charming environment and stunning mountain vistas, which together
            make the ideal backdrop for you to unwind and savor a delightful cup
            of coffee.
          </p>
          <div>
            <Button color="primary" radius="sm">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
