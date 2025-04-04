'use client';

import { StatusBadge } from "@/components/status-badge";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Calendar, FileText, Filter, Search, UserCircle } from "lucide-react";
import { useState } from "react";

export default function CasesPage() {
  const trpc = useTRPC();
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });

  const { data: cases, isLoading } = useQuery(
    trpc.cases.getAll.queryOptions({
      status: filters.status || undefined,
      search: filters.search || undefined,
    })
  );

  const { data: statuses } = useQuery(trpc.cases.getStatuses.queryOptions());

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
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[180px] justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  {filters.status || "All Statuses"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem
                  onClick={() => setFilters((prev) => ({ ...prev, status: "" }))}
                >
                  All Statuses
                </DropdownMenuItem>
                {statuses?.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, status: status }))
                    }
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    Loading cases...
                  </TableCell>
                </TableRow>
              ) : cases?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    No cases found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                cases?.map((case_) => (
                  <TableRow
                    key={case_.id}
                    className="cursor-pointer transition-colors hover:bg-muted/50"
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
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>{case_.assignedAttorney}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {case_.lastActivity}
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