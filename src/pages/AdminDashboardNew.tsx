import {
  BarChart3,
  Users,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ADMIN_STATS = [
  {
    title: "Total Tasks",
    value: 156,
    icon: BarChart3,
    description: "Tasks in system",
    trend: { value: 12, positive: true },
  },
  {
    title: "Total Users",
    value: 24,
    icon: Users,
    description: "Active team members",
    trend: { value: 3, positive: true },
  },
  {
    title: "Overdue Tasks",
    value: 8,
    icon: AlertTriangle,
    description: "Tasks past deadline",
    trend: { value: 2, positive: false },
  },
  {
    title: "Completion Rate",
    value: "78%",
    icon: CheckCircle,
    description: "Tasks completed",
    trend: { value: 5, positive: true },
  },
]

const RECENT_ACTIVITIES = [
  { user: "Sarah Johnson", action: "Created new task", time: "2 hours ago" },
  { user: "Marcus Williams", action: "Completed task TSK-045", time: "4 hours ago" },
  { user: "Alex Chen", action: "Assigned task to Priya", time: "1 day ago" },
  { user: "David Singh", action: "Updated team member", time: "2 days ago" },
]

const SYSTEM_HEALTH = [
  { name: "API Response Time", value: 245, unit: "ms", status: "good" as const },
  { name: "Database Load", value: 42, unit: "%", status: "good" as const },
  { name: "Active Sessions", value: 18, unit: "users", status: "good" as const },
  { name: "Error Rate", value: 0.02, unit: "%", status: "good" as const },
]

export function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADMIN_STATS.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="h-2 w-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SYSTEM_HEALTH.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        {metric.name}
                      </p>
                      <Badge
                        variant={
                          metric.status === "good" ? "success" : "warning"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.value}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">45</div>
                <p className="text-sm text-gray-600 mt-2">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">32</div>
                <p className="text-sm text-gray-600 mt-2">Pending</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">68</div>
                <p className="text-sm text-gray-600 mt-2">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">11</div>
                <p className="text-sm text-gray-600 mt-2">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
