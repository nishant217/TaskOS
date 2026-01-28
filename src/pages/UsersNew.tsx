import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserListItem } from "@/components/UserListItem"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"

const SAMPLE_USERS = [
  {
    id: "USR-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@tascos.com",
    phone: "+1 (555) 123-4567",
    role: "admin" as const,
    status: "active" as const,
  },
  {
    id: "USR-002",
    name: "Marcus Williams",
    email: "marcus.williams@tascos.com",
    phone: "+1 (555) 234-5678",
    role: "manager" as const,
    status: "active" as const,
  },
  {
    id: "USR-003",
    name: "Alex Chen",
    email: "alex.chen@tascos.com",
    phone: "+1 (555) 345-6789",
    role: "user" as const,
    status: "active" as const,
  },
  {
    id: "USR-004",
    name: "Priya Patel",
    email: "priya.patel@tascos.com",
    phone: "+1 (555) 456-7890",
    role: "manager" as const,
    status: "inactive" as const,
  },
  {
    id: "USR-005",
    name: "David Singh",
    email: "david.singh@tascos.com",
    phone: "+1 (555) 567-8901",
    role: "user" as const,
    status: "active" as const,
  },
]

export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(SAMPLE_USERS)
  const [isAddingUser, setIsAddingUser] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600 mt-1">
              Manage your team and user permissions
            </p>
          </div>
          <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                <span className="hidden sm:inline">Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account in your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@tascos.com"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button onClick={() => setIsAddingUser(false)} className="w-full">
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem
                key={user.id}
                {...user}
                onEdit={() => console.log("Edit user:", user.id)}
                onDelete={() => console.log("Delete user:", user.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === "active").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-orange-600">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
