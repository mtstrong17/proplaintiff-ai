'use client';

import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentCases } from "@/components/dashboard/recent-cases";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@workspace/ui/components/card";
import {
  BarChart,
  Briefcase,
  Calendar,
  FileText,
  Scale,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const trpc = useTRPC();
  const { data: metrics } = useQuery(trpc.dashboard.getMetrics.queryOptions());
  const { data: recentCases } = useQuery(trpc.dashboard.getRecentCases.queryOptions());
  const { data: upcomingDeadlines } = useQuery(
    trpc.dashboard.getUpcomingDeadlines.queryOptions()
  );
  const { data: casesByStatus } = useQuery(
    trpc.dashboard.getCasesByStatus.queryOptions()
  );

  return (
    <div className="min-h-screen w-full">
      <div className="flex h-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your cases
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Cases"
            value={metrics?.activeCases ?? 0}
            icon={<Briefcase className="h-4 w-4 text-blue-600" />}
            trend={+8}
          />
          <MetricCard
            title="Pending Settlements"
            value={metrics?.pendingSettlements ?? 0}
            icon={<Scale className="h-4 w-4 text-purple-600" />}
            trend={+2}
          />
          <MetricCard
            title="Documents to Review"
            value={metrics?.documentsToReview ?? 0}
            icon={<FileText className="h-4 w-4 text-orange-600" />}
            trend={-3}
          />
          <MetricCard
            title="Upcoming Deadlines"
            value={metrics?.upcomingDeadlines ?? 0}
            icon={<Calendar className="h-4 w-4 text-red-600" />}
            trend={+1}
          />
        </div>

        <div className="grid h-full gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4 lg:row-span-2">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">Case Distribution</h3>
                  <p className="text-sm text-muted-foreground">
                    Distribution of cases by current status
                  </p>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-6 flex-1 space-y-2">
                {casesByStatus && Object.entries(casesByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1 text-sm font-medium">{status}</div>
                    <div className="text-sm text-muted-foreground">{count} cases</div>
                    <div className="w-[30%] rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${(count / Object.values(casesByStatus).reduce((a, b) => a + b, 0)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="col-span-full lg:col-span-3">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Case resolution metrics
                  </p>
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-6 flex-1 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Settlement Time</p>
                    <p className="text-2xl font-bold">4.2 months</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Success Rate</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="col-span-full lg:col-span-4">
            <RecentCases cases={recentCases ?? []} />
          </div>

          <div className="col-span-full lg:col-span-3">
            <UpcomingDeadlines deadlines={upcomingDeadlines ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
} 