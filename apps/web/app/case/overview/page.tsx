import { CaseOverview } from "./components/case-overview"

export default function CaseOverviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Case Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive view of case details, progress, and key metrics.
          </p>
        </div>
        <CaseOverview />
      </div>
    </div>
  )
} 