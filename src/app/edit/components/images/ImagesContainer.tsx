import ImageDisplayComponent from "./ImageDisplayComponent";
import { Image } from "@prisma/client";

export default async function ImagesContainer(props: { images: Image[] }) {
  return (
    <>
      {/* <FileUploadComponent /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {props.images.map((image, index) => (
          <ImageDisplayComponent
            key={index}
            imageId={image.id}
            url={image.url}
            title={image.title}
            altText={image.altText}
          />
        ))}
      </div>
    </>
  );
}
