"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FeaturesInput } from "@/components/FeaturesInput";
import { ArrayInput } from "@/components/ArrayInput";
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
    titleEm: string;
    applications: string[];
    features: Array<{ title: string; description: string }>;
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
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "media" | "seo">("basic");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}?locale=${locale}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch product:", err);
          setLoading(false);
        });
    }
  }, [params.id, locale]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">{t.productDetail?.loading || "Loading..."}</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-destructive">
            {t.productDetail?.notFound || "Product not found"}
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    alert("Save functionality will be implemented in Phase 3");
  };

  const handleDelete = () => {
    if (confirm(t.productDetail?.confirmDelete || "Are you sure?")) {
      alert("Delete functionality will be implemented in Phase 3");
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/products")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.productDetail?.backToList || "Back to list"}
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{product.attributes.name}</h1>
            <p className="text-sm text-muted-foreground">
              ID: {product.id} • {product.attributes.locale.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            {t.productDetail?.delete || "Delete"}
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {t.productDetail?.save || "Save"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card px-6">
        <div className="flex gap-6">
          {["basic", "content", "media", "seo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.productDetail?.tabs?.[tab as keyof typeof t.productDetail.tabs] || tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="mx-auto max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.sections?.basicInfo || "Basic Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ID */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.id || "ID"}</label>
                  <Input value={product.id} disabled className="mt-1" />
                </div>

                {/* Name */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.name || "Name"}</label>
                  <Input
                    value={product.attributes.name}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, name: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.slug || "Slug"}</label>
                  <Input
                    value={product.attributes.slug}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, slug: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.productDetail?.help?.slug || "URL-friendly identifier"}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.category || "Category"}</label>
                  <Input
                    value={product.attributes.category}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, category: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.order || "Order"}</label>
                  <Input
                    type="number"
                    value={product.attributes.order}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, order: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.productDetail?.help?.order || "Order >= 100 shows on homepage"}
                  </p>
                </div>

                {/* isActive */}
                <div>
                  <label className="text-sm font-medium">{t.productDetail?.fields?.status || "Status"}</label>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={product.attributes.isActive}
                        onChange={() =>
                          setProduct({
                            ...product,
                            attributes: { ...product.attributes, isActive: true },
                          })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{t.productDetail?.status?.active || "Active"}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={!product.attributes.isActive}
                        onChange={() =>
                          setProduct({
                            ...product,
                            attributes: { ...product.attributes, isActive: false },
                          })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{t.productDetail?.status?.inactive || "Inactive"}</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.sections?.systemInfo || "System Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t.productDetail?.fields?.locale || "Locale"}:</span>
                    <span className="ml-2 text-muted-foreground">{product.attributes.locale}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t.productDetail?.fields?.createdAt || "Created"}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {new Date(product.attributes.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">{t.productDetail?.fields?.updatedAt || "Updated"}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {new Date(product.attributes.updatedAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">{t.productDetail?.fields?.publishedAt || "Published"}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {product.attributes.publishedAt
                        ? new Date(product.attributes.publishedAt).toLocaleString()
                        : "Not published"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Text Content */}
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.sections?.textContent || "Text Content"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title Emphasis */}
                <div>
                  <label className="text-sm font-medium">
                    {t.productDetail?.fields?.titleEm || "Title Emphasis"}
                  </label>
                  <Input
                    value={product.attributes.titleEm || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, titleEm: e.target.value },
                      })
                    }
                    placeholder={t.productDetail?.placeholders?.titleEm || "e.g., Laser, 激光"}
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.productDetail?.help?.titleEm || "Highlighted part of the title on homepage"}
                  </p>
                </div>

                {/* Short Description */}
                <div>
                  <label className="text-sm font-medium">
                    {t.productDetail?.fields?.shortDescription || "Short Description"}
                  </label>
                  <Textarea
                    value={product.attributes.shortDescription || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, shortDescription: e.target.value },
                      })
                    }
                    placeholder={t.productDetail?.placeholders?.shortDescription || "Brief description (max 500 chars)"}
                    className="mt-1"
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.attributes.shortDescription?.length || 0} / 500
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <label className="text-sm font-medium">
                    {t.productDetail?.fields?.fullDescription || "Full Description"}
                  </label>
                  <Textarea
                    value={product.attributes.fullDescription || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, fullDescription: e.target.value },
                      })
                    }
                    placeholder={t.productDetail?.placeholders?.fullDescription || "Detailed description"}
                    className="mt-1"
                    rows={5}
                  />
                </div>

                {/* Detailed Content (HTML) */}
                <div>
                  <label className="text-sm font-medium">
                    {t.productDetail?.fields?.detailedContent || "Detailed Content (HTML)"}
                  </label>
                  <Textarea
                    value={product.attributes.detailedContent || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        attributes: { ...product.attributes, detailedContent: e.target.value },
                      })
                    }
                    placeholder={t.productDetail?.placeholders?.detailedContent || "HTML content with specs table"}
                    className="mt-1 font-mono text-xs"
                    rows={10}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.productDetail?.help?.detailedContent || "Supports HTML. Include <table> for specs."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.fields?.applications || "Applications"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ArrayInput
                  value={product.attributes.applications || []}
                  onChange={(apps) =>
                    setProduct({
                      ...product,
                      attributes: { ...product.attributes, applications: apps },
                    })
                  }
                  labels={{
                    addItem: t.productDetail?.actions?.addApplication || "Add Application",
                    placeholder: t.productDetail?.placeholders?.application || "e.g., Automotive industry",
                  }}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.productDetail?.help?.applications || "List of industries/use cases"}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.fields?.features || "Features"}</CardTitle>
              </CardHeader>
              <CardContent>
                <FeaturesInput
                  value={product.attributes.features || []}
                  onChange={(feats) =>
                    setProduct({
                      ...product,
                      attributes: { ...product.attributes, features: feats },
                    })
                  }
                  labels={{
                    addFeature: t.productDetail?.actions?.addFeature || "Add Feature",
                    title: t.productDetail?.fields?.featureTitle || "Title",
                    description: t.productDetail?.fields?.featureDescription || "Description",
                    titlePlaceholder: t.productDetail?.placeholders?.featureTitle || "e.g., Laser Power",
                    descriptionPlaceholder: t.productDetail?.placeholders?.featureDescription || "e.g., 5W/10W",
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
        {/* Media Tab - Placeholder */}
        {activeTab === "media" && (
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.sections?.media || "Media"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
                  <p className="text-muted-foreground">
                    {t.productDetail?.placeholders?.mediaTab || "Media management (Phase 3)"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    mainImage, detailImage, gallery, mediaType, videoUrl
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SEO Tab - Placeholder */}
        {activeTab === "seo" && (
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>{t.productDetail?.sections?.seo || "SEO & Marketing"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
                  <p className="text-muted-foreground">
                    {t.productDetail?.placeholders?.seoTab || "SEO & marketing fields (Phase 3)"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    specs, advantages, ctaText, ctaLink
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
