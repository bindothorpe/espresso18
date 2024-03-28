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
import { deleteMenuItem, updateMenuItem } from "../../actions";
import { Category } from "../../constants";

export default function EditItemModal(props: {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [result, setResult] = useState("");
  const [resultRemove, setResultRemove] = useState("");
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description ?? "");
  const [price, setPrice] = useState(props.item.price.toString());
  const [category, setCategory] = useState(props.item.category);

  const categories = Object.values(Category);

  /**
   * Reset result message after 3 seconds
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (result === "Error") {
      timer = setTimeout(() => {
        setResult("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [result]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resultRemove === "Error") {
      timer = setTimeout(() => {
        setResult("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resultRemove]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const result = await updateMenuItem(props.item.id, formData);
      setResult(result.message);
      setLoading(false);
    },
    [props.item.id]
  );

  const handleRemove = useCallback(async () => {
    setLoadingRemove(true);
    const result = await deleteMenuItem(props.item.id);
    setResultRemove(result.message);
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
              {loadingRemove
                ? "Deleting..."
                : resultRemove === ""
                ? "Delete"
                : resultRemove}
            </Button>
            <Button color="primary" type="submit" isDisabled={loading}>
              {loading ? "Saving..." : result === "" ? "Save" : result}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
