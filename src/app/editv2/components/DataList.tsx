"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { MenuItem } from "@prisma/client";
import DataListItem from "./DataListItem";

export default function DataList(props: {
  category: string;
  menuData: MenuItem[];
}) {
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredMenuData = props.menuData.filter(
    (item) => item.category.toLocaleLowerCase() === props.category.toLowerCase()
  );

  const sortedMenuData = filteredMenuData.sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent): void {
    console.log("handleDragEnd", event);
  }

  return (
    <div className="w-[100%] ml-2 mr-2">
      <h2>{props.category}</h2> {/* Title */}
      <div className="h-[2px] bg-black my-5"></div> {/* Horizontal Line */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>

          <SortableContext
          items={sortedMenuData.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
          >

        {sortedMenuData.map((item) => (
          <DataListItem key={item.id} {...item} />
        ))}

        </SortableContext>
        
      </DndContext>
    </div>
  );
}
