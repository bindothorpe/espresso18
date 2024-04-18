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
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About Us" },
    { key: "coffee", label: "Our Coffee" },
    { key: "edit", label: "Edit Information" },
  ];

  return (
    <Dropdown backdrop="opaque" radius="sm">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <FontAwesomeIcon icon={faBars} size="2x" color="#222222" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu color="default" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            href={item.key === "home" ? "/" : `/${item.key}`}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
