"use client";

import { Tabs, Tab } from "@nextui-org/react";

export default function TabNavigation(props: {
  menuChildren: React.ReactNode;
  locationAndHoursChildren: React.ReactNode;
  imagesChildren: React.ReactNode;
}) {
  return (
    <div>
      <Tabs variant="underlined" color="primary" aria-label="Edit navigation">
        <Tab key="menu" title="Menu">
          <div className="mt-20">{props.menuChildren}</div>
        </Tab>
        <Tab key="location-and-hours" title="Location and Hours">
          <div className="mt-20 mx-2">{props.locationAndHoursChildren}</div>
        </Tab>
        <Tab key="images" title="Images">
          <div className="mt-20 mx-2">{props.imagesChildren}</div>
        </Tab>
      </Tabs>
    </div>
  );
}
