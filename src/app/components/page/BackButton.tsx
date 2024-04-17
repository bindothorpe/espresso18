"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton(props: { path: string }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(props.path);
  };

  return (
    <Button radius="sm" onPress={handleNavigation} variant="light" isIconOnly>
      <FontAwesomeIcon icon={faArrowLeft} size="2x" color="#222222" />
    </Button>
  );
}
