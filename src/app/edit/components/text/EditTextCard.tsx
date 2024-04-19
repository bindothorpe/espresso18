import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { TextData } from "@prisma/client";

export default function EditTextCard(props: {
  group: string;
  textDataList: TextData[];
}) {
  const formatGroup = (group: string) => {
    return group
      .replaceAll("_", " > ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Card className="max-w-full aspect-square">
      <CardHeader className="flex gap-3">
        <p className="text-sm">{formatGroup(props.group)}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-center space-y-4">
        {props.textDataList.map((textData: TextData) => {
          return (
            <div key={textData.id} className="text-center">
              <p className="text-sm font-bold mb-1">{textData.title}</p>
              <p className="text-sm">{textData.text}</p>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="justify-center">
        <Button color="primary" className="w-full">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
