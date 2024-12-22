import { colorMap } from "@/lib/constansts";
import { formatTime } from "@/lib/utils";
import { Event, useCalendarStore } from "@/store/calendar";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EventDialog from "./EventDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface EventListItemProps {
  event: Event;
  onClose: () => void;
}

const defaultColor = "blue";

export function EventListItem({ event, onClose }: EventListItemProps) {
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const { bg, text, hover } = colorMap[event.color || defaultColor];

  const deleteEvent = useCalendarStore((state) => state.deleteEvent);

  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <div
      className={`p-3 rounded-lg border ${hover} transition-colors ${bg} ${text}`}
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h3 className="text-start font-medium">{event.title}</h3>
          <p className="text-sm ">
            {formatTime(new Date(`2000-01-01T${event.startTime}`))} -{" "}
            {formatTime(new Date(`2000-01-01T${event.endTime}`))}
          </p>
          {event.description && (
            <p className="text-sm  mt-1">{event.description}</p>
          )}
        </div>
        <Button
          onClick={() => {
            setIsEventDialogOpen(true);
            console.log("first");
          }}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-800"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{event.title}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <EventDialog
          date={event.date}
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false);
            onClose();
          }}
          event={event}
        />
      </div>
    </div>
  );
}
