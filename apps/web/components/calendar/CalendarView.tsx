'use client';

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, ToolbarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  caseId: string;
};

function CustomToolbar({ onNavigate, label, view, onView }: ToolbarProps<CalendarEvent, object>) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('NEXT')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <h2 className="text-lg font-semibold">{label}</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView('month')}
          className={view === 'month' ? 'bg-accent' : ''}
        >
          Month
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView('week')}
          className={view === 'week' ? 'bg-accent' : ''}
        >
          Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView('day')}
          className={view === 'day' ? 'bg-accent' : ''}
        >
          Day
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView('agenda')}
          className={view === 'agenda' ? 'bg-accent' : ''}
        >
          Agenda
        </Button>
      </div>
    </div>
  );
}

export function CalendarView() {
  const [view, setView] = useState<"month" | "week" | "day" | "agenda">("month");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const trpc = useTRPC();
  const { data: fetchedEvents } = useQuery(trpc.dashboard.getUpcomingDeadlines.queryOptions());

  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      })));
    }
  }, [fetchedEvents]);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      view={view}
      date={date}
      onNavigate={handleNavigate}
      onView={(newView) => setView(newView as "month" | "week" | "day" | "agenda")}
      views={['month', 'week', 'day', 'agenda']}
      components={{
        toolbar: CustomToolbar,
      }}
      length={30}
    />
  );
} 