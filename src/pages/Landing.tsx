import React from "react";
import { AlertTriangle, Clock, Flag, User, TrendingUp } from "lucide-react";

export default function Landing() {
  const userName = "Alex";

  const tasks = [
    {
      id: 1,
      title: "Update Q3 Financial Report",
      department: "Finance",
      priority: "P1",
      color: "orange",
      due: "Today",
      assignee: "Sarah",
      overdue: false,
    },
    {
      id: 2,
      title: "Client Feedback Review",
      department: "Success",
      priority: "P2",
      color: "yellow",
      due: "Oct 26",
      assignee: "Marcus",
      overdue: false,
    },
    {
      id: 3,
      title: "Weekly Team Sync Notes",
      department: "Internal",
      priority: "P3",
      color: "blue",
      due: "Oct 28",
      assignee: "Alex",
      overdue: false,
    },
    {
      id: 4,
      title: "Launch Marketing Assets",
      department: "Marketing",
      priority: "P1",
      color: "orange",
      due: "Overdue",
      assignee: "Priya",
      overdue: true,
    },
  ];

  const colorMap: any = {
    orange: "bg-orange-100 text-orange-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white text-gray-900">
      {/* MOBILE Container */}
      <div className="relative mx-auto max-w-[430px] min-h-screen border-x border-gray-200 shadow-lg flex flex-col md:hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <section className="px-4 pt-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome back, {userName}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Here's your task overview for today.
            </p>
          </section>

          {/* Stats */}
          <section className="flex flex-wrap gap-3 p-4">
            <StatCard
              label="In Progress"
              value="12"
              icon={<Clock className="text-orange-600" size={20} />}
            />
            <StatCard
              label="Overdue"
              value="3"
              icon={<AlertTriangle className="text-red-600" size={20} />}
            />
            <StatCard
              label="Pending"
              value="5"
              icon={<Flag className="text-yellow-600" size={20} />}
            />
          </section>

          {/* Recent Tasks Header */}
          <div className="flex items-center justify-between px-4 pt-2 pb-3">
            <h2 className="text-lg font-bold">Recent Tasks</h2>
            <button className="text-orange-600 text-sm font-semibold hover:text-orange-700">
              View All
            </button>
          </div>

          {/* Task List */}
          <div className="px-2 pb-6 space-y-2">
            {tasks.map((t) => (
              <TaskCard key={t.id} t={t} colorMap={colorMap} />
            ))}
          </div>
        </main>
      </div>

      {/* DESKTOP Container */}
      <div className="hidden md:block bg-gray-50 rounded-xl min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
            <p className="text-gray-600 mt-1">
              Here's your task overview for today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard
              label="In Progress"
              value="12"
              icon={<Clock className="text-orange-600" size={24} />}
            />
            <StatCard
              label="Overdue"
              value="3"
              icon={<AlertTriangle className="text-red-600" size={24} />}
            />
            <StatCard
              label="Pending"
              value="5"
              icon={<Flag className="text-yellow-600" size={24} />}
            />
          </div>

          {/* Tasks Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Task
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Department
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Priority
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Due
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Assignee
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-700 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {tasks.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {t.department}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${colorMap[t.color]}`}
                        >
                          <TrendingUp size={12} /> {t.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            t.overdue
                              ? "text-red-600 font-semibold"
                              : "text-gray-700"
                          }
                        >
                          {t.due}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <User size={16} className="text-orange-600" />
                        </div>
                        <span className="font-medium">{t.assignee}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {t.overdue ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                            <AlertTriangle size={12} /> Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            <Clock size={12} /> On Track
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600 bg-gray-50">
              Showing {tasks.length} recent tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Components */

function StatCard({ label, value, icon }: any) {
  return (
    <div className="flex-1 min-w-[120px] rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="mb-3">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

function TaskCard({ t, colorMap }: any) {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-4 rounded-xl border border-gray-200 hover:border-orange-300 transition">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[t.color]}`}
        >
          <Flag size={16} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{t.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${colorMap[t.color]}`}
            >
              {t.priority}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600">{t.department}</span>
          </div>
        </div>
      </div>

      <div className="text-right ml-4 flex-shrink-0">
        <p
          className={`text-xs font-semibold ${
            t.overdue ? "text-red-600" : "text-gray-600"
          }`}
        >
          {t.due}
        </p>
      </div>
    </div>
  );
}
