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
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ isOpen = true, onClose, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navigation = [
    {
      name: t.sidebar?.dashboard || "Bảng điều khiển",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: t.sidebar?.products || "Sản phẩm",
      href: "/products",
      icon: Package,
    },
    {
      name: t.sidebar?.media || "Media",
      href: "/media",
      icon: Image,
    },
    {
      name: t.sidebar?.featured || "Nổi bật",
      href: "/featured",
      icon: Star,
    },
    {
      name: t.sidebar?.analytics || "Phân tích",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: t.sidebar?.settings || "Cài đặt",
      href: "/settings",
      icon: Settings,
    },
  ];

  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full transition-transform duration-300 ease-in-out lg:translate-x-0",
        "w-[85vw] max-w-sm lg:w-64",
        "bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm shadow-md">
              YH
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Yihuixuan</h2>
              <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/30"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="border-t border-gray-200 bg-white p-4">
          <button
            onClick={() => {
              // Handle logout
              console.log("Logout clicked");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:shadow-sm"
          >
            <LogOut className="h-5 w-5" />
            <span>{t.sidebar?.logout || "Đăng xuất"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
