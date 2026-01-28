// TaskOS Type Definitions based on database schema

export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export type TaskStatus = 
  | 'CREATED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'OVERDUE';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type Priority = 1 | 2 | 3; // 1 = High, 2 = Medium, 3 = Low

export interface User {
  id: number;
  user_id: string; // NYNE-001 format
  username: string;
  email_id: string;
  employee_name?: string;
  mobile?: string;
  role: UserRole;
  is_active: boolean;
  is_password_set: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  task_id: string; // TASK-001 format
  topic: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  due_at: string;
  created_by_user_id: string;
  created_by_name?: string;
  created_by_email?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  assignments?: TaskAssignment[];
  approvals?: TaskApproval[];
}

export interface TaskAssignment {
  assignment_id: number;
  task_id: string;
  assigned_to_user_id: string;
  assigned_to_name?: string;
  assigned_to_email?: string;
  assigned_by_user_id: string;
  assigned_by_name?: string;
  assigned_by_email?: string;
  assigned_at: string;
}

export interface TaskApproval {
  approval_id: number;
  task_id: string;
  approver_user_id: string;
  approver_name?: string;
  approver_email?: string;
  approval_status: ApprovalStatus;
  approved_at?: string;
  remarks?: string;
}

export interface TaskAuditLog {
  log_id: number;
  task_id: string;
  action: string;
  performed_by_user_id?: string;
  performed_by_name?: string;
  old_value?: string;
  new_value?: string;
  created_at: string;
}

export interface Notification {
  id: number;
  notification_id: string; // NOTIF-000001 format
  priority: Priority;
  topic: string;
  description?: string;
  from_user_id?: string;
  from_name?: string;
  from_email?: string;
  to_user_id: string;
  to_name?: string;
  to_email?: string;
  due_at?: string;
  is_approval_notification: boolean;
  is_read: boolean;
  created_at: string;
}

// Helper functions
export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case 1: return 'High';
    case 2: return 'Medium';
    case 3: return 'Low';
  }
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 1: return 'destructive';
    case 2: return 'warning';
    case 3: return 'secondary';
  }
};

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'CREATED': return 'secondary';
    case 'ASSIGNED': return 'primary';
    case 'IN_PROGRESS': return 'warning';
    case 'PENDING_APPROVAL': return 'warning';
    case 'APPROVED': return 'success';
    case 'REJECTED': return 'destructive';
    case 'COMPLETED': return 'success';
    case 'OVERDUE': return 'destructive';
  }
};
