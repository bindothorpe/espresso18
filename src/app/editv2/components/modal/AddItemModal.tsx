"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { createMenuItem } from "../../actions";
import { Category } from "../../constants";
import toast from "react-hot-toast";

export default function AddItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const categories = Object.values(Category);


  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const result = await createMenuItem(formData);

      if(result.type === "success") {
        toast.success(result.message);
        clearFormAndClose()
      } else if(result.type === "error") {
        toast.error(result.message);
      }


      setLoading(false);
    },
    []
  );

  function clearFormAndClose() {
    setName("");
    setDescription("");
    setPrice("");
    setCategory(categories[0]);
    props.onClose();
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={clearFormAndClose} placement="auto">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Add Item</ModalHeader>
          <ModalBody>
            <Input
              label="Item name"
              placeholder="Enter item name"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <Input
              label="Description (optional)"
              placeholder="Enter item description"
              variant="bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
            <Input
              label="Price"
              placeholder="Enter item price"
              variant="bordered"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
            />
            <Select
              label="Category"
              name="category"
              defaultSelectedKeys={[categories[0]]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="default"
              variant="bordered"
              onPress={clearFormAndClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" isDisabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
