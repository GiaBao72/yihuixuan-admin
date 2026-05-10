# Yihuixuan Admin Panel - Internationalization (i18n)

## Ngôn ngữ hỗ trợ

Admin Panel hiện hỗ trợ 3 ngôn ngữ:

- 🇻🇳 **Tiếng Việt** (vi) - Mặc định
- 🇬🇧 **English** (en)
- 🇨🇳 **中文** (zh)

## Cách chuyển đổi ngôn ngữ

1. Click vào icon **Globe** (🌐) ở góc phải trên Header
2. Chọn ngôn ngữ mong muốn từ dropdown menu
3. Ngôn ngữ được lưu tự động vào localStorage và áp dụng ngay lập tức

## Cấu trúc i18n

### Translation Files

Các file translation nằm trong thư mục `locales/`:

```
locales/
├── en.json  # English translations
├── vi.json  # Vietnamese translations
└── zh.json  # Chinese translations
```

### I18n Context

File `contexts/I18nContext.tsx` cung cấp:

- `useI18n()` hook để truy cập translations
- `locale` - ngôn ngữ hiện tại
- `setLocale(locale)` - thay đổi ngôn ngữ
- `t` - object chứa tất cả translations

### Sử dụng trong components

```tsx
"use client";

import { useI18n } from "@/contexts/I18nContext";

export default function MyComponent() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <h1>{t.dashboard.title}</h1>
      <p>{t.dashboard.subtitle}</p>
      
      {/* Chuyển ngôn ngữ */}
      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("vi")}>Tiếng Việt</button>
      <button onClick={() => setLocale("zh")}>中文</button>
    </div>
  );
}
```

## Translation Keys

### Dashboard
- `t.dashboard.title` - Tiêu đề trang
- `t.dashboard.subtitle` - Mô tả
- `t.dashboard.stats.*` - Các thống kê
- `t.dashboard.quickActions.*` - Thao tác nhanh

### Products
- `t.products.title` - Tiêu đề trang
- `t.products.subtitle` - Mô tả
- `t.products.table.*` - Các cột trong bảng
- `t.products.addProduct` - Nút thêm sản phẩm

### Featured
- `t.featured.title` - Tiêu đề trang
- `t.featured.subtitle` - Mô tả
- `t.featured.instructions[]` - Hướng dẫn sử dụng

### Media
- `t.media.title` - Tiêu đề trang
- `t.media.subtitle` - Mô tả
- `t.media.productImages` - Tiêu đề gallery

### Analytics
- `t.analytics.title` - Tiêu đề trang
- `t.analytics.stats.*` - Các thống kê
- `t.analytics.productsByCategory` - Biểu đồ theo danh mục

### Settings
- `t.settings.title` - Tiêu đề trang
- `t.settings.strapiCms` - Thông tin Strapi
- `t.settings.systemInfo` - Thông tin hệ thống

### Sidebar & Header
- `t.sidebar.dashboard` - Menu Dashboard
- `t.sidebar.products` - Menu Products
- `t.header.search` - Placeholder tìm kiếm
- `t.header.notifications` - Thông báo

## Thêm ngôn ngữ mới

1. Tạo file translation mới trong `locales/` (ví dụ: `ja.json`)
2. Copy cấu trúc từ `en.json` và dịch nội dung
3. Thêm locale vào `contexts/I18nContext.tsx`:

```tsx
import ja from "@/locales/ja.json";

type Locale = "en" | "vi" | "zh" | "ja";
const translations: Record<Locale, Translations> = { en, vi, zh, ja };
```

4. Thêm vào language switcher trong `components/dashboard/Header.tsx`:

```tsx
const languages = [
  { code: "vi" as const, label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en" as const, label: "English", flag: "🇬🇧" },
  { code: "zh" as const, label: "中文", flag: "🇨🇳" },
  { code: "ja" as const, label: "日本語", flag: "🇯🇵" },
];
```

## Lưu ý kỹ thuật

- Ngôn ngữ được lưu trong `localStorage` với key `admin_locale`
- Mặc định là tiếng Việt (`vi`) nếu chưa có trong localStorage
- Tất cả pages phải là client components (`"use client"`) để sử dụng i18n
- I18nProvider được wrap ở dashboard layout để tất cả pages đều có access

## Build & Deploy

Sau khi thay đổi translations:

```bash
npm run build
pm2 restart yihuixuan-admin
```

## External Access

Admin Panel: http://e1.chiasegpu.vn:57216

Language switcher nằm ở góc phải trên Header, bên cạnh icon Notifications và User profile.
