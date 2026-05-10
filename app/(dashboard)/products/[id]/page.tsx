"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface ProductData {
  id: number;
  attributes: {
    name: string;
    slug: string;
    category: string;
    order: number;
    isActive: boolean;
    shortDescription: string;
    fullDescription: string;
    detailedContent: string;
    titleEm: string | null;
    applications: string[] | null;
    mediaType: "image" | "video";
    videoUrl: string | null;
    ctaText: string | null;
    ctaLink: string | null;
    specs: string | null;
    advantages: string | null;
    features: Array<{
      id: number;
      title: string;
      description: string;
    }> | null;
    mainImage: any;
    detailImage: any;
    gallery: any;
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useI18n();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    fetchProduct();
  }, [params.id, locale]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}?locale=${locale}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{t.productDetail.messages.loading}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{t.productDetail.messages.notFound}</p>
      </div>
    );
  }

  const tabs = [
    { id: "basic", label: t.productDetail.tabs.basic },
    { id: "content", label: t.productDetail.tabs.content },
    { id: "media", label: t.productDetail.tabs.media },
    { id: "seo", label: t.productDetail.tabs.seo },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/products")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.productDetail.backToProducts}
            </Button>
          </div>
          <h1 className="mt-2 text-3xl font-bold">{product.attributes.name}</h1>
          <p className="text-muted-foreground">{t.productDetail.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            {t.productDetail.actions.delete}
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            {t.productDetail.actions.save}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "basic" && (
        <BasicInfoTab product={product} t={t} />
      )}
    </div>
  );
}

function BasicInfoTab({ product, t }: { product: ProductData; t: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t.productDetail.tabs.basic}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ID */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.id}</label>
            <Input value={product.id} disabled className="mt-1" />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.name}</label>
            <Input
              value={product.attributes.name}
              placeholder={t.productDetail.placeholders.name}
              className="mt-1"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.slug}</label>
            <Input
              value={product.attributes.slug}
              placeholder={t.productDetail.placeholders.slug}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t.productDetail.help.slug}
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.category}</label>
            <Input value={product.attributes.category} className="mt-1" />
          </div>

          {/* Order */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.order}</label>
            <Input
              type="number"
              value={product.attributes.order}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t.productDetail.help.order}
            </p>
          </div>

          {/* isActive */}
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.isActive}</label>
            <div className="mt-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isActive"
                  checked={product.attributes.isActive}
                  className="h-4 w-4"
                />
                <span className="text-sm">{t.productDetail.options.active}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isActive"
                  checked={!product.attributes.isActive}
                  className="h-4 w-4"
                />
                <span className="text-sm">{t.productDetail.options.inactive}</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.locale}</label>
            <Input value={product.attributes.locale.toUpperCase()} disabled className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.createdAt}</label>
            <Input
              value={new Date(product.attributes.createdAt).toLocaleString()}
              disabled
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.updatedAt}</label>
            <Input
              value={new Date(product.attributes.updatedAt).toLocaleString()}
              disabled
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">{t.productDetail.fields.publishedAt}</label>
            <Input
              value={new Date(product.attributes.publishedAt).toLocaleString()}
              disabled
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
