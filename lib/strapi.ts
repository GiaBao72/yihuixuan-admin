const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiProduct {
  id: number;
  attributes: {
    name: string;
    slug: string;
    shortDescription: string;
    category: string;
    order: number;
    isActive: boolean;
    locale: string;
    createdAt: string;
    updatedAt: string;
    mainImage?: {
      data?: {
        id: number;
        attributes: {
          url: string;
          name: string;
          width: number;
          height: number;
          size: number;
          formats?: any;
        };
      };
    };
    localizations?: {
      data: Array<{
        id: number;
        attributes: {
          locale: string;
        };
      }>;
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchProducts(locale?: string): Promise<StrapiResponse<StrapiProduct[]>> {
  const params = new URLSearchParams({
    'populate': '*',
    'sort': 'order:asc',
  });
  
  if (locale) {
    params.append('locale', locale);
  } else {
    params.append('locale', 'all');
  }

  const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getProductStats() {
  try {
    const response = await fetchProducts();
    const products = response.data;
    
    const viProducts = products.filter(p => p.attributes.locale === 'vi');
    const totalProducts = viProducts.length;
    const featuredProducts = viProducts.filter(p => p.attributes.order <= 5).length;
    const productsWithImages = viProducts.filter(p => p.attributes.mainImage?.data).length;
    
    return {
      totalProducts,
      featuredProducts,
      productsWithImages,
      totalLocales: 3,
    };
  } catch (error) {
    console.error('Error fetching product stats:', error);
    return {
      totalProducts: 0,
      featuredProducts: 0,
      productsWithImages: 0,
      totalLocales: 0,
    };
  }
}
