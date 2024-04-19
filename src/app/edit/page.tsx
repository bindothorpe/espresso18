import TabNavigation from "./components/TabNavigation";
import ImagesContainer from "./components/images/ImagesContainer";
import MenuWrapper from "./components/menu/MenuWrapper";
import LocationAndHoursWrapper from "./components/hours/LocationAndHoursWrapper";
import { playfair } from "../fonts";
import TextWrapper from "./components/text/TextWrapper";

export default async function Edit() {
  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <h2
        className={`text-7xl font-bold leading-none mb-4 ml-2 ${playfair.className}`}
      >
        Edit
      </h2>
      <TabNavigation
        menuChildren={<MenuWrapper />}
        locationAndHoursChildren={<LocationAndHoursWrapper />}
        imagesChildren={<ImagesContainer />}
        textChildren={<TextWrapper />}
      />
    </div>
  );
}
