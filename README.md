# The Central Report — Professional News Website

A modern, professional news website built with Django backend and Next.js frontend.

## Project Structure

```
CentralReport/
├── backend/                 # Django project
│   ├── central_report/      # Django settings
│   ├── news/               # News app
│   ├── api/                # API endpoints
│   ├── media/              # Uploaded files
│   └── requirements.txt
├── frontend/               # Next.js project
│   ├── app/                # App router
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities
│   ├── types/              # TypeScript types
│   └── package.json
└── README.md
```

## Quick Start

### Backend Setup (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## Technologies

- **Backend**: Django 5.0, Django REST Framework, PostgreSQL
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Styling**: Custom color palette (Rich Charcoal, Muted Red, Soft Beige)
- **Admin**: Django Admin for content management
- **Media**: Cloudinary for image storage

## Features

- Professional news layout with breaking news, categories, and featured articles
- Responsive design for desktop, tablet, and mobile
- SEO-optimized with server-side rendering
- Admin dashboard for content management
- Search functionality and related content suggestions
- Modern animations and smooth transitions 