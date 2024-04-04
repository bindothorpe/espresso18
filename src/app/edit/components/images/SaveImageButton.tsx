import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function SaveImageButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" isDisabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
