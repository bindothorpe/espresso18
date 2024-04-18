import { getImageUrlByName } from "@/app/edit/actions";
import Image from "next/image";

export default async function FullImageWithText(props: {
  imageName: string;
  component: React.ReactNode;
}) {
  const imageResponse = await getImageUrlByName(props.imageName);
  if (imageResponse.type === "error") {
    return <div>Image not found</div>;
  }

  return (
    <section className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-[45%] h-64 md:h-screen">
        <Image
          src={imageResponse.data.url}
          alt={imageResponse.data.altText}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {props.component}
    </section>
  );
}
