import React from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  Flag,
  User,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  MoreVertical,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const userName = "Admin";

  // Admin-specific tasks
  const tasks = [
    {
      id: 1,
      title: "System Security Audit",
      department: "IT Security",
      priority: "Critical",
      color: "red",
      due: "Today",
      assignee: "Security Team",
      status: "pending",
      type: "security",
    },
    {
      id: 2,
      title: "Q3 Performance Review",
      department: "HR",
      priority: "High",
      color: "amber",
      due: "Tomorrow",
      assignee: "HR Dept",
      status: "in-progress",
      type: "review",
    },
    {
      id: 3,
      title: "Database Migration",
      department: "Engineering",
      priority: "High",
      color: "amber",
      due: "Oct 28",
      assignee: "DevOps",
      status: "planned",
      type: "infrastructure",
    },
    {
      id: 4,
      title: "Compliance Report",
      department: "Legal",
      priority: "Medium",
      color: "blue",
      due: "Overdue",
      assignee: "Legal Team",
      status: "overdue",
      type: "compliance",
    },
    {
      id: 5,
      title: "User Onboarding Portal",
      department: "Product",
      priority: "Medium",
      color: "blue",
      due: "Oct 30",
      assignee: "Product Team",
      status: "completed",
      type: "development",
    },
    {
      id: 6,
      title: "Budget Planning 2024",
      department: "Finance",
      priority: "High",
      color: "amber",
      due: "Nov 5",
      assignee: "Finance Team",
      status: "pending",
      type: "finance",
    },
  ];

  // Admin metrics
  const metrics = [
    {
      label: "Total Users",
      value: "248",
      change: "+12%",
      icon: <Users />,
      color: "blue",
    },
    {
      label: "Active Tasks",
      value: "156",
      change: "+8%",
      icon: <FileText />,
      color: "green",
    },
    {
      label: "Completion Rate",
      value: "84%",
      change: "+3%",
      icon: <CheckCircle />,
      color: "emerald",
    },
    {
      label: "System Health",
      value: "98%",
      change: "-1%",
      icon: <Activity />,
      color: "amber",
    },
    {
      label: "Pending Reviews",
      value: "42",
      change: "-5%",
      icon: <Flag />,
      color: "violet",
    },
    {
      label: "Security Alerts",
      value: "3",
      change: "0%",
      icon: <Shield />,
      color: "red",
    },
  ];

  // Recent activities
  const activities = [
    {
      user: "Sarah Williams",
      action: "completed task",
      task: "API Documentation",
      time: "10 min ago",
    },
    {
      user: "Alex Johnson",
      action: "assigned task",
      task: "Design System Update",
      time: "25 min ago",
    },
    {
      user: "Marcus Chen",
      action: "created task",
      task: "Security Audit",
      time: "1 hour ago",
    },
    {
      user: "Priya Sharma",
      action: "commented on",
      task: "Q3 Report",
      time: "2 hours ago",
    },
    {
      user: "Admin",
      action: "updated settings",
      task: "User Permissions",
      time: "3 hours ago",
    },
  ];

  const colorMap: any = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800",
    emerald:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
    violet:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800",
  };

  const statusMap: any = {
    pending: {
      label: "Pending",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
    "in-progress": {
      label: "In Progress",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    completed: {
      label: "Completed",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    },
    overdue: {
      label: "Overdue",
      color: "text-red-600 bg-red-50 dark:bg-red-900/20",
    },
    planned: {
      label: "Planned",
      color: "text-slate-600 bg-slate-50 dark:bg-slate-900/20",
    },
  };

  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      {/* <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Welcome back, {userName}. Here's your system overview.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  placeholder="Search tasks, users, reports..."
                  className="h-10 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-header"
                />
              </div>
              <button className="h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Filter size={16} />
                Filter
              </button>
              <button className="h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Bell size={18} />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative mx-auto max-w-[430px] border-x border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:hidden">
        <section className="px-4 pt-6 pb-2">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome back, {userName}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's your task overview for today.
          </p>
        </section>
      </div>
      {/* Main Content */}
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {metric.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      className={`${
                        metric.change.startsWith("+")
                          ? "text-green-500"
                          : metric.change.startsWith("-")
                            ? "text-red-500"
                            : "text-slate-400"
                      }`}
                      size={14}
                    />
                    <span
                      className={`text-xs font-medium ${
                        metric.change.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : metric.change.startsWith("-")
                            ? "text-red-600 dark:text-red-400"
                            : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {metric.change} from last week
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${colorMap[metric.color]}`}>
                  {React.cloneElement(metric.icon, { size: 20 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity (now spans full width on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recent Activity
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  System-wide user activities
                </p>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-white">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.task}</span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Avg. Task Completion
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    84%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Response Time
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    2.4h
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    System Uptime
                  </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    99.8%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Pending Approvals
                  </span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Task Distribution
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  By department and priority
                </p>
              </div>
              <BarChart3 className="text-primary" size={20} />
            </div>
            <div className="space-y-4">
              {["Engineering", "Marketing", "Sales", "Support", "HR"].map(
                (dept) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {dept}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.random() * 60 + 20}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white w-10 text-right">
                        {Math.floor(Math.random() * 30 + 10)}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Status Overview
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Current task status breakdown
                </p>
              </div>
              <PieChart className="text-primary" size={20} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Completed", value: "84", color: "bg-emerald-500" },
                { label: "In Progress", value: "42", color: "bg-blue-500" },
                { label: "Pending", value: "24", color: "bg-amber-500" },
                { label: "Overdue", value: "6", color: "bg-red-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Admin Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton
              icon={<User />}
              label="Add User"
              description="Create new user account"
              color="blue"
            />
            <ActionButton
              icon={<Settings />}
              label="System Settings"
              description="Configure system preferences"
              color="amber"
            />
            <ActionButton
              icon={<Shield />}
              label="Security"
              description="Manage permissions & access"
              color="red"
            />
            <ActionButton
              icon={<BarChart3 />}
              label="Generate Report"
              description="Create performance report"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function ActionButton({ icon, label, description, color }: any) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    amber:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  };

  return (
    <button
      className={`p-4 rounded-xl border ${colorClasses[color]} hover:opacity-90 transition-opacity text-left`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <span className="font-semibold">{label}</span>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </button>
  );
}

// Keep existing StatCard and TaskCard components if needed for mobile view
function StatCard({ label, value, icon }: any) {
  return (
    <div className="flex-1 min-w-[160px] flex-col gap-3 rounded-xl p-4 bg-surface dark:bg-card-dark border border-white shadow-sm">
      <div>{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function TaskCard({ t, colorMap }: any) {
  return (
    <div className="flex items-center justify-between bg-surface px-4 py-3 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition">
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorMap[t.color]}`}
        >
          <Flag size={18} />
        </div>

        <div>
          <p className="font-semibold leading-snug">{t.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${colorMap[t.color]}`}
            >
              {t.priority}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{t.department}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-xs font-semibold ${
            t.overdue ? "text-red-500" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {t.due}
        </p>
      </div>
    </div>
  );
}
