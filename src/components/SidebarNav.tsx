import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const NAVIGATION_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Users, label: "Team", href: "/users" },
  { icon: Shield, label: "Admin", href: "/admin", adminOnly: true },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface SidebarNavProps {
  isAdmin?: boolean
}

export function SidebarNav({ isAdmin = false }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const filteredItems = NAVIGATION_ITEMS.filter(
    (item) => !item.adminOnly || isAdmin
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-gray-100 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8 h-full overflow-y-auto flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 mt-8 lg:mt-0">
            <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TaskOS</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {filteredItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
