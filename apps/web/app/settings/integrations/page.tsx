"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

const integrations = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync your case deadlines and events with Google Calendar",
    enabled: false,
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Connect your Outlook calendar and email",
    enabled: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Store and sync case documents with Dropbox",
    enabled: false,
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Send and receive electronic signatures for legal documents",
    enabled: false,
  },
]

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your account with other services to enhance your workflow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{integration.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  id={integration.id}
                  checked={integration.enabled}
                  onCheckedChange={() => {
                    // TODO: Implement integration toggle
                    console.log(`Toggle ${integration.name}`)
                  }}
                />
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for external integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex space-x-2">
              <Input
                id="api-key"
                type="password"
                value="************************"
                readOnly
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex space-x-2">
              <Input
                id="webhook-url"
                type="text"
                value="https://api.proplaintiff.ai/webhooks/your-unique-id"
                readOnly
              />
              <Button variant="outline">Copy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 