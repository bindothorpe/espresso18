import { getImageUrlByName } from "@/app/edit/actions";
import { playfair } from "@/app/fonts";
import Image from "next/image";

export default async function FullImageWithText(props: { imageName: string }) {
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
      <div className="md:w-1/2 p-8 md:p-16 flex items-center">
        <div>
          <h2 className={`text-9xl font-bold mb-8 ${playfair.className}`}>
            About us.
          </h2>
          <div className="flex flex-col md:flex-row gap-16">
            {/* Column 1 */}
            <div className="md:w-1/2">
              <p className="text-lg font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                mollitia hic, aliquid corrupti cumque natus error debitis in
                doloribus assumenda nobis quo possimus, earum libero, tempora
                excepturi animi porro incidunt.
              </p>
            </div>
            {/* Column 2 */}
            <div className="md:w-1/2">
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                ab qui autem obcaecati odit esse temporibus provident sit culpa
                similique!<br></br>
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                tempore vel perspiciatis quas atque, illo est ipsam sequi eaque
                impedit!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}