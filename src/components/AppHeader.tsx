import { Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  userName?: string
  userRole?: string
}

export function AppHeader({
  userName = "John Doe",
  userRole = "Manager",
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 ml-0 lg:ml-64">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="ml-12 lg:ml-0" />

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userRole}</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
