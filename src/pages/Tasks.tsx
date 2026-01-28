import React from "react";
import { Plus } from "lucide-react";

export default function Tasks() {
  const sample = [
    { id: "TASK-001", title: "Design System Implementation", status: "In Progress", due: "Feb 15" },
    { id: "TASK-006", title: "Mobile App Testing", status: "Assigned", due: "Feb 28" },
    { id: "TASK-010", title: "QA Review", status: "Pending", due: "Mar 3" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <div className="rounded-2xl p-4 mb-4 bg-surface border border-border shadow-theme">
              <h3 className="text-sm font-semibold">Filters</h3>
              <div className="mt-3 text-sm text-muted">Status</div>
              <div className="mt-2 flex flex-col gap-2">
                <button className="text-sm text-primary text-left">All</button>
                <button className="text-sm text-muted text-left">In Progress</button>
                <button className="text-sm text-muted text-left">Assigned</button>
                <button className="text-sm text-muted text-left">Completed</button>
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-surface border border-border shadow-theme">
              <h3 className="text-sm font-semibold">Shortcuts</h3>
              <div className="mt-3 grid gap-2">
                <button className="text-sm rounded-lg p-3 bg-card-bg border border-border text-primary text-left">Create Task</button>
                <button className="text-sm rounded-lg p-3 bg-card-bg border border-border text-primary text-left">View Notifications</button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Tasks</h2>
              <button className="rounded-lg px-4 py-2 bg-accent text-inverse flex items-center gap-2"><Plus /> Create Task</button>
            </div>

            <div className="space-y-4">
              {sample.map((t) => (
                <div key={t.id} className="rounded-2xl p-4 bg-card-bg border border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-muted">{t.id}</div>
                      <h4 className="font-semibold text-primary mt-1">{t.title}</h4>
                      <p className="text-sm text-muted mt-2">A short description for the task goes here to provide context.</p>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xs bg-amber-700 text-inverse px-2 rounded-full">{t.status.toUpperCase()}</span>
                        <span className="text-xs text-muted">👥 1</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted">Due: {t.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
