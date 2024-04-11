import toast from "react-hot-toast";
import { getDayHours, getLocationAndCreateIfMissing } from "../../actions";
import LocationAndHoursContainer from "./LocationAndHoursContainer";

export default async function LocationAndHoursWrapper() {
  const response = await getLocationAndCreateIfMissing();

  const hoursResponse = await getDayHours();

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  if (hoursResponse.type === "error") {
    try {
      toast.error(hoursResponse.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LocationAndHoursContainer
      location={response.data}
      dayHours={hoursResponse.data}
    />
  );
}
