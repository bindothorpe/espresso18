"use client";
import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { Location } from "@prisma/client";
import toast from "react-hot-toast";
import { Response, updateLocation } from "../../actions";

export default function EditLocationModal(props: {
  isOpen: boolean;
  onClose: () => void;
  location: {
    address: string;
    googleMapsUrl: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(props.location.address);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(
    props.location.googleMapsUrl
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);

      const result: Response = await updateLocation(formData);

      if (result.type === "success") {
        try {
          toast.success(result.message);
        } catch (error) {
          console.error(error);
        }
        props.onClose();
      } else if (result.type === "error") {
        try {
          toast.error(result.message);
        } catch (error) {
          console.error(error);
        }
      }

      setLoading(false);
    },
    [props.location]
  );

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onClose} placement="auto">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit Location
          </ModalHeader>
          <ModalBody>
            <Input
              label="Address"
              placeholder="Enter the address"
              variant="bordered"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
            />
            <Input
              label="Google Maps URL"
              placeholder="Enter the Google Maps URL"
              variant="bordered"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              name="googleMapsUrl"
            />
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
              {loading ? "Saving..." : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
