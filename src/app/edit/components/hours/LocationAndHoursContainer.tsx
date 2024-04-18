"use client";

import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import EditLocationModal from "./EditLocationModal";
import { Day } from "../../constants";
import DayHours from "./DayHours";
import { DayHoursRecord } from "@prisma/client";
import EditHoursModal from "./EditHoursModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function LocationAndHoursContainer(props: {
  location: {
    address: string;
    googleMapsUrl: string;
  };
  dayHours: DayHoursRecord[];
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mx-2 gap-16 md:gap-32">
      <div>
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-bold mb-2">Location</h2>
          <Button
            variant="flat"
            isIconOnly
            size="sm"
            onPress={() => setIsLocationOpen(true)}
          >
            <FontAwesomeIcon icon={faPencil} color="#222222" />
          </Button>
        </div>
        <p className="text-sm">{props.location.address}</p>

        <Link
          href={props.location.googleMapsUrl}
          underline="hover"
          className="text-sm"
        >
          Google Maps
        </Link>
        <EditLocationModal
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
          location={props.location}
        />
      </div>
      <div>
        <div className="flex align-middle gap-4">
          <h2 className="text-lg font-bold mb-4">Opening hours</h2>
          <Button
            variant="flat"
            isIconOnly
            size="sm"
            onPress={() => setIsHoursOpen(true)}
          >
            <FontAwesomeIcon icon={faPencil} color="#222222" />
          </Button>
        </div>
        {Object.keys(Day).map((day) => (
          <DayHours
            key={`${day}-list`}
            day={day}
            dayHours={props.dayHours.filter(
              (dayHoursRecord) => dayHoursRecord.day === day.toLowerCase()
            )}
          />
        ))}

        <EditHoursModal
          dayHours={props.dayHours}
          isOpen={isHoursOpen}
          onClose={() => setIsHoursOpen(false)}
        />
      </div>
    </div>
  );
}
