# Yihuixuan Admin Panel

Modern admin dashboard for managing Yihuixuan products, media, and content.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (port 3002)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Login

**URL:** http://localhost:3002/login

**Credentials:**
- Email: `admin@yihuixuan.com`
- Password: `Yihuixuan@Admin2025!`

## 📦 Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Design System:** TypeUI Dashboard (dark theme)
- **Port:** 3002 (internal) → 57216 (external)

## 🎨 Features

### ✅ Phase 1 (Completed)
- [x] Authentication & Login
- [x] Dashboard Layout (Sidebar + Header)
- [x] Dashboard Home with stats
- [x] Products List view
- [x] Dark theme UI
- [x] Responsive design

### 🚧 Phase 2 (In Progress)
- [ ] Products CRUD (Create, Edit, Delete)
- [ ] Media Library
- [ ] Image Upload
- [ ] Strapi API Integration

### 📋 Phase 3 (Planned)
- [ ] Featured Products Management
- [ ] Analytics Dashboard
- [ ] Drag & Drop Reordering

### 🔮 Phase 4 (Planned)
- [ ] Settings Page
- [ ] SEO Configuration
- [ ] User Management

## 📁 Project Structure

```
yihuixuan-admin/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   └── login/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── page.tsx         # Dashboard home
│   │   ├── products/        # Products management
│   │   ├── media/           # Media library
│   │   ├── featured/        # Featured products
│   │   ├── analytics/       # Analytics
│   │   └── settings/        # Settings
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard-specific components
├── lib/
│   └── utils.ts             # Utility functions
└── .env.local               # Environment variables
```

## 🌐 Deployment

### VPS Information
- **Host:** e1.chiasegpu.vn
- **SSH Port:** 17433
- **App Port:** 3002 (internal)
- **External Port:** 57216
- **URL:** http://e1.chiasegpu.vn:57216

### Deploy Steps

1. **Upload to VPS:**
```bash
rsync -avz --exclude 'node_modules' --exclude '.next' \
  yihuixuan-admin/ \
  ubuntu@e1.chiasegpu.vn:/home/ubuntu/yihuixuan-admin/
```

2. **Build on VPS:**
```bash
ssh ubuntu@e1.chiasegpu.vn -p 17433
cd ~/yihuixuan-admin
npm install
npm run build
```

3. **Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
```

4. **Check Status:**
```bash
pm2 status
pm2 logs yihuixuan-admin
```

## 🔧 Environment Variables

Create `.env.local` file:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-secret-key

# Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:3001
STRAPI_API_TOKEN=your-strapi-token

# Admin Credentials
ADMIN_EMAIL=admin@yihuixuan.com
ADMIN_PASSWORD=your-password

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/yihuixuan_strapi
```

## 📚 Documentation

- [Phase 1 Completion Report](./PHASE1_COMPLETED.md)
- [Admin Panel Proposal](../admin-panel-proposal.md)
- [Audit Report](../AUDIT_REPORT.md)

## 🎯 Roadmap

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Setup + Auth + Layout | 3 days | ✅ Done |
| Phase 2: Products CRUD + Media | 4 days | 🚧 In Progress |
| Phase 3: Featured + Analytics | 3 days | 📋 Planned |
| Phase 4: Settings + Testing | 2 days | 📋 Planned |

**Total:** 12 days

## 🤝 Contributing

This is an internal admin panel for Yihuixuan. For questions or issues, contact the development team.

## 📄 License

Private - Yihuixuan Internal Use Only

---

**Built with ❤️ by Kiro AI**
