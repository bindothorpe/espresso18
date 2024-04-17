"use client";

import React, { Key } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function MenuButton() {
  const router = useRouter();

  const handleNavigation = (key: Key) => {
    if (key.toString() === "home") {
      router.push("/");
    } else {
      router.push(`/${key}`);
    }
  };

  return (
    <Dropdown backdrop="opaque" radius="sm">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <FontAwesomeIcon icon={faBars} size="2x" color="#222222" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleNavigation} color="default">
        <DropdownItem key="home">Home</DropdownItem>
        <DropdownItem key="about">About Us</DropdownItem>
        {/* <DropdownItem key="coffee">Our Coffee</DropdownItem>
        <DropdownItem key="menu">Menu</DropdownItem>
        <DropdownItem key="hours">Opening Hours</DropdownItem> */}
        <DropdownItem key="edit">Edit Information</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
