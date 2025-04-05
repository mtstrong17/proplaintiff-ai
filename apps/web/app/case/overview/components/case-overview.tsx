'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import {
    AlertCircle,
    Calendar,
    Clock,
    DollarSign,
    FileText,
    Users,
} from "lucide-react";

export function CaseOverview() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Case Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,000</div>
            <p className="text-xs text-muted-foreground">
              Estimated settlement value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Since case opened
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Total documents collected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parties</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Involved in the case
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Case Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Case Progress</CardTitle>
          <CardDescription>
            Current stage and completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Investigation Phase</div>
                <div className="text-muted-foreground">75%</div>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Document Collection</div>
                <div className="text-muted-foreground">60%</div>
              </div>
              <Progress value={60} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Settlement Negotiation</div>
                <div className="text-muted-foreground">25%</div>
              </div>
              <Progress value={25} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Details and Updates */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Critical dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Medical Records Request Due",
                  date: "Apr 15, 2024",
                  priority: "high",
                },
                {
                  title: "Settlement Demand Letter",
                  date: "Apr 20, 2024",
                  priority: "medium",
                },
                {
                  title: "Client Follow-up Meeting",
                  date: "Apr 25, 2024",
                  priority: "low",
                },
              ].map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {deadline.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {deadline.date}
                    </p>
                  </div>
                  <PriorityIcon priority={deadline.priority} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Document Added",
                  description: "Medical records from City Hospital",
                  timestamp: "2 hours ago",
                },
                {
                  action: "Note Added",
                  description: "Client called to provide additional information",
                  timestamp: "5 hours ago",
                },
                {
                  action: "Task Completed",
                  description: "Initial case evaluation completed",
                  timestamp: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg border p-3"
                >
                  <ActivityIcon action={activity.action} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PriorityIcon({ priority }: { priority: string }) {
  const colors = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  }

  return (
    <AlertCircle className={`h-4 w-4 ${colors[priority as keyof typeof colors]}`} />
  )
}

function ActivityIcon({ action }: { action: string }) {
  const icons = {
    "Document Added": FileText,
    "Note Added": AlertCircle,
    "Task Completed": Calendar,
  }

  const Icon = icons[action as keyof typeof icons] || AlertCircle

  return <Icon className="h-4 w-4 text-muted-foreground" />
} 