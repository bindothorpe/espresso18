import React from "react";
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

interface AddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: {
    name: string;
    description: string;
    price: number;
    category: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const categories = ["Coffee", "Pastries", "Other"];

export default function AddNewModal({ isOpen, onClose, onSubmit, isLoading }: AddNewModalProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState("");

  function handleSubmit() {
    onSubmit({ name, description, price, category });
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add new Item</ModalHeader>
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
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
            Add Item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}