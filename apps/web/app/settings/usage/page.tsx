'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Progress } from '@workspace/ui/components/progress';

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Usage</h3>
        <p className="text-sm text-muted-foreground">
          Monitor your usage and limits
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Storage</CardTitle>
            <CardDescription>
              Track your document storage usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Storage Used</p>
                  <p className="text-sm text-muted-foreground">2.5 GB / 10 GB</p>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Documents</p>
                <p className="text-sm text-muted-foreground">125 / Unlimited</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>
              Monitor your AI analysis usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Monthly Analysis Credits</p>
                  <p className="text-sm text-muted-foreground">750 / 1,000</p>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Documents Analyzed</p>
                <p className="text-sm text-muted-foreground">45 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Usage</CardTitle>
            <CardDescription>
              Track your team's usage and limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Active Users</p>
                  <p className="text-sm text-muted-foreground">3 / 5</p>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Storage per User</p>
                  <p className="text-sm text-muted-foreground">833 MB / 2 GB</p>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>
              View your usage history and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Last Month</p>
                  <Badge variant="outline">+15%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Last 3 Months</p>
                  <Badge variant="outline">+32%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Last 6 Months</p>
                  <Badge variant="outline">+48%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 