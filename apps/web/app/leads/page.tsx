import { Metadata } from "next"
import { LeadsDataTable } from "./components/leads-data-table"

export const metadata: Metadata = {
  title: "Leads | ProPlaintiff AI",
  description: "Manage and track potential client leads.",
}

export default function LeadsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track potential client leads from intake forms.
          </p>
        </div>
        <LeadsDataTable />
      </div>
    </div>
  )
} 