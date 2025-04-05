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
    </div>
  );
} 