import React, { useState } from "react";
import { Home, LayoutDashboard, CheckSquare, PlusCircle } from "lucide-react";

type TabItem = {
  key: string;
  label?: string;
  icon: React.ReactElement;
};

export default function TabBar({
  items,
  initialKey,
  onChange,
}: {
  items?: TabItem[];
  initialKey?: string;
  onChange?: (key: string) => void;
}) {
  const defaultItems: TabItem[] = [
    { key: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: "tasks",
      label: "Tasks",
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      key: "create",
      label: "Create",
      icon: <PlusCircle className="w-5 h-5" />,
    },
  ];

  const all = items?.length ? items : defaultItems;
  const [active, setActive] = useState(initialKey || all[0].key);

  const handleClick = (k: string) => {
    setActive(k);
    onChange?.(k);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 lg:hidden">
      <div className="bg-gray-900 shadow-xl flex items-center gap-1 w-full max-w-md px-3 py-2 rounded-full">
        {all.map((it) => {
          const isActive = it.key === active;

          return (
            <button
              key={it.key}
              onClick={() => handleClick(it.key)}
              aria-pressed={isActive}
              className={`
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-white text-black px-8 py-3 rounded-full shadow-md"
                    : "text-white/80 px-5 py-3 rounded-full"
                }
              `}
            >
              <span className="flex items-center justify-center">
                {React.cloneElement(it.icon)}
              </span>

              {isActive && it.label && (
                <span className="ml-2 text-sm font-medium whitespace-nowrap">
                  {it.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
