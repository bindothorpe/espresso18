import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface EditItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedItem: {
      _id: string;
      name: string;
      description: string;
      price: number;
      category: string;
    }) => Promise<void>;
    onRemove: (itemId: string) => Promise<void>;
    isLoading: boolean;
    item: {
      _id: string;
      name: string;
      description: string;
      price: number;
      category: string;
    };
  }

const categories = ["Coffee", "Pastries", "Other"];

export default function EditItemModal({
  isOpen,
  onClose,
  onSubmit,
  onRemove,
  isLoading,
  item,
}: EditItemModalProps) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  function handleSubmit() {
    onSubmit({
      _id: item._id,
      name,
      description,
      price,
      category,
    });
  }

  function handleRemove() {
    setShowRemoveConfirmation(true);
  }

  function handleConfirmRemove() {
    onRemove(item._id);
    setShowRemoveConfirmation(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      {!showRemoveConfirmation ? (
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
            <Button color="danger" variant="flat" onPress={handleRemove}>
              Remove
            </Button>
            <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Remove</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to remove this item?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={() => setShowRemoveConfirmation(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleConfirmRemove} isLoading={isLoading}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}