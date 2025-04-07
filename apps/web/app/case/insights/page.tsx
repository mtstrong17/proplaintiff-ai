import { CaseInsights } from './components/case-insights';

export default function InsightsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">AI Insights</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and insights about your case, generated from case documents and data.
          </p>
        </div>
        <CaseInsights />
      </div>
    </div>
  );
} 