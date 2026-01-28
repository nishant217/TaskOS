import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock, UserPlus } from "lucide-react"

export function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      navigate("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-orange-600 mb-4">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">TaskOS</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Register Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Create an account to start managing your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" required />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 mt-6"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                Sign in
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
