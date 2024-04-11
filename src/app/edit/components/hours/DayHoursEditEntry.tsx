import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { DayHoursRecord } from "@prisma/client";
import { useEffect, useState } from "react";

export default function DayHoursEditEntry(props: {
  dayHour: DayHoursRecord;
  onRemove: () => void;
  onChange: (updatedDayHour: DayHoursRecord) => void;
}) {
  const [openTime, setOpenTime] = useState(props.dayHour.openTime);
  const [closeTime, setCloseTime] = useState(props.dayHour.closeTime);

  const handleOpenTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenTime(event.target.value);
  };

  useEffect(() => {
    const updatedDayHour: DayHoursRecord = {
      ...props.dayHour,
      openTime,
      closeTime,
    };
    props.onChange(updatedDayHour);
  }, [openTime, closeTime]);

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCloseTime(event.target.value);
  };

  return (
    <div className="flex gap-4 items-center">
      <Input
        type="text"
        variant="bordered"
        value={openTime}
        onChange={handleOpenTimeChange}
      />
      <span>-</span>
      <Input
        type="text"
        variant="bordered"
        value={closeTime}
        onChange={handleCloseTimeChange}
      />
      <Button variant="flat" isIconOnly onPress={() => props.onRemove()}>
        <FontAwesomeIcon icon={faTrash} color="#222222" />
      </Button>
    </div>
  );
}
