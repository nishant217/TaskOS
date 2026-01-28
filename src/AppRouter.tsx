import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "@/components/MainLayout"
import { LoginPage } from "@/pages/LoginNew"
import { RegisterPage } from "@/pages/RegisterNew"
import { DashboardPage } from "@/pages/DashboardNew"
import { TasksPage } from "@/pages/TasksNew"
import { UsersPage } from "@/pages/UsersNew"
import { AdminDashboardPage } from "@/pages/AdminDashboardNew"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App Routes */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <MainLayout>
              <TasksPage />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <UsersPage />
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <MainLayout isAdmin={true}>
              <AdminDashboardPage />
            </MainLayout>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
