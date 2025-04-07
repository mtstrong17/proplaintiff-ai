'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { AlertCircle, Brain, FileText, Scale, Target } from 'lucide-react';
import { useState } from 'react';

type CaseInsight = {
  id: string;
  type: string;
  subType?: string;
  significance?: string;
  title: string;
  insight: string;
  citations: Array<{
    id: string;
    text: string;
    context: string;
    source: string;
    type: 'key-fact' | 'evidence' | 'argument' | 'reference';
  }>;
  metadata?: Record<string, any>;
  createdAt: Date;
};

const insightTypeIcons = {
  liability: Scale,
  damages: Target,
  evidence: FileText,
  strategy: Brain,
  default: AlertCircle,
};

const insightTypeColors = {
  liability: 'bg-blue-50 text-blue-700 border-blue-200',
  damages: 'bg-green-50 text-green-700 border-green-200',
  evidence: 'bg-purple-50 text-purple-700 border-purple-200',
  strategy: 'bg-orange-50 text-orange-700 border-orange-200',
  default: 'bg-gray-50 text-gray-700 border-gray-200',
};

const citationTypeColors = {
  'key-fact': 'bg-blue-50 text-blue-700 border-blue-200',
  evidence: 'bg-green-50 text-green-700 border-green-200',
  argument: 'bg-purple-50 text-purple-700 border-purple-200',
  reference: 'bg-orange-50 text-orange-700 border-orange-200',
};

