import { Clock, AlertCircle, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/StatCard"
import { TaskCard } from "@/components/TaskCard"

const SAMPLE_STATS = [
  {
    title: "In Progress",
    value: 12,
    icon: Clock,
    description: "Tasks in progress",
  },
  {
    title: "Overdue",
    value: 3,
    icon: AlertCircle,
    description: "Tasks past due",
  },
  {
    title: "Completed",
    value: 45,
    icon: CheckCircle,
    description: "Tasks completed",
  },
]

const SAMPLE_TASKS = [
  {
    id: "TSK-001",
    title: "Update Q3 Financial Report",
    description: "Compile and review financial data for Q3",
    priority: "P1" as const,
    status: "in-progress" as const,
    assignee: { name: "Sarah Johnson" },
    dueDate: "Today",
  },
  {
    id: "TSK-002",
    title: "Client Feedback Review",
    description: "Review and categorize feedback from recent client meetings",
    priority: "P2" as const,
    status: "pending" as const,
    assignee: { name: "Marcus Williams" },
    dueDate: "Oct 26",
  },
  {
    id: "TSK-003",
    title: "Weekly Team Sync Notes",
    description: "Document and share meeting notes from team sync",
    priority: "P3" as const,
    status: "pending" as const,
    assignee: { name: "Alex Chen" },
    dueDate: "Oct 28",
  },
  {
    id: "TSK-004",
    title: "Launch Marketing Assets",
    description: "Prepare and deploy marketing materials for new campaign",
    priority: "P1" as const,
    status: "overdue" as const,
    assignee: { name: "Priya Patel" },
    dueDate: "Oct 15",
  },
]

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, here's your task overview</p>
          </div>
          <Button className="gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_STATS.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            <a href="/tasks" className="text-orange-600 hover:text-orange-700 font-medium text-sm">
              View All →
            </a>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_TASKS.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onClick={() => console.log("View task:", task.id)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center gap-4 py-3">
              <div className="h-2 w-2 bg-orange-600 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Sarah Johnson completed "Update Q3 Financial Report"
                </p>
                <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3 border-t border-gray-200">
              <div className="h-2 w-2 bg-orange-600 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New task "Launch Marketing Assets" assigned to you
                </p>
                <p className="text-xs text-gray-600 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3 border-t border-gray-200">
              <div className="h-2 w-2 bg-orange-600 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Marcus Williams commented on "Client Feedback Review"
                </p>
                <p className="text-xs text-gray-600 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
