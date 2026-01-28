// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import ProtectedRoute from "./contexts/ProtectedRoutes";

import { Toaster } from "react-hot-toast"; // ✅ ADD

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import PreLoader from "./pages/PreLoader";
import AppLayout from "./components/AppLayout";
import CreateTask from "./pages/CreateTask";
import AllTasks from "./pages/AllTask";
import TaskDetails from "./pages/Task";
import CreateUser from "./pages/CreateUser";
import UserManagement from "./pages/AllUsers";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetailView from "./pages/UserDetail";
import AllRealTasks from "./pages/RealAllTask"

// Public route
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PreLoader />

        {/* ✅ TOAST CONTAINER */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f172a",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ecfdf5",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fee2e2",
              },
            },
          }}
        />

        <BrowserRouter>
          <Routes>
            {/* PUBLIC */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* PROTECTED */}
            <Route
              path="/landing"
              element={
                <ProtectedRoute>
                  <AppLayout title="Dashboard">
                    <Landing />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-task"
              element={
                <ProtectedRoute>
                  <AppLayout title="Create Task">
                    <CreateTask />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-tasks"
              element={
                <ProtectedRoute>
                  <AppLayout title="Approvals">
                    <AllTasks />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/real-all-tasks"
              element={
                <ProtectedRoute>
                  <AppLayout title="Real All Tasks">
                    <AllRealTasks />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <AppLayout title="Task Details">
                    <TaskDetails />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-user"
              element={
                <ProtectedRoute>
                  <AppLayout title="Create User">
                    <CreateUser />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-users"
              element={
                <ProtectedRoute>
                  <AppLayout title="All Users">
                    <UserManagement />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <AppLayout title="User Details">
                    <UserDetailView />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout title="Admin Dashboard">
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
