import { Case } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Clock } from "lucide-react";

interface RecentCasesProps {
  cases: Case[];
}

export function RecentCases({ cases }: RecentCasesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Cases</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cases.map((case_) => (
            <div key={case_.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{case_.client}</p>
                <p className="text-sm text-muted-foreground">
                  {case_.type} - {case_.status}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {case_.lastActivity}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 