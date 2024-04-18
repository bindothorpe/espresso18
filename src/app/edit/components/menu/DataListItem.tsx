"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuItem } from "@prisma/client";
import { useState } from "react";
import EditItemModal from "./EditItemModal";

export default function DataListItem(props: MenuItem) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <>
      <div
        key={props.id}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        aria-describedby=""
        onClick={() => setIsEditModalOpen(true)}
        className="text-black bg-white my-5 cursor-pointer"
      >
        <div className="flex justify-between">
          <div className="text-sm">{props.name}</div>
          <div className="text-sm">{props.price}</div>
        </div>
        {props.description && (
          <div className="text-sm">{props.description}</div>
        )}
      </div>
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={props}
      />
    </>
  );
}
