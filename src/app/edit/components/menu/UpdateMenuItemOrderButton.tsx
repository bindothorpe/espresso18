"use client";
import { Button } from "@nextui-org/react";
import { updateMenuItemOrder } from "../../actions";
import { MenuItem } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";

export default function UpdateMenuItemOrderButton(props: {
  menuItems: MenuItem[];
  onClicked: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateOrder = async () => {
    setLoading(true);
    const response = await updateMenuItemOrder(props.menuItems);

    if (response.type === "success") {
      try {
        toast.success(response.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        toast.error(response.message);
      } catch (error) {
        console.error(error);
      }
    }

    setLoading(false);

    props.onClicked();
  };

  return (
    <Button onClick={handleUpdateOrder} isDisabled={loading}>
      {loading ? "Updating..." : "Update Order"}
    </Button>
  );
}
