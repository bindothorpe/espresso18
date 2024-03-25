"use client";

import React from "react";
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
  return (
    <Dropdown backdrop="opaque" radius="sm">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <FontAwesomeIcon icon={faBars} size="2x" color="#222222"/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => alert(key)}
        color="default"
      >
        <DropdownItem key="about">About Us</DropdownItem>
        <DropdownItem key="coffee">Our Coffee</DropdownItem>
        <DropdownItem key="menu">Menu</DropdownItem>
        <DropdownItem key="hours">Opening Hours</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
