"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
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
import { SortableMenuItem } from "./SortableMenuItem";
import AddNewModal from "./AddNewModal";
import EditItemModal from "./EditItemModal";

export default function Edit() {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  } | null>(null);
  function handleEditItem(item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }) {
    setSelectedItem;
  }

  useEffect(() => {
    fetchMenuItems();
  }, []);

  function openAddNewModal() {
    setIsAddNewModalOpen(true);
  }

  function openEditModal(item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }) {
    console.log("openEditModal", item)
    setSelectedItem(item);
    setIsAddNewModalOpen(true);
  }

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menuItems", { next: { tags: ['menuItems'] } });
      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => a.order - b.order);
      setItemsData(sortedData);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  async function updateAllMenuItemOrder() {
    setIsSaving(true);
    try {
      for (let i = 0; i < itemsData.length; i++) {
        if (itemsData[i].order !== i) {
          await updateMenuItemOrder(itemsData[i]._id, i);
        }
      }
    } catch (error) {
      console.error("Error updating menu item order:", error);
    }
    setIsSaving(false);
  }

  const updateMenuItemOrder = async (id: string, order: number) => {
    try {
      await fetch(`/api/menuItems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });
    } catch (error) {
      console.error("Error updating menu item order:", error);
    }
  };

  async function handleAddNewItem(newItem: {
    name: string;
    description: string;
    price: number;
  }) {
    setIsCreating(true);
    try {
      const response = await fetch("/api/menuItems/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        // Item added successfully, refresh the menu items
        fetchMenuItems();
        setIsAddNewModalOpen(false);
      } else {
        console.error("Error adding new menu item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new menu item:", error);
    }
    setIsCreating(true);
  }

  async function handleUpdateItem(updatedItem: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }) {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/menuItems/${updatedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        // Item updated successfully, refresh the menu items
        fetchMenuItems();
        setSelectedItem(null);
      } else {
        console.error("Error updating menu item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
    setIsUpdating(false);
  }

  async function handleRemoveItem(itemId: string) {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/menuItems/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Item removed successfully, refresh the menu items
        fetchMenuItems();
        setSelectedItem(null);
      } else {
        console.error("Error removing menu item:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing menu item:", error);
    }
    setIsRemoving(false);
  }

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
      <div className="flex gap-4 mb-20">
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
          <SortableContext
            items={itemsData.map((item) => item._id)}
            strategy={verticalListSortingStrategy}
          >
            {itemsData.map((item) => (
              <SortableMenuItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                category={item.category}
                onClick={() => openEditModal(item)}
              />
            ))}
          </SortableContext>
          {selectedItem && (
            <EditItemModal
            isOpen={selectedItem !== null}
            onClose={() => setSelectedItem(null)}
            onSubmit={handleUpdateItem}
            onRemove={handleRemoveItem}
            isLoading={isUpdating || isRemoving}
            item={selectedItem}
          />)}
          <div>
            <Button
              className="w-[100%] text-black"
              variant="bordered"
              onClick={openAddNewModal}
            >
              Add New
            </Button>
          </div>
          <AddNewModal
            isOpen={isAddNewModalOpen}
            onClose={() => setIsAddNewModalOpen(false)}
            onSubmit={handleAddNewItem}
            isLoading={isCreating}
          />
          <div>
            <Button
              onClick={updateAllMenuItemOrder}
              isLoading={isSaving}
              className="mt-5"
            >
              {isSaving ? "Saving..." : "Save Order"}
            </Button>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItemsData((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        return reorderedItems;
      });
    }
  }
}
