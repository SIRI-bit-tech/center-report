# The Central Report - Backend API

Production-ready Django REST API for The Central Report news website.

## 🚀 Quick Deployment

### Environment Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your production values

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Start production server
gunicorn central_report.wsgi:application
```

## 🔧 Production Configuration

### Required Environment Variables
```env
DEBUG=False
SECRET_KEY=your-super-secret-production-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (PostgreSQL recommended)
DATABASE_URL=postgresql://user:password@host:port/dbname

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (for newsletter and contact forms)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📡 API Endpoints

### Articles
- `GET /api/articles/` - List all published articles
- `GET /api/articles/{slug}/` - Get article detail
- `GET /api/articles/featured/` - Get featured articles
- `GET /api/articles/breaking/` - Get breaking news
- `GET /api/articles/trending/` - Get trending articles
- `GET /api/articles/latest/` - Get latest articles

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{slug}/` - Get category detail
- `GET /api/categories/{slug}/articles/` - Get articles by category

### Authors
- `GET /api/authors/` - List all authors
- `GET /api/authors/{id}/` - Get author detail
- `GET /api/authors/{id}/articles/` - Get articles by author

### Search
- `GET /api/search/?q={query}` - Search articles

### Newsletter
- `POST /api/newsletter/` - Subscribe to newsletter

### Contact
- `POST /api/contact/` - Submit contact form

### Homepage
- `GET /api/homepage/` - Get homepage data

## 🔐 Admin Interface

Access the admin interface at `/admin/` to manage:
- Articles (create, edit, publish)
- Categories
- Authors
- Newsletter subscribers
- Contact messages

## 🚀 Deployment Platforms

### Heroku
```bash
# Deploy to Heroku
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set SECRET_KEY=your-secret-key
git push heroku main
```

### DigitalOcean App Platform
- Connect your repository
- Set environment variables
- Deploy automatically

### AWS/Railway/Render
- Follow platform-specific deployment guides
- Set environment variables
- Use PostgreSQL database

## 📊 Performance

- Database queries optimized with select_related and prefetch_related
- Image optimization with Cloudinary
- Caching ready for Redis/Memcached
- CDN ready for static files

## 🔒 Security

- CORS properly configured
- CSRF protection enabled
- XSS protection headers
- Secure cookie settings for production
- Input validation and sanitization

## 📈 Monitoring

- Logging configured for production
- Error tracking ready for Sentry
- Health check endpoints available
- Performance monitoring ready

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] Static files collected
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email service configured
- [ ] Cloudinary configured
- [ ] Admin user created
- [ ] Backup strategy implemented
- [ ] Monitoring configured 