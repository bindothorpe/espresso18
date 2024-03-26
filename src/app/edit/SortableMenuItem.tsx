import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableMenuItemProps = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string;
  onClick: () => void;
};

export function SortableMenuItem(props: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  function handleClick() {
    console.log("handleClick", props.name);
    props.onClick();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-describedby=""
      className="text-black bg-white my-5 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div>{props.name}</div>
        <div>{props.price}</div>
      </div>
      {props.description && <div>{props.description}</div>}
    </div>
  );
}