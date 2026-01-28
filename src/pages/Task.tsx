import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Edit,
  Calendar,
  MessageCircle,
  Send,
  MessageSquarePlus,
  Pencil,
  CheckCircle,
  Plus,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_BASE || "";
export default function TaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const payload: any = location.state || null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // normalize payload from approvals or task creation response
  const taskId =
    payload?.taskId || payload?.task_id || payload?.id || "Unknown";
  const status = payload?.status || payload?.approval_status || "UNKNOWN";
  const topic = payload?.topic || payload?.title || "No title";
  const description = payload?.description || "";
  const dueAt = payload?.dueAt || payload?.due_at || null;
  const assignments = payload?.assignments || payload?.assignments || [];
  const approvals = payload?.approvals || payload?.approvals || [];

  // local helper: read stored session (same approach used elsewhere)
  const readStoredSession = async () => {
    try {
      const raw =
        localStorage.getItem("auth_session") ||
        localStorage.getItem("user") ||
        localStorage.getItem("auth");
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    try {
      const c =
        Cookies.get("auth_session") ||
        Cookies.get("user") ||
        Cookies.get("auth");
      if (c) return JSON.parse(c);
    } catch (_) {}
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

  const getApprovalId = () =>
    approvals?.[0]?.approval_id ||
    approvals?.[0]?.approvalId ||
    approvals?.[0]?.approvalId?.toString?.() ||
    approvals?.[0]?.id ||
    null;

  const handleAction = async (action: "approve" | "reject") => {
    const approvalId = getApprovalId();
    if (!approvalId) {
      toast.error("Approval record not found");
      return;
    }

    const stored = await readStoredSession();
    const userId =
      stored?.userId || stored?.user_id || stored?.id || stored?.userId || null;
    if (!userId) {
      toast.error("Missing approver session (x-user-id)");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = {
        remarks: action === "approve" ? "Approved via app" : "Rejected via app",
        approverName: stored?.name || stored?.username || "",
        approverEmail: stored?.email || "",
      };

      const url = `${apiURL}/api/approvals/${encodeURIComponent(
        approvalId,
      )}/${action === "approve" ? "approve" : "reject"}`;

      const res = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": String(userId),
        },
      });

      const decision = res?.data?.decision || res?.data?.status;
      toast.success(
        decision ? `Action successful: ${String(decision)}` : "Action successful",
      );

      // optional: navigate back or refresh
      navigate(-1);
    } catch (err: any) {
      const statusCode = err?.response?.status;
      const body = err?.response?.data;
      if (statusCode === 401) {
        toast.error(body?.error || "Only the assigned approver can take this action");
      } else if (statusCode === 404) {
        toast.error("Approval not found");
      } else if (statusCode === 409) {
        toast.error("Approval already decided");
      } else {
        toast.error(body?.error || body?.message || err?.message || "Failed to perform action");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-app-light dark:bg-app-dark font-display text-white">
      {/* Mobile Container (unchanged) */}
      <div className="relative mx-auto max-w-[430px] border-x border-white/5 shadow-2xl flex flex-col md:hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-app-light/80 dark:bg-app-dark/80 backdrop-blur border-b border-white/5">
          <div className="flex items-center justify-between p-4 pb-2">
            <button
              onClick={() => navigate(-1)}
              className="h-12 w-12 flex items-center text-primary"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-lg font-bold text-center flex-1 tracking-tight">
              Task Details
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-32">
          {/* Title + ID */}
          <div className="px-4 pt-6">
            <span className="inline-flex rounded-lg bg-primary/20 px-2 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-2">
              {taskId}
            </span>

            <h3 className="text-2xl font-bold leading-tight">{topic}</h3>
          </div>

          {/* Status Chips */}
          <div className="flex gap-3 p-4 flex-wrap">
            <Chip
              color="red"
              icon={<CheckCircle size={14} />}
              label={
                payload?.priority ? `Priority ${payload.priority}` : "Priority"
              }
            />
            <Chip color="primary" icon={<Pencil size={14} />} label={status} />
            <Chip
              color="gray"
              icon={<Calendar size={14} />}
              label={dueAt ? new Date(dueAt).toLocaleString() : "No due date"}
            />
          </div>

          {/* Description */}
          <section className="mt-4">
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest px-4 pb-2">
              Task Description
            </h3>
            <p className="text-white/90 text-base leading-relaxed px-4">
              {description || "No description provided."}
            </p>
          </section>

          <div className="h-6" />

          {/* Assigned By */}
          <section>
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest px-4 pb-3">
              Assignments
            </h3>

            <div className="mx-4 space-y-3">
              {assignments.length === 0 ? (
                <div className="text-sm text-white/60">No assignees</div>
              ) : (
                assignments.map((a: any) => (
                  <div
                    key={a.assignment_id || a.assigned_to_user_id}
                    className="mx-0 bg-white/5 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/30 border-2 border-primary/20 overflow-hidden flex items-center justify-center text-sm">
                      {(a.assigned_to_name || "")
                        .split(" ")
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="flex-1">
                      <p className="font-bold">
                        {a.assigned_to_name || a.assigned_to_user_id}
                      </p>
                      <p className="text-sm text-white/50">
                        {a.assigned_to_email || ""}
                      </p>
                    </div>

                    <div className="text-sm text-white/40">
                      {a.assigned_at
                        ? new Date(a.assigned_at).toLocaleString()
                        : ""}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="h-8" />

          {/* Timeline */}
          <section>
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest px-4 pb-4">
              Activity Timeline
            </h3>

            <div className="px-4 space-y-6">
              <TimelineItem
                icon={<MessageCircle size={12} />}
                title={
                  <>
                    {payload?.created_by_name
                      ? `Created by ${payload.created_by_name}`
                      : "Task activity"}
                  </>
                }
                description={payload?.description || ""}
                meta={dueAt ? new Date(dueAt).toLocaleString() : ""}
              />

              {approvals.length > 0 && (
                <TimelineItem
                  icon={<Plus size={12} />}
                  title={`Approval: ${approvals[0].approver_name || approvals[0].approverName || approvals[0].approver_user_id}`}
                  meta={`Status: ${approvals[0].approval_status || approvals[0].approval_status || "PENDING"}`}
                  last
                />
              )}
            </div>
          </section>

          {/* Action Buttons (mobile) */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 pr-2">
            <button
              onClick={() => handleAction("reject")}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-white/5 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-white/10 hover:bg-white/10 transition disabled:opacity-60"
            >
              <MessageSquarePlus size={16} className="inline-block mr-2" />
              Reject
            </button>

            <button
              onClick={() => handleAction("approve")}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary/90 transition shadow-sm disabled:opacity-60"
            >
              <Send size={16} />
              {isSubmitting ? "Processing..." : "Approve"}
            </button>
          </div>
        </main>

        {/* Footer */}
      </div>

      {/* DESKTOP Container */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-950 rounded-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex rounded-lg bg-primary/20 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider"></span>
              <h1 className="text-2xl font-bold">
                {taskId} : {topic}
              </h1>
            </div>
          </div>

          {/* Chips */}
          <div className="grid grid-cols-4 gap-4 my-6">
            <StatCard
              label="Priority"
              value={payload?.priority ? String(payload.priority) : "—"}
              icon={<CheckCircle size={16} className="text-red-400" />}
              accent="red"
            />

            <StatCard
              label="Status"
              value={status}
              icon={<Pencil size={16} className="text-primary" />}
              accent="primary"
            />

            <StatCard
              label="Due"
              value={dueAt ? new Date(dueAt).toLocaleDateString() : "—"}
              icon={<Calendar size={16} className="text-amber-400" />}
              accent="amber"
            />

            <StatCard
              label="Assigned By"
              value={payload?.created_by_name || "—"}
              icon={<MessageCircle size={16} className="text-slate-300" />}
              accent="slate"
            />
          </div>

          {/* Split: Timeline (left) | Description (right) */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-200">
                  Activity Timeline
                </h3>
                <div className="text-xs text-slate-400">Last 7 days</div>
              </div>

              <div className="space-y-6">
                <TimelineItem
                  icon={<Edit size={14} />}
                  title={
                    <>
                      Status updated to{" "}
                      <span className="text-primary">In Progress</span>
                    </>
                  }
                  meta="5 hours ago • System"
                  active
                />

                <TimelineItem
                  icon={<MessageCircle size={14} />}
                  title={
                    <>
                      Remark added by{" "}
                      <span className="text-white">Alice Smith</span>
                    </>
                  }
                  description="I've attached the latest Q2 variance report for reference."
                  meta="Yesterday • 2:15 PM"
                />

                <TimelineItem
                  icon={<Plus size={14} />}
                  title="Task Created"
                  meta="2 days ago • John Doe"
                  last
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Task Description
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {description ||
                  "No description provided."}
              </p>
            </div>
          </div>

          {/* Approve / Reject buttons full width under the two cards (desktop) */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => handleAction("reject")}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-white/5 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-white/10 hover:bg-white/10 transition disabled:opacity-60"
            >
              <MessageSquarePlus size={16} className="inline-block mr-2" />
              Reject
            </button>

            <button
              onClick={() => handleAction("approve")}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary/90 transition shadow-sm disabled:opacity-60"
            >
              <Send size={16} />
              {isSubmitting ? "Processing..." : "Approve"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Chip({ icon, label, color }: any) {
  const colors: any = {
    red: "bg-red-500/20 border-red-500/30 text-red-400",
    primary: "bg-primary/20 border-primary/30 text-primary",
    gray: "bg-white/5 border-white/10 text-gray-300",
  };

  return (
    <div
      className={`flex h-8 items-center gap-2 rounded-lg px-4 border ${colors[color]}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function TimelineItem({ icon, title, description, meta, active, last }: any) {
  return (
    <div className="flex gap-4 relative">
      {!last && (
        <div className="absolute left-[11px] top-6 w-[2px] h-full bg-white/10" />
      )}

      <div
        className={`z-10 h-6 w-6 rounded-full flex items-center justify-center ${
          active ? "bg-primary" : "bg-white/10"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1 pb-2">
        <p className="text-sm font-semibold">{title}</p>
        {description && (
          <p className="text-sm italic text-white/70 mt-1">"{description}"</p>
        )}
        <p className="text-xs text-white/40 mt-1">{meta}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent = "slate" }: any) {
  return (
    <div
      className={`rounded-xl p-4 flex items-center justify-between border border-primary bg-surface`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md flex items-center justify-center bg-transparent">
          {icon}
        </div>
        <div>
          <div className="text-xs text-slate-400">{label}</div>
          <div className="text-sm font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}
