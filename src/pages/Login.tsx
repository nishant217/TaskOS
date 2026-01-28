import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Login/Logo";
import OnboardingCarousel from "../components/Login/OnboardingCarousel";
import LoginForm from "../components/Login/LoginForm";
import { useAuth } from "../contexts/AuthProvider";

export default function Index() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate("/landing");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col bg-white">
        {/* Header with Logo */}
        <header className="pt-8 pb-6 px-6 flex justify-center border-b border-gray-200">
          <Logo />
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col items-center justify-center px-6 transition-transform duration-500 ease-out ${
            panelOpen ? "-translate-y-32" : "translate-y-0"
          }`}
        >
          <OnboardingCarousel />
        </main>

        {/* Login Button */}
        <div className="px-6 pb-8 pt-6 border-t border-gray-200">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setPanelOpen(true)}
            disabled={isLoggingIn}
            className="w-full py-3 bg-orange-600 text-white font-semibold text-base rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {isLoggingIn ? "Logging in..." : "LOG IN"}
          </motion.button>

          <p className="mt-4 text-center text-xs text-gray-600">
            By logging in, you agree to the{" "}
            <a href="#" className="text-orange-600 hover:underline font-medium">
              User Notice
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 hover:underline font-medium">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-20"
              onClick={() => setPanelOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Login Sheet */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-30"
              style={{ maxHeight: "70vh" }}
            >
              <div className="px-6 pt-6 pb-10 overflow-auto max-h-[70vh]">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Welcome back
                    </h2>
                    <p className="text-sm mt-1 text-gray-600">
                      Enter your credentials to continue
                    </p>
                  </div>
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-2 gap-12 items-center">
          {/* Left: Carousel */}
          <div className="flex flex-col items-center">
            <Logo className="mb-8" />
            <OnboardingCarousel />
          </div>

          {/* Right: Login Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>
              <p className="text-sm mt-2 text-gray-600">
                Enter your credentials to continue
              </p>
            </div>

            <LoginForm onSubmit={handleLogin} isLoading={isLoggingIn} />

            <p className="mt-6 text-center text-xs text-gray-600">
              By logging in, you agree to the{" "}
              <a href="#" className="text-orange-600 hover:underline font-medium">
                User Notice
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline font-medium">
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
