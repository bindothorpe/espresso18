"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import {
  Response,
  createDayHours,
  updateDayHours,
  deleteDayHours,
} from "../../actions";
import { DayHoursRecord } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Day } from "../../constants";
import DayHoursEditEntry from "./DayHoursEditEntry";

export default function EditHoursModal(props: {
  dayHours: DayHoursRecord[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [dayHoursToCreate, setDayHoursToCreate] = useState<DayHoursRecord[]>(
    []
  );
  const [dayHoursToUpdate, setDayHoursToUpdate] = useState<DayHoursRecord[]>(
    []
  );
  const [dayHoursToRemove, setDayHoursToRemove] = useState<DayHoursRecord[]>(
    []
  );

  useEffect(() => {
    if (props.isOpen) {
      setDayHoursToCreate([]);
      setDayHoursToUpdate([]);
      setDayHoursToRemove([]);
    }
  }, [props.isOpen]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      const updateResult: Response = await updateDayHours(dayHoursToUpdate);
      const createResult: Response = await createDayHours(dayHoursToCreate);
      const deleteResult: Response = await deleteDayHours(dayHoursToRemove);

      setDayHoursToCreate([]);
      setDayHoursToUpdate([]);
      setDayHoursToRemove([]);

      if (
        updateResult.type === "success" &&
        createResult.type === "success" &&
        deleteResult.type === "success"
      ) {
        toast.success(updateResult.message);
        props.onClose();
      } else {
        toast.error(updateResult.message);
      }

      setLoading(false);
    },
    [dayHoursToCreate, dayHoursToRemove, dayHoursToUpdate, props.dayHours]
  );

  function getHoursOfDay(day: string): DayHoursRecord[] {
    const existingHours = props.dayHours.filter(
      (dayHoursRecord) => dayHoursRecord.day === day.toLowerCase()
    );

    const newHours = dayHoursToCreate.filter(
      (dayHoursRecord) => dayHoursRecord.day === day.toLowerCase()
    );

    const allHours = [...existingHours, ...newHours].filter(
      (dayHoursRecord) => !dayHoursToRemove.includes(dayHoursRecord)
    );

    // Sort the hours based on the opening time
    allHours.sort((a, b) => {
      const compareTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const openTimeA = compareTime(a.openTime);
      const openTimeB = compareTime(b.openTime);

      return openTimeA - openTimeB;
    });

    return allHours;
  }

  function addToUpdateList(dayHoursRecord: DayHoursRecord) {
    if (dayHoursRecord.id.startsWith("temp")) {
      setDayHoursToCreate((prevDayHoursToCreate) => [
        ...prevDayHoursToCreate.filter(
          (dayHours) => dayHours.id !== dayHoursRecord.id
        ),
        dayHoursRecord,
      ]);
      return;
    }

    const originalEntry = props.dayHours.find(
      (dayHours) => dayHours.id === dayHoursRecord.id
    );

    if (originalEntry) {
      if (
        originalEntry.openTime === dayHoursRecord.openTime &&
        originalEntry.closeTime === dayHoursRecord.closeTime
      ) {
        setDayHoursToUpdate((prevDayHoursToUpdate) =>
          prevDayHoursToUpdate.filter(
            (dayHours) => dayHours.id !== dayHoursRecord.id
          )
        );
        return;
      }
    }

    if (
      dayHoursToUpdate.some((dayHours) => dayHours.id === dayHoursRecord.id)
    ) {
      setDayHoursToUpdate((prevDayHoursToUpdate) =>
        prevDayHoursToUpdate.map((dayHours) =>
          dayHours.id === dayHoursRecord.id ? dayHoursRecord : dayHours
        )
      );
    } else {
      setDayHoursToUpdate((prevDayHoursToUpdate) => [
        ...prevDayHoursToUpdate,
        dayHoursRecord,
      ]);
    }
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  function addToCreateList(day: string) {
    const uuid = generateUniqueId();

    const newDayHoursRecord: DayHoursRecord = {
      id: `temp-${uuid}`,
      day: day.toLowerCase(),
      openTime: "",
      closeTime: "",
    };

    if (dayHoursToCreate.includes(newDayHoursRecord)) {
      return;
    }
    setDayHoursToCreate([...dayHoursToCreate, newDayHoursRecord]);
  }

  function addToRemoveList(dayHoursRecord: DayHoursRecord) {
    if (dayHoursRecord.id.startsWith("temp")) {
      setDayHoursToCreate(
        dayHoursToCreate.filter((dayHours) => dayHours.id !== dayHoursRecord.id)
      );
      return;
    }

    if (dayHoursToRemove.includes(dayHoursRecord)) {
      return;
    }

    setDayHoursToRemove([...dayHoursToRemove, dayHoursRecord]);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onClose}
      placement="auto"
      scrollBehavior="outside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit Opening Hours
          </ModalHeader>
          <ModalBody>
            {Object.keys(Day).map((day: string, dayIndex: number) => (
              <>
                <div key={dayIndex} className="font-bold">
                  {day}
                </div>
                {getHoursOfDay(day).length === 0 ? (
                  <div>Closed</div>
                ) : (
                  getHoursOfDay(day).map(
                    (dayHour: DayHoursRecord, entryIndex: number) => (
                      <DayHoursEditEntry
                        key={entryIndex}
                        dayHour={dayHour}
                        onChange={addToUpdateList}
                        onRemove={() => addToRemoveList(dayHour)}
                      />
                    )
                  )
                )}
                <Button
                  variant="flat"
                  isIconOnly
                  onPress={() => addToCreateList(day)}
                >
                  <FontAwesomeIcon icon={faPlus} color="#222222" />
                </Button>
              </>
            ))}
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="default"
              variant="bordered"
              onPress={props.onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" isDisabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
