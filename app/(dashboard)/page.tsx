import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Image, Star, TrendingUp } from "lucide-react";
import { getProductStats } from "@/lib/strapi";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const stats = await getProductStats();

  const statsCards = [
    {
      name: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      change: `${stats.totalLocales} languages`,
      changeType: "neutral" as const,
    },
    {
      name: "Products with Images",
      value: stats.productsWithImages.toString(),
      icon: Image,
      change: `${Math.round((stats.productsWithImages / stats.totalProducts) * 100)}% coverage`,
      changeType: "positive" as const,
    },
    {
      name: "Featured Products",
      value: stats.featuredProducts.toString(),
      icon: Star,
      change: "Homepage display",
      changeType: "neutral" as const,
    },
    {
      name: "Total Locales",
      value: stats.totalLocales.toString(),
      icon: TrendingUp,
      change: "vi, en, zh",
      changeType: "neutral" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a href="/products" className="flex flex-col items-center gap-2 rounded-lg border border-border p-6 transition-colors hover:bg-accent">
              <Package className="h-8 w-8 text-primary" />
              <span className="font-medium">View Products</span>
            </a>
            <a href="/media" className="flex flex-col items-center gap-2 rounded-lg border border-border p-6 transition-colors hover:bg-accent">
              <Image className="h-8 w-8 text-primary" />
              <span className="font-medium">Media Library</span>
            </a>
            <a href="/featured" className="flex flex-col items-center gap-2 rounded-lg border border-border p-6 transition-colors hover:bg-accent">
              <Star className="h-8 w-8 text-primary" />
              <span className="font-medium">Manage Featured</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
