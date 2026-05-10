"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Package } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  attributes: {
    name: string;
    mainImage?: {
      data?: {
        attributes: {
          url: string;
          name: string;
        };
      };
    };
  };
}

export default function MediaPage() {
  const { t, locale } = useI18n();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?locale=${locale}`)
      .then(res => res.json())
      .then(data => {
        const allImages = (data.data || [])
          .filter((p: Product) => p.attributes.mainImage?.data)
          .map((p: Product) => ({
            id: p.id,
            name: p.attributes.name,
            url: p.attributes.mainImage!.data!.attributes.url,
            fileName: p.attributes.mainImage!.data!.attributes.name,
          }));
        setImages(allImages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.media.title}</h1>
        <p className="text-muted-foreground">{t.media.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {t.media.productImages} ({images.length} {t.media.images})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="aspect-square bg-accent p-4">
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">{image.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{image.fileName}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">{t.media.noImages}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
