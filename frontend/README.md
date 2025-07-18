# The Central Report - Frontend

Professional news website frontend built with Next.js 14, React 18, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Components**: Custom component library with Radix UI primitives

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── articles/          # Article-related components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and services
│   ├── api.ts            # API service functions
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Rich Charcoal (#222222)
- **Accent**: Muted Red (#C14444)
- **Background**: Soft Beige (#EAE7DC)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Serif Font**: Georgia (for article content)

### Components
- **Article Cards**: Multiple variants (default, featured, compact)
- **Hero Section**: Featured articles with breaking news ticker
- **Navigation**: Sticky header with mobile menu
- **Footer**: Comprehensive footer with links and newsletter signup

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Site Configuration
NEXT_PUBLIC_SITE_NAME=The Central Report
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette
- Custom animations
- Responsive design utilities
- Component-specific classes

## 📱 Features

### Core Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO optimization with metadata
- ✅ Image optimization with Next.js Image
- ✅ Smooth animations with Framer Motion
- ✅ Type-safe API integration
- ✅ Professional news layout
- ✅ Breaking news ticker
- ✅ Category filtering
- ✅ Search functionality (ready for backend integration)

### Performance
- ✅ Server-side rendering (SSR)
- ✅ Static generation (SSG) ready
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading

### Accessibility
- ✅ WCAG compliant color contrast
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Semantic HTML

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🔗 API Integration

The frontend is designed to work with the Django backend API. Key endpoints:

- `GET /api/articles/` - List articles
- `GET /api/articles/{slug}/` - Get single article
- `GET /api/categories/` - List categories
- `GET /api/authors/` - List authors
- `GET /api/search/` - Search articles

## 📝 Development

### Adding New Components
1. Create component in appropriate directory
2. Add TypeScript types if needed
3. Export from index file
4. Import and use in pages

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the design system colors
- Use responsive design patterns
- Maintain accessibility standards

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component-based architecture

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on multiple screen sizes
4. Ensure accessibility compliance
5. Update documentation as needed

## 📄 License

This project is part of The Central Report news website. 