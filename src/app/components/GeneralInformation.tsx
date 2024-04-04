import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  getImageUrlByName,
  getLocationAndCreateIfMissing,
} from "../edit/actions";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/react";

export default async function GeneralInformation() {
  const response = await getLocationAndCreateIfMissing();
  const imageResponse = await getImageUrlByName("Navigation Image");

  if (response.type === "error") {
    toast.error(response.message);
  }

  const location = response.data;

  return (
    <section className="flex flex-col bg-white text-black p-8 md:p-20 py-12 md:py-28 gap-16 md:gap-20">
      <div className="flex flex-col gap-3 md:gap-5">
        <h2 className="text-3xl md:text-5xl font-bold">
          Opening Hours and Location
        </h2>
        <p>{"We'd love to welcome you and serve you delicious coffee!"}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:ga-32 lg:gap-48">
        <div className="flex flex-col gap-12">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </div>
            <div className="font-bold">Location</div>
            <div>{location.address}</div>
            <div>
              <Link href={location.googleMapsUrl} underline="hover">
                Navigate
              </Link>
            </div>
          </div>
          {/* Opening Hours */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faCalendar} size="2x" />
            </div>
            <div className="font-bold">Opening Hours</div>
            <div>Tuesday - Sunday: 8:15 am - 1:00 pm and</div>
            <div>2:00 pm - 7:00 pm</div>
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
