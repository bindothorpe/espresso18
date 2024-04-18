import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, TimeInput } from "@nextui-org/react";
import { DayHoursRecord } from "@prisma/client";
import { useEffect, useState } from "react";
import { Time } from "@internationalized/date";

export default function DayHoursEditEntry(props: {
  dayHour: DayHoursRecord;
  onRemove: () => void;
  onChange: (updatedDayHour: DayHoursRecord) => void;
}) {
  const [openTime, setOpenTime] = useState<Time>(
    new Time(
      parseInt(props.dayHour.openTime.split(":")[0]),
      parseInt(props.dayHour.openTime.split(":")[1])
    )
  );
  const [closeTime, setCloseTime] = useState<Time>(
    new Time(
      parseInt(props.dayHour.closeTime.split(":")[0]),
      parseInt(props.dayHour.closeTime.split(":")[1])
    )
  );

  const timeToString = (time: Time): string => {
    return `${time.hour}:${time.minute > 9 ? time.minute : "0" + time.minute}`;
  };

  useEffect(() => {
    const updatedDayHour: DayHoursRecord = {
      ...props.dayHour,
      openTime: timeToString(openTime),
      closeTime: timeToString(closeTime),
    };
    props.onChange(updatedDayHour);
  }, [openTime, closeTime]);

  return (
    <div className="flex gap-4 items-center">
      <TimeInput
        shouldForceLeadingZeros
        variant="bordered"
        hourCycle={24}
        value={openTime}
        onChange={setOpenTime}
      />
      <span>-</span>
      <TimeInput
        shouldForceLeadingZeros
        variant="bordered"
        hourCycle={24}
        value={closeTime}
        onChange={setCloseTime}
      />
      <Button variant="flat" isIconOnly onPress={() => props.onRemove()}>
        <FontAwesomeIcon icon={faTrash} color="#222222" />
      </Button>
    </div>
  );
}
