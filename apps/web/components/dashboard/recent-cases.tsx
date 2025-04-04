import { StatusBadge } from "@/components/status-badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { ArrowRight, Clock } from "lucide-react";

interface Case {
  id: number;
  client: string;
  type: string;
  status: string;
  lastUpdated: string;
}

interface RecentCasesProps {
  cases: Case[];
}

export function RecentCases({ cases }: RecentCasesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Cases</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{case_.client}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <p>{case_.type}</p>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <StatusBadge status={case_.status} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {case_.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 