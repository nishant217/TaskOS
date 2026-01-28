import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-11 pr-4 py-3 bg-surface border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full pl-11 pr-12 py-3 bg-surface border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Forgot password link */}
      <div className="text-right">
        <a href="#" className="text-sm text-primary hover:underline transition-all">
          Forgot password?
        </a>
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-primary text-inverse font-semibold rounded-lg hover:brightness-110 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        ) : (
          "Log In"
        )}
      </motion.button>
    </form>
  );
}
