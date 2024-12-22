import { useCalendarStore } from "@/store/calendar";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EventDialog from "./EventDialog";
import { EventList } from "./EventList";
import { Button } from "./ui/button";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const getEventsForDate = useCalendarStore((state) => state.getEventsForDate);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const events = getEventsForDate(format(startOfDay(date), "yyyy-MM-dd"));
    if (events.length > 0) {
      setIsEventListOpen(true);
    } else {
      setIsEventDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button onClick={previousMonth} aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}

        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
        {days.map((day) => {
          const formattedDate = format(startOfDay(day), "yyyy-MM-dd");
          const events = getEventsForDate(formattedDate);
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <button
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={`
                min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 border rounded-lg relative
                transition-colors duration-200 
                ${
                  isCurrentMonth
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-50 text-gray-400"
                }
                ${isToday ? "ring-2 ring-primary" : ""}
                ${isSelected ? "bg-blue-50" : ""}
              `}
            >
              <span
                className={`text-sm font-base ${
                  isToday ? "font-black text-primary" : ""
                }`}
              >
                {format(day, "d")}
              </span>
              {events.length > 0 && (
                <>
                  <div className="absolute -top-2 -left-2 sm:hidden">
                    <div className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 w-6 h-6 flex items-center justify-center">
                      {events.length}
                    </div>
                  </div>

                  <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2 sm:block hidden">
                    <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                      {events.length} event{events.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {isEventDialogOpen && selectedDate && (
        <EventDialog
          date={selectedDate}
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
        />
      )}
      {isEventListOpen && selectedDate && (
        <EventList
          date={selectedDate}
          isOpen={isEventListOpen}
          onClose={() => setIsEventListOpen(false)}
          onAddNew={() => {
            setIsEventListOpen(false);
            setIsEventDialogOpen(true);
          }}
        />
      )}
    </div>
  );
}
