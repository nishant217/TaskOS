import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Mail, Phone } from "lucide-react"

interface UserListItemProps {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: "admin" | "manager" | "user"
  status: "active" | "inactive"
  onEdit?: () => void
  onDelete?: () => void
}

export function UserListItem({
  id,
  name,
  email,
  phone,
  avatar,
  role,
  status,
  onEdit,
  onDelete,
}: UserListItemProps) {
  const roleColors = {
    admin: "destructive",
    manager: "warning",
    user: "secondary",
  } as const

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span className="truncate">{email}</span>
            </div>
            {phone && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{phone}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <Badge
          variant={status === "active" ? "success" : "outline"}
          className="flex-shrink-0"
        >
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
        <Badge variant={roleColors[role]} className="flex-shrink-0">
          {role}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          onClick={onEdit}
        >
          <MoreVertical size={18} />
        </Button>
      </div>
    </div>
  )
}
