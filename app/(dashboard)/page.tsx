"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Image, Star, TrendingUp } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  attributes: {
    name: string;
    order: number;
    mainImage?: { data?: any };
  };
}

export default function DashboardPage() {
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
  const productsWithImages = products.filter(p => p.attributes.mainImage?.data).length;
  const featuredProducts = products.filter(p => p.attributes.order <= 5).length;
  const imageCoverage = totalProducts > 0 ? Math.round((productsWithImages / totalProducts) * 100) : 0;

  const statsCards = [
    {
      name: t.dashboard.stats.totalProducts,
      value: totalProducts.toString(),
      icon: Package,
      change: `3 ${t.dashboard.stats.languages}`,
      changeType: "neutral" as const,
    },
    {
      name: t.dashboard.stats.productsWithImages,
      value: productsWithImages.toString(),
      icon: Image,
      change: `${imageCoverage}% ${t.dashboard.stats.coverage}`,
      changeType: "positive" as const,
    },
    {
      name: t.dashboard.stats.featuredProducts,
      value: featuredProducts.toString(),
      icon: Star,
      change: t.dashboard.stats.homepage,
      changeType: "neutral" as const,
    },
    {
      name: t.dashboard.stats.totalLocales,
      value: "3",
      icon: TrendingUp,
      change: "vi, en, zh",
      changeType: "neutral" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-500"
                  : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.quickActions.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="/products"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{t.dashboard.quickActions.viewProducts}</p>
                <p className="text-sm text-muted-foreground">{totalProducts} products</p>
              </div>
            </a>

            <a
              href="/media"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <Image className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{t.dashboard.quickActions.mediaLibrary}</p>
                <p className="text-sm text-muted-foreground">{productsWithImages} images</p>
              </div>
            </a>

            <a
              href="/featured"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
            >
              <Star className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{t.dashboard.quickActions.manageFeatured}</p>
                <p className="text-sm text-muted-foreground">{featuredProducts} featured</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
