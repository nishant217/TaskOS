import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Search,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_BASE;
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY;

/* ================= TYPES ================= */

export interface User {
  userId: string;
  username: string;
  emailId: string;
  employeeName: string;
  mobile: string;
  role: string;
  isActive: boolean;
  isPasswordSet: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ================= HELPERS ================= */

const getRoleColor = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("admin")) return "amber";
  if (r.includes("manager")) return "blue";
  if (r.includes("lead")) return "indigo";
  return "slate";
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

/* ================= COMPONENT ================= */

export default function UserManagement() {
  const navigate = useNavigate();

  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${apiURL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            "x-admin-api-key": adminApiKey || "",
          },
        });

        const payload = res.data;
        const usersArray: User[] = Array.isArray(payload)
          ? payload
          : payload?.users || payload?.data || [];

        if (mounted) setDisplayUsers(usersArray);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load users");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-app dark:bg-app-dark min-h-screen font-display text-slate-900 dark:text-white">

      {/* ================= MOBILE ================= */}
      <div className="relative mx-auto max-w-md min-h-screen flex flex-col md:hidden">

        {/* Header */}
        <header className="sticky top-0 z-50 bg-app-light/80 dark:bg-app-dark/80 backdrop-blur border-b border-white/5">
          <div className="flex items-center justify-between p-4 pb-2">
            <button className="h-12 w-12 flex items-center text-primary">
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-lg font-bold text-center flex-1 tracking-tight">
              All Users
            </h2>
          </div>

          <div className="px-4 pb-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                placeholder="Find users..."
                className="w-full bg-slate-800/50 rounded-xl py-2 pl-10 pr-4 text-sm placeholder:text-slate-500 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <div className="mb-4 px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Total Users ({displayUsers.length})
            </h2>
          </div>

          {loading && (
            <div className="text-sm text-slate-400">Loading users...</div>
          )}

          {error && (
            <div className="text-sm text-rose-500">{error}</div>
          )}

          <div className="space-y-3">
            {displayUsers.map((u) => (
              <div
                key={u.userId}
                onClick={() => navigate("/user", { state: u })}
              >
                <UserRow
                  name={u.employeeName}
                  email={u.emailId}
                  role={u.role.toUpperCase()}
                  roleColor={getRoleColor(u.role)}
                  initials={getInitials(u.employeeName)}
                  active={u.isActive}
                  inactive={!u.isActive}
                  accent="primary"
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-950 rounded-xl">
        <div className="p-6">

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Users</h2>
              <div className="text-sm text-slate-500">
                Showing {displayUsers.length} users
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-fixed">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs">Name</th>
                    <th className="px-6 py-3 text-left text-xs">Email</th>
                    <th className="px-6 py-3 text-left text-xs">Role</th>
                    <th className="px-6 py-3 text-left text-xs">Status</th>
                    <th className="px-6 py-3 text-left text-xs">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {displayUsers.map((u) => (
                    <tr
                      key={u.userId}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() => navigate("/user", { state: u })}
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <UserIcon size={16} />
                        </div>
                        <span className="font-semibold">{u.employeeName}</span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {u.emailId}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800">
                          {u.role.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {u.isActive ? (
                          <span className="text-emerald-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-slate-500 font-semibold">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <button
                          className="text-primary font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${u.userId}/edit`, { state: u });
                          }}
                        >
                          Edit
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
    </div>
  );
}

/* ================= USER ROW (UNCHANGED) ================= */

function UserRow({
  name,
  email,
  role,
  roleColor = "slate",
  avatarUrl,
  initials,
  active,
  inactive,
  accent = "primary",
}: any) {
  const roleStyles: any = {
    amber:
      "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    blue: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    slate:
      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    indigo:
      "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
  };

  return (
    <div
      className={`flex items-center p-4 rounded-2xl border transition cursor-pointer ${
        inactive ? "opacity-80" : ""
      } bg-surface dark:bg-surface-dark border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`}
    >
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className={`w-12 h-12 rounded-full object-cover border-2 ${
              inactive ? "grayscale" : ""
            } border-slate-200 dark:border-slate-700`}
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              accent === "indigo"
                ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-500"
                : "bg-primary/20 border-primary/30 text-primary"
            }`}
          >
            <span className="font-bold text-lg">{initials}</span>
          </div>
        )}

        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-surface-dark ${
            active ? "bg-emerald-500" : "bg-slate-400"
          }`}
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{name}</p>
            {inactive && (
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">
                Inactive
              </span>
            )}
          </div>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${roleStyles[roleColor]}`}
          >
            {role}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
          {email}
        </p>
      </div>

      <ChevronRight className="text-slate-400 ml-2" size={18} />
    </div>
  );
}
