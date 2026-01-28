import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import Input from "../components/ui/input";
import Dropdown from "../components/ui/dropdown";
import toast from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_BASE || "";
const adminApiKey = import.meta.env.VITE_ADMIN_API_KEY || "";

type UserPayload = {
  userId?: string;
  username?: string;
  emailId?: string;
  employeeName?: string;
  mobile?: string;
  role?: string;
  isActive?: boolean;
};

export default function UserDetailView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<UserPayload | null>(() => {
    const s: any = location?.state;
    if (!s) return null;
    return {
      userId: s.userId || s.id || s.user_id,
      username: s.username,
      emailId: s.emailId || s.email,
      employeeName: s.employeeName || s.name,
      mobile: s.mobile,
      role: s.role,
      isActive: typeof s.isActive === "boolean" ? s.isActive : s.is_active,
    };
  });

  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("No user selected. Open details from users list.");
    } else {
      setError(null);
    }
  }, [user]);

  const toggleActive = async () => {
    if (!user?.userId) return;
    setSaving(true);
    setError(null);
    try {
      const newState = !user.isActive;
      // call specific endpoints per API: deactivate / reactivate
      const action = newState ? "reactivate" : "deactivate";
      const url = `${apiURL}/api/users/${encodeURIComponent(user.userId)}/${action}`;
      // use POST (adjust method if your API expects PATCH)
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-api-key": adminApiKey,
          },
        }
      );
      setUser((u) => (u ? { ...u, isActive: newState } : u));
      // show toast from API response message if present, else generic success
      const msg = res?.data?.message || `User ${newState ? "activated" : "deactivated"} successfully`;
      toast.success(msg);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to update status";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const resetPassword = async () => {
    if (!user?.userId) return;
    setResetting(true);
    setError(null);
    try {
      const url = `${apiURL}/api/users/${encodeURIComponent(user.userId)}/reset-password`;
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-api-key": adminApiKey,
          },
        }
      );
      const msg = res?.data?.message || "Password reset requested";
      toast.success(msg);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Password reset failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-app dark:bg-app-dark min-h-screen font-display text-slate-900 dark:text-white">
      {/* MOBILE Container */}
      <div className="relative mx-auto max-w-md min-h-screen flex flex-col md:hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-app-light/80 dark:bg-app-dark/80 backdrop-blur border-b border-white/5">
          <div className="flex items-center justify-between p-4 pb-2">
            <button
              className="h-12 w-12 flex items-center text-primary"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-lg font-bold text-center flex-1 tracking-tight">
              All Users
            </h2>
          </div>{" "}
        </header>

        {error ? (
          <div className="text-sm text-rose-500 p-4">{error}</div>
        ) : user ? (
          <>
            {/* -------- User Info (Disabled Inputs) - mobile -------- */}
            <div className="grid grid-cols-1 gap-4 p-6">
              <Input label="User ID" value={user.userId || ""} disabled />
              <Input label="Username" value={user.username || ""} disabled />
              <Input label="Employee Name" value={user.employeeName || ""} disabled />
              <Input label="Email ID" value={user.emailId || ""} type="email" disabled />
              <Input label="Mobile" value={user.mobile || ""} type="tel" disabled />

              <div>
                <label className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                  Role
                </label>
                <Dropdown
                  value={user.role || ""}
                  onChange={() => {}}
                  disabled
                  options={[
                    { value: "ADMIN", label: "Administrator" },
                    { value: "MANAGER", label: "Manager" },
                    { value: "EMPLOYEE", label: "Employee" },
                    { value: "VIEWER", label: "Viewer" },
                  ]}
                  className="w-full h-12 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white opacity-80"
                />
              </div>

              <div className="text-sm font-medium">
                Status:&nbsp;
                {user.isActive ? (
                  <span className="text-emerald-600">Active</span>
                ) : (
                  <span className="text-rose-500">Inactive</span>
                )}
              </div>

              {/* Action */}
              {/* <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={toggleActive}
                  disabled={saving}
                  className={`px-6 py-2.5 rounded-md font-medium text-white transition ${
                    user.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                  } disabled:opacity-60`}
                >
                  {saving ? "Saving..." : user.isActive ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={resetPassword}
                  disabled={resetting}
                  className="px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  {resetting ? "Sending..." : "Reset Password"}
                </button>
              </div> */}
            </div>
          </>
        ) : null}
      </div>

      {/* DESKTOP Container (view-only card similar to CreateUser) */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-950 rounded-xl p-6">
        <div className="p-6 rounded-xl shadow-md space-y-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Back"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-2xl font-semibold">User Details</h2>
            </div>

            <div className="flex items-center gap-3">
              {/* <div className="text-sm font-medium">
                {user?.isActive ? (
                  <span className="text-emerald-600">Active</span>
                ) : (
                  <span className="text-rose-500">Inactive</span>
                )}
              </div> */}

              {/* <button
                onClick={toggleActive}
                disabled={saving || !user?.userId}
                className={`px-4 py-2 rounded-md font-medium text-white transition ${
                  user?.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                } disabled:opacity-60`}
              >
                {saving ? "Saving..." : user?.isActive ? "Deactivate" : "Activate"}
              </button> */}
            </div>
          </div>

          {error ? (
            <div className="text-sm text-rose-500">{error}</div>
          ) : user ? (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="User ID" value={user.userId || ""} disabled />
                <Input label="Username" value={user.username || ""} disabled />
                <Input label="Employee Name" value={user.employeeName || ""} disabled />

                <Input label="Email ID" value={user.emailId || ""} type="email" disabled />
                <Input label="Mobile" value={user.mobile || ""} type="tel" disabled />

                <div>
                  <label className="text-sm font-medium text-primary-header dark:text-green-500 mb-2 block">
                    Role
                  </label>
                  <Dropdown
                    value={user.role || ""}
                    onChange={() => {}}
                    disabled
                    options={[
                      { value: "ADMIN", label: "Administrator" },
                      { value: "MANAGER", label: "Manager" },
                      { value: "EMPLOYEE", label: "Employee" },
                      { value: "VIEWER", label: "Viewer" },
                    ]}
                    className="w-full h-12 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white opacity-80"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="px-6 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition mr-3"
                >
                  Back
                </button>

                <button
                  onClick={toggleActive}
                  type="button"
                  disabled={saving || !user?.userId}
                  className={`px-6 py-2.5 rounded-md text-white font-medium transition ${
                    user?.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                  } disabled:opacity-60`}
                >
                  {saving ? "Saving..." : user?.isActive ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={resetPassword}
                  type="button"
                  disabled={resetting || !user?.userId}
                  className="px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition ml-3"
                >
                  {resetting ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-sm text-slate-500">No user selected — open from the users list.</div>
          )}
        </div>
      </div>
    </div>
  );
}
