'use client';

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import { Textarea } from "@workspace/ui/components/textarea";
import {
    TooltipProvider
} from "@workspace/ui/components/tooltip";
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Clock,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    UserCircle,
} from "lucide-react";
import { useState } from "react";

type TaskPriority = "low" | "medium" | "high";
type TaskStatus = "not_started" | "in_progress" | "completed" | "blocked";
type TaskCategory = "legal" | "medical" | "investigation" | "client" | "administrative";

type Task = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  dependencies?: string[];
  attachments?: string[];
  comments?: {
    id: string;
    text: string;
    author: string;
    createdAt: Date;
  }[];
};

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Review Initial Medical Records",
    description: "Complete initial review of all medical records received from City General Hospital.",
    category: "medical",
    priority: "high",
    status: "in_progress",
    dueDate: new Date("2024-03-20"),
    assignedTo: "Dr. Sarah Johnson",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    comments: [
      {
        id: "c1",
        text: "Started review of emergency room records",
        author: "Dr. Sarah Johnson",
        createdAt: new Date("2024-02-16"),
      }
    ]
  },
  {
    id: "2",
    title: "Draft Initial Complaint",
    description: "Prepare and file initial complaint based on investigation findings.",
    category: "legal",
    priority: "high",
    status: "not_started",
    dueDate: new Date("2024-03-25"),
    assignedTo: "John Smith",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "3",
    title: "Schedule Client Interview",
    description: "Conduct follow-up interview with client to gather additional details.",
    category: "client",
    priority: "medium",
    status: "completed",
    dueDate: new Date("2024-02-28"),
    assignedTo: "Jane Doe",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-01"),
    completedAt: new Date("2024-02-28"),
  },
];

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-red-100 text-red-700",
};

const categoryColors: Record<TaskCategory, string> = {
  legal: "bg-blue-50 text-blue-700",
  medical: "bg-rose-50 text-rose-700",
  investigation: "bg-amber-50 text-amber-700",
  client: "bg-purple-50 text-purple-700",
  administrative: "bg-slate-50 text-slate-700",
};

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  not_started: { label: "Not Started", color: "bg-slate-100 text-slate-700" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700" },
  blocked: { label: "Blocked", color: "bg-red-100 text-red-700" },
};

export function CaseTasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const filteredTasks = sampleTasks
    .filter(task => 
      searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(task => categoryFilter === "all" || task.category === categoryFilter)
    .filter(task => statusFilter === "all" || task.status === statusFilter)
    .filter(task => priorityFilter === "all" || task.priority === priorityFilter);

  const hasActiveFilters = categoryFilter !== "all" || statusFilter !== "all" || priorityFilter !== "all";

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id));
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Dialog open={newTaskDialogOpen} onOpenChange={setNewTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to the case. Fill in the task details below.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Input
                      placeholder="Task title"
                      className="w-full"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Textarea
                      placeholder="Task description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Category</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="investigation">Investigation</SelectItem>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="administrative">Administrative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Priority</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Due Date</h4>
                      <div className="relative">
                        <Input type="date" className="pr-8" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Assigned To</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="jane">Jane Doe</SelectItem>
                          <SelectItem value="sarah">Dr. Sarah Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewTaskDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px] pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 rounded-full bg-primary w-2 h-2" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px]">
                <div className="grid gap-4 p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Category</h4>
                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => setCategoryFilter(value as TaskCategory | "all")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="investigation">Investigation</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Status</h4>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value as TaskStatus | "all")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="not_started">Not Started</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Priority</h4>
                    <Select
                      value={priorityFilter}
                      onValueChange={(value) => setPriorityFilter(value as TaskPriority | "all")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCategoryFilter("all");
                        setStatusFilter("all");
                        setPriorityFilter("all");
                      }}
                      disabled={!hasActiveFilters}
                    >
                      Reset filters
                    </Button>
                    <Button size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTasks.length === filteredTasks.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => handleSelectTask(task.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{task.title}</span>
                      <span className="text-sm text-muted-foreground truncate max-w-[300px]">
                        {task.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[task.status].color}`}>
                      {statusConfig[task.status].label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {task.dueDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{task.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Mark Blocked
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </TooltipProvider>
  );
} 