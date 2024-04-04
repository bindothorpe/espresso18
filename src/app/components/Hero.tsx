import Image from "next/image";
import Title from "./Title";
import { getImageUrlByName } from "../edit/actions";

export default async function Hero() {
  const response = await getImageUrlByName("Hero Image");

  return (
    <div className="relative w-full h-screen">
      <Image
        src={response.data.url}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Title />
      </div>
    </div>
  );
}
