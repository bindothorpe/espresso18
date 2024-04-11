"use client";

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

import { MenuItem } from "@prisma/client";
import DataListItem from "./DataListItem";
import { useEffect, useState } from "react";

export default function DataList(props: {
  category: string;
  menuItems: MenuItem[];
  onUpdateMenuItem: (item: MenuItem) => void;
}) {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const filteredMenuData = props.menuItems.filter(
      (item) =>
        item.category.toLocaleLowerCase() === props.category.toLowerCase()
    );

    const sortedMenuData = filteredMenuData.sort((a, b) => a.order - b.order);
    setItems(sortedMenuData);
  }, [props.menuItems, props.category]);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: { active: any; over: any }): void {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // console.log(newItems);
        newItems.forEach((item, index) => {
          if (item.order !== index) {
            item.order = index;
            props.onUpdateMenuItem(item);
          }
        });
        return newItems;
      });
    }
  }

  return (
    <div className="w-[100%] ml-2 mr-2">
      <h2>{props.category}</h2> {/* Title */}
      <div className="h-[2px] bg-black my-5"></div> {/* Horizontal Line */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <DataListItem key={item.id} {...item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
