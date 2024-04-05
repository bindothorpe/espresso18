import toast from "react-hot-toast";
import { getLocationAndCreateIfMissing } from "../../actions";
import LocationAndHoursContainer from "./LocationAndHoursContainer";

export default async function LocationAndHoursWrapper() {
  const response = await getLocationAndCreateIfMissing();

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  return <LocationAndHoursContainer location={response.data} />;
}
