"use client";

import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function MenuButton() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="about">About Us</DropdownItem>
        <DropdownItem key="coffee">Our Coffee</DropdownItem>
        <DropdownItem key="menu">Menu</DropdownItem>
        <DropdownItem key="hours">Opening Hours</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
