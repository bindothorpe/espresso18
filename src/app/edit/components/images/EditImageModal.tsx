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
import { useEffect, useRef, useState } from "react";
import { updateImage, uploadImage } from "../../actions";
import SaveImageButton from "./SaveImageButton";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

const startingState = null;

export default function EditImageModal(props: {
  isOpen: boolean;
  onClose: () => void;
  imageId: string;
  imageTitle: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [state, formAction] = useFormState(uploadImage, startingState);

  useEffect(() => {
    const updateImageAsync = async () => {
      if (state === null) return;

      console.log(props.imageId);
      const result = await updateImage(props.imageId, state);

      if (result.type === "success") {
        toast.success(result.message);
        clearFormAndCloseModal();
      } else {
        toast.error(result.message);
      }
    };

    updateImageAsync();
  }, [state]);

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
      <form action={formAction}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit: {props.imageTitle}
          </ModalHeader>
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
            <SaveImageButton />
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
