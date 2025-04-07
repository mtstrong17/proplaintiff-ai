'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { CheckCircle2 } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the Pro plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Plan Status</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm font-medium">Next Billing Date</p>
                  <p className="text-sm text-muted-foreground">May 1, 2024</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Plan Features</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced AI Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Team Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Change Plan</Button>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Manage your payment methods and billing history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Billing Address</p>
                <p className="text-sm text-muted-foreground">
                  123 Main St, Suite 100<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Billing History</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 