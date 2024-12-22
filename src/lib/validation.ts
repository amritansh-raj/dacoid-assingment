import { Event } from "@/store/calendar";

export function isTimeSlotAvailable(
  events: Event[],
  newStartSeconds: number,
  newEndSeconds: number,
  excludeEventId?: string
): boolean {
  if (newEndSeconds <= newStartSeconds) {
    return false;
  }

  return !events.some((event) => {
    if (excludeEventId && event.id === excludeEventId) {
      return false;
    }

    return (
      (newStartSeconds >= event.startSeconds &&
        newStartSeconds < event.endSeconds) ||
      (newEndSeconds > event.startSeconds &&
        newEndSeconds <= event.endSeconds) ||
      (newStartSeconds <= event.startSeconds &&
        newEndSeconds >= event.endSeconds)
    );
  });
}

export function getTimeSlotError(
  events: Event[],
  startSeconds: number,
  endSeconds: number,
  excludeEventId?: string
): string | null {
  if (endSeconds <= startSeconds) {
    return "End time must be after start time";
  }

  if (!isTimeSlotAvailable(events, startSeconds, endSeconds, excludeEventId)) {
    return "This time slot overlaps with an existing event";
  }

  return null;
}
