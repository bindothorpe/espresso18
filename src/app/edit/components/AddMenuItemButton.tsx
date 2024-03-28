"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import AddItemModal from "./modal/AddItemModal";

export default function AddMenuItemButton() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setIsEditModalOpen(true)}>Add Item</Button>
      <AddItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
