"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, CalendarCheck, TrendingUp, User } from "lucide-react";
import clsx from "clsx";

const tabs = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Library", href: "/library", icon: BookOpen },
  { name: "My Plan", href: "/plan", icon: CalendarCheck },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Profile", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => router.push(tab.href)}
              className={clsx(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-brand-pink"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.5}
                fill={isActive ? "#FF008F" : "none"}
              />
              <span className={clsx(
                "text-[10px]",
                isActive ? "font-bold" : "font-medium"
              )}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
