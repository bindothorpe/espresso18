"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { TextData } from "@prisma/client";
import EditTextModal from "./EditTextModal";
import { useState } from "react";

export default function EditTextCard(props: {
  group: string;
  textDataList: TextData[];
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatGroup = (group: string) => {
    return group
      .replaceAll("_", " > ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <>
      <Card className="max-w-full aspect-square">
        <CardHeader className="flex gap-3">
          <p className="text-sm">{formatGroup(props.group)}</p>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-y-auto h-48">
          {props.textDataList.map((textData: TextData) => {
            return (
              <div key={textData.id}>
                <p className="text-sm font-bold mb-1">{textData.title}</p>
                <p className="text-sm">{textData.text}</p>
              </div>
            );
          })}
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <Button
            color="primary"
            className="w-full"
            onPress={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
        </CardFooter>
      </Card>

      <EditTextModal
        group={props.group}
        textDataList={props.textDataList}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
