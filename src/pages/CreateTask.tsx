import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, CheckCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../components/ui/input";
import Dropdown from "../components/ui/dropdown";
import DateInput from "../components/ui/dateinput";
import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_BASE || "";
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY || "";

// --- Types
export interface UserRef {
  userId: string;
  name: string;
  email: string;
}

export interface CreateTaskPayload {
  topic: string;
  description: string;
  priority: 1 | 2 | 3;
  dueAt?: string | null; // ISO string
  createdBy: UserRef;
  assignees: UserRef[];
  approvers: UserRef[];
}

type ApiUser = {
  userId: string;
  employeeName?: string;
  username?: string;
  emailId?: string;
  isActive?: boolean;
  role?: string;
  avatarUrl?: string;
};

export default function CreateAssignTask() {
  // --- derive createdBy from local storage (safe parse)
  const [createdByFromStorage, setCreatedByFromStorage] = useState<UserRef>({
    userId: "",
    name: "",
    email: "",
  });

  const readStoredSession = async () => {
    // try localStorage
    try {
      const raw = localStorage.getItem("auth_session") || localStorage.getItem("user") || localStorage.getItem("auth");
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (_) {}

    // try cookie
    try {
      const c = Cookies.get("auth_session") || Cookies.get("user") || Cookies.get("auth");
      if (c) {
        return JSON.parse(c);
      }
    } catch (_) {}

    // try Cache API
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

  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await readStoredSession();
      if (!mounted) return;
      const createdBy = {
        userId: String(stored?.userId || stored?.user_id || stored?.id || "") || "",
        name: String(stored?.name || stored?.username || "") || "",
        email: String(stored?.email || "") || "",
      };
      setCreatedByFromStorage(createdBy);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(2);
  // selected assignee id (from API)
  //  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | null>(null);
  // multi-select ids for assignees and approvers
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);
  const [selectedApproverIds, setSelectedApproverIds] = useState<string[]>([]);
  // search term for employee list
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // users for assignment (only active users)

  const [displayUsers, setDisplayUsers] = useState<ApiUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setUsersError(null);
      try {
        const res = await axios.get(`${apiURL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            "x-admin-api-key": adminApiKey || "",
          },
        });

        const payload = res.data;
        const usersArray: any[] = Array.isArray(payload)
          ? payload
          : payload?.users || payload?.data || [];

        // only active users, normalized
        const activeUsers = usersArray
          .filter((u: any) => {
            if (typeof u.isActive === "boolean") return u.isActive;
            if (typeof u.is_active === "boolean") return u.is_active;
            if (u.status) return String(u.status).toLowerCase() === "active";
            return false;
          })
          .map((u: any) => ({
            userId: String(u.userId || u.user_id || u.id || ""),
            employeeName:
              u.employeeName || u.employee_name || u.name || u.username || "",
            username: u.username,
            emailId: u.emailId || u.email || u.email_id || "",
            isActive: true,
            role: u.role,
          }));

        if (mounted) setDisplayUsers(activeUsers);
      } catch (err) {
        console.error(err);
        if (mounted) setUsersError("Failed to load users");
      } finally {
        if (mounted) setLoadingUsers(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  // filter users by search term (name / email / role / userId)
  const filteredDisplayUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return displayUsers;
    return displayUsers.filter((u) => {
      const name = (u.employeeName || u.username || "").toLowerCase();
      const email = (u.emailId || "").toLowerCase();
      const role = (u.role || "").toLowerCase();
      const id = (u.userId || "").toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        role.includes(q) ||
        id.includes(q)
      );
    });
  }, [displayUsers, searchTerm]);

  // typed payload state (use createdByFromStorage)
  const [taskPayload, setTaskPayload] = useState<CreateTaskPayload>({
    topic: "",
    description: "",
    priority: 2,
    dueAt: null,
    createdBy: createdByFromStorage,
    assignees: [],
    approvers: [],
  });

  // keep payload in sync with individual fields (simple sync)
  useEffect(() => {
    const dueAt = selectedDay
      ? new Date(currentYear, currentMonth, selectedDay, 9, 0, 0).toISOString()
      : null;

    const assignees = selectedAssigneeIds
      .map((id) => displayUsers.find((u) => u.userId === id))
      .filter(Boolean)
      .map((u: any) => ({
        userId: u.userId,
        name: u.employeeName || u.username || "",
        email: u.emailId || "",
      }));

    const approvers = selectedApproverIds
      .map((id) => displayUsers.find((u) => u.userId === id))
      .filter(Boolean)
      .map((u: any) => ({
        userId: u.userId,
        name: u.employeeName || u.username || "",
        email: u.emailId || "",
      }));

    setTaskPayload((p) => ({
      ...p,
      topic,
      description,
      priority,
      dueAt,
      // ensure createdBy comes from storage
      createdBy: createdByFromStorage,
      assignees,
      approvers,
    }));
  }, [
    topic,
    description,
    priority,
    selectedDay,
    currentMonth,
    currentYear,
    selectedAssigneeIds,
    selectedApproverIds,
    displayUsers,
    createdByFromStorage,
    // createdByFromStorage is stable in this component
  ]);

  const handleCreateTask = async () => {
    setIsSubmitting(true);
    try {
      // ensure payload includes createdBy explicitly
      const body: CreateTaskPayload = {
        ...taskPayload,
        createdBy: createdByFromStorage,
      };

      await axios.post(`${apiURL}/api/tasks`, body, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-api-key": adminApiKey || "",
        },
      });
      toast.success("Task created");
      // reset local state
      setTopic("");
      setDescription("");
      setPriority(2);
      setSelectedDay(null);
      setSelectedAssigneeIds([]);
      setSelectedApproverIds([]);
      setTaskPayload({
        topic: "",
        description: "",
        priority: 2,
        dueAt: null,
        createdBy: createdByFromStorage,
        assignees: [],
        approvers: [],
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to create task";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  // toggle helpers for multi-select
  const toggleAssignee = (id: string) => {
    setSelectedAssigneeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const toggleApprover = (id: string) => {
    setSelectedApproverIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl">
      {/* Main Content */}
      <div className="flex justify-center rounded-xl">
        <div className="p-6 rounded-xl shadow-md space-y-6 w-full max-w-full">
          <h2 className="text-xl font-semibold text-secondary-text-dark">
            Create and Assign Task
          </h2>

          <div className="space-y-6">
            {/* Row 1: Topic, Priority, Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Topic */}
              <div>
                <label className="block">
                  <span className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                    Topic <span className="text-red-500">*</span>
                  </span>
                  <Input
                    value={topic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTopic(e.target.value)
                    }
                    placeholder="Enter task topic"
                  />
                </label>
              </div>

              {/* Priority */}
              <div>
                <label className="block">
                  <span className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                    Priority Level <span className="text-red-500">*</span>
                  </span>

                  {/* Mobile: button group (keep as-is) */}
                  <div className="flex gap-2 md:hidden">
                    {[1, 2, 3].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p as 1 | 2 | 3)}
                        className={`flex-1 rounded-md p-2.5 border transition ${
                          priority === p
                            ? "border-primary bg-surface dark:bg-surface"
                            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600"
                        }`}
                      >
                        <div
                          className={`text-base font-semibold ${
                            p === 1
                              ? "text-emerald-600 dark:text-emerald-400"
                              : p === 2
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {p}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {p === 1 ? "Low" : p === 2 ? "Medium" : "High"}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Desktop: dropdown (uses new Dropdown component) */}
                  <div className="hidden md:block relative">
                    <Dropdown
                      value={priority}
                      onChange={(val) => setPriority(val as 1 | 2 | 3)}
                      options={[
                        { value: 1, label: "Low" },
                        { value: 2, label: "Medium" },
                        { value: 3, label: "High" },
                      ]}
                      ariaLabel="Priority Level"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          priority === 1
                            ? "bg-emerald-500"
                            : priority === 2
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      />
                    </div>
                  </div>
                </label>
              </div>

              {/* Due Date */}
              <div>
                <label className="block">
                  <span className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                    Due Date
                  </span>

                  <DateInput
                    value={
                      selectedDay
                        ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
                            selectedDay,
                          ).padStart(2, "0")}`
                        : ""
                    }
                    onDateChange={(y, m, d) => {
                      if (d === null) {
                        setSelectedDay(null);
                        return;
                      }
                      setCurrentYear(y);
                      setCurrentMonth(m - 1);
                      setSelectedDay(d);
                    }}
                    ariaLabel="Due Date"
                  />
                </label>
              </div>
            </div>

            {/* Row 2: Description */}
            <div>
              <label className="block">
                <span className="text-sm font-medium text-primary-header mb-2 block">
                  Description
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Enter detailed task instructions..."
                  className="w-full rounded-md border border-primary dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-header focus:border-transparent"
                />
              </label>
            </div>

            {/* Calendar and Assignment Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Calendar */}
              <div>
                <h3 className="text-sm font-medium text-primary-header dark:text-green-500 mb-4">
                  Select Due Date
                </h3>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <ChevronLeft
                        className="text-slate-600 dark:text-slate-300"
                        size={20}
                      />
                    </button>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {new Intl.DateTimeFormat("default", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(currentYear, currentMonth))}
                    </p>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <ChevronRight
                        className="text-slate-600 dark:text-slate-300"
                        size={20}
                      />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Weekday Headers */}
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 pb-2"
                      >
                        {d}
                      </div>
                    ))}
                    {/* Days */}
                    {[...Array(42)].map((_, i) => {
                      const day =
                        i - new Date(currentYear, currentMonth, 1).getDay() + 1;
                      const isCurrentMonth =
                        new Date(currentYear, currentMonth, day).getMonth() ===
                        currentMonth;

                      return (
                        <button
                          key={i}
                          onClick={() => isCurrentMonth && handleDayClick(day)}
                          disabled={!isCurrentMonth}
                          className={`h-10 w-10 rounded-md transition text-sm font-medium ${
                            selectedDay === day && isCurrentMonth
                              ? "bg-primary text-white shadow-md"
                              : isCurrentMonth
                                ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                : "invisible"
                          }`}
                        >
                          {isCurrentMonth ? day : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Assign To */}
              <div>
                <h3 className="text-sm font-medium text-primary-header dark:text-green-500 mb-4">
                  Assign To
                </h3>

                {/* Search */}
                <div className="relative mb-4">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search employees..."
                    className="w-full h-11 rounded-md pl-10 pr-3 bg-white dark:bg-slate-900 border border-primary dark:border-primary text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Employee List */}
                <div className="space-y-2">
                  {loadingUsers ? (
                    <div className="text-sm text-slate-500">
                      Loading users...
                    </div>
                  ) : usersError ? (
                    <div className="text-sm text-rose-500">{usersError}</div>
                  ) : filteredDisplayUsers.length === 0 ? (
                    <div className="text-sm text-slate-500">
                      No active users available
                    </div>
                  ) : (
                    filteredDisplayUsers.map((u) => (
                      <EmployeeItem
                        key={u.userId}
                        name={u.employeeName || u.username || u.emailId}
                        role={u.role || ""}
                        selected={selectedAssigneeIds.includes(u.userId)}
                        onClick={() => toggleAssignee(u.userId)}
                        avatarUrl={u.avatarUrl}
                        initials={(
                          u.employeeName ||
                          u.username ||
                          u.emailId ||
                          ""
                        )
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                        inactive={u.isActive === false}
                      />
                    ))
                  )}
                </div>

                {/* Approvers */}
                <div className="mt-6">
                  <h4 className="text-sm text-primary-header mb-3">
                    Approvers
                  </h4>
                  <div className="space-y-2">
                    {loadingUsers ? (
                      <div className="text-sm text-slate-500">
                        Loading users...
                      </div>
                    ) : filteredDisplayUsers.length === 0 ? (
                      <div className="text-sm text-slate-500">
                        No active users available
                      </div>
                    ) : (
                      filteredDisplayUsers.map((u) => (
                        <EmployeeItem
                          key={u.userId + "-approver"}
                          name={u.employeeName || u.username || u.emailId}
                          role={u.role || ""}
                          selected={selectedApproverIds.includes(u.userId)}
                          onClick={() => toggleApprover(u.userId)}
                          avatarUrl={u.avatarUrl}
                          initials={(
                            u.employeeName ||
                            u.username ||
                            u.emailId ||
                            ""
                          )
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                          inactive={u.isActive === false}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              className="px-6 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              onClick={() => {
                // reset form
                setTopic("");
                setDescription("");
                setPriority(2);
                setSelectedDay(null);
                setSelectedAssigneeIds([]);
                setSelectedApproverIds([]);
                setTaskPayload({
                  topic: "",
                  description: "",
                  priority: 2,
                  dueAt: null,
                  createdBy: createdByFromStorage,
                  assignees: [],
                  approvers: [],
                });
              }}
            >
              Cancel
            </button>

            <button
              className="px-6 py-2.5 rounded-md bg-primary hover:bg-primary-2 text-white font-medium shadow-sm transition"
              onClick={handleCreateTask}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create & Assign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub Component ---------- */

function EmployeeItem({
  name,
  role,
  selected,
  onClick,
  avatarUrl,
  initials,
  inactive,
}: any) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-md cursor-pointer transition ${
        selected
          ? "border-2 border-primary bg-surface dark:bg-primary-2"
          : "bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="User avatar"
          className={`w-10 h-10 rounded-full object-cover border-2 ${inactive ? "grayscale" : ""} border-slate-200 dark:border-slate-700`}
        />
      ) : (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${"bg-primary/20 border-primary/30 text-primary"}`}
        >
          <span className="font-bold text-sm">{initials}</span>
        </div>
      )}

      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {name}
        </p>
        <p
          className={`text-xs truncate ${
            selected
              ? "text-primary dark:text-primary-2"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {role}
        </p>
      </div>
      {selected && (
        <CheckCircle
          className="text-primary dark:text-primary-2 flex-shrink-0"
          size={18}
        />
      )}
    </div>
  );
}
