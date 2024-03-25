import Image from "next/image";
import MenuButton from "./MenuButton";
import Title from "./Title";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/hero_black_and_white.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute top-0 right-0 p-4 pr-5">
        <MenuButton />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Title />
      </div>
    </div>
  );
}