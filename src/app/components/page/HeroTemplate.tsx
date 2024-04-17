import { getImageUrlByName } from "@/app/edit/actions";
import Image from "next/image";

export default async function HeroTemplate(props: {
  titleLabel: string;
  imageName: string;
  height: string;
}) {
  const response = await getImageUrlByName(props.imageName);

  if (response.type === "error") {
    return <div>Image not found</div>;
  }

  return (
    <div className={`relative w-full h-[${props.height}]`}>
      <Image
        src={response.data.url}
        alt={response.data.altText}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl md:text-5xl font-bold">
          {props.titleLabel}
        </span>
      </div>
    </div>
  );
}
