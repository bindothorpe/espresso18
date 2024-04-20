"use client";
import React, { Key } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

export default function MenuButton() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About Us" },
    { key: "coffee", label: "Our Coffee" },
  ];

  if (!isLoading && isAuthenticated) {
    items.push({ key: "edit", label: "Edit Information" });
    items.push({ key: "logout", label: "Logout" });
  }

  return (
    <Dropdown backdrop="opaque" radius="sm">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <FontAwesomeIcon icon={faBars} size="2x" color="#222222" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu color="default" items={items}>
        {(item) => {
          if (item.key === "logout") {
            return (
              <DropdownItem
                key={item.key}
                className="text-danger"
                color="danger"
              >
                <LogoutLink>{item.label}</LogoutLink>
              </DropdownItem>
            );
          } else {
            return (
              <DropdownItem
                key={item.key}
                href={item.key === "home" ? "/" : `/${item.key}`}
              >
                {item.label}
              </DropdownItem>
            );
          }
        }}
      </DropdownMenu>
    </Dropdown>
  );
}
