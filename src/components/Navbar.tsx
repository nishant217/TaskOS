// import { User } from "lucide-react";

// interface NavbarProps {
//   title: string;
// }

// export default function Navbar({ title }: NavbarProps) {
//   return (
//     <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-xl border-b border-border">
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-lg font-semibold text-foreground">
//           {title}
//         </h1>

//         <div className="flex items-center gap-4">
//           <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition">
//             <User size={20} className="text-muted-foreground" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bell, User, Mail, Calendar } from "lucide-react";
import Logo from "./Login/Logo";
import { ThemeToggle } from "./themeButton";

const mockNotifications = [
  {
    id: 1,
    title: "New task assigned",
    description: "You have a new task in All Tasks",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Task completed",
    description: "Your task 'DB Migration' is completed",
    time: "1 day ago",
    read: true,
  },
];

export default function Topbar() {
  const [notifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length,
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      )
        setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setShowUserMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-app border-b border-border px-6 py-3 z-30 pl-25">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">
          <Logo />
        </h1>

        <div className="flex items-center gap-4">
          <div ref={notificationsRef} className="relative">

            <button
              onClick={() => {
                setShowNotifications((v) => !v);
                setShowUserMenu(false);
                setUnreadCount(0);
              }}
              className="p-2 rounded-full hover:bg-muted transition"
              aria-label="Notifications"
            >
              <Bell size={18} className="text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs bg-warning text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <div className="font-medium text-sm text-foreground">
                    Notifications
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-surface/50 border-b border-border"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm text-foreground">
                          {n.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {n.time}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {n.description}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div ref={userRef} className="relative">
            <button
              onClick={() => {
                setShowUserMenu((v) => !v);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-muted transition"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User size={16} className="text-muted-foreground" />
              </div>
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <div className="font-medium text-sm text-foreground">
                    Alex Thompson
                  </div>
                  <div className="text-xs text-muted-foreground">Admin</div>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Mail size={16} />
                    <div className="break-all">alex@taskos.corp</div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <div>Last active: Today</div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-border flex justify-end">
                  <button className="text-sm text-primary hover:underline">
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
