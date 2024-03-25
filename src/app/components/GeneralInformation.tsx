import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function GeneralInformation() {
  return (
    <section className="flex flex-col bg-white text-black p-20 py-28 gap-y-20">
      <div className="flex flex-col gap-5">
        <h2 className="text-5xl font-bold">Opening Hours and Location</h2>
        <p>We'd love to welcome you and serve you delicious coffee!</p>
      </div>
      <div className="flex gap-48">
        <div className="flex flex-col gap-12">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <div>
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </div>
            <div className="font-bold">Location</div>
            <div>The actual location</div>
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
        <div className="relative flex-grow overflow-hidden">
          <Image
            src="/images/hero_black_and_white.jpg"
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
}
