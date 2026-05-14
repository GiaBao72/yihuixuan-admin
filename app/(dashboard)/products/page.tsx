"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Edit, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  attributes: {
    name: string;
    shortDescription: string;
    category: string;
    order: number;
    isActive: boolean;
    mainImage?: { 
      data?: { 
        attributes: { 
          url: string;
        };
      };
    };
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?locale=vi`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(p => 
    p.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.attributes.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-600 mt-1">Quản lý danh sách sản phẩm của bạn</p>
        </div>
        <button 
          onClick={() => alert("Tính năng thêm sản phẩm đang phát triển!")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Products Table */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Tất cả sản phẩm ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/30 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  <th className="px-6 py-4 w-16">Thứ tự</th>
                  <th className="px-6 py-4 w-20">Hình ảnh</th>
                  <th className="px-6 py-4">Tên sản phẩm</th>
                  <th className="px-6 py-4 w-32">Danh mục</th>
                  <th className="px-6 py-4 w-24">Trạng thái</th>
                  <th className="px-6 py-4 w-32 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm text-gray-500">Không tìm thấy sản phẩm</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr 
                      key={product.id} 
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      {/* Order */}
                      <td className="px-6 py-4">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                          {product.attributes.order}
                        </span>
                      </td>

                      {/* Image */}
                      <td className="px-6 py-4">
                        {product.attributes.mainImage?.data?.attributes?.url ? (
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <Image
                              src={product.attributes.mainImage.data.attributes.url}
                              alt={product.attributes.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
                            <Package className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </td>

                      {/* Name & Description */}
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900 mb-0.5">{product.attributes.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product.attributes.shortDescription || "Chưa có mô tả"}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                          {product.attributes.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                          product.attributes.isActive
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-red-50 text-red-700 border-red-100"
                        }`}>
                          {product.attributes.isActive ? "Hoạt động" : "Tạm ẩn"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => window.location.href = `/products/${product.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Chỉnh sửa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
