'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { AlertTriangle, Brain, FileText, Gavel, Scale, Shield } from "lucide-react";

const strengthCategories = [
  {
    name: "Evidence Quality",
    score: 88,
    icon: FileText,
    details: [
      { name: "Medical Records", score: 92, status: "strong" },
      { name: "Expert Testimony", score: 85, status: "strong" },
      { name: "Witness Statements", score: 78, status: "moderate" },
      { name: "Physical Evidence", score: 95, status: "strong" }
    ]
  },
  {
    name: "Legal Merit",
    score: 82,
    icon: Gavel,
    details: [
      { name: "Statutory Compliance", score: 95, status: "strong" },
      { name: "Precedent Alignment", score: 85, status: "strong" },
      { name: "Jurisdictional Factors", score: 75, status: "moderate" },
      { name: "Legal Theory", score: 88, status: "strong" }
    ]
  },
  {
    name: "Damages Assessment",
    score: 90,
    icon: Shield,
    details: [
      { name: "Economic Damages", score: 92, status: "strong" },
      { name: "Non-Economic Damages", score: 88, status: "strong" },
      { name: "Future Damages", score: 85, status: "strong" },
      { name: "Comparative Verdicts", score: 95, status: "strong" }
    ]
  }
];

const riskFactors = [
  {
    name: "Opposing Arguments",
    description: "Defense may challenge causation based on pre-existing conditions",
    severity: "medium",
    mitigation: "Obtain additional expert testimony to address causation"
  },
  {
    name: "Evidence Gaps",
    description: "Missing physical therapy records from June-August period",
    severity: "high",
    mitigation: "Subpoena records from all treatment facilities"
  },
  {
    name: "Witness Reliability",
    description: "Key witness has potential credibility issues",
    severity: "medium",
    mitigation: "Gather additional corroborating evidence"
  }
];

export default function CaseStrength() {
  const overallScore = Math.round(
    strengthCategories.reduce((acc, cat) => acc + cat.score, 0) / strengthCategories.length
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            Case Strength Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Detailed analysis of case strength factors and potential risks
          </p>
        </div>

        {/* Overall Score */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{overallScore}%</h2>
                <p className="text-sm text-muted-foreground">Overall Case Strength</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <Progress value={overallScore} className="h-2" />
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Strong (80-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">Moderate (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">Weak (0-59)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strength Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {strengthCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>Score: {category.score}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.details.map((detail) => (
                      <div key={detail.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{detail.name}</span>
                          <span className={`text-sm font-medium ${
                            detail.score >= 80 ? 'text-green-600' :
                            detail.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {detail.score}%
                          </span>
                        </div>
                        <Progress 
                          value={detail.score} 
                          className={
                            detail.score >= 80 ? 'text-green-600' :
                            detail.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Risk Factors
            </CardTitle>
            <CardDescription>
              Identified risks and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((risk) => (
                <div key={risk.name} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{risk.name}</h4>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      risk.severity === 'high' ? 'bg-red-100 text-red-700' :
                      risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Mitigation: {risk.mitigation}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 