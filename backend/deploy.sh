#!/bin/bash

# Production Deployment Script for The Central Report Backend

echo "🚀 Starting production deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create .env file with the following variables:"
    echo ""
    echo "DEBUG=False"
    echo "SECRET_KEY=your-super-secret-production-key"
    echo "ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com"
    echo "DATABASE_URL=postgresql://user:password@host:port/dbname"
    echo "CLOUDINARY_CLOUD_NAME=your-cloud-name"
    echo "CLOUDINARY_API_KEY=your-api-key"
    echo "CLOUDINARY_API_SECRET=your-api-secret"
    echo "EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend"
    echo "EMAIL_HOST=smtp.gmail.com"
    echo "EMAIL_PORT=587"
    echo "EMAIL_USE_TLS=True"
    echo "EMAIL_HOST_USER=your-email@gmail.com"
    echo "EMAIL_HOST_PASSWORD=your-app-password"
    echo "CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com"
    echo ""
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if not exists
echo "👤 Creating superuser..."
python manage.py createsuperuser --noinput || echo "Superuser already exists or creation failed"

echo "✅ Deployment completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Start the server: gunicorn central_report.wsgi:application"
echo "2. Access admin at: http://yourdomain.com/admin/"
echo "3. API available at: http://yourdomain.com/api/"
echo ""
echo "🔧 For development, set DEBUG=True in .env" 