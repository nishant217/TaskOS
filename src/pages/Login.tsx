import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Login/Logo";
import OnboardingCarousel from "../components/Login/OnboardingCarousel";
import LoginForm from "../components/Login/LoginForm";
import { useAuth } from "../contexts/AuthProvider"; // ✅ AuthProvider hook

export default function Index() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth(); // ✅ AuthProvider hook
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      await login(email, password); // 🔥 API call via AuthProvider
      navigate("/landing"); // or "/dashboard"
    } catch (error) {
      console.error("Login failed", error);
      // optional: toast / error handling
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col">
        <header className="pt-12 pb-4 flex justify-center">
          <Logo />
        </header>

        <main
          className={`flex-1 flex flex-col items-center justify-center px-6 transition-transform duration-500 ease-out ${
            panelOpen ? "-translate-y-32" : "translate-y-0"
          }`}
        >
          <OnboardingCarousel />
        </main>

        <div className="px-6 pb-8 pt-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setPanelOpen(true)}
            disabled={isLoggingIn}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {isLoggingIn ? "Logging in..." : "LOG IN"}
          </motion.button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            By logging in, you agree to the{" "}
            <a href="#" className="underline hover:text-primary">
              User Notice
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-20"
              onClick={() => setPanelOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 right-0 bottom-0 bg-card-bg rounded-t-3xl shadow-2xl z-30"
              style={{ maxHeight: "70vh" }}
            >
              <div className="px-6 pt-6 pb-10 overflow-auto max-h-[70vh]">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1.5 bg-muted rounded-full" />
                </div>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Welcome back
                    </h2>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Enter your credentials to continue
                    </p>
                  </div>
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-10">
        <div className="w-full max-w-5xl grid grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center">
            <Logo className="mb-8" />
            <OnboardingCarousel />
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Welcome back
              </h2>
              <p className="text-sm mt-1 text-muted-foreground">
                Enter your credentials to continue
              </p>
            </div>

            <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By logging in, you agree to the{" "}
              <a href="#" className="underline hover:text-primary">
                User Notice
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
