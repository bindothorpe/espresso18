import TabNavigation from "./components/TabNavigation";
import ImagesContainer from "./components/images/ImagesContainer";
import MenuWrapper from "./components/menu/MenuWrapper";
import LocationAndHoursWrapper from "./components/hours/LocationAndHoursWrapper";

export default async function Edit() {
  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <TabNavigation
        menuChildren={<MenuWrapper />}
        locationAndHoursChildren={<LocationAndHoursWrapper />}
        imagesChildren={<ImagesContainer />}
      />
    </div>
  );
}
