"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Video, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    gallery?: {
      data?: Array<{
        attributes: { url: string };
      }>;
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getImageUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function FeaturedPage() {
  const { locale } = useI18n();
  const [features, setFeatures] = useState<HomepageFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/homepage-features?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Featured Items</h1>
          <p className="text-muted-foreground mt-1">
            Manage {features.length} featured {features.length === 1 ? "item" : "items"} displayed on homepage
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Star className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No featured items yet</p>
            </CardContent>
          </Card>
        ) : (
          features.map((feature) => {
            const attrs = feature.attributes;
            const imageUrl = attrs.mainImage?.data?.attributes?.url
              ? getImageUrl(attrs.mainImage.data.attributes.url)
              : null;
            const galleryCount = attrs.gallery?.data?.length || 0;

            return (
              <Card
                key={feature.id}
                className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-muted">
                  {attrs.mediaType === "video" && attrs.videoUrl ? (
                    <div className="flex h-full items-center justify-center bg-slate-900">
                      <Video className="h-12 w-12 text-white/40" />
                      <span className="absolute bottom-3 left-3 text-xs text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                        Video
                      </span>
                    </div>
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={attrs.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}

                  <span className="absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg">
                    {attrs.order}
                  </span>

                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${
                      attrs.isActive
                        ? "bg-green-500/90 text-white"
                        : "bg-slate-500/90 text-white"
                    }`}
                  >
                    {attrs.isActive ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    {attrs.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-base leading-snug">
                      {attrs.name}
                    </h3>
                    {attrs.titleEm && (
                      <p className="text-sm text-primary font-medium mt-0.5">
                        {attrs.titleEm}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {attrs.description || "No description"}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {attrs.mediaType === "video" ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <ImageIcon className="h-3.5 w-3.5" />
                      )}
                      {attrs.mediaType === "video" ? "Video" : "Image"}
                    </span>
                    {galleryCount > 0 && (
                      <span>Gallery: {galleryCount} {galleryCount === 1 ? "item" : "items"}</span>
                    )}
                  </div>

                  {attrs.ctaText && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">CTA:</span> {attrs.ctaText}
                      </p>
                      {attrs.ctaLink && (
                        <p className="text-xs text-muted-foreground/70 truncate">
                          → {attrs.ctaLink}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href={`/featured/${feature.id}`}
                    className="block w-full mt-3 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Edit
                  </Link>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
