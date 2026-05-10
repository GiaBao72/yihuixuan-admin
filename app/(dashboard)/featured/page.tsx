"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Package } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  attributes: {
    name: string;
    shortDescription: string;
    category: string;
    order: number;
    mainImage?: { data?: any };
  };
}

export default function FeaturedPage() {
  const { t, locale } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        const featured = (data.data || [])
          .filter((p: Product) => p.attributes.order <= 5)
          .sort((a: Product, b: Product) => a.attributes.order - b.attributes.order);
        setProducts(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.featured.title}</h1>
        <p className="text-muted-foreground">{t.featured.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {t.featured.homepageFeatured} ({products.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {products.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="absolute right-2 top-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {product.attributes.order}
                    </span>
                  </div>
                  <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-accent">
                    {product.attributes.mainImage?.data ? (
                      <Package className="h-12 w-12 text-muted-foreground" />
                    ) : (
                      <Package className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="mb-2 font-semibold">{product.attributes.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {product.attributes.shortDescription}
                  </p>
                  <span className="inline-flex rounded-full bg-accent px-2 py-1 text-xs font-medium">
                    {product.attributes.category}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Star className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">{t.featured.noProducts}</p>
            </div>
          )}

          <div className="rounded-lg border border-border bg-accent/50 p-4">
            <h3 className="mb-3 font-semibold">{t.featured.howItWorks}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.featured.instructions.map((instruction, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
