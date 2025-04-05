"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Label } from "@workspace/ui/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Switch } from "@workspace/ui/components/switch"

const notificationSettings = [
  {
    id: "case-updates",
    title: "Case Updates",
    description: "Get notified when there are updates to your cases",
    enabled: true,
  },
  {
    id: "deadlines",
    title: "Deadlines",
    description: "Receive reminders for upcoming deadlines and court dates",
    enabled: true,
  },
  {
    id: "document-updates",
    title: "Document Updates",
    description: "Get notified when documents are added or modified",
    enabled: true,
  },
  {
    id: "client-messages",
    title: "Client Messages",
    description: "Receive notifications for new client messages",
    enabled: true,
  },
  {
    id: "team-updates",
    title: "Team Updates",
    description: "Get notified about team member activities and updates",
    enabled: false,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive and how you want to receive them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="notification-method">Notification Method</Label>
              <Select defaultValue="email-instant">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select notification method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email-instant">Email (Instant)</SelectItem>
                  <SelectItem value="email-digest">Email (Daily Digest)</SelectItem>
                  <SelectItem value="push">Push Notifications</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="quiet-hours">Quiet Hours</Label>
              <Select defaultValue="none">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select quiet hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No quiet hours</SelectItem>
                  <SelectItem value="night">10 PM - 7 AM</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-medium">Notification Types</h3>
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between space-x-4 rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <Label htmlFor={setting.id} className="text-sm font-medium">
                    {setting.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.enabled}
                  onCheckedChange={() => {
                    // TODO: Implement notification toggle
                    console.log(`Toggle ${setting.title}`)
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 