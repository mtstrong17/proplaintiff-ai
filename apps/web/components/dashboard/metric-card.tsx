import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="rounded-md bg-primary/10 p-2">{icon}</div>
        {trend !== undefined && (
          <div
            className={cn(
              "flex items-center rounded-full px-2 py-1 text-xs font-medium",
              trend > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {trend > 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
} 