"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { updateTextData } from "../../actions";
import { TextData } from "@prisma/client";
import { Group } from "../../constants";

export default function EditTextModal(props: {
  group: string;
  isOpen: boolean;
  onClose: () => void;
  textDataList: TextData[];
}) {
  const [loading, setLoading] = useState(false);
  const [textDataState, setTextDataState] = useState<TextData[]>([]);

  useEffect(() => {
    setTextDataState(props.textDataList);
  }, [props.textDataList]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const updatePromises = textDataState.map((textData) =>
        updateTextData(textData.id, props.group as Group, textData.text)
      );
      const results = await Promise.all(updatePromises);
      const hasError = results.some((result) => result.type === "error");
      if (hasError) {
        try {
          toast.error("Some updates failed. Please try again.");
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          toast.success("Text data updated successfully.");
        } catch (error) {
          console.error(error);
        }
        props.onClose();
      }
      setLoading(false);
    },
    [textDataState]
  );

  const handleTextChange = (id: string, text: string) => {
    setTextDataState((prevState) =>
      prevState.map((textData) =>
        textData.id === id ? { ...textData, text } : textData
      )
    );
  };

  const formatGroup = (group: string) => {
    return group
      .replaceAll("_", " > ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onClose} placement="auto">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit: {formatGroup(props.group)}
          </ModalHeader>
          <ModalBody>
            {textDataState.map((textData) => (
              <Input
                key={textData.id}
                label={textData.title}
                placeholder="Enter text"
                variant="bordered"
                value={textData.text}
                onChange={(e) => handleTextChange(textData.id, e.target.value)}
                name={`text-${textData.id}`}
              />
            ))}
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="default"
              variant="bordered"
              onPress={props.onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" isDisabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
