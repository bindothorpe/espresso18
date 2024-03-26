import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export type SortableItemProps = {
    id: number;
    name: string;
    price: number;
    description: string | null;
    };


export function SortableItem(props: SortableItemProps) {
const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
} = useSortable({id: props.id});

const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
};
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} aria-describedby="" className='text-black bg-white my-5'>
        <div className='flex justify-between'>
          <div>{props.name}</div>
          <div>{props.price}</div>
        </div>
        {props.description && <div>{props.description}</div>}
    </div>
  );
}