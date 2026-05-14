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
          <p className="text-sm text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật trang chủ</h1>
          <p className="text-gray-600 mt-1">
            Quản lý {features.length} mục hiển thị trên trang chủ
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Star className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">Chưa có sản phẩm nổi bật nào</p>
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
                className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  {attrs.mediaType === "video" && attrs.videoUrl ? (
                    <div className="flex h-full items-center justify-center bg-gray-900">
                      <Video className="h-12 w-12 text-white/60" />
                      <span className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/50 px-2 py-1 rounded">
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
                      <ImageIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}

                  <span className="absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow">
                    {attrs.order}
                  </span>

                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      attrs.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {attrs.isActive ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    {attrs.isActive ? "Hiển thị" : "Ẩn"}
                  </span>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base leading-snug">
                      {attrs.name}
                    </h3>
                    {attrs.titleEm && (
                      <p className="text-sm text-primary font-medium mt-0.5">
                        {attrs.titleEm}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {attrs.description || "Chưa có mô tả"}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      {attrs.mediaType === "video" ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <ImageIcon className="h-3.5 w-3.5" />
                      )}
                      {attrs.mediaType === "video" ? "Video" : "Hình ảnh"}
                    </span>
                    {galleryCount > 0 && (
                      <span>Gallery: {galleryCount} ảnh</span>
                    )}
                  </div>

                  {attrs.ctaText && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">CTA:</span> {attrs.ctaText}
                      </p>
                      {attrs.ctaLink && (
                        <p className="text-xs text-gray-400 truncate">
                          → {attrs.ctaLink}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href={`/featured/${feature.id}`}
                    className="block w-full mt-3 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                  >
                    Chỉnh sửa
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
