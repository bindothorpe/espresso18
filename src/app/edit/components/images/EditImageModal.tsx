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
import { useRef, useState } from "react";
import { uploadImage } from "../../actions";

export default function EditImageModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFormAndCloseModal = () => {
    setPreviewImage(null);
    props.onClose();
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={clearFormAndCloseModal}
      placement="auto"
    >
      <form action={uploadImage}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Image</ModalHeader>
          <ModalBody>
            <div
              className={`w-full h-64 flex justify-center items-center flex-col gap-4 font-bold hover:cursor-pointer border-2 border-dashed rounded-lg border-black`}
              onClick={handleClick}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-full"
                />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    size="2x"
                    color="#222222"
                  />
                  <span>Upload an image</span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="image"
                name="image"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="default"
              variant="bordered"
              onPress={clearFormAndCloseModal}
            >
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
