import React from "react";
import { Bell, AlertTriangle, Clock, Flag, User } from "lucide-react";

export default function Landing() {
  const userName = "Alex";

  const tasks = [
    {
      id: 1,
      title: "Update Q3 Financial Report",
      department: "Finance",
      priority: "P1 - High",
      color: "red",
      due: "Today",
      assignee: "Sarah",
      overdue: false,
    },
    {
      id: 2,
      title: "Client Feedback Review",
      department: "Success",
      priority: "P2 - Med",
      color: "amber",
      due: "Oct 26",
      assignee: "Marcus",
      overdue: false,
    },
    {
      id: 3,
      title: "Weekly Team Sync Notes",
      department: "Internal",
      priority: "P3 - Low",
      color: "blue",
      due: "Oct 28",
      assignee: "Alex",
      overdue: false,
    },
    {
      id: 4,
      title: "Launch Marketing Assets",
      department: "Marketing",
      priority: "P1 - High",
      color: "red",
      due: "Overdue",
      assignee: "Priya",
      overdue: true,
    },
  ];

  const colorMap: any = {
    red: "bg-red-100 dark:bg-red-900/30 text-red-600",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  };

  return (
    <div className="bg-app-light dark:bg-app-dark font-display text-slate-900 dark:text-white">
      {/* MOBILE Container (unchanged) */}
      <div className="relative mx-auto max-w-[430px] min-h-screen border-x border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:hidden">
        <main className="flex-1 overflow-y-auto">
          <section className="px-4 pt-6 pb-2">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome back, {userName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Here's your task overview for today.
            </p>
          </section>

          <section className="flex flex-wrap gap-3 p-4">
            <StatCard
              label="In Progress"
              value="12"
              icon={<Clock className="text-primary" />}
            />
            <StatCard
              label="Overdue"
              value="3"
              icon={<AlertTriangle className="text-red-500" />}
            />
            <StatCard
              label="Pending"
              value="5"
              icon={<Flag className="text-amber-500" />}
            />
          </section>

          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <h2 className="text-xl font-bold tracking-tight">Recent Tasks</h2>
            <button className="text-primary text-sm font-semibold">
              View All
            </button>
          </div>

          <div className="px-2 pb-6 space-y-2">
            {tasks.map((t) => (
              <TaskCard key={t.id} t={t} colorMap={colorMap} />
            ))}
          </div>
        </main>
      </div>

      {/* DESKTOP Container */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-950 rounded-xl">
        <div className="p-6">
          {/* Header row */}
          {/* <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Here's your task overview for today.
              </p>
            </div>
            <div className="flex items-center gap-4">
            
            </div>
          </div> */}

          {/* Stats row */}
          <div className="flex gap-4 mb-8">
            <StatCard
              label="In Progress"
              value="12"
              icon={<Clock className="text-primary" />}
            />
            <StatCard
              label="Overdue"
              value="3"
              icon={<AlertTriangle className="text-red-500" />}
            />
            <StatCard
              label="Pending"
              value="5"
              icon={<Flag className="text-amber-500" />}
            />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Tasks</h2>
              <button className="text-sm text-primary font-medium">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-fixed">
                <thead className="bg-surface dark:bg-card-dark">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Task
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Department
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Priority
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Due
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Assignee
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium">{t.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {t.department}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded ${colorMap[t.color]}`}
                        >
                          <Flag size={12} /> {t.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            t.overdue
                              ? "text-red-500 font-semibold"
                              : "text-slate-600"
                          }
                        >
                          {t.due}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-surface dark:bg-card-dark flex items-center justify-center">
                          <User size={14} />
                        </div>
                        <span>{t.assignee}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {t.overdue ? (
                          <span className="text-xs font-semibold text-red-600">
                            Overdue
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-600">
                            On Track
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500">
              Showing {tasks.length} recent tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

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
