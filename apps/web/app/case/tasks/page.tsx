'use client';

import { CaseTasks } from "./components/case-tasks";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Case Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track all case-related tasks, deadlines, and assignments.
          </p>
        </div>
        <CaseTasks />
      </div>
    </div>
  );
} 