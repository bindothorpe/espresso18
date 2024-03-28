"use client";

import { Tabs, Tab } from "@nextui-org/react";

export default function TabNavigation() {
  return (
    <div className="flex gap-4 mb-20">
      <Tabs variant="underlined" color="primary" aria-label="Edit navigation">
        <Tab key="menu" title="Menu" />
        <Tab key="location-and-hours" title="Location and Hours" />
        <Tab key="images" title="Images" />
      </Tabs>
    </div>
  );
}
