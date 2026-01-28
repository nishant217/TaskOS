import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Search,
  ChevronRight,
  User as UserIcon,
  Flag,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  Calendar,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

/* ================= CONFIG ================= */

const apiURL = import.meta.env.VITE_API_BASE;

/* ================= TYPES ================= */

export interface Approval {
  approvalId: number;
  taskId: string;
  approverUserId: string;
  approverName: string;
  approverEmail: string;
  topic: string;
  description: string;
  priority: number; // 1 | 2 | 3
  dueAt: string;
  created_by_user_id: string;
  created_by_name: string;
}

interface ApprovalsResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  approvals: Approval[];
}

interface StoredUser {
  userId: string;
  name: string;
  email: string;
}

/* ================= SESSION UTILS (AS REQUESTED) ================= */

const readStoredSession = async () => {
  // localStorage
  try {
    const raw =
      localStorage.getItem("auth_session") ||
      localStorage.getItem("user") ||
      localStorage.getItem("auth");
    if (raw) return JSON.parse(raw);
  } catch (_) {}

  // cookies
  try {
    const c =
      Cookies.get("auth_session") ||
      Cookies.get("user") ||
      Cookies.get("auth");
    if (c) return JSON.parse(c);
  } catch (_) {}

  // Cache API
  try {
    if ("caches" in window) {
      const cache = await caches.open("auth-cache");
      const res = await cache.match("/auth-session");
      if (res) {
        const txt = await res.text();
        return JSON.parse(txt);
      }
    }
  } catch (_) {}

  return null;
};

/* ================= UI HELPERS (UNCHANGED) ================= */

function FilterChip({ label, active }: any) {
  return (
    <button
      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

/* ================= COMPONENT ================= */

export default function AllTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [createdByFromStorage, setCreatedByFromStorage] =
    useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- Read session once ---------- */
  useEffect(() => {
    let mounted = true;

    (async () => {
      const stored = await readStoredSession();
      if (!mounted) return;

      const createdBy: StoredUser = {
        userId: String(
          stored?.userId || stored?.user_id || stored?.id || ""
        ),
        name: String(stored?.name || stored?.username || ""),
        email: String(stored?.email || ""),
      };

      setCreatedByFromStorage(createdBy.userId ? createdBy : null);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------- Fetch approvals ---------- */
  useEffect(() => {
    if (!createdByFromStorage?.userId) return;

    let mounted = true;

    const fetchApprovals = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<ApprovalsResponse>(
          `${apiURL}/api/approvals`,
          {
            params: { page: 1, limit: 50 },
            headers: {
              "Content-Type": "application/json",
              "x-user-id": createdByFromStorage.userId,
            },
          }
        );

        if (!mounted) return;

        const mapped = res.data.approvals.map((a) => {
          const priorityMap: any = {
            1: { code: "P1", text: "High Priority" },
            2: { code: "P2", text: "Medium Priority" },
            3: { code: "P3", text: "Low Priority" },
          };

          const overdue = new Date(a.dueAt) < new Date();

          return {
            id: a.taskId,
            title: a.topic,
            status: "Pending Approval",
            statusColor: "amber",
            priority: priorityMap[a.priority]?.code || "P3",
            priorityText: priorityMap[a.priority]?.text || "Low Priority",
            assignee: a.created_by_name,
            date: new Date(a.dueAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            overdue,
            // keep original API object so details page can consume full payload
            raw: a,
          };
        });

        setTasks(mapped);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load approvals");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchApprovals();
    return () => {
      mounted = false;
    };
  }, [createdByFromStorage]);

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="bg-app dark:bg-app-dark min-h-screen font-display text-slate-900 dark:text-white rounded-xl">
      {/* MOBILE */}
      <div className="relative mx-auto max-w-md min-h-screen flex flex-col md:hidden">
        <header className="sticky top-0 z-50 bg-app-light/80 dark:bg-app-dark/80 backdrop-blur border-b border-white/5">
          <div className="flex items-center justify-between p-4 pb-2">
            <button className="h-12 w-12 flex items-center text-primary">
              <ChevronLeft size={22} />
            </button>
            <h2 className="text-lg font-bold text-center flex-1 tracking-tight">
              All Tasks
            </h2>
          </div>

          <div className="px-4 pb-3 flex flex-col gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                placeholder="Find tasks..."
                className="w-full bg-slate-800/50 rounded-xl py-2 pl-10 pr-4 text-sm"
              />
            </div>

            {/* <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <FilterChip active label="All Tasks" />
              <FilterChip label="Pending" />
              <FilterChip label="Overdue" />
            </div> */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Total Tasks ({tasks.length})
          </h2>

          {loading && <p className="text-sm text-slate-400">Loading...</p>}
          {error && <p className="text-sm text-rose-500">{error}</p>}

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskRow key={task.id} {...task} />
            ))}
          </div>
        </main>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-950 rounded-xl p-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between">
            <h2 className="text-lg font-semibold">All Tasks</h2>
            <span className="text-sm text-slate-500">
              Showing {tasks.length} tasks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs">Task ID</th>
                  <th className="px-6 py-3 text-left text-xs">Title</th>
                  <th className="px-6 py-3 text-left text-xs">Status</th>
                  <th className="px-6 py-3 text-left text-xs">Priority</th>
                  <th className="px-6 py-3 text-left text-xs">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => navigate("/tasks", { state: task.raw })}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-mono">{task.id}</td>
                    <td className="px-6 py-4">{task.title}</td>
                    <td className="px-6 py-4">Pending Approval</td>
                    <td className="px-6 py-4">{task.priority}</td>
                    <td className="px-6 py-4">{task.assignee}</td>
                    <td
                      className={`px-6 py-4 ${
                        task.overdue ? "text-red-600 font-medium" : ""
                      }`}
                    >
                      {task.date}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/tasks", { state: task.raw });
                        }}
                        className="text-primary text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE ROW ================= */

function TaskRow({
  id,
  title,
  priority,
  assignee,
  date,
  overdue,
  raw,
}: any) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/tasks", { state: raw })}
      className="flex items-center p-4 rounded-2xl border bg-surface dark:bg-surface-dark hover:bg-slate-50 transition cursor-pointer"
    >
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-mono text-primary">{id}</span>
          <span className="text-xs font-bold">{priority}</span>
        </div>
        <p className="font-semibold">{title}</p>
        <p className={`text-xs ${overdue ? "text-red-500" : "text-slate-500"}`}>
          {assignee} • {date}
        </p>
      </div>
      <ChevronRight size={18} className="text-slate-400" />
    </div>
  );
}
