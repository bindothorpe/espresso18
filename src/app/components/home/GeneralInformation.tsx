import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  getDayHours,
  getImageUrlByName,
  getLocationAndCreateIfMissing,
} from "../../edit/actions";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/react";
import { Day } from "../../edit/constants";
import DayHours from "../../edit/components/hours/DayHours";
import { playfair } from "@/app/fonts";

export default async function GeneralInformation() {
  const response = await getLocationAndCreateIfMissing();
  const imageResponse = await getImageUrlByName("Navigation Image");
  const hoursResponse = await getDayHours();

  if (hoursResponse.type === "error") {
    try {
      toast.error(hoursResponse.message);
    } catch (error) {
      console.error(error);
    }
  }

  if (response.type === "error") {
    toast.error(response.message);
  }

  const location = response.data;
  const hours = hoursResponse.data;

  return (
    <section className="flex flex-col bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-20">
      <div className="flex flex-col gap-3 md:gap-5">
        <h2 className={`text-7xl font-bold leading-none ${playfair.className}`}>
          Opening Hours and Location
        </h2>
        <p className="text-sm">
          We'd love to welcome you and serve you delicious coffee!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:ga-32 lg:gap-48">
        <div className="flex flex-col gap-12">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </div>
            <div className="font-bold text-sm">Location</div>
            <div className="text-sm">{location.address}</div>
            <div>
              <Link href={location.googleMapsUrl} underline="hover">
                <span className="text-sm">Navigate</span>
              </Link>
            </div>
          </div>
          {/* Opening Hours */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faCalendar} size="2x" />
            </div>
            <div className="font-bold text-sm">Opening Hours</div>
            {Object.keys(Day).map((day) => (
              <DayHours
                key={`${day}-list`}
                day={day}
                dayHours={hours.filter(
                  (dayHoursRecord) => dayHoursRecord.day === day.toLowerCase()
                )}
              />
            ))}
          </div>
        </div>
        <div className="relative md:flex-grow h-56 md:h-auto overflow-hidden">
          <Image
            src={imageResponse.data.url}
            alt={imageResponse.data.altText}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
}
