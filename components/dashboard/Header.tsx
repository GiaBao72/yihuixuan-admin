"use client";

import { Bell, Search, User, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

export function Header() {
  const { locale, setLocale, t } = useI18n();

  const languages = [
    { code: "vi" as const, label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "zh" as const, label: "中文", flag: "🇨🇳" },
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.header.search}
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative group">
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
          <div className="absolute right-0 top-full mt-2 hidden w-48 rounded-lg border border-border bg-card shadow-lg group-hover:block">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-accent ${
                  locale === lang.code ? "bg-accent font-medium" : ""
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@yihuixuan.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
