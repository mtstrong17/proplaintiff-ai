import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ArrowRight, Calendar } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  start: Date;
  end: Date;
  caseId: string;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Deadlines</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          View Calendar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{deadline.title}</p>
                <p className="text-sm text-muted-foreground">Case: {deadline.caseId}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" />
                {deadline.start.toLocaleDateString()} - {deadline.end.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
