import { list } from "@vercel/blob";
import ImageDisplayComponent from "./ImageDisplayComponent";

export default async function ImagesContainer() {
  async function allImages() {
    const blobs = await list();
    return blobs;
  }

  const images = await allImages();

  return (
    <>
      {/* <FileUploadComponent /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.blobs.map((image, index) => (
          <ImageDisplayComponent key={index} url={image.url} title="Title" />
        ))}
      </div>
    </>
  );
}
