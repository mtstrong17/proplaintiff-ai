import { CaseTimeline } from './components/case-timeline';

export default function TimelinePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Case Timeline</h1>
          <p className="text-muted-foreground">
            Chronological view of case events, milestones, and activities.
          </p>
        </div>
        <CaseTimeline />
      </div>
    </div>
  );
}
