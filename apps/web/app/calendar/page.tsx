'use client';

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<{ title: string; start: Date; end: Date; }[]>([]);

  const trpc = useTRPC();

  const { data: fetchedEvents } = useQuery(trpc.dashboard.getUpcomingDeadlines.queryOptions());

  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents.map((event: { title: string; dueDate: string; }) => ({
        title: event.title,
        start: new Date(event.dueDate),
        end: new Date(event.dueDate),
      })));
    }
  }, [fetchedEvents]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex h-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
            <p className="text-muted-foreground">
              View and manage your upcoming events and deadlines
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              {/* Event creation form goes here */}
              <p className="text-sm text-muted-foreground">
                Event creation functionality coming soon!
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="flex-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Upcoming Events</CardTitle>
            <CalendarIcon className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-full">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              view={view}
              onView={(newView) => setView(newView as "month" | "week" | "day")}
              views={['month', 'week', 'day']}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 