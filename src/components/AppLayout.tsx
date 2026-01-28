import { ReactNode, useState, createContext, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  PlusCircle,
  FileText,
  LogOut,
  ListChecks,
  ShieldCheck,
  Users,
  UserPlus,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Login/Logo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthProvider";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

export const menuItems = [
  {
    icon: Home,
    label: "Landing",
    path: "/landing",
  },
  {
    icon: PlusCircle,
    label: "Create Task",
    path: "/create-task",
  },
  {
    icon: ListChecks,
    label: "Approvals",
    path: "/all-tasks",
  },
  {
    icon: FileText,
    label: "Task",
    path: "/real-all-tasks",
  },
  {
    icon: UserPlus,
    label: "Create User",
    path: "/create-user",
  },
  {
    icon: Users,
    label: "All Users",
    path: "/all-users",
  },
  {
    icon: ShieldCheck,
    label: "Admin Dashboard",
    path: "/admin-dashboard",
  },
];

interface AppSidebarProps {
  children: ReactNode;
  title?: string;
}

export default function AppSidebar({ children, title }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  // toggle using functional update
  const toggle = () => setIsOpen((s) => !s);

  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    return stored === "true";
  });

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", String(newState));
      return newState;
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  // Lock body scroll and preserve scrollbar width while mobile sidebar is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight || "";
    if (isOpen) {
      // compute scrollbar width and preserve space to avoid layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          {/* Sidebar Panel */}
          <motion.div
            initial={false}
            animate={{ x: isOpen ? 0 : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full bg-background text-background z-30"
            style={{ willChange: "transform" }}
          >
            {/* Sidebar Header */}
            <div className="p-5 pt-12">
              <Logo className="mb-4" />
            </div>

            {/* Menu Items */}
            <nav className="px-3">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-[200px] md:w-full flex items-center gap-4 px-5 py-4 transition-all text-left rounded-xl mb-1 ${
                      isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={22} className="text-primary-foreground" />
                    <span className="text-base font-medium text-primary-foreground">
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all text-left rounded-xl mb-1 mt-8"
              >
                <LogOut size={22} className="text-primary-foreground" />
                <span className="text-base font-medium text-primary-foreground">
                  Logout
                </span>
              </button>
            </nav>
          </motion.div>

          {/* Main Content - keep scale/translate but make fixed while open to avoid page jumps */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { x: 240, scale: 0.92, borderRadius: 20 }
                : { x: 0, scale: 1, borderRadius: 0 }
            }
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            // while sidebar is open make the main area fixed to prevent document scrollbar changes
            className={`relative min-h-screen bg-background shadow-2xl ${
              isOpen ? "fixed inset-0 z-20 overflow-auto" : "overflow-hidden"
            }`}
            style={{ transformOrigin: "left center", willChange: "transform" }}
          >
            {/* Overlay when sidebar is open */}
            {isOpen && (
              <div
                className="absolute inset-0 bg-black/20 z-20"
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Header */}
            <header className="sticky top-0 bg-background text-primary-foreground px-4 py-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggle}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              <Logo className="scale-75" />
              <div className="w-10" /> {/* Spacer for centering */}
            </header>

            {/* Page Content */}
            <main className="min-h-[calc(100vh-60px)] bg-background">
              {children}
            </main>
          </motion.div>
        </div>

        {/* Desktop Layout - Fixed sidebar and header */}
        <div className="hidden md:flex relative">
          <Sidebar
            menuItems={menuItems}
            isOpen={collapsed}
            onClose={toggleCollapse}
            onLogout={handleLogout}
          />
          <Navbar />

          {/* Content wrapper: adjusts left padding based on sidebar width,
              fills viewport and allows inner card to scroll */}
          <div
            className={`flex-1 transition-all duration-500 min-h-screen flex flex-col`}
          >
            <main
              className={`pl-[6rem] mt-[1.75rem] transition-all duration-500 pt-[4rem] p-6 bg-body`}
            >
                <div className="border-b border-border pb-4 mb-10">
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-wider text-secondary-text ">
                      {title}
                    </h1>
                  </div>
                </div>
                {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
