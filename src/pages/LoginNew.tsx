import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, LogIn } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">TaskOS</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 mt-6"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-orange-600 hover:text-orange-700 font-medium">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>Demo Credentials</p>
          <p>Email: demo@tascos.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  )
}
