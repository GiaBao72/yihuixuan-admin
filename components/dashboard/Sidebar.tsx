"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Image,
  Star,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface SidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
}

export function Sidebar({ onNavigate, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navigation = [
    { name: t.sidebar.dashboard, href: "/", icon: LayoutDashboard },
    { name: t.sidebar.products, href: "/products", icon: Package },
    { name: t.sidebar.media, href: "/media", icon: Image },
    { name: t.sidebar.featured, href: "/featured", icon: Star },
    { name: t.sidebar.analytics, href: "/analytics", icon: BarChart3 },
    { name: t.sidebar.settings, href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-full w-[85vw] max-w-sm flex-col border-r border-border bg-black shadow-2xl lg:w-64 lg:bg-card lg:shadow-none">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-black px-6 lg:bg-card">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">Yihuixuan</h1>
          <span className="ml-2 text-xs text-muted-foreground">Admin</span>
        </div>
        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto bg-black p-4 lg:bg-card">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border bg-black p-4 lg:bg-card">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          {t.sidebar?.logout || "Logout"}
        </button>
      </div>
    </div>
  );
}
