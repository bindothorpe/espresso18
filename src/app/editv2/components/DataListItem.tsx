"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuItem } from "@prisma/client";

export default function DataListItem(props: MenuItem) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  function handleOnClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log("handleOnClick", props.name);
  }

  return (
    <div
      key={props.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-describedby=""
      onClick={handleOnClick}
      className="text-black bg-white my-5 cursor-pointer"
    >
      <div className="flex justify-between">
        <div>{props.name}</div>
        <div>{props.price}</div>
      </div>
      {props.description && <div>{props.description}</div>}
    </div>
  );
}
