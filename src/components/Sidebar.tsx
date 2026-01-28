import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "../components/Login/Logo";

type NavItem = {
  label: string;
  path?: string;
  icon: React.ComponentType<any>;
};

interface SidebarProps {
  menuItems: NavItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => Promise<void>;
}

export default function Sidebar({
  menuItems,
  isOpen,
  onClose,
  onLogout,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem("sidebar-collapsed") === "true"
  );

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      navigate("/", { replace: true });
      return;
    }
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleItemClick = (item: NavItem) => {
    if (item.path === "__logout__" || item.path === "/logout") {
      handleLogout();
      return;
    }
    if (item.path) {
      navigate(item.path);
      onClose?.();
    }
  };

  const isActive = (item: NavItem) =>
    item.path && location.pathname === item.path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/30"
          onClick={onClose}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 z-40 h-screen
          bg-app border-r border-border
          flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-72"}
          ${isOpen ? "translate-x-0" : "lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div
            className={`transition-all ${
              collapsed ? "w-0 overflow-hidden opacity-0" : "opacity-100"
            }`}
          >
            <Logo />
          </div>

          {/* Toggle button – SAME SIZE AS NAV ICONS */}
          <button
            onClick={toggleCollapse}
            aria-label="Toggle sidebar"
            className="
              w-12 h-12
              grid place-items-center
              rounded-lg
              text-muted-foreground
              hover:bg-primary/10 hover:text-primary
              transition
            "
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-2 space-y-1 overflow-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.label}
                to={item.path || "#"}
                onClick={() => handleItemClick(item)}
                className={`
                  group relative
                  flex items-center
                  h-12
                  px-2
                  rounded-lg
                  transition-all
                  hover:bg-primary-red-100
                  ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary-2"
                  }
                `}
              >
                {/* Active indicator – perfectly centered */}
                {/* {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary" />
                )} */}

                {/* Icon box – FIXED SQUARE */}
                <div
                  className="
                     w-12 h-12
              grid place-items-center
              rounded-lg
              text-muted-foreground
              hover:bg-primary/10 hover:text-primary
              transition
                  "
                >
                  <Icon size={18} className="text-muted-foreground" />
                </div>

                {/* Label */}
                <span
                  className={`
                    ml-3 text-sm font-medium whitespace-nowrap
                    transition-all duration-200
                    ${
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100"
                    }
                  `}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 py-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center
              h-12
              px-2
              rounded-lg
              text-muted-foreground
              hover:bg-destructive hover:text-destructive
              transition
            "
          >
            <div className="w-12 h-12 grid place-items-center rounded-lg">
              <LogOut size={18} />
            </div>

            <span
              className={`
                ml-3 text-sm font-medium transition-all
                ${
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100"
                }
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
