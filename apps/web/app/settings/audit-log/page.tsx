'use client';

import { Button } from '@workspace/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { Search } from 'lucide-react';
import { useState } from 'react';

type AuditEvent = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'error';
  category: 'security' | 'user' | 'organization' | 'system';
};

const sampleEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: '2024-03-20T10:30:00Z',
    user: 'John Doe',
    action: 'Changed organization settings',
    details: 'Updated two-factor authentication requirements',
    severity: 'info',
    category: 'organization',
  },
  {
    id: '2',
    timestamp: '2024-03-20T09:15:00Z',
    user: 'Jane Smith',
    action: 'Added team member',
    details: 'Added Bob Wilson as a new team member',
    severity: 'info',
    category: 'user',
  },
  {
    id: '3',
    timestamp: '2024-03-19T16:45:00Z',
    user: 'John Doe',
    action: 'Security alert',
    details: 'Multiple failed login attempts from unknown IP',
    severity: 'warning',
    category: 'security',
  },
  {
    id: '4',
    timestamp: '2024-03-19T14:20:00Z',
    user: 'System',
    action: 'Password reset',
    details: 'Password reset for Jane Smith',
    severity: 'info',
    category: 'security',
  },
  {
    id: '5',
    timestamp: '2024-03-18T11:10:00Z',
    user: 'John Doe',
    action: 'Changed organization details',
    details: 'Updated organization name and address',
    severity: 'info',
    category: 'organization',
  },
  {
    id: '6',
    timestamp: '2024-03-18T09:30:00Z',
    user: 'System',
    action: 'System maintenance',
    details: 'Database backup completed',
    severity: 'info',
    category: 'system',
  },
  {
    id: '7',
    timestamp: '2024-03-17T15:20:00Z',
    user: 'Jane Smith',
    action: 'Security alert',
    details: 'Suspicious activity detected',
    severity: 'error',
    category: 'security',
  },
];

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch =
      event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>
            View and filter security and administrative events in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
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
              <div className="flex items-center space-x-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="system">System</SelectItem>
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
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{event.action}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          event.category === 'security'
                            ? 'bg-purple-100 text-purple-600'
                            : event.category === 'user'
                            ? 'bg-blue-100 text-blue-600'
                            : event.category === 'organization'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
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
                        : event.severity === 'error'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                  </span>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="flex items-center justify-center rounded-lg border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No events found matching your filters.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 