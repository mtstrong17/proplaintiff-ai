'use client';

import {
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  Header,
  HeaderGroup,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ArrowUpDown, MoreHorizontal, UserPlus } from "lucide-react";
import { useState } from "react";

// This would typically come from your API
type Lead = {
  id: string
  name: string
  email: string
  phone: string
  incidentType: string
  incidentDate: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  createdAt: string
}

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: ({ column }: { column: Column<Lead> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "incidentType",
    header: "Incident Type",
  },
  {
    accessorKey: "incidentDate",
    header: "Incident Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Lead> }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center">
          <span className={getStatusColor(status)}>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Lead> }) => {
      const lead = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lead.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
            <DropdownMenuItem>Convert to case</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "new":
      return "text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium"
    case "contacted":
      return "text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium"
    case "qualified":
      return "text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium"
    case "converted":
      return "text-purple-600 bg-purple-50 px-2 py-1 rounded-full text-xs font-medium"
    case "lost":
      return "text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium"
    default:
      return "text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium"
  }
}

// This would typically come from your API
const data: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    incidentType: "Car Accident",
    incidentDate: "2024-03-15",
    status: "new",
    createdAt: "2024-04-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    incidentType: "Slip and Fall",
    incidentDate: "2024-03-20",
    status: "contacted",
    createdAt: "2024-04-02",
  },
  // Add more sample data as needed
]

export function LeadsDataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
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
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
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
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Lead>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Lead, unknown>) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Lead>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: Cell<Lead, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
} 