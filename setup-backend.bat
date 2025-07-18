@echo off
echo Setting up Django Backend for The Central Report...

cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo Creating Django project...
django-admin startproject central_report .

echo Creating news app...
python manage.py startapp news

echo Creating API app...
python manage.py startapp api

echo Setup complete! Next steps:
echo 1. cd backend
echo 2. venv\Scripts\activate
echo 3. python manage.py migrate
echo 4. python manage.py createsuperuser
echo 5. python manage.py runserver

pause 