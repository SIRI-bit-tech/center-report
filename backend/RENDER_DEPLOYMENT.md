# Render Deployment Guide for The Central Report Backend

## Prerequisites
- Render account (free at render.com)
- GitHub repository with your code
- PostgreSQL database (Render provides this)

## Step 1: Prepare Your Repository

1. **Push your backend code to GitHub:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit - Django backend for Render"
git branch -M main
git remote add origin https://github.com/yourusername/central-report-backend.git
git push -u origin main
```

## Step 2: Deploy on Render

1. **Go to [render.com](https://render.com) and sign up/login**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

### **Basic Settings:**
- **Name**: `central-report-backend`
- **Environment**: `Docker`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (if backend is in root)

### **Build & Deploy Settings:**
- **Build Command**: Leave empty (Docker handles this)
- **Start Command**: Leave empty (Dockerfile handles this)

## Step 3: Add PostgreSQL Database

1. **In your Render dashboard, click "New +" → "PostgreSQL"**
2. **Configure database:**
   - **Name**: `central-report-db`
   - **Database**: `central_report_db`
   - **User**: `central_report_user`
   - **Region**: Same as your web service
3. **Copy the connection details**

## Step 4: Configure Environment Variables

In your Render web service dashboard, go to **Environment** and add:

### **Required Variables:**
```
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
DEBUG=False
ENVIRONMENT=production
ALLOWED_HOSTS=.onrender.com,your-domain.com
```

### **Optional Variables (if using):**
```
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
GLITCHTIP_DSN=your-glitchtip-dsn
SENTRY_TRACES_SAMPLE_RATE=0.1
```

### **Superuser Variables (optional):**
```
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@centralreport.com
DJANGO_SUPERUSER_PASSWORD=your-secure-password
```

## Step 5: Link Database to Web Service

1. **In your web service dashboard, go to "Environment"**
2. **Click "Link Existing" under "PostgreSQL"**
3. **Select your database**
4. **Render will automatically add the DATABASE_URL**

## Step 6: Deploy

1. **Click "Create Web Service"**
2. **Render will automatically build and deploy your app**
3. **Check the deployment logs for any errors**
4. **Your app will be available at: `https://your-app-name.onrender.com`**

## Step 7: Verify Deployment

1. **Visit your app URL**
2. **Check if the API is working: `https://your-app-name.onrender.com/api/`**
3. **Admin panel: `https://your-app-name.onrender.com/admin/`**

## Step 8: Connect to Frontend

Update your frontend environment variables:
```env
NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com/api
```

## Step 9: Custom Domain (Optional)

1. **In your web service dashboard, go to "Settings"**
2. **Click "Custom Domain"**
3. **Add your domain and update DNS records**

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check Dockerfile syntax
   - Verify requirements.txt
   - Check build logs

2. **Database Connection Error:**
   - Verify DATABASE_URL format
   - Check if database is linked
   - Ensure database is running

3. **Static Files Not Loading:**
   - Check STATIC_ROOT setting
   - Verify collectstatic ran successfully

4. **Migration Errors:**
   - Check deployment logs
   - Manually run migrations if needed

### Manual Commands (if needed):

```bash
# Access Render shell
render shell

# Run migrations manually
python manage.py migrate

# Create superuser manually
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

## Monitoring

- **Render provides built-in monitoring**
- **Check logs in Render dashboard**
- **Set up alerts for downtime**

## Scaling

- **Free tier**: 750 hours/month
- **Paid plans**: Auto-scaling available
- **Database**: Separate scaling options

## Security Notes

- **Never commit SECRET_KEY to git**
- **Use strong passwords for superuser**
- **Enable HTTPS (Render provides this automatically)**
- **Regularly update dependencies**

## Cost

- **Free tier**: 750 hours/month
- **Paid plans**: $7/month for unlimited usage
- **PostgreSQL**: $7/month for paid plans

## Render vs Railway Comparison

| Feature | Render | Railway |
|---------|--------|---------|
| Free Tier | 750 hours/month | Unlimited |
| Database | PostgreSQL included | PostgreSQL included |
| Custom Domain | Yes | Yes |
| Auto-scaling | Yes | Yes |
| Build Time | ~5-10 minutes | ~3-5 minutes |
| Ease of Use | Very Easy | Very Easy |

## Environment Variables Reference

```env
# Required
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
DEBUG=False
ENVIRONMENT=production
ALLOWED_HOSTS=.onrender.com,your-domain.com

# Optional
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
GLITCHTIP_DSN=your-glitchtip-dsn
SENTRY_TRACES_SAMPLE_RATE=0.1

# Superuser (optional)
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@centralreport.com
DJANGO_SUPERUSER_PASSWORD=your-secure-password
``` 