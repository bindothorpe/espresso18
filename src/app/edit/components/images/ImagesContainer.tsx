import toast from "react-hot-toast";
import { getImages } from "../../actions";
import ImageDisplayComponent from "./ImageDisplayComponent";

export default async function ImagesContainer() {
  const response = await getImages();

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {response.data.map((image, index) => (
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
