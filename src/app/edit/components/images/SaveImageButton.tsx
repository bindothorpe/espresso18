import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";

export default function SaveImageButton(props: { onClose: () => void }) {
  const { pending } = useFormStatus();
  const prevPendingRef = useRef(pending);

  useEffect(() => {
    if (prevPendingRef.current && !pending) {
      handlePendingChange();
    }
    prevPendingRef.current = pending;
  }, [pending]);

  const handlePendingChange = () => {
    props.onClose();
  };

  return (
    <Button type="submit" color="primary" isDisabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
