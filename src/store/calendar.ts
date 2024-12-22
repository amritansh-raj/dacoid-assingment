import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  color?: string;
}

interface CalendarState {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: string) => Event[];
  searchEvents: (query: string) => Event[];
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (event) => {
        const newEvent = {
          ...event,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          events: [...state.events, newEvent],
        }));
      },
      updateEvent: (id, updatedEvent) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          ),
        }));
      },
      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },
      getEventsForDate: (date) => {
        return get().events.filter(
          (event) => new Date(event.date).toISOString().split("T")[0] === date
        );
      },
      searchEvents: (query) => {
        const lowercaseQuery = query.toLowerCase();
        return get().events.filter(
          (event) =>
            event.title.toLowerCase().includes(lowercaseQuery) ||
            event.description?.toLowerCase().includes(lowercaseQuery)
        );
      },
    }),
    {
      name: "calendar-store",
    }
  )
);
