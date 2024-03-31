import TabNavigation from "./components/TabNavigation";
import AddMenuItemButton from "./components/AddMenuItemButton";
import DataListsContainer from "./DataListsContainer";
import toast from "react-hot-toast";
import { getLocationAndCreateIfMissing, getMenuItems } from "./actions";
import LocationAndHoursContainer from "./components/LocationAndHoursContainer";

export default async function Edit() {
  const response = await getMenuItems();
  const locationResponse = await getLocationAndCreateIfMissing();

  if (response.type === "error") {
    toast.error(response.message);
  }

  if (locationResponse.type === "error") {
    toast.error(locationResponse.message);
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
        imagesChildren={<>TEST</>}
      />
    </div>
  );
}
