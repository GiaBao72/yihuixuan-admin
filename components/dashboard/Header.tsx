"use client";

import { Bell, Search, User, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

export function Header() {
  const { locale, setLocale } = useI18n();

  const languages = [
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4 pl-16 lg:pl-6">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full max-w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code as "vi" | "en" | "zh")}
              className={`
                flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200
                ${
                  locale === lang.code
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/30"
                    : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                }
              `}
              title={lang.label}
            >
              <span className="text-sm">{lang.flag}</span>
              <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-gray-100 hover:shadow-sm transition-all"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex rounded-full hover:bg-gray-100 hover:shadow-sm transition-all"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold shadow-md">
            YH
          </div>
        </Button>
      </div>
    </header>
  );
}
