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
import { MenuItem } from "@prisma/client";
import { Category } from "../../constants";
import toast from "react-hot-toast";

export default function EditItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description ?? "");
  const [price, setPrice] = useState(props.item.price.toString());
  const [category, setCategory] = useState(props.item.category);

  const categories = Object.values(Category);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);

      const menuItemData = { 
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as string,
      };
      

      const result = await fetch(`http://localhost:3000/api/menuitems/${props.item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItemData),
      }).then((res) => res.json());
      
      if (result.type === "success") {
        toast.success(result.message);
        props.onClose();
      } else if (result.type === "error") {
        toast.error(result.message);
      }

      setLoading(false);
    },
    [props.item.id]
  );

  const handleRemove = useCallback(async () => {
    setLoadingRemove(true);
    
    const result = await fetch(`http://localhost:3000/api/menuitems/${props.item.id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    
    if (result.type === "success") {
      toast.success(result.message);
      props.onClose();
    } else if (result.type === "error") {
      toast.error(result.message);
    }

    setLoadingRemove(false);
  }, [props.item.id]);

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onClose} placement="auto">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Edit Item</ModalHeader>
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
              defaultSelectedKeys={[props.item.category]}
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
              color="danger"
              variant="bordered"
              onPress={handleRemove}
              isDisabled={loadingRemove}
            >
              {loadingRemove ? "Deleting..." : "Delete"}
            </Button>
            <Button color="primary" type="submit" isDisabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
