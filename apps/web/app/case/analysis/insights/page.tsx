'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import {
  AlertTriangle,
  BookOpen,
  Clock,
  FileText,
  Lightbulb,
  MessageSquare,
  Scale,
  Users,
} from 'lucide-react';

const documentInsights = [
  {
    title: 'Medical Records Analysis',
    type: 'document',
    insights: [
      {
        highlight: 'Emergency Room Records',
        finding:
          'Initial trauma assessment confirms severe injuries consistent with claimed accident mechanism',
        significance: 'high',
        source: 'City General Hospital ER Report',
        date: '2024-01-15',
      },
      {
        highlight: 'Treatment Timeline',
        finding: 'Continuous medical care documented, supporting ongoing injury impact',
        significance: 'medium',
        source: 'Multiple Provider Records',
        date: '2024-01-15 to Present',
      },
    ],
  },
  {
    title: 'Witness Statement Analysis',
    type: 'testimony',
    insights: [
      {
        highlight: 'Eyewitness Account',
        finding: "Three independent witnesses corroborate plaintiff's version of events",
        significance: 'high',
        source: 'Witness Depositions',
        date: '2024-02-10',
      },
      {
        highlight: 'Expert Testimony',
        finding: 'Medical expert confirms injuries are consistent with accident description',
        significance: 'high',
        source: "Dr. Smith's Report",
        date: '2024-02-15',
      },
    ],
  },
];

type LegalInsight = {
  title: string;
  description: string;
  relevance: 'high' | 'medium' | 'low';
} & ({ cases: string[]; details?: never } | { details: string; cases?: never });

const legalAnalysis = [
  {
    category: 'Precedent Cases',
    insights: [
      {
        title: 'Similar Case Outcomes',
        description:
          'Three recent cases in the same jurisdiction with similar fact patterns resulted in favorable verdicts',
        relevance: 'high',
        cases: ['Smith v. Jones (2023)', 'Williams v. Corp (2022)', 'Davis v. City (2023)'],
      } as LegalInsight,
      {
        title: 'Damages Assessment',
        description: 'Average compensation in similar cases ranges from $500,000 to $750,000',
        relevance: 'medium',
        cases: ['Multiple cases analyzed'],
      } as LegalInsight,
    ],
  },
  {
    category: 'Legal Standards',
    insights: [
      {
        title: 'Burden of Proof',
        description: 'Current evidence meets required standard for negligence claim',
        relevance: 'high',
        details: 'Clear demonstration of duty, breach, causation, and damages',
      } as LegalInsight,
      {
        title: 'Statutory Requirements',
        description: 'All filing deadlines and procedural requirements have been met',
        relevance: 'medium',
        details: 'Compliant with state-specific requirements',
      } as LegalInsight,
    ],
  },
];

const timelineEvents = [
  {
    date: '2024-01-15',
    event: 'Incident Occurred',
    type: 'key',
    details: 'Initial injury and emergency response documented',
  },
  {
    date: '2024-01-15',
    event: 'Emergency Treatment',
    type: 'medical',
    details: 'Emergency room visit with initial diagnosis',
  },
  {
    date: '2024-01-20',
    event: 'Follow-up Care',
    type: 'medical',
    details: 'First follow-up with primary care physician',
  },
  {
    date: '2024-02-01',
    event: 'Legal Consultation',
    type: 'legal',
    details: 'Initial meeting with legal counsel',
  },
  {
    date: '2024-02-10',
    event: 'Witness Statements',
    type: 'evidence',
    details: 'Collection of three witness statements',
  },
];

export default function KeyInsights() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            Key Case Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered analysis of case documents, evidence, and legal precedents
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Analysis
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Legal Analysis
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Key Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <div className="grid gap-6">
              {documentInsights.map((section) => (
                <Card key={section.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {section.type === 'document' ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <Users className="h-5 w-5 text-primary" />
                      )}
                      {section.title}
                    </CardTitle>
                    <CardDescription>
                      AI-analyzed insights from{' '}
                      {section.type === 'document' ? 'documents' : 'testimonies'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.insights.map((insight, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{insight.highlight}</h4>
                              <p className="text-sm text-muted-foreground">{insight.finding}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                insight.significance === 'high'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {insight.significance.charAt(0).toUpperCase() +
                                insight.significance.slice(1)}{' '}
                              Significance
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{insight.source}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{insight.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legal">
            <div className="grid gap-6">
              {legalAnalysis.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle>{section.category}</CardTitle>
                    <CardDescription>Analysis of legal precedents and standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.insights.map((insight, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{insight.title}</h4>
                              <p className="text-sm text-muted-foreground">{insight.description}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                insight.relevance === 'high'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {insight.relevance.charAt(0).toUpperCase() +
                                insight.relevance.slice(1)}{' '}
                              Relevance
                            </span>
                          </div>
                          {insight.cases && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {insight.cases.map((caseName, caseIndex) => (
                                <span
                                  key={caseIndex}
                                  className="text-xs bg-muted-foreground/10 px-2 py-1 rounded"
                                >
                                  {caseName}
                                </span>
                              ))}
                            </div>
                          )}
                          {insight.details && (
                            <p className="mt-2 text-sm text-muted-foreground">{insight.details}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Case Timeline
                </CardTitle>
                <CardDescription>
                  Key events and developments in chronological order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`rounded-full p-2 ${
                            event.type === 'key'
                              ? 'bg-primary text-primary-foreground'
                              : event.type === 'medical'
                                ? 'bg-blue-100 text-blue-700'
                                : event.type === 'legal'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {event.type === 'key' ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : event.type === 'medical' ? (
                            <FileText className="h-4 w-4" />
                          ) : event.type === 'legal' ? (
                            <Scale className="h-4 w-4" />
                          ) : (
                            <MessageSquare className="h-4 w-4" />
                          )}
                        </div>
                        {index < timelineEvents.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.event}</span>
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
