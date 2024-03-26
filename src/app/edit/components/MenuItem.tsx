// MenuItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type MenuItemProps = {
  id: number;
  key: number;
  name: string;
  price: number;
  description: string | null;
};

export default function MenuItem(props: MenuItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col text-black bg-white"
      aria-describedby="" // Disable the aria-describedby attribute
    >
      <div className="flex justify-between">
        <span>{props.name}</span>
        <span>{props.price}</span>
      </div>
      {props.description && <p>{props.description}</p>}
    </div>
  );
}