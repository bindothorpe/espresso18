"use client";

import React from "react";
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

export default function EditItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
}) {
  const [name, setName] = React.useState<string>(props.item.name);
  const [description, setDescription] = React.useState<string>(
    props.item.description as string
  );
  const [price, setPrice] = React.useState<number>(props.item.price);
  const [category, setCategory] = React.useState<string>(props.item.category);

  const categories = ["Coffee", "Pastries", "Other"];

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onClose}
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Item</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            label="Item name"
            placeholder="Enter item name"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Description (optional)"
            placeholder="Enter item description"
            variant="bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Price"
            placeholder="Enter item price"
            variant="bordered"
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Select
            label="Category"
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
        <ModalFooter>
          <Button
            color="default"
            variant="flat"
            onPress={props.onClose}
          >
            Cancel
          </Button>
          <Button color="danger" variant="bordered" onPress={() => console.log("Remove clicked")}>
            Remove
          </Button>
          <Button color="primary" onPress={() => console.log("Save clicked")}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
