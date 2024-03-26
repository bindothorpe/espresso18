import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableMenuItemProps = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string;
  onEdit: (item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }) => void;
};

export function SortableMenuItem(props: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  function handleClick() {

    props.onEdit({
      _id: props.id,
      name: props.name,
      description: props.description || "",
      price: props.price,
      category: props.category,
    });
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