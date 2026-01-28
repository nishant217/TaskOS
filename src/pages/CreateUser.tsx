import React, { useState } from "react";
import {
  ChevronLeft,
  AtSign,
  Mail,
  User,
  Phone,
  BadgeCheck,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import Input from "../components/ui/input";
import Dropdown from "../components/ui/dropdown";
import DateInput from "../components/ui/dateinput";
import { toast } from "react-hot-toast";

const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY || "";
const apiURL = import.meta.env.VITE_API_BASE || "";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Notification settings state
  const [notificationPriority, setNotificationPriority] = useState<1 | 2 | 3>(
    2,
  );
  const [notificationDueAt, setNotificationDueAt] = useState("");
  const [notificationFromNumber, setNotificationFromNumber] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const readStoredSession = async () => {
    // try localStorage
    try {
      const raw = localStorage.getItem("auth_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed;
      }
    } catch (_) {}

    // try cookie
    try {
      const c = Cookies.get("auth_session");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // read createdBy from stored session (localStorage / cookie / cache)
    const stored = await readStoredSession();
    const createdBy = {
      userId: stored?.userId || stored?.user_id || null,
      name: stored?.name || stored?.username || null,
      email: stored?.email || null,
    };

    const payload = {
      username: username,
      emailId: email,
      employeeName: employeeName,
      mobile: mobile,
      role: role,
      createdBy: {
        userId: createdBy.userId,
        name: createdBy.name,
        email: createdBy.email,
      },
      notification: {
        priority: notificationPriority,
        dueAt: notificationDueAt || null,
        fromNumber: notificationFromNumber || null,
      },
    };

    try {
      const res = await axios.post(`${apiURL}/api/users`, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-api-key": adminApiKey || "",
        },
      });
      // reset form on success
      setUsername("");
      setEmployeeName("");
      setEmail("");
      setMobile("");
      setRole("");
      setNotificationPriority(2);
      setNotificationDueAt("");
      setNotificationFromNumber("");
      setIsActive(true);
      console.log("User created", payload);
      if(res.data.passwordSetupToken){
        toast.success("User created successfully. Password setup token sent to email.");
      }
    } catch (err) {
      console.error("Create user failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl">
      {/* Main Content */}
      <div className="flex justify-center rounded-xl">
        <div className="p-6 rounded-xl shadow-md space-y-6 w-full max-w-full">
          <h2 className="text-xl font-semibold text-secondary-text-dark">
            Create User
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ---------- Desktop: 3 column grid for inputs ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Username"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <Input
                label="Employee Name"
                placeholder=""
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />

              <Input
                label="Email ID"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />

              {/* Mobile */}
              <Input
                label="Mobile"
                placeholder=""
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
              />

              {/* Role selection spans 2 columns on desktop */}
              <div className="md:col-span-1">
                <label className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                  Role Selection <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Dropdown
                    value={role}
                    onChange={(val) => setRole(String(val))}
                    options={[
                      { value: "", label: "Select Role" },
                      { value: "ADMIN", label: "Administrator" },
                      { value: "MANAGER", label: "Manager" },
                      { value: "EMPLOYEE", label: "Employee" },
                    ]}
                    className="w-full h-12 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-10 text-slate-900 dark:text-white appearance-none transition-all"
                    ariaLabel="Role Selection"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* ---------- Notification Settings: use 3-column grid on desktop ---------- */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-text-dark">
                Notification Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Priority: buttons on mobile, dropdown on desktop */}
                <div>
                  <label className="block text-sm font-medium text-primary-header dark:text-green-500 mb-2">
                    Notification Priority
                  </label>

                  {/* Mobile: button group (visible on small screens) */}
                  <div className="flex gap-2 md:hidden">
                    {[1, 2, 3].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setNotificationPriority(p as 1 | 2 | 3)}
                        className={`flex-1 rounded-md p-2.5 border transition ${
                          notificationPriority === p
                            ? "border-green-500 bg-primary dark:bg-primary-2"
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

                  {/* Desktop: dropdown (visible on md+) */}
                  <div className="hidden md:block">
                    <Dropdown
                      value={String(notificationPriority)}
                      onChange={(val) =>
                        setNotificationPriority(Number(val) as 1 | 2 | 3)
                      }
                      options={[
                        { value: "1", label: "1 — Low" },
                        { value: "2", label: "2 — Medium" },
                        { value: "3", label: "3 — High" },
                      ]}
                      className="w-full h-12 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-3"
                      ariaLabel="Notification Priority"
                    />
                  </div>
                </div>

                {/* Due At */}
                <div>
                  <label className="block text-sm font-medium text-primary-header dark:text-green-500 mb-2">
                    Notification Due At
                  </label>
                  <DateInput
                    value={notificationDueAt}
                    onDateChange={(y, m, d) => {
                      if (d === null) {
                        setNotificationDueAt("");
                        return;
                      }
                      setNotificationDueAt(
                        `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T10:00:00.000Z`,
                      );
                    }}
                    ariaLabel="Notification Due At"
                  />
                </div>

                {/* From Number */}
                <div>
                  <label className="block text-sm font-medium text-primary-header dark:text-green-500 mb-2">
                    From Phone Number
                  </label>
                  <Input
                    value={notificationFromNumber}
                    onChange={(e) => setNotificationFromNumber(e.target.value)}
                    placeholder="+1234567890"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                className="px-6 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={() => {
                  // reset form
                  setUsername("");
                  setEmployeeName("");
                  setEmail("");
                  setMobile("");
                  setRole("");
                  setNotificationPriority(2);
                  setNotificationDueAt("");
                  setNotificationFromNumber("");
                  setIsActive(true);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-md bg-primary hover:bg-primary-2 text-white font-medium shadow-sm transition disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
