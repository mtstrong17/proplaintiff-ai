'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import {
  AlertCircle,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Flag,
  Heart,
  History,
  MessageCircle,
  Scale,
  Stethoscope,
  Timer,
} from 'lucide-react';
import { useState } from 'react';

type TimelineEvent = {
  id: string;
  date: Date;
  type:
    | 'document'
    | 'communication'
    | 'milestone'
    | 'deadline'
    | 'note'
    | 'status'
    | 'medical'
    | 'incident';
  title: string;
  description: string;
  category: 'legal' | 'client' | 'court' | 'internal' | 'medical';
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
  completed?: boolean;
  documentUrl?: string;
};

const eventTypeIcons = {
  document: FileText,
  communication: MessageCircle,
  milestone: Flag,
  deadline: Timer,
  note: AlertCircle,
  status: Scale,
  medical: Stethoscope,
  incident: Heart,
};

const categoryColors = {
  legal: 'bg-blue-500',
  client: 'bg-green-500',
  court: 'bg-purple-500',
  internal: 'bg-gray-500',
  medical: 'bg-rose-500',
};

const priorityColors = {
  low: 'bg-slate-400',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

// Sample timeline events with past and future events
const sampleEvents: TimelineEvent[] = [
  {
    id: 'incident-1',
    date: new Date('2024-02-15'),
    type: 'incident',
    title: 'Incident Occurred',
    description: 'Motor vehicle accident at intersection of Main St and 5th Ave',
    category: 'client',
    completed: true,
    metadata: {
      location: 'Main St & 5th Ave',
      type: 'Motor Vehicle Accident',
      policeReport: '#2024-0234',
    },
  },
  {
    id: 'medical-1',
    date: new Date('2024-02-15'),
    type: 'medical',
    title: 'Emergency Room Visit',
    description: 'Initial emergency treatment at City General Hospital',
    category: 'medical',
    completed: true,
    metadata: {
      provider: 'City General Hospital',
      diagnosis: 'Whiplash, Contusions',
      treatment: 'Pain medication, Neck brace',
    },
    documentUrl: '/documents/er-report.pdf',
  },
  {
    id: 'medical-2',
    date: new Date('2024-02-22'),
    type: 'medical',
    title: 'Follow-up with Primary Care',
    description: 'Initial follow-up assessment and treatment plan',
    category: 'medical',
    completed: true,
    metadata: {
      provider: 'Dr. Sarah Johnson',
      diagnosis: 'Cervical strain, Lumbar sprain',
      treatment: 'Physical therapy referral',
    },
    documentUrl: '/documents/primary-care-report.pdf',
  },
  {
    id: 'medical-3',
    date: new Date('2024-03-01'),
    type: 'medical',
    title: 'Physical Therapy Begins',
    description: 'Initial physical therapy session and evaluation',
    category: 'medical',
    completed: true,
    metadata: {
      provider: 'Elite Physical Therapy',
      plan: '2x weekly for 6 weeks',
      focus: 'Neck and back rehabilitation',
    },
  },
  {
    id: '1',
    date: new Date('2024-03-15'),
    type: 'document',
    title: 'Initial Client Documents Received',
    description: 'Medical records and incident report received from client',
    category: 'client',
    completed: true,
    documentUrl: '/documents/initial-records.pdf',
  },
  {
    id: 'medical-4',
    date: new Date('2024-03-30'),
    type: 'medical',
    title: 'Orthopedic Specialist Consultation',
    description: 'Specialist evaluation of ongoing symptoms',
    category: 'medical',
    completed: true,
    metadata: {
      provider: 'Dr. Michael Chen',
      diagnosis: 'Herniated disc L4-L5',
      treatment: 'Continue PT, medication adjustment',
    },
    documentUrl: '/documents/orthopedic-report.pdf',
  },
  {
    id: '2',
    date: new Date('2024-04-01'),
    type: 'milestone',
    title: 'Case Filed',
    description: 'Initial complaint filed with the court',
    category: 'legal',
    completed: true,
    metadata: {
      caseNumber: '2024-CV-1234',
      court: 'Superior Court',
    },
  },
  {
    id: 'medical-5',
    date: new Date('2024-04-15'),
    type: 'medical',
    title: 'MRI Scan',
    description: 'Diagnostic imaging of cervical and lumbar spine',
    category: 'medical',
    completed: false,
    metadata: {
      facility: 'Advanced Imaging Center',
      type: 'MRI with contrast',
      bodyPart: 'Cervical and lumbar spine',
    },
  },
  {
    id: '3',
    date: new Date('2024-04-15'),
    type: 'deadline',
    title: 'Defendant Response Due',
    description: 'Deadline for defendant to file response to complaint',
    category: 'court',
    priority: 'high',
    completed: false,
  },
  {
    id: 'medical-6',
    date: new Date('2024-05-01'),
    type: 'medical',
    title: 'Physical Therapy Re-evaluation',
    description: 'Progress assessment and treatment plan update',
    category: 'medical',
    completed: false,
    metadata: {
      provider: 'Elite Physical Therapy',
      duration: 'Extended 4 more weeks',
    },
  },
  {
    id: '4',
    date: new Date('2024-05-01'),
    type: 'milestone',
    title: 'Discovery Period Begins',
    description: 'Start of discovery phase',
    category: 'legal',
    completed: false,
  },
  {
    id: '5',
    date: new Date('2024-06-15'),
    type: 'deadline',
    title: 'Discovery Deadline',
    description: 'All discovery requests must be submitted',
    category: 'legal',
    priority: 'medium',
    completed: false,
  },
  {
    id: '6',
    date: new Date('2024-07-01'),
    type: 'milestone',
    title: 'Mediation',
    description: 'Scheduled mediation with opposing counsel',
    category: 'court',
    completed: false,
    metadata: {
      location: 'County Courthouse',
      mediator: 'Judge Smith',
    },
  },
];

export function CaseTimeline() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [timeView, setTimeView] = useState<'all' | 'past' | 'future'>('all');
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  const now = new Date();

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const filteredEvents = sampleEvents
    .filter((event) => {
      if (timeView === 'past') return event.date <= now;
      if (timeView === 'future') return event.date > now;
      return true;
    })
    .filter((event) => selectedTypes.length === 0 || selectedTypes.includes(event.type))
    .filter(
      (event) => selectedCategories.length === 0 || selectedCategories.includes(event.category)
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant={timeView === 'past' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeView((prev) => (prev === 'past' ? 'all' : 'past'))}
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Past Events
            </Button>
            <Button
              variant={timeView === 'future' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeView((prev) => (prev === 'future' ? 'all' : 'future'))}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Future Events
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(eventTypeIcons).map(([type, Icon]) => (
                <Button
                  key={type}
                  variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleType(type)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(categoryColors).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-8">
          {filteredEvents.map((event, index) => {
            const Icon = eventTypeIcons[event.type];
            const isExpanded = expandedEvents.includes(event.id);
            const isPast = event.date <= now;

            return (
              <div
                key={event.id}
                className={`relative pl-12 ${isPast ? 'opacity-75' : ''}`}
                onClick={() => toggleEventExpansion(event.id)}
              >
                <div
                  className={`absolute left-6 w-3 h-3 rounded-full -translate-x-1/2 border-2 
                    ${event.completed ? 'bg-green-500 border-green-600' : 'bg-background border-muted-foreground'}
                    ${isPast ? 'border-muted' : ''}`}
                />
                <Card
                  className={`
                  transition-all duration-200 cursor-pointer
                  ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}
                `}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${categoryColors[event.category]} shrink-0`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{event.title}</h3>
                            {event.priority && (
                              <div
                                className={`h-2 w-2 rounded-full ${priorityColors[event.priority]}`}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <CalendarDays className="h-4 w-4" />
                            {event.date.toLocaleDateString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        {event.metadata && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(event.metadata).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-muted-foreground">{key}: </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {event.documentUrl && (
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            View Document
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