// Sample insights data
const sampleInsights: CaseInsight[] = [
  {
    id: '1',
    type: 'liability',
    subType: 'negligence',
    significance: 'high',
    title: 'Clear Negligence in Traffic Signal Violation',
    insight: 'The defendant ran a red light, which is a clear violation of traffic laws and establishes negligence. This is supported by multiple witness statements and the police report.',
    citations: [
      {
        id: 'c1',
        text: 'Vehicle 1 failed to stop at red light, causing collision with Vehicle 2',
        context: 'Police Report',
        source: 'Police Report #2024-0234',
        type: 'key-fact',
      },
      {
        id: 'c2',
        text: 'Witness 1 confirms seeing Vehicle 1 enter intersection after light turned red',
        context: 'Witness Statement',
        source: 'Witness Statement - John Doe',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'significant',
      relatedDocuments: ['police-report.pdf', 'witness-1.pdf'],
    },
    createdAt: new Date('2024-02-16'),
  },
  {
    id: '2',
    type: 'damages',
    subType: 'medical',
    significance: 'high',
    title: 'Severe Whiplash Injury with Long-term Impact',
    insight: 'The medical records indicate a severe whiplash injury that has resulted in chronic pain and limited mobility. This is likely to require ongoing treatment and may impact the client\'s ability to work.',
    citations: [
      {
        id: 'c3',
        text: 'Patient presents with severe neck pain and limited range of motion consistent with whiplash injury',
        context: 'Initial Assessment',
        source: 'ER Report',
        type: 'evidence',
      },
      {
        id: 'c4',
        text: 'MRI shows significant soft tissue damage in cervical region',
        context: 'Diagnostic Results',
        source: 'MRI Report',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'significant',
      relatedDocuments: ['er-report.pdf', 'mri-report.pdf'],
    },
    createdAt: new Date('2024-02-17'),
  },
  {
    id: '3',
    type: 'liability',
    subType: 'premises',
    significance: 'medium',
    title: 'Property Owner Failed to Maintain Safe Walkway',
    insight: 'The property owner failed to maintain the walkway in a safe condition, leading to a slip and fall accident. The incident report and maintenance records show a pattern of neglect.',
    citations: [
      {
        id: 'c5',
        text: 'Walkway surface was uneven with multiple cracks and missing sections',
        context: 'Incident Report',
        source: 'Incident Report #2024-0156',
        type: 'key-fact',
      },
      {
        id: 'c6',
        text: 'No maintenance records for walkway repairs in past 12 months',
        context: 'Property Records',
        source: 'Property Maintenance Log',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'medium',
      impact: 'moderate',
      relatedDocuments: ['incident-report.pdf', 'maintenance-log.pdf'],
    },
    createdAt: new Date('2024-02-18'),
  },
  {
    id: '4',
    type: 'damages',
    subType: 'lost-wages',
    significance: 'high',
    title: 'Significant Lost Wages Due to Injury',
    insight: 'The client has suffered substantial lost wages due to their inability to work following the accident. This includes both past and future lost earnings.',
    citations: [
      {
        id: 'c7',
        text: 'Client unable to work for 3 months following accident',
        context: 'Employment Records',
        source: 'Employer Statement',
        type: 'key-fact',
      },
      {
        id: 'c8',
        text: 'Annual salary of $85,000 with projected 5% annual growth',
        context: 'Financial Records',
        source: 'Pay Stubs and Tax Returns',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'significant',
      relatedDocuments: ['employer-statement.pdf', 'pay-stubs.pdf'],
    },
    createdAt: new Date('2024-02-19'),
  },
  {
    id: '5',
    type: 'evidence',
    subType: 'documentary',
    significance: 'high',
    title: 'Surveillance Footage Confirms Incident',
    insight: 'Security camera footage from the property clearly shows the incident and supports the client\'s account of events.',
    citations: [
      {
        id: 'c9',
        text: 'Video timestamp 14:23:45 shows client walking on uneven surface',
        context: 'Video Evidence',
        source: 'Security Camera Footage',
        type: 'evidence',
      },
      {
        id: 'c10',
        text: 'No warning signs or barriers present in footage',
        context: 'Video Evidence',
        source: 'Security Camera Footage',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'significant',
      relatedDocuments: ['surveillance-footage.mp4'],
    },
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '6',
    type: 'strategy',
    subType: 'settlement',
    significance: 'high',
    title: 'Strong Case for Early Settlement',
    insight: 'Given the clear liability and substantial damages, there is a strong case for pursuing an early settlement with the insurance company.',
    citations: [
      {
        id: 'c11',
        text: 'Similar cases in this jurisdiction settled for $200,000-$300,000',
        context: 'Case Research',
        source: 'Legal Database Search',
        type: 'reference',
      },
      {
        id: 'c12',
        text: 'Defendant\'s insurance policy has $500,000 coverage limit',
        context: 'Insurance Information',
        source: 'Insurance Policy',
        type: 'key-fact',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'significant',
      relatedDocuments: ['case-research.pdf', 'insurance-policy.pdf'],
    },
    createdAt: new Date('2024-02-21'),
  },
  {
    id: '7',
    type: 'evidence',
    subType: 'expert',
    significance: 'medium',
    title: 'Engineering Expert Analysis of Accident Scene',
    insight: 'An engineering expert has analyzed the accident scene and determined that the walkway conditions were unsafe and violated building codes.',
    citations: [
      {
        id: 'c13',
        text: 'Walkway surface deviation exceeds maximum allowed by 2.5 inches',
        context: 'Expert Report',
        source: 'Engineering Analysis Report',
        type: 'evidence',
      },
      {
        id: 'c14',
        text: 'Multiple violations of local building codes identified',
        context: 'Expert Report',
        source: 'Engineering Analysis Report',
        type: 'evidence',
      },
    ],
    metadata: {
      confidence: 'high',
      impact: 'moderate',
      relatedDocuments: ['engineering-report.pdf'],
    },
    createdAt: new Date('2024-02-22'),
  },
  {
    id: '8',
    type: 'strategy',
    subType: 'litigation',
    significance: 'medium',
    title: 'Potential for Punitive Damages',
    insight: 'The defendant\'s pattern of neglect and failure to address known hazards may support a claim for punitive damages.',
    citations: [
      {
        id: 'c15',
        text: 'Multiple previous complaints about walkway conditions',
        context: 'Property Records',
        source: 'Tenant Complaint Log',
        type: 'evidence',
      },
      {
        id: 'c16',
        text: 'State law allows punitive damages for willful disregard of safety',
        context: 'Legal Research',
        source: 'State Statutes',
        type: 'reference',
      },
    ],
    metadata: {
      confidence: 'medium',
      impact: 'moderate',
      relatedDocuments: ['complaint-log.pdf', 'statutes.pdf'],
    },
    createdAt: new Date('2024-02-23'),
  }
];

export function CaseInsights() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);

  const toggleInsightExpansion = (insightId: string) => {
    setExpandedInsights((prev) =>
      prev.includes(insightId) ? prev.filter((id) => id !== insightId) : [...prev, insightId]
    );
  };

  const filteredInsights = sampleInsights.filter((insight) => {
    if (activeTab === 'all') return true;
    return insight.type === activeTab;
  });

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="liability">Liability</TabsTrigger>
          <TabsTrigger value="damages">Damages</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          {filteredInsights.map((insight) => {
            const Icon = insightTypeIcons[insight.type as keyof typeof insightTypeIcons] || AlertCircle;
            const isExpanded = expandedInsights.includes(insight.id);

            return (
              <Card key={insight.id} className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleInsightExpansion(insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          insightTypeColors[insight.type as keyof typeof insightTypeColors] ||
                          insightTypeColors.default
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{insight.title}</h3>
                          {insight.significance && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                insight.significance === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : insight.significance === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {insight.significance.charAt(0).toUpperCase() +
                                insight.significance.slice(1)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {insight.subType
                            ? `${insight.subType.charAt(0).toUpperCase() + insight.subType.slice(1)} • `
                            : ''}
                          {insight.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      {isExpanded ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <p className="text-sm text-muted-foreground">{insight.insight}</p>

                      {insight.citations && insight.citations.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Supporting Evidence</h4>
                          <div className="space-y-2">
                            {insight.citations.map((citation) => (
                              <div
                                key={citation.id}
                                className="rounded-lg border p-3 space-y-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                      citationTypeColors[citation.type]
                                    }`}
                                  >
                                    {citation.type
                                      .split('-')
                                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                      .join(' ')}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {citation.source}
                                  </span>
                                </div>
                                <blockquote className="text-sm border-l-2 pl-4 italic">
                                  "{citation.text}"
                                </blockquote>
                                <p className="text-xs text-muted-foreground">
                                  Context: {citation.context}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {insight.metadata && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(insight.metadata).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
} 