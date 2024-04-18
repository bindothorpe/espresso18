import { DayHoursRecord } from "@prisma/client";

export default function DayHours(props: {
  day: string;
  dayHours: DayHoursRecord[];
}) {
  const sortedDayHours = [...props.dayHours].sort((a, b) => {
    const compareTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const openTimeA = compareTime(a.openTime);
    const openTimeB = compareTime(b.openTime);

    return openTimeA - openTimeB;
  });

  return (
    <div>
      <h3 className="font-bold text-sm">{props.day}</h3>
      <div className="mb-2 text-sm">
        {sortedDayHours.length === 0
          ? "Closed"
          : sortedDayHours.map((dayHour) => (
              <div key={dayHour.id}>
                <span className="text-sm">{dayHour.openTime}</span> -{" "}
                <span className="text-sm">{dayHour.closeTime}</span>
              </div>
            ))}
      </div>
    </div>
  );
}
