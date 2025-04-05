'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flag,
  ListTodo,
  Target,
  Users
} from "lucide-react";

type Priority = 'critical' | 'high' | 'medium' | 'low';
type Status = 'pending' | 'in_progress' | 'completed' | 'blocked';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  deadline: string;
  assignedTo?: string;
  dependencies?: string[];
  progress?: number;
}

const actionItems: ActionItem[] = [
  {
    id: "1",
    title: "Complete Medical Record Collection",
    description: "Obtain missing physical therapy records and specialist consultations",
    priority: "critical",
    status: "in_progress",
    deadline: "2024-03-15",
    assignedTo: "Jane Doe",
    progress: 65
  },
  {
    id: "2",
    title: "Expert Witness Preparation",
    description: "Schedule preparation sessions with medical experts",
    priority: "high",
    status: "pending",
    deadline: "2024-03-30",
    dependencies: ["1"]
  },
  {
    id: "3",
    title: "Settlement Demand Calculation",
    description: "Prepare detailed damages calculation for settlement demand",
    priority: "medium",
    status: "pending",
    deadline: "2024-04-15",
    dependencies: ["1", "2"]
  }
];

const preparationSteps = [
  {
    category: "Document Preparation",
    tasks: [
      {
        title: "Medical Record Summary",
        status: "completed",
        description: "Create comprehensive summary of all medical records"
      },
      {
        title: "Timeline Documentation",
        status: "in_progress",
        description: "Develop detailed timeline of events and treatment"
      }
    ]
  },
  {
    category: "Witness Preparation",
    tasks: [
      {
        title: "Expert Witness Coordination",
        status: "pending",
        description: "Schedule and prepare expert witnesses for testimony"
      },
      {
        title: "Witness Interviews",
        status: "in_progress",
        description: "Conduct follow-up interviews with key witnesses"
      }
    ]
  }
];

const negotiationStrategy = {
  strengths: [
    {
      point: "Strong Medical Evidence",
      details: "Clear documentation of injuries and causation",
      impact: "high"
    },
    {
      point: "Multiple Witnesses",
      details: "Three independent witnesses support our version of events",
      impact: "high"
    },
    {
      point: "Precedent Cases",
      details: "Similar cases in jurisdiction with favorable outcomes",
      impact: "medium"
    }
  ],
  approach: [
    {
      phase: "Initial Demand",
      strategy: "Present comprehensive damages calculation with supporting evidence",
      timing: "After expert witness preparation"
    },
    {
      phase: "Negotiation Points",
      strategy: "Focus on clear liability and significant damages supported by medical evidence",
      timing: "Throughout negotiation process"
    },
    {
      phase: "Bottom Line",
      strategy: "Maintain firm position on core damages while showing flexibility on ancillary issues",
      timing: "Late negotiation phase"
    }
  ]
};

export default function StrategyRecommendations() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Strategy Recommendations
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-generated strategic recommendations and action items
          </p>
        </div>

        {/* Priority Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-primary" />
              Priority Actions
            </CardTitle>
            <CardDescription>Critical tasks and next steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {actionItems.map((item) => (
                <div key={item.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          item.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'blocked' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </div>
                  </div>
                  
                  {item.progress !== undefined && (
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due: {item.deadline}</span>
                    </div>
                    {item.assignedTo && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{item.assignedTo}</span>
                      </div>
                    )}
                    {item.dependencies && item.dependencies.length > 0 && (
                      <div className="flex items-center gap-1">
                        <ArrowRight className="h-4 w-4" />
                        <span>Depends on: {item.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategy Tabs */}
        <Tabs defaultValue="preparation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preparation" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Case Preparation
            </TabsTrigger>
            <TabsTrigger value="negotiation" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Negotiation Strategy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preparation">
            <div className="grid gap-6">
              {preparationSteps.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle>{section.category}</CardTitle>
                    <CardDescription>Required preparation steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.tasks.map((task, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <div className={`rounded-full p-2 ${
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {task.status === 'completed' ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : task.status === 'in_progress' ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <Target className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="negotiation">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Strengths</CardTitle>
                  <CardDescription>Key points supporting our position</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {negotiationStrategy.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <div className={`rounded-full p-2 ${
                          strength.impact === 'high' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          <Target className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{strength.point}</h4>
                          <p className="text-sm text-muted-foreground">{strength.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Negotiation Approach</CardTitle>
                  <CardDescription>Recommended negotiation strategy and timing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {negotiationStrategy.approach.map((phase, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <span className="text-sm text-muted-foreground">{phase.timing}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{phase.strategy}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 