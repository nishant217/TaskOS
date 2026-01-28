import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    positive: boolean
  }
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Icon className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        {trend && (
          <div className={`mt-4 text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
            {trend.positive ? "+" : "-"}{trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  )
}
