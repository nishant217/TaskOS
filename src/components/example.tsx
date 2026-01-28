// import { ReactNode, useState, createContext, useContext } from "react";
// import { motion } from "framer-motion";
// import {
//   Menu,
//   X,
//   Home,
//   LayoutDashboard,
//   PlusCircle,
//   FileText,
//   LogOut,
//   ListChecks,
//   ShieldCheck,
//   Users,
//   UserPlus,
//   User,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../components/Login/Logo";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// interface SidebarContextType {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   toggle: () => void;
// }

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// export function useSidebar() {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error("useSidebar must be used within SidebarProvider");
//   }
//   return context;
// }

// export const menuItems = [
//   {
//     icon: Home,
//     label: "Landing",
//     path: "/landing",
//   },
//   {
//     icon: PlusCircle,
//     label: "Create Task",
//     path: "/create-task",
//   },
//   {
//     icon: ListChecks,
//     label: "All Tasks",
//     path: "/all-tasks",
//   },
//   {
//     icon: FileText,
//     label: "Task Details",
//     path: "/tasks",
//   },
//   {
//     icon: UserPlus,
//     label: "Create User",
//     path: "/create-user",
//   },
//   {
//     icon: Users,
//     label: "All Users",
//     path: "/all-users",
//   },
//   {
//     icon: ShieldCheck,
//     label: "Admin Dashboard",
//     path: "/admin-dashboard",
//   },
//   {
//     icon: LogOut,
//     label: "Logout",
//     path: "/logout",
//   },
// ];

// interface AppSidebarProps {
//   children: ReactNode;
// }

// export default function AppSidebar({ children }: AppSidebarProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
//       <div className="relative min-h-screen overflow-hidden bg-background">
//         {/* Mobile Sidebar */}
//         <div className="md:hidden">
//           {/* Sidebar Panel */}
//           <motion.div
//             initial={false}
//             animate={{ x: isOpen ? 0 : "-100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed top-0 left-0 h-full bg-background text-background z-30"
//           >
//             {/* Sidebar Header */}
//             <div className="p-5 pt-12">
//               {/* <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm">
//                 <User size={24} className="text-primary-foreground" />
//               </div> */}
//               <Logo className="mb-4" />
//             </div>

//             {/* Menu Items */}
//             <nav className="px-3">
//               {menuItems.map((item, idx) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={idx}
//                     to={item.path}
//                     onClick={() => setIsOpen(false)}
//                     className={`w-[200px] md:w-full flex items-center gap-4 px-5 py-4 transition-all text-left rounded-xl mb-1 ${
//                       isActive ? "bg-white/20" : "hover:bg-white/10"
//                     }`}
//                   >
//                     <item.icon size={22} className="text-primary-foreground" />
//                     <span className="text-base font-medium text-primary-foreground">
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}

//               {/* Logout */}
//               <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/10 transition-all text-left rounded-xl mb-1 mt-8">
//                 <LogOut size={22} className="text-primary-foreground" />
//                 <span className="text-base font-medium text-primary-foreground">
//                   Logout
//                 </span>
//               </button>
//             </nav>
//           </motion.div>

//           {/* Main Content - Slides and scales */}
//           <motion.div
//             initial={false}
//             animate={{
//               x: isOpen ? 240 : 0,
//               scale: isOpen ? 0.88 : 1,
//               borderRadius: isOpen ? 24 : 0,
//             }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="relative min-h-screen bg-background overflow-hidden shadow-2xl"
//             style={{ transformOrigin: "left center" }}
//           >
//             {/* Overlay when sidebar is open */}
//             {isOpen && (
//               <div
//                 className="absolute inset-0 bg-black/20 z-20"
//                 onClick={() => setIsOpen(false)}
//               />
//             )}

//             {/* Header */}
//             <header className="sticky top-0 bg-background text-primary-foreground px-4 py-3 flex items-center justify-between z-10">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={toggle}
//                   className="p-2 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
//                 >
//                   {isOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//               </div>
//               <Logo className="scale-75" />
//               <div className="w-10" /> {/* Spacer for centering */}
//             </header>

//             {/* Page Content */}
//             <main className="min-h-[calc(100vh-60px)] bg-background">
//               {children}
//             </main>
//           </motion.div>
//         </div>

//         {/* Desktop Layout - Fixed sidebar and header */}
//         <div className="hidden md:flex min-h-screen">
//           {/* Fixed Desktop Sidebar */}
//           <aside className="fixed left-0 top-0 h-screen w-64 bg-background text-primary-foreground flex flex-col border-r border-border z-40">
//             {/* Header */}
//             <div className="p-6">
//               <Logo />
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-3">
//               {menuItems.map((item, idx) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={idx}
//                     to={item.path}
//                     className={`w-full flex items-center gap-4 px-5 py-3 transition-all text-left rounded-xl mb-1 ${
//                       isActive ? "bg-primary/20" : "hover:bg-primary/10"
//                     }`}
//                   >
//                     <item.icon size={20} className="text-primary-foreground" />
//                     <span className="text-sm font-medium text-primary-foreground">
//                       {item.label}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Logout */}
//             <div className="p-3">
//               <button className="w-full flex items-center gap-4 px-5 py-3 hover:bg-primary/10 transition-all text-left rounded-xl">
//                 <LogOut size={20} className="text-primary-foreground" />
//                 <span className="text-sm font-medium text-primary-foreground">
//                   Logout
//                 </span>
//               </button>
//             </div>
//           </aside>

//           {/* Fixed Desktop Header */}
//           <header className="fixed top-0 left-64 right-0 bg-card border-b border-border px-6 py-4 z-40">
//             <div className="flex items-center justify-between">
//               <h1 className="text-lg font-semibold text-foreground">
//                 {menuItems.find((item) => item.path === location.pathname)
//                   ?.label || "Home"}
//               </h1>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//                   <User size={20} className="text-muted-foreground" />
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Desktop Main Content - adjusted for fixed sidebar and header */}
//           <div className="ml-64 pt-16 bg-background min-h-screen">
//             <main className="p-6 z-10">{children}</main>
//           </div>
//         </div>
//       </div>
//     </SidebarContext.Provider>
//   );
// }
// // 