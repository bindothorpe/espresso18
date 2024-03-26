"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Tabs, Tab } from "@nextui-org/react";

import { SortableItem } from "./SortableItem";

export default function Edit() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [itemsData, setItemsData] = useState([
    { id: 1, name: "Espresso", price: 6, description: null },
    { id: 2, name: "Doppio", price: 7, description: null },
    { id: 3, name: "Cortado", price: 8, description: null },
    { id: 4, name: "Lungo", price: 7, description: null },
    { id: 5, name: "Macchiato", price: 8, description: null },
    { id: 6, name: "Americano", price: 7, description: null },
    { id: 7, name: "Capuccino", price: 9, description: null },
    { id: 8, name: "Flat White", price: 9, description: null },
    { id: 9, name: "Coffee with Milk", price: 9, description: null },
    { id: 10, name: "Latte", price: 10, description: null },
    { id: 11, name: "Mocha", price: 11, description: null },
  ]);
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <div className="flex gap-4  mb-20">
        <Tabs variant="underlined" color="primary" aria-label="Edit navigation">
          <Tab key="menu" title="Menu" />
          <Tab key="location-and-hours" title="Location and Hours" />
          <Tab key="images" title="Images" />
        </Tabs>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="w-[100%] md:w-1/3 ml-2 mr-2">
          <h2>Coffee</h2>

          {/* //Horizontal line */}
          <div className="h-[2px] bg-black my-5"></div>

          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => {
              const itemData = itemsData.find((item) => item.id === id);
              if (!itemData) {
                return null;
              }
              return (
                <SortableItem
                  key={itemData.id}
                  id={itemData.id}
                  name={itemData.name}
                  price={itemData.price}
                  description={itemData.description}
                />
              );
            })}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );



  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;

    console.log(items);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
