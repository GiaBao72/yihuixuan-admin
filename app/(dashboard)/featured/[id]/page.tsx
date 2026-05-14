"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HomepageFeature {
  id: number;
  attributes: {
    name: string;
    titleEm: string | null;
    description: string;
    mediaType: "image" | "video";
    videoUrl: string | null;
    ctaText: string | null;
    ctaLink: string | null;
    order: number;
    isActive: boolean;
    locale: string;
    mainImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getImageUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function FeaturedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useI18n();
  const [feature, setFeature] = useState<HomepageFeature | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    titleEm: "",
    description: "",
    mediaType: "image" as "image" | "video",
    videoUrl: "",
    ctaText: "",
    ctaLink: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    fetch(`/api/homepage-features/${params.id}?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setFeature(data.data);
          const attrs = data.data.attributes;
          setFormData({
            name: attrs.name || "",
            titleEm: attrs.titleEm || "",
            description: attrs.description || "",
            mediaType: attrs.mediaType || "image",
            videoUrl: attrs.videoUrl || "",
            ctaText: attrs.ctaText || "",
            ctaLink: attrs.ctaLink || "",
            order: attrs.order || 1,
            isActive: attrs.isActive ?? true,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/homepage-features/${params.id}?locale=${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        alert("Saved successfully!");
        router.push("/featured");
      } else {
        alert("Failed to save. Please try again.");
      }
    } catch (error) {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!feature) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-sm text-muted-foreground">Feature not found</p>
      </div>
    );
  }

  const imageUrl = feature.attributes.mainImage?.data?.attributes?.url
    ? getImageUrl(feature.attributes.mainImage.data.attributes.url)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/featured">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Featured Item</h1>
          <p className="text-muted-foreground mt-1">ID: {feature.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="titleEm">Emphasized Title</Label>
                  <Input
                    id="titleEm"
                    value={formData.titleEm}
                    onChange={(e) => setFormData({ ...formData, titleEm: e.target.value })}
                    placeholder="Highlighted text"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mediaType">Media Type</Label>
                  <select
                    id="mediaType"
                    value={formData.mediaType}
                    onChange={(e) =>
                      setFormData({ ...formData, mediaType: e.target.value as "image" | "video" })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                {formData.mediaType === "video" && (
                  <div>
                    <Label htmlFor="videoUrl">Video URL (YouTube)</Label>
                    <Input
                      id="videoUrl"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="mt-1.5"
                    />
                  </div>
                )}

                {imageUrl && formData.mediaType === "image" && (
                  <div>
                    <Label>Current Main Image</Label>
                    <div className="relative h-48 w-full rounded-md overflow-hidden border mt-1.5">
                      <Image src={imageUrl} alt={formData.name} fill className="object-cover" unoptimized />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call to Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ctaText">CTA Button Text</Label>
                  <Input
                    id="ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Learn More →"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="ctaLink">CTA Link</Label>
                  <Input
                    id="ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/products/..."
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="mt-1.5"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Show on homepage
                  </Label>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Current Language</p>
                  <p className="text-sm font-medium">{locale.toUpperCase()}</p>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
