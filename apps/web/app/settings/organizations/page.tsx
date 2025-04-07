'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { Switch } from '@workspace/ui/components/switch';
import { Textarea } from '@workspace/ui/components/textarea';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const organizationSchema = z.object({
  name: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
  }),
  description: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal('')),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    active: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Member',
    active: true,
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Member',
    active: false,
  },
];

export default function OrganizationsPage() {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: 'My Law Firm',
      description: '',
      website: '',
      address: '',
      phone: '',
    },
  });

  function onSubmit(data: OrganizationFormValues) {
    // TODO: Implement organization update
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Manage your organization's profile and settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your organization"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of your organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organization address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Organization</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your organization's team members.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{member.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {member.email} • {member.role}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`active-${member.id}`} className="text-sm">
                    Active
                  </Label>
                  <Switch
                    id={`active-${member.id}`}
                    checked={member.active}
                    onCheckedChange={() => {
                      // TODO: Implement member status toggle
                      console.log(`Toggle ${member.name}'s status`);
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Implement member settings
                    console.log(`Edit ${member.name}'s settings`);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              // TODO: Implement add team member
              console.log('Add team member');
            }}
          >
            Add Team Member
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
          <CardDescription>Configure your organization's preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Require two-factor authentication for all team members
              </p>
            </div>
            <Switch
              id="require-2fa"
              checked={true}
              onCheckedChange={() => {
                // TODO: Implement 2FA requirement toggle
                console.log('Toggle 2FA requirement');
              }}
            />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Single Sign-On (SSO)</h4>
              <p className="text-sm text-muted-foreground">
                Enable SSO authentication for your organization
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                // TODO: Implement SSO configuration
                console.log('Configure SSO');
              }}
            >
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>View recent security and administrative events in your organization.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="time-range">Time Range</Label>
              <Select defaultValue="7d">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Implement export audit log
                console.log('Export audit log');
              }}
            >
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                id: '1',
                timestamp: '2024-03-20T10:30:00Z',
                user: 'John Doe',
                action: 'Changed organization settings',
                details: 'Updated two-factor authentication requirements',
                severity: 'info',
              },
              {
                id: '2',
                timestamp: '2024-03-20T09:15:00Z',
                user: 'Jane Smith',
                action: 'Added team member',
                details: 'Added Bob Wilson as a new team member',
                severity: 'info',
              },
              {
                id: '3',
                timestamp: '2024-03-19T16:45:00Z',
                user: 'John Doe',
                action: 'Security alert',
                details: 'Multiple failed login attempts from unknown IP',
                severity: 'warning',
              },
              {
                id: '4',
                timestamp: '2024-03-19T14:20:00Z',
                user: 'System',
                action: 'Password reset',
                details: 'Password reset for Jane Smith',
                severity: 'info',
              },
              {
                id: '5',
                timestamp: '2024-03-18T11:10:00Z',
                user: 'John Doe',
                action: 'Changed organization details',
                details: 'Updated organization name and address',
                severity: 'info',
              },
            ].map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{event.action}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.details}</p>
                  <p className="text-xs text-muted-foreground">By {event.user}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      event.severity === 'warning'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {event.severity === 'warning' ? 'Warning' : 'Info'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 