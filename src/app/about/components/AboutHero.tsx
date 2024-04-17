import HeroTemplate from "@/app/components/page/HeroTemplate";
import { getImageUrlByName } from "@/app/edit/actions";
import Image from "next/image";

export default async function AboutHero() {
  const response = await getImageUrlByName("Hero Image");

  return (
    <HeroTemplate titleLabel="About Us" imageName="Hero Image" height="60vh" />
  );
}
