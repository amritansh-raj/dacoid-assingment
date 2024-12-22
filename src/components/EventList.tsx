import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { useCalendarStore } from "@/store/calendar";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { EventListItem } from "./EventListItem";

interface EventListProps {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void;
}

export function EventList({ date, isOpen, onClose, onAddNew }: EventListProps) {
  const getEventsForDate = useCalendarStore((state) => state.getEventsForDate);
  const events = getEventsForDate(formatDateToYYYYMMDD(date));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Events for </DialogTitle>
          <DialogDescription>{format(date, "MMMM d, yyyy")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ">
          {events.length === 0 ? (
            <p className="text-center text-gray-500">No events for this day</p>
          ) : (
            <div className="space-y-2">
              {events.map((event) => (
                <EventListItem key={event.id} event={event} onClose={onClose} />
              ))}
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={onAddNew} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
