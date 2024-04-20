"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function NavigationButton(props: {
  label: string | JSX.Element | JSX.Element[];
  path: string;
  arrowRight?: boolean;
}) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(props.path);
  };

  if (props.arrowRight === true)
    return (
      <Button
        color="primary"
        radius="sm"
        onPress={handleNavigation}
        endContent={<FontAwesomeIcon icon={faChevronRight} color="#E9E9E9" />}
      >
        {props.label}
      </Button>
    );

  return (
    <Button
      color="primary"
      radius="sm"
      onPress={handleNavigation}
      className="text-sm"
    >
      {props.label}
    </Button>
  );
}
