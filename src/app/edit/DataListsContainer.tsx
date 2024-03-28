"use client";

import { MenuItem } from "@prisma/client";
import { Category } from "./constants";
import DataList from "./components/DataList";
import { useState } from "react";
import UpdateMenuItemOrderButton from "./components/UpdateMenuItemOrderButton";

export default function DataListsContainer(props: { menuItems: MenuItem[] }) {
  const [menuItemsToUpdate, setMenuItemsToUpdate] = useState<MenuItem[]>([]);

  function handleUpdateMenuItems(item: MenuItem) {
    setMenuItemsToUpdate((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, update its order
        return prevItems.map((i) => (i.id === item.id ? item : i));
      } else {
        // If the item doesn't exist, add it to the array
        return [...prevItems, item];
      }
    });
  }

  function clearMenuItemsToUpdate() {
    setMenuItemsToUpdate([]);
  }

  return (
    <>
      <div className="flex md:flex-row flex-col gap-8">
        <DataList
          category={Category.Coffee}
          menuItems={props.menuItems}
          onUpdateMenuItem={handleUpdateMenuItems}
        />
        <DataList
          category={Category.Pastries}
          menuItems={props.menuItems}
          onUpdateMenuItem={handleUpdateMenuItems}
        />
        <DataList
          category={Category.Other}
          menuItems={props.menuItems}
          onUpdateMenuItem={handleUpdateMenuItems}
        />
      </div>
      {menuItemsToUpdate.length > 0 && (
        <div className="flex justify-center">
          <UpdateMenuItemOrderButton
            menuItems={menuItemsToUpdate}
            onClicked={clearMenuItemsToUpdate}
          />
        </div>
      )}
    </>
  );
}
