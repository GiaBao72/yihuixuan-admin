"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Database, Globe, Server, ExternalLink } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export default function SettingsPage() {
  const { t } = useI18n();

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const frontendUrl = "http://e1.chiasegpu.vn:56329";
  const strapiAdminUrl = "http://e1.chiasegpu.vn:57416/admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.settings.title}</h1>
        <p className="text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {t.settings.strapiCms}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.apiUrl}</p>
              <p className="font-mono text-sm">{strapiUrl}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.status}</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {t.settings.connected}
              </span>
            </div>
            <a
              href={strapiAdminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4" />
              {t.settings.openStrapiAdmin}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t.settings.frontendWebsite}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.publicUrl}</p>
              <p className="font-mono text-sm">{frontendUrl}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.status}</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {t.settings.online}
              </span>
            </div>
            <a
              href={frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4" />
              {t.settings.viewWebsite}
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            {t.settings.systemInfo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.adminVersion}</p>
              <p className="font-mono text-sm">1.0.0</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.nextjsVersion}</p>
              <p className="font-mono text-sm">15.1.6</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.nodeEnv}</p>
              <p className="font-mono text-sm">{t.settings.production}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t.settings.port}</p>
              <p className="font-mono text-sm">3003 ({t.settings.internal}), 3002 ({t.settings.external})</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            {t.settings.quickLinks}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="/"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <SettingsIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.dashboard}</p>
                <p className="text-sm text-muted-foreground">{t.settings.dashboardDesc}</p>
              </div>
            </a>

            <a
              href="/products"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.products}</p>
                <p className="text-sm text-muted-foreground">{t.settings.productsDesc}</p>
              </div>
            </a>

            <a
              href="/featured"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.featured}</p>
                <p className="text-sm text-muted-foreground">{t.settings.featuredDesc}</p>
              </div>
            </a>

            <a
              href="/media"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.media}</p>
                <p className="text-sm text-muted-foreground">{t.settings.mediaDesc}</p>
              </div>
            </a>

            <a
              href={strapiAdminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.strapiCmsLink}</p>
                <p className="text-sm text-muted-foreground">{t.settings.strapiDesc}</p>
              </div>
            </a>

            <a
              href={frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t.settings.website}</p>
                <p className="text-sm text-muted-foreground">{t.settings.websiteDesc}</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
