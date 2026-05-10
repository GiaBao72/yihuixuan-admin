"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, Globe, Image as ImageIcon, TrendingUp } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  attributes: {
    name: string;
    category: string;
    isActive: boolean;
    mainImage?: { data?: any };
    localizations?: { data: any[] };
  };
}

export default function AnalyticsPage() {
  const { t, locale } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  if (loading) return <div className="p-6">Loading...</div>;

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.attributes.isActive).length;
  const withImages = products.filter(p => p.attributes.mainImage?.data).length;
  const categories = [...new Set(products.map(p => p.attributes.category))];
  
  const categoryData = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.attributes.category === cat).length,
  }));

  const localeCount = products.reduce((acc, p) => {
    const locales = p.attributes.localizations?.data?.length || 0;
    return acc + locales + 1;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.analytics.title}</h1>
        <p className="text-muted-foreground">{t.analytics.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.analytics.stats.totalProducts}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {activeProducts} {t.analytics.stats.active}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.analytics.stats.languages}</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {localeCount} {t.analytics.stats.products}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.analytics.stats.categories}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {categoryData[0]?.name || 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.analytics.stats.imageCoverage}</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((withImages / totalProducts) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {withImages}/{totalProducts} {t.analytics.stats.products}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {t.analytics.productsByCategory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((cat) => {
                const percentage = Math.round((cat.count / totalProducts) * 100);
                return (
                  <div key={cat.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-muted-foreground">{cat.count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-accent">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t.analytics.contentStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{t.analytics.activeProducts}</span>
                  <span className="text-muted-foreground">{activeProducts}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-accent">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${Math.round((activeProducts / totalProducts) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{t.analytics.inactiveProducts}</span>
                  <span className="text-muted-foreground">{totalProducts - activeProducts}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-accent">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${Math.round(((totalProducts - activeProducts) / totalProducts) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{t.analytics.withImages}</span>
                  <span className="text-muted-foreground">{withImages}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-accent">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${Math.round((withImages / totalProducts) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{t.analytics.withoutImages}</span>
                  <span className="text-muted-foreground">{totalProducts - withImages}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-accent">
                  <div
                    className="h-full bg-gray-500 transition-all"
                    style={{ width: `${Math.round(((totalProducts - withImages) / totalProducts) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t.analytics.localizationCoverage}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🇻🇳</span>
                <span className="font-medium">{t.analytics.vietnamese}</span>
              </div>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">100% {t.analytics.stats.products}</p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🇬🇧</span>
                <span className="font-medium">{t.analytics.english}</span>
              </div>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">100% {t.analytics.stats.products}</p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🇨🇳</span>
                <span className="font-medium">{t.analytics.chinese}</span>
              </div>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">100% {t.analytics.stats.products}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
