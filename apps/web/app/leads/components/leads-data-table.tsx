'use client';

import { useStore } from '@/lib/store';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ArrowUpDown, MoreHorizontal, UserPlus } from 'lucide-react';
import { useState } from 'react';

type LeadWithOptionalFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  source: string;
  notes: string | null;
  createdAt: string;
  lastActivity: string;
};

const columns: ColumnDef<LeadWithOptionalFields>[] = [
  {
    accessorKey: 'name',
    header: ({ column }: { column: Column<LeadWithOptionalFields> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'source',
    header: 'Source',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: Row<LeadWithOptionalFields> }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="flex items-center">
          <span className={getStatusColor(status)}>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last Activity',
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<LeadWithOptionalFields> }) => {
      const lead = row.original;
      const { setSelectedLeadId } = useStore();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(lead.email)}>
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedLeadId(lead.id)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
            <DropdownMenuItem>Convert to case</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function getStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case 'NEW':
      return 'text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium';
    case 'CONTACTED':
      return 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';
    case 'QUALIFIED':
      return 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium';
    case 'CONVERTED':
      return 'text-purple-600 bg-purple-50 px-2 py-1 rounded-full text-xs font-medium';
    case 'LOST':
      return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
    default:
      return 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
  }
}

export function LeadsDataTable() {
  const trpc = useTRPC();
  const { leadFilters, setLeadFilters } = useStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data: leads = [] } = useQuery(
    trpc.leads.getAll.queryOptions({
      status: (leadFilters.status?.toUpperCase() || undefined) as 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST' | undefined,
      search: leadFilters.search || undefined,
    })
  );

  const table = useReactTable({
    data: leads,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by name..."
          value={leadFilters.search}
          onChange={(event) => setLeadFilters({ ...leadFilters, search: event.target.value })}
          className="max-w-sm"
        />
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
