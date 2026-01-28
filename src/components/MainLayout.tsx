import { ReactNode } from "react"
import { SidebarNav } from "@/components/SidebarNav"
import { AppHeader } from "@/components/AppHeader"

interface MainLayoutProps {
  children: ReactNode
  isAdmin?: boolean
  userName?: string
  userRole?: string
}

export function MainLayout({
  children,
  isAdmin = false,
  userName = "John Doe",
  userRole = "Manager",
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <SidebarNav isAdmin={isAdmin} />
      <div className="lg:ml-64">
        <AppHeader userName={userName} userRole={userRole} />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
