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
    <div className="bg-white min-h-screen text-gray-900 rounded-xl">
      {/* MOBILE */}
      <div className="relative mx-auto max-w-md min-h-screen flex flex-col md:hidden">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="flex items-center justify-between p-4 pb-2">
            <button className="h-12 w-12 flex items-center text-orange-600 hover:bg-gray-100 rounded-lg">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Find tasks..."
                className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Total Tasks ({tasks.length})
          </h2>

          {loading && <p className="text-sm text-gray-600">Loading...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskRow key={task.id} {...task} />
            ))}
          </div>
        </main>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block bg-gray-50 rounded-xl p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between bg-white">
            <h2 className="text-lg font-semibold text-gray-900">All Tasks</h2>
            <span className="text-sm text-gray-600">
              Showing {tasks.length} tasks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Task ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => navigate("/tasks", { state: task.raw })}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">{task.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{task.priority}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{task.assignee}</td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        task.overdue ? "text-red-600 font-semibold" : "text-gray-700"
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
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
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
      className="flex items-center p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1 gap-2">
          <span className="text-xs font-mono text-orange-600 font-medium">{id}</span>
          <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">{priority}</span>
        </div>
        <p className="font-semibold text-gray-900 truncate">{title}</p>
        <p className={`text-xs mt-1 ${overdue ? "text-red-600 font-medium" : "text-gray-600"}`}>
          {assignee} • {date}
        </p>
      </div>
      <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-2" />
    </div>
  );
}
