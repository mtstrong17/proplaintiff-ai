'use client';

import { StatusBadge } from '@/components/status-badge';
import { useStore } from '@/lib/store';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { Calendar, Eye, FileText, Filter, Search, Trash2, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CasesPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const { caseFilters, setCaseFilters, selectedCaseId, setSelectedCaseId } = useStore();

  const { data: cases, isLoading } = useQuery(
    trpc.cases.getAll.queryOptions({
      status: caseFilters.status || undefined,
      search: caseFilters.search || undefined,
    })
  );

  const { data: statuses } = useQuery(trpc.cases.getStatuses.queryOptions());

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    router.push('/case/overview');
  };

  const handleDeleteCase = async (caseId: string) => {
    // TODO: Add confirmation dialog
    try {
      await trpc.cases.delete.mutate({ id: caseId });
      if (selectedCaseId === caseId) {
        setSelectedCaseId(null);
      }
    } catch (error) {
      console.error('Failed to delete case:', error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex h-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
            <p className="text-muted-foreground">
              Manage and track all your legal cases in one place
            </p>
          </div>
          <Button className="gap-2 sm:self-start">
            <FileText className="h-4 w-4" />
            New Case
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                value={caseFilters.search}
                onChange={(e) => setCaseFilters({ ...caseFilters, search: e.target.value })}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[180px] justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  {caseFilters.status || 'All Statuses'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem onClick={() => setCaseFilters({ ...caseFilters, status: '' })}>
                  All Statuses
                </DropdownMenuItem>
                {statuses?.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setCaseFilters({ ...caseFilters, status: status })}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-lg border bg-card overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Case ID</TableHead>
                <TableHead className="min-w-[150px]">Client</TableHead>
                <TableHead className="min-w-[120px]">Type</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Filing Date</TableHead>
                <TableHead className="min-w-[150px]">Next Hearing</TableHead>
                <TableHead className="min-w-[150px]">Attorney</TableHead>
                <TableHead className="min-w-[200px]">Last Activity</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center">
                    Loading cases...
                  </TableCell>
                </TableRow>
              ) : !cases?.length ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center">
                    No cases found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                cases.map((case_) => (
                  <TableRow
                    key={case_.id}
                    className={`transition-colors hover:bg-muted/50 ${
                      case_.id === selectedCaseId ? 'bg-accent/50' : ''
                    }`}
                  >
                    <TableCell className="font-medium">{case_.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                        {case_.client}
                      </div>
                    </TableCell>
                    <TableCell>{case_.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={case_.status} />
                    </TableCell>
                    <TableCell>{case_.filingDate}</TableCell>
                    <TableCell>
                      {case_.nextHearing ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {case_.nextHearing}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{case_.assignedAttorney}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{case_.lastActivity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewCase(case_.id)}
                          title="View Case"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCase(case_.id)}
                          className="text-destructive hover:text-destructive/90"
                          title="Delete Case"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
