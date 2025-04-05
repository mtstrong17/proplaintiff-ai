'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { AlertTriangle, Brain, Clock, FileText, Lightbulb, Scale, Target, TrendingUp } from "lucide-react";

export default function AnalysisOverview() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Case Analysis Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered analysis and insights to help strengthen your case
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Case Strength Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">85%</div>
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <Progress value={85} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+5% from last analysis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">42/50</div>
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <Progress value={84} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Documents processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Key Issues Identified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">8</div>
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">5 Supporting</div>
                <div className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">3 Challenging</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Time to Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">120</div>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Days until estimated trial date</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Key Insights
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Case Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Case Insights</CardTitle>
                  <CardDescription>AI-generated insights based on case documents and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Strong Evidence of Liability",
                      description: "Multiple witness statements and expert reports support the claim of negligence.",
                      type: "positive"
                    },
                    {
                      title: "Medical Documentation Gap",
                      description: "Missing follow-up records from physical therapy sessions between June and August.",
                      type: "negative"
                    },
                    {
                      title: "Favorable Precedent Cases",
                      description: "Three similar cases in the jurisdiction with favorable outcomes identified.",
                      type: "positive"
                    }
                  ].map((insight, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <div className={`rounded-full p-2 ${
                        insight.type === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {insight.type === 'positive' ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <AlertTriangle className="h-4 w-4" />
                        }
                      </div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risks">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Potential challenges and risk factors identified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      risk: "Statute of Limitations",
                      impact: "Low",
                      description: "Filing deadline is well within compliance.",
                      color: "bg-green-100 text-green-700"
                    },
                    {
                      risk: "Evidence Gaps",
                      impact: "Medium",
                      description: "Some medical records need to be obtained.",
                      color: "bg-yellow-100 text-yellow-700"
                    },
                    {
                      risk: "Expert Testimony",
                      impact: "High",
                      description: "Additional expert witnesses may be needed.",
                      color: "bg-red-100 text-red-700"
                    }
                  ].map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground mt-1" />
                        <div>
                          <h4 className="font-medium">{risk.risk}</h4>
                          <p className="text-sm text-muted-foreground">{risk.description}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${risk.color}`}>
                        {risk.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
                <CardDescription>AI-generated suggestions to strengthen the case</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Obtain Additional Medical Records",
                      priority: "High",
                      description: "Request complete physical therapy records from City Medical Center.",
                      deadline: "Next 7 days"
                    },
                    {
                      title: "Schedule Expert Consultation",
                      priority: "Medium",
                      description: "Arrange meeting with Dr. Smith for medical expert testimony.",
                      deadline: "Next 14 days"
                    },
                    {
                      title: "Document Timeline Review",
                      priority: "Low",
                      description: "Review and verify all dates in the incident timeline.",
                      deadline: "Next 30 days"
                    }
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <Target className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{rec.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                            rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{rec.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Case Progress Trends</CardTitle>
                <CardDescription>Analysis of case development over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      metric: "Document Collection",
                      status: "Improving",
                      change: "+15%",
                      description: "Increased rate of document processing and analysis"
                    },
                    {
                      metric: "Evidence Strength",
                      status: "Stable",
                      change: "0%",
                      description: "Consistent quality of evidence maintained"
                    },
                    {
                      metric: "Timeline Clarity",
                      status: "Improving",
                      change: "+25%",
                      description: "Better chronological organization of events"
                    }
                  ].map((trend, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <TrendingUp className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{trend.metric}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            trend.status === 'Improving' ? 'bg-green-100 text-green-700' :
                            trend.status === 'Declining' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {trend.change}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{trend.description}</p>
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