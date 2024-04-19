"use client";
import { Tabs, Tab } from "@nextui-org/react";

export default function TabNavigation(props: {
  menuChildren: React.ReactNode;
  locationAndHoursChildren: React.ReactNode;
  imagesChildren: React.ReactNode;
  textChildren: React.ReactNode;
}) {
  const styling = {
    tabList: "flex justify-between w-full",
    tab: "flex-1 text-sm",
  };

  return (
    <div>
      <Tabs
        variant="underlined"
        color="primary"
        aria-label="Edit navigation"
        className="w-[100%]"
      >
        <Tab key="menu" title="Menu">
          <div className="mt-20">{props.menuChildren}</div>
        </Tab>
        <Tab key="location-and-hours" title="Location and Hours">
          <div className="mt-20 mx-2">{props.locationAndHoursChildren}</div>
        </Tab>
        <Tab key="images" title="Images">
          <div className="mt-20 mx-2">{props.imagesChildren}</div>
        </Tab>
        <Tab key="text" title="Text">
          <div className="mt-20 mx-2">{props.textChildren}</div>
        </Tab>
      </Tabs>
    </div>
  );
}
