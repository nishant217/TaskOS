import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flag, Calendar, User } from "lucide-react"

interface TaskCardProps {
  id: string
  title: string
  description?: string
  priority: "P1" | "P2" | "P3"
  status: "pending" | "in-progress" | "completed" | "overdue"
  assignee: {
    name: string
    avatar?: string
  }
  dueDate: string
  onClick?: () => void
}

export function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  assignee,
  dueDate,
  onClick,
}: TaskCardProps) {
  const priorityColors = {
    P1: "destructive",
    P2: "warning",
    P3: "secondary",
  } as const

  const statusColors = {
    pending: "outline",
    "in-progress": "default",
    completed: "success",
    overdue: "destructive",
  } as const

  const statusLabels = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
    overdue: "Overdue",
  }

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-orange-300"
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{title}</h3>
              <p className="text-xs text-gray-600 mt-1">#{id}</p>
            </div>
            <Badge variant={priorityColors[priority]} className="ml-2 flex-shrink-0">
              <Flag size={12} className="mr-1" />
              {priority}
            </Badge>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}

          {/* Status and Date */}
          <div className="flex items-center justify-between text-sm">
            <Badge variant={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
            <div className="flex items-center text-gray-500 gap-1">
              <Calendar size={14} />
              <span className="text-xs">{dueDate}</span>
            </div>
          </div>

          {/* Assignee */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar} />
              <AvatarFallback className="text-xs">
                {assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{assignee.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
