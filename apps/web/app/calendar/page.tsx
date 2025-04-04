import { AddEventDialog } from "@/components/calendar/AddEventDialog";
import { CalendarView } from "@/components/calendar/CalendarView";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Suspense } from "react";

export default async function CalendarPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.dashboard.getUpcomingDeadlines.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full">
        <div className="flex h-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
              <p className="text-muted-foreground">
                View and manage your upcoming events and deadlines
              </p>
            </div>
            <AddEventDialog />
          </div>

          <Card className="flex-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-full">
              <Suspense fallback={<div>Loading calendar...</div>}>
                <CalendarView />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </HydrationBoundary>
  );
} 