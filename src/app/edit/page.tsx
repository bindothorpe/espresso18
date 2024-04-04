import TabNavigation from "./components/TabNavigation";
import AddMenuItemButton from "./components/menu/AddMenuItemButton";
import DataListsContainer from "./components/menu/DataListsContainer";
import toast from "react-hot-toast";
import {
  getImages,
  getLocationAndCreateIfMissing,
  getMenuItems,
} from "./actions";
import LocationAndHoursContainer from "./components/hours/LocationAndHoursContainer";
import ImagesContainer from "./components/images/ImagesContainer";

export default async function Edit() {
  const response = await getMenuItems();
  const locationResponse = await getLocationAndCreateIfMissing();
  const imagesResponse = await getImages();

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  if (locationResponse.type === "error") {
    try {
      toast.error(locationResponse.message);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(imagesResponse.data.length);
  if (imagesResponse.type === "error") {
    try {
      toast.error(imagesResponse.message);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <TabNavigation
        menuChildren={
          <>
            <DataListsContainer menuItems={response.data} />
            <div className="flex justify-center mt-24">
              <AddMenuItemButton />
            </div>
          </>
        }
        locationAndHoursChildren={
          <LocationAndHoursContainer location={locationResponse.data} />
        }
        imagesChildren={<ImagesContainer images={imagesResponse.data} />}
      />
    </div>
  );
}
