
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Eye, Edit } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  attributes: {
    name: string;
    shortDescription: string;
    category: string;
    order: number;
    isActive: boolean;
    mainImage?: { data?: any };
  };
}

export default function ProductsPage() {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.products.title}</h1>
          <p className="text-muted-foreground">{t.products.subtitle}</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Package className="h-4 w-4" />
          {t.products.addProduct}
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.products.allProducts} ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium">{t.products.table.order}</th>
                  <th className="pb-3 font-medium">{t.products.table.name}</th>
                  <th className="pb-3 font-medium">{t.products.table.category}</th>
                  <th className="pb-3 font-medium">{t.products.table.status}</th>
                  <th className="pb-3 font-medium">{t.products.table.image}</th>
                  <th className="pb-3 font-medium text-right">{t.products.table.actions}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border">
                    <td className="py-4">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                        {product.attributes.order}
                      </span>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{product.attributes.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.attributes.shortDescription.slice(0, 60)}...
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex rounded-full bg-accent px-2 py-1 text-xs font-medium">
                        {product.attributes.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        product.attributes.isActive
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {product.attributes.isActive ? t.products.table.active : t.products.table.inactive}
                      </span>
                    </td>
                    <td className="py-4">
                      {product.attributes.mainImage?.data ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-accent">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent">
                        <Edit className="h-3 w-3" />
                        {t.products.table.edit}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
