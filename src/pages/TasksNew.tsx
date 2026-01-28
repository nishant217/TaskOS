import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter } from "lucide-react"

const SAMPLE_TASKS = [
  {
    id: "TSK-001",
    title: "Update Q3 Financial Report",
    priority: "P1",
    status: "in-progress",
    assignee: "Sarah Johnson",
    dueDate: "Today",
    progress: 75,
  },
  {
    id: "TSK-002",
    title: "Client Feedback Review",
    priority: "P2",
    status: "pending",
    assignee: "Marcus Williams",
    dueDate: "Oct 26",
    progress: 30,
  },
  {
    id: "TSK-003",
    title: "Weekly Team Sync Notes",
    priority: "P3",
    status: "pending",
    assignee: "Alex Chen",
    dueDate: "Oct 28",
    progress: 0,
  },
  {
    id: "TSK-004",
    title: "Launch Marketing Assets",
    priority: "P1",
    status: "overdue",
    assignee: "Priya Patel",
    dueDate: "Oct 15",
    progress: 50,
  },
  {
    id: "TSK-005",
    title: "Database Optimization",
    priority: "P2",
    status: "completed",
    assignee: "David Singh",
    dueDate: "Oct 20",
    progress: 100,
  },
]

const priorityColors = {
  P1: "destructive",
  P2: "warning",
  P3: "secondary",
}

const statusColors = {
  "in-progress": "default",
  pending: "outline",
  completed: "success",
  overdue: "destructive",
}

export function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredTasks = SAMPLE_TASKS.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-gray-600 mt-1">
              Manage and track all your tasks
            </p>
          </div>
          <Button className="gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Create Task</span>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="P1">P1 - High</SelectItem>
              <SelectItem value="P2">P2 - Medium</SelectItem>
              <SelectItem value="P3">P3 - Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Task ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[120px]">Priority</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Assignee</TableHead>
                <TableHead className="w-[100px]">Due Date</TableHead>
                <TableHead className="w-[80px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer hover:bg-orange-50">
                    <TableCell className="font-mono text-sm text-orange-600">
                      {task.id}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 max-w-xs truncate">
                      {task.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityColors[task.priority as keyof typeof priorityColors]}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[task.status as keyof typeof statusColors]}>
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm hidden sm:inline">
                          {task.assignee}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{task.dueDate}</TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-600">No tasks found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredTasks.length} of {SAMPLE_TASKS.length} tasks
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
