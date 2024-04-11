"use client";

import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import EditLocationModal from "./EditLocationModal";
import { Day } from "../../constants";
import DayHours from "./DayHours";
import { DayHoursRecord } from "@prisma/client";
import EditHoursModal from "./EditHoursModal";

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
        <h2 className="text-2xl font-bold mb-2">Location</h2>
        <p>{props.location.address}</p>

        <Link href={props.location.googleMapsUrl} underline="hover">
          Google Maps
        </Link>
        <div className="mt-2">
          <Button color="primary" onClick={() => setIsLocationOpen(true)}>
            Edit Location
          </Button>
        </div>
        <EditLocationModal
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
          location={props.location}
        />
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-4">Opening hours</h2>
        {Object.keys(Day).map((day) => (
          <DayHours
            key={`${day}-list`}
            day={day}
            dayHours={props.dayHours.filter(
              (dayHoursRecord) => dayHoursRecord.day === day.toLowerCase()
            )}
          />
        ))}
        <div className="mt-2">
          <Button color="primary" onClick={() => setIsHoursOpen(true)}>
            Edit Opening Hours
          </Button>
        </div>
        <EditHoursModal
          dayHours={props.dayHours}
          isOpen={isHoursOpen}
          onClose={() => setIsHoursOpen(false)}
        />
      </div>
    </div>
  );
}
