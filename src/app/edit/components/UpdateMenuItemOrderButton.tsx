"use client";
import { Button } from "@nextui-org/react";
import { updateMenuItemOrder } from "../actions";
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
    const response = await fetch("http://localhost:3000/api/menuitems", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.menuItems),
    }).then((res) => res.json());

    
    if (response.type === "success") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setLoading(false);

    props.onClicked();
  };

  return <Button onClick={handleUpdateOrder} isDisabled={loading}>
    {loading ? "Updating..." : "Update Order"}
  </Button>;
}
