
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export default function Login() {
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = { name: mobile || 'Guest', role: 'user', email: `${mobile}@example.com` };
//     login(user);
//     navigate('/landing');
//   };

//   const verifyForm = (
//     <form onSubmit={handleVerify} className="space-y-4">
//       <label className="block">
//         <span className="text-sm text-primary">Mobile number</span>
//         <input
//           value={mobile}
//           onChange={e => setMobile(e.target.value)}
//           type="tel"
//           placeholder="Enter mobile number"
//           required
//           className="mt-2 block w-full rounded-lg border border-theme px-3 py-2 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </label>

//       <label className="block">
//         <span className="text-sm text-primary">OTP</span>
//         <input
//           value={otp}
//           onChange={e => setOtp(e.target.value)}
//           type="text"
//           placeholder="Enter OTP"
//           required
//           className="mt-2 block w-full rounded-lg border border-theme px-3 py-2 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </label>

//       <button
//         type="submit"
//         className="w-full bg-accent hover:brightness-95 text-inverse font-semibold px-4 py-2 rounded-full"
//       >
//         Verify & Continue
//       </button>
//     </form>
//   );

//   return (
//     <div className="min-h-screen relative bg-app overflow-hidden">
//       {/* Mobile (bottom-sheet) layout */}
//       <div className="md:hidden min-h-screen flex items-center justify-center px-6">
//         {/* Centered brand area */}
//         <div
//           className={`flex flex-col items-center gap-4 transition-transform duration-700 ease-in-out z-10 text-center ${
//             panelOpen ? '-translate-y-52' : 'translate-y-0'
//           }`}
//         >
//           <img src="/nyneos.png" alt="train" className="w-88 h-82 object-contain" />
//           <h1 className="text-2xl font-semibold text-inverse">Task OS</h1>
//         </div>

//         {/* Bottom full-width action button */}
//         <div className="absolute left-6 right-6 bottom-6 z-20">
//           <button
//             onClick={() => setPanelOpen(true)}
//             className="w-full py-3 rounded-3xl text-inverse font-semibold bg-accent shadow-lg hover:brightness-110"
//           >
//             Let's Start
//           </button>
//         </div>

//         {/* Sliding half panel */}
//         <div
//           aria-hidden={!panelOpen}
//           className={`fixed left-0 right-0 bottom-0 h-[52vh] rounded-t-2xl shadow-2xl transform transition-transform duration-700 ease-in-out z-30 ${
//             panelOpen ? 'translate-y-0' : 'translate-y-full'
//           } bg-card-bg`}
//         >
//           <div className="px-6 pt-6 pb-8 h-full overflow-auto">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-primary">Verify Account</h2>
//                 <p className="text-sm mt-1 text-muted">Enter your mobile & OTP to continue</p>
//               </div>
//               <button
//                 onClick={() => setPanelOpen(false)}
//                 className="text-sm text-primary bg-transparent px-3 py-1 rounded-md flex items-center"
//                 aria-label="close"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>

//             {verifyForm}
//           </div>
//         </div>
//       </div>

//       {/* Tablet / Desktop layout (no sliding panel) */}
//       <div className="hidden md:flex min-h-screen items-center justify-center px-8 py-10">
//             <div className="w-full max-w-5xl grid grid-cols-2 gap-10 items-center">
//           <div className="flex flex-col items-start gap-5">
//             <img src="/irctc2.png" alt="train" className="w-56 h-40 object-contain" />
//             <h1 className="text-3xl font-bold text-inverse">IRCTC Feedback-App</h1>
//             <p className="text-inverse/90 max-w-md">Verify your account to continue and share feedback for service improvement.</p>
//           </div>

//           <div className="rounded-2xl shadow-2xl border p-7 bg-card-bg border-theme">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-primary">Verify Account</h2>
//               <p className="text-sm mt-1 text-muted">Enter your mobile & OTP to continue</p>
//             </div>

//             {verifyForm}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// // ========================= AppLayout.tsx


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
//   User,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../components/Login/Logo";

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

// const menuItems = [
//   { icon: Home, label: "Home", path: "/home" },
//   { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
//   { icon: PlusCircle, label: "Create Activity", path: "/create-activity" },
//   { icon: FileText, label: "All Pages", path: "/all-pages" },
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
//       <div className="relative min-h-screen overflow-hidden bg-primary">
//         {/* Mobile Sidebar */}
//         <div className="md:hidden">
//           {/* Sidebar Panel */}
//           <motion.div
//             initial={false}
//             animate={{ x: isOpen ? 0 : "-100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed top-0 left-0 h-full w-72 bg-primary text-primary-foreground z-30"
//           >
//             {/* Sidebar Header */}
//             <div className="p-5 pt-12">
//               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm">
//                 <User size={24} className="text-primary-foreground" />
//               </div>
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
//                     className={`w-full flex items-center gap-4 px-5 py-4 transition-all text-left rounded-xl mb-1 ${
//                       isActive
//                         ? "bg-white/20"
//                         : "hover:bg-white/10"
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
//             <header className="sticky top-0 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between z-10">
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

//         {/* Desktop Layout - Normal sidebar */}
//         <div className="hidden md:flex min-h-screen">
//           {/* Desktop Sidebar */}
//           <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
//             {/* Header */}
//             <div className="p-6">
//               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
//                 <User size={24} className="text-primary-foreground" />
//               </div>
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
//                       isActive
//                         ? "bg-white/20"
//                         : "hover:bg-white/10"
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
//             <div className="p-3 mt-auto">
//               <button className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 transition-all text-left rounded-xl">
//                 <LogOut size={20} className="text-primary-foreground" />
//                 <span className="text-sm font-medium text-primary-foreground">
//                   Logout
//                 </span>
//               </button>
//             </div>
//           </aside>

//           {/* Desktop Main Content */}
//           <div className="flex-1 bg-background">
//             {/* Desktop Header */}
//             <header className="sticky top-0 bg-card border-b border-border px-6 py-4 z-10">
//               <div className="flex items-center justify-between">
//                 <h1 className="text-lg font-semibold text-foreground">
//                   {menuItems.find((item) => item.path === location.pathname)?.label || "Home"}
//                 </h1>
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//                     <User size={20} className="text-muted-foreground" />
//                   </div>
//                 </div>
//               </div>
//             </header>

//             {/* Page Content */}
//             <main className="p-6">{children}</main>
//           </div>
//         </div>
//       </div>
//     </SidebarContext.Provider>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { Navbar } from './Navbar';
// import TabBar from './TabBar';
// import { Sidebar } from './Sidebar';
// import { useTheme } from '../contexts/ThemeContext';

// /**
//  * Main application layout with navbar and collapsible sidebar
//  * Wraps all pages except login which has a custom layout
//  */
// export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isDesktop, setIsDesktop] = useState<boolean>(() =>
//     typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
//   );
//   const { theme, isTransitioning } = useTheme();

//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 1024;
//       setIsDesktop(desktop);
//       if (desktop) {
//         setSidebarOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleMenuToggle = () => {
//     if (isDesktop) {
//       setSidebarCollapsed((prev) => !prev);
//     } else {
//       setSidebarOpen((prev) => !prev);
//     }
//   };

//   const sidebarWidth = isDesktop ? (sidebarCollapsed ? 80 : 256) : 0;

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isTransitioning ? 'opacity-95' : 'opacity-100'}`}>
//       {/* Top header section (fixed) - use theme accent */}
//       <div className="fixed inset-x-0 top-0 bg-background z-0">
//         <div className="mx-auto px-4">
//           <Navbar onMenuToggle={handleMenuToggle} sidebarOffset={isDesktop ? sidebarWidth : 0} />
//         </div>
//         {/* header height */}
//         <div className="h-36 md:h-44" />
//       </div>

//       <div className="flex">
//         <Sidebar
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//           isCollapsed={sidebarCollapsed}
//           isDesktop={isDesktop}
//           onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
//         />

//         {/* main content - white rounded container will overlap and become sticky */}
//         <main className={`flex-1 pt-36 md:pt-44`} style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}>
//           <div
//             className="bg-background rounded shadow-md -mt-20 md:-mt-24 sticky top-0 z-10 overflow-auto scrollbar-hide border-t border-theme"
//             style={{ maxHeight: 'calc(100vh - 0px)' }}
//           >
//             {children}
//           </div>
//         </main>
//       </div>

//       {/* Mobile bottom tab bar (matches provided design) */}
//       {/* <TabBar /> */}
//     </div>
//   );
// };

// export default AppLayout;

// =================================================== APPPPP
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export default function Login() {
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = { name: mobile || 'Guest', role: 'user', email: `${mobile}@example.com` };
//     login(user);
//     navigate('/landing');
//   };

//   const verifyForm = (
//     <form onSubmit={handleVerify} className="space-y-4">
//       <label className="block">
//         <span className="text-sm text-primary">Mobile number</span>
//         <input
//           value={mobile}
//           onChange={e => setMobile(e.target.value)}
//           type="tel"
//           placeholder="Enter mobile number"
//           required
//           className="mt-2 block w-full rounded-lg border border-theme px-3 py-2 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </label>

//       <label className="block">
//         <span className="text-sm text-primary">OTP</span>
//         <input
//           value={otp}
//           onChange={e => setOtp(e.target.value)}
//           type="text"
//           placeholder="Enter OTP"
//           required
//           className="mt-2 block w-full rounded-lg border border-theme px-3 py-2 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//       </label>

//       <button
//         type="submit"
//         className="w-full bg-accent hover:brightness-95 text-inverse font-semibold px-4 py-2 rounded-full"
//       >
//         Verify & Continue
//       </button>
//     </form>
//   );

//   return (
//     <div className="min-h-screen relative bg-app overflow-hidden">
//       {/* Mobile (bottom-sheet) layout */}
//       <div className="md:hidden min-h-screen flex items-center justify-center px-6">
//         {/* Centered brand area */}
//         <div
//           className={`flex flex-col items-center gap-4 transition-transform duration-700 ease-in-out z-10 text-center ${
//             panelOpen ? '-translate-y-52' : 'translate-y-0'
//           }`}
//         >
//           <img src="/nyneos.png" alt="train" className="w-88 h-82 object-contain" />
//           <h1 className="text-2xl font-semibold text-inverse">Task OS</h1>
//         </div>

//         {/* Bottom full-width action button */}
//         <div className="absolute left-6 right-6 bottom-6 z-20">
//           <button
//             onClick={() => setPanelOpen(true)}
//             className="w-full py-3 rounded-3xl text-inverse font-semibold bg-accent shadow-lg hover:brightness-110"
//           >
//             Let's Start
//           </button>
//         </div>

//         {/* Sliding half panel */}
//         <div
//           aria-hidden={!panelOpen}
//           className={`fixed left-0 right-0 bottom-0 h-[52vh] rounded-t-2xl shadow-2xl transform transition-transform duration-700 ease-in-out z-30 ${
//             panelOpen ? 'translate-y-0' : 'translate-y-full'
//           } bg-card-bg`}
//         >
//           <div className="px-6 pt-6 pb-8 h-full overflow-auto">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-primary">Verify Account</h2>
//                 <p className="text-sm mt-1 text-muted">Enter your mobile & OTP to continue</p>
//               </div>
//               <button
//                 onClick={() => setPanelOpen(false)}
//                 className="text-sm text-primary bg-transparent px-3 py-1 rounded-md flex items-center"
//                 aria-label="close"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>

//             {verifyForm}
//           </div>
//         </div>
//       </div>

//       {/* Tablet / Desktop layout (no sliding panel) */}
//       <div className="hidden md:flex min-h-screen items-center justify-center px-8 py-10">
//             <div className="w-full max-w-5xl grid grid-cols-2 gap-10 items-center">
//           <div className="flex flex-col items-start gap-5">
//             <img src="/irctc2.png" alt="train" className="w-56 h-40 object-contain" />
//             <h1 className="text-3xl font-bold text-inverse">IRCTC Feedback-App</h1>
//             <p className="text-inverse/90 max-w-md">Verify your account to continue and share feedback for service improvement.</p>
//           </div>

//           <div className="rounded-2xl shadow-2xl border p-7 bg-card-bg border-theme">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-primary">Verify Account</h2>
//               <p className="text-sm mt-1 text-muted">Enter your mobile & OTP to continue</p>
//             </div>

//             {verifyForm}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ========================= AppLayout.tsx