import Image from "next/image";
import { Button } from "@nextui-org/react";
import { getImageUrlByName } from "../../edit/actions";

export default async function ImageWithText(props: {
  imageName: string;
  titleLabel: string;
  parographText: string;
  hasButton: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
  reverse?: boolean;
}) {
  const response = await getImageUrlByName(props.imageName);

  if (response.type === "error") {
    return <div>Image not found</div>;
  }

  if (props.hasButton && (!props.buttonLabel || !props.buttonUrl)) {
    return <div>Button label or url is missing</div>;
  }

  const reverse = props.reverse || false;

  return (
    <section
      className={`flex flex-col md:flex-row bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-32 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
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
          <h2 className="text-3xl md:text-5xl font-bold">{props.titleLabel}</h2>
          <p>{props.parographText}</p>
          {props.hasButton && (
            <div>
              <Button color="primary" radius="sm">
                {props.buttonLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
