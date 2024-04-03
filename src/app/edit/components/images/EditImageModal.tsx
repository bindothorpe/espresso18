import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { uploadImage } from "../../actions";

export default function EditImageModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onClose} placement="auto">
      <form action={uploadImage}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Image</ModalHeader>
          <ModalBody>
            <div
              className={`w-full h-64 flex justify-center items-center flex-col gap-4 font-bold hover:cursor-pointer border-2 border-dashed rounded-lg border-black`}
              onClick={handleClick}
            >
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                size="2x"
                color="#222222"
              />
              <span>Upload an image</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="image"
                name="image"
                style={{ display: "none" }}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button color="default" variant="bordered" onPress={props.onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
