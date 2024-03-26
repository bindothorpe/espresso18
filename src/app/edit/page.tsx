"use client";

import React, {useState} from 'react';
import {
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import MenuItem, {MenuItemProps} from './components/MenuItem';

export default function Edit() {
  const [items, setItems] = useState([
    {id: 1, key: 1, name: 'Pizza', price: 5, description: 'Delicious'},
    {id: 2, key: 2, name: 'Burger', price: 6, description: 'Tasty'},
    {id: 3, key: 3, name: 'Fries', price: 3, description: 'Crispy'},
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className='w-1/3'>
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => {
          console.log(item);
          return (<MenuItem id={item.id} key={item.key} name={item.name} price={item.price} description={item.description} />)
        })}
      </SortableContext>
    </DndContext>
    </div>
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;
    
    // console.log(active.id, over.id);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = active.id;
        const newIndex = over.id;
        
        console.log(oldIndex, newIndex);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}