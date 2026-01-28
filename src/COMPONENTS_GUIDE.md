# TaskOS Component Library

A comprehensive shadcn/ui-based component library for the TaskOS task management application.

## Color Scheme

- **Primary**: Orange (#FF6B35)
- **Background**: White (#FFFFFF)
- **Surface**: Light Gray (#F8F9FA)
- **Border**: Light Gray (#E5E7EB)
- **Text Primary**: Dark Gray (#1F2937)
- **Text Muted**: Medium Gray (#6B7280)

## UI Components

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning">Warning</Badge>
```

### Avatar
```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="..." />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Header</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Select
```tsx
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"

<Select>
  <SelectTrigger>Select option</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

## Feature Components

### TaskCard
```tsx
import { TaskCard } from "@/components/TaskCard"

<TaskCard
  id="TSK-001"
  title="Update Report"
  priority="P1"
  status="in-progress"
  assignee={{ name: "John Doe" }}
  dueDate="Today"
  onClick={() => {}}
/>
```

### StatCard
```tsx
import { StatCard } from "@/components/StatCard"
import { Clock } from "lucide-react"

<StatCard
  title="In Progress"
  value={12}
  icon={Clock}
  description="Active tasks"
/>
```

### UserListItem
```tsx
import { UserListItem } from "@/components/UserListItem"

<UserListItem
  id="USR-001"
  name="John Doe"
  email="john@tascos.com"
  role="admin"
  status="active"
  onEdit={() => {}}
  onDelete={() => {}}
/>
```

## Layout Components

### MainLayout
```tsx
import { MainLayout } from "@/components/MainLayout"

<MainLayout isAdmin={true} userName="John" userRole="Admin">
  {/* Page content */}
</MainLayout>
```

### SidebarNav
Navigation sidebar with route tracking.

### AppHeader
Top header with notifications and user profile.

## Pages

- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard
- `/tasks` - All tasks list
- `/users` - Team members management
- `/admin` - Admin dashboard

## Styling

All components use Tailwind CSS with a consistent white and orange theme.
Focus states use orange-500 ring effect.
Hover states provide subtle feedback with shadow or background changes.

## Responsive Design

- Mobile-first approach
- `md:` breakpoint for tablet (768px)
- `lg:` breakpoint for desktop (1024px)
- Sidebar hidden on mobile, shown on desktop

## Key Features

1. **Component Library**: Pre-built shadcn/ui components
2. **Task Management**: Create, view, filter, and track tasks
3. **User Management**: Add, edit, and manage team members
4. **Admin Dashboard**: System overview and analytics
5. **Responsive**: Works seamlessly on mobile, tablet, and desktop
6. **Accessible**: WCAG compliant with proper ARIA labels
7. **Consistent**: Unified white and orange theme throughout
