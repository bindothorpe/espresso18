import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  getDayHours,
  getImageUrlByName,
  getLocationAndCreateIfMissing,
  getTextDataByGroup,
} from "../../edit/actions";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/react";
import { Day, Group } from "../../edit/constants";
import DayHours from "../../edit/components/hours/DayHours";
import { playfair } from "@/app/fonts";
import parse from "html-react-parser";

export default async function GeneralInformation() {
  const response = await getLocationAndCreateIfMissing();
  const imageResponse = await getImageUrlByName("Navigation Image");
  const hoursResponse = await getDayHours();
  const textResponse = await getTextDataByGroup(Group.HomeInfo);

  if (textResponse.type === "error") {
    try {
      toast.error(textResponse.message);
    } catch (error) {
      console.error(error);
    }
    return <>There was an error loading the text. Please try again.</>;
  }

  if (hoursResponse.type === "error") {
    try {
      toast.error(hoursResponse.message);
    } catch (error) {
      console.error(error);
    }
    return <>There was an error loading the hours. Please try again.</>;
  }

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
    return <>There was an error loading the location. Please try again.</>;
  }

  const parsedTitle = parse(textResponse.data[0].text);
  const parsedSubtitle = parse(textResponse.data[1].text);
  const parsedLocationTitle = parse(textResponse.data[2].text);
  const parsedLocationLink = parse(textResponse.data[3].text);
  const parsedHoursTitle = parse(textResponse.data[4].text);

  const location = response.data;
  const hours = hoursResponse.data;

  return (
    <section className="flex flex-col bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-20">
      <div className="flex flex-col gap-3 md:gap-5">
        <h2 className={`text-7xl font-bold leading-none ${playfair.className}`}>
          {parsedTitle}
        </h2>
        <p className="text-sm">{parsedSubtitle}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:ga-32 lg:gap-48">
        <div className="flex flex-col gap-12">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </div>
            <div className="font-bold text-sm">{parsedLocationTitle}</div>
            <div className="text-sm">{location.address}</div>
            <div>
              <Link href={location.googleMapsUrl} underline="hover">
                <span className="text-sm">{parsedLocationLink}</span>
              </Link>
            </div>
          </div>
          {/* Opening Hours */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faCalendar} size="2x" />
            </div>
            <div className="font-bold text-sm">{parsedHoursTitle}</div>
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
