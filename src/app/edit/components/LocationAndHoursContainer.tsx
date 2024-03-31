"use client";

import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import EditLocationModal from "./modal/EditLocationModal";

export default function LocationAndHoursContainer(props: {
  location: {
    address: string;
    googleMapsUrl: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mx-2 gap-16 md:gap-32">
      <div>
        <h2 className="text-2xl font-bold mb-2">Location</h2>
        <p>{props.location.address}</p>

        <Link href={props.location.googleMapsUrl} underline="hover">
          Google Maps
        </Link>
        <div className="mt-2">
          <Button color="primary" onClick={() => setIsOpen(true)}>
            Edit Location
          </Button>
        </div>
        <EditLocationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          location={props.location}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Opening hours</h2>
        <p>{props.location.address}</p>

        <Link href={props.location.googleMapsUrl} underline="hover">
          Google Maps
        </Link>
        <div className="mt-2">
          <Button color="primary" onClick={() => setIsOpen(true)}>
            Edit Location
          </Button>
        </div>
        <EditLocationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          location={props.location}
        />
      </div>
    </div>
  );
}
